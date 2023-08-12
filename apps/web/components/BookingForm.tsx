import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui//table";
import { Checkbox } from "../components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

import { useLocale, useTranslations } from "next-intl";
import React from "react";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "./ui/input";

import { Payment } from "@naturechill/db";
import { loadStripe } from "@stripe/stripe-js";
import { trpc } from "../utils/trpc";
import { useDateSelector } from "./DateSelector";

let required_guestError_message = "Nincs kiválasztva a vendégek száma.";
let required_paymentError_message = "Nincs kiválasztva fizetési mód.";

if (typeof window !== "undefined") {
  const locale = window.location.pathname.split("/")[1];

  const errorMessagesGuest = {
    de: "Die Anzahl der Gäste ist nicht ausgewählt.",
    en: "The number of guests is not selected.",
    hu: "Nincs kiválasztva a vendégek száma.",
  };

  const errorMessagesPayment = {
    de: "Keine Zahlungsmethode ausgewählt.",
    en: "No payment method selected.",
    hu: "Nincs kiválasztva fizetési mód.",
  };

  required_guestError_message =
    errorMessagesGuest[locale] || required_guestError_message;
  required_paymentError_message =
    errorMessagesPayment[locale] || required_paymentError_message;
}

const formSchema = z.object({
  guests: z.string({
    required_error: required_guestError_message,
  }),
  paymentType: z.enum(["fullPrice", "halfPrice"], {
    required_error: required_paymentError_message,
  }),
});

interface ProfileFormProps {
  showModalPage: boolean;
  setShowModalPage: React.Dispatch<React.SetStateAction<boolean>>;
  onNextPage: () => void;
  setGuests: React.Dispatch<React.SetStateAction<number>>;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  showModalPage,
  setShowModalPage,
  onNextPage,
  setGuests,
}) => {
  const t = useTranslations();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const { endDate, startDate, totalCost } = useDateSelector();

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    const isValid = await form.trigger();
    setGuests(Number(values.guests));

    if (isValid) {
      onNextPage();
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="text-black">
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="md:w-42 md:h-42 h-24 w-24 overflow-hidden rounded-full sm:h-28 sm:w-28">
            <Image
              src="/gal5.webp"
              alt="Circle Image"
              style={{ objectFit: "cover" }}
              width={300}
              height={300}
            ></Image>
          </div>
          <h2 className="text-lg font-semibold sm:text-xl">
            {t("booking.bookingmodal.page1.main.title")}
          </h2>
        </div>
        <div className="flex items-center justify-between rounded-md bg-main-theme p-3">
          <p>
            {startDate?.format("ll")} - {endDate?.format("ll")}
          </p>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="border-b border-main-theme">
                  {t("booking.bookingmodal.page1.tablehead.housechoose")}
                </TableHead>
                <TableHead className="border-b border-main-theme">
                  {t("booking.bookingmodal.page1.tablehead.price")}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="flex items-center font-medium">
                  <FormItem className="flex flex-row items-center space-x-2">
                    <Checkbox defaultChecked disabled checked />
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        {t("booking.bookingmodal.page1.tablebody.woodhouse1")}
                      </FormLabel>
                      <FormDescription>
                        {t("booking.bookingmodal.page1.tablebody.description")}
                      </FormDescription>
                    </div>
                  </FormItem>
                </TableCell>
                <TableCell className="font-medium">
                  {totalCost.amount.deposit}HUF
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <FormField
                    control={form.control}
                    name="guests"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border border-main-theme/75">
                              <SelectValue
                                placeholder={t(
                                  "booking.bookingmodal.page1.selectguest.title"
                                )}
                              />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">
                              {t(
                                "booking.bookingmodal.page1.selectguest.value1"
                              )}
                            </SelectItem>
                            <SelectItem value="2">
                              {t(
                                "booking.bookingmodal.page1.selectguest.value2"
                              )}
                            </SelectItem>
                            <SelectItem value="3">
                              {t(
                                "booking.bookingmodal.page1.selectguest.value3"
                              )}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="w-full">
                  <FormField
                    control={form.control}
                    name="paymentType"
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={(value) =>
                          field.onChange(value as "fullPrice" | "halfPrice")
                        }
                        defaultValue={field.value}
                        className="flex justify-between"
                      >
                        <Label
                          htmlFor="fullPrice"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-main-theme bg-popover p-4 hover:bg-main-theme [&:has([data-state=checked])]:bg-main-theme"
                        >
                          <RadioGroupItem
                            value="fullPrice"
                            id="fullPrice"
                            className="sr-only"
                          />
                          {t(
                            "booking.bookingmodal.page1.fullhalfpriceselect.fullprice"
                          )}{" "}
                          <br /> <br />
                          {totalCost.amount.deposit} HUF
                        </Label>
                        <Label
                          htmlFor="halfPrice"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-main-theme bg-popover p-4 hover:bg-main-theme [&:has([data-state=checked])]:bg-main-theme "
                        >
                          <RadioGroupItem
                            value="halfPrice"
                            id="halfPrice"
                            className="sr-only"
                          />
                          {t(
                            "booking.bookingmodal.page1.fullhalfpriceselect.halfprice"
                          )}{" "}
                          <br />
                          <br />
                          {totalCost.amount.deposit * 0.5} HUF
                        </Label>
                        <FormMessage />
                      </RadioGroup>
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-5 flex justify-between gap-2">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              onClick={() => setShowModalPage(!showModalPage)}
            >
              {t("booking.bookingmodal.buttons.previous")}
            </Button>
            <Button
              type="submit"
              className="w-full bg-main-theme text-white sm:w-auto"
            >
              {t("booking.bookingmodal.buttons.next")}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

const formSchemaPage2 = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  terms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions.",
  }),
});

type ProfileFormPage2Props = {
  onPrevPage: () => void;
  guests: number;
};

export const ProfileFormPage2: React.FC<ProfileFormPage2Props> = ({
  onPrevPage,
  guests,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = useTranslations();
  const form = useForm<z.infer<typeof formSchemaPage2>>({
    resolver: zodResolver(formSchemaPage2),
    defaultValues: {},
  });
  const { endDate, startDate, totalCost } = useDateSelector();
  if (isSubmitted) {
    return <p>Thank you for your submission!</p>;
  }

  const trpcUtils = trpc.useContext();

  const { mutateAsync: book, data } = trpc.booking.book.useMutation({
    onSettled: () => {
      trpcUtils.booking.getBookings.invalidate();
    },
  });

  const locale = useLocale();

  const submitHandler: SubmitHandler<z.infer<typeof formSchemaPage2>> = async (
    data
  ) => {
    const { email } = data;
    if (endDate && startDate) {
      const sessionId = await book({
        endDate: endDate.valueOf(),
        startDate: startDate.valueOf(),
        paymentKind: Payment.CARD,
        guests,
        email,
        locale: locale as "en" | "de" | "hu",
      });

      const stripe = await loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
      );

      if (stripe) {
        const result = await stripe.redirectToCheckout({
          sessionId,
        });

        if (result.error) {
          alert(result.error.message);
        }
      } else {
        console.log("Stripe is not loaded");
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)}>
        <div className="flex items-center justify-between rounded-md bg-main-theme p-3">
          <p>
            {startDate?.format("ll")} - {endDate?.format("ll")}
          </p>
        </div>
        <div className="flex w-full flex-col items-stretch space-y-6 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="flex flex-col rounded-md bg-gray-300 p-3">
            <h2>{t("booking.bookingmodal.page2.house.title")}</h2>
            <span>Ház Fakopáncs</span>
          </div>
          <div className="flex flex-col rounded-md bg-gray-300 p-3">
            <h2>{t("booking.bookingmodal.page2.price.title")}</h2>
            <span>{totalCost.amount.deposit} HUF</span>
          </div>
          <div className="flex flex-col rounded-md bg-gray-300 p-3">
            <h2>{t("booking.bookingmodal.page2.guests.title")}</h2>
            <span>{guests}</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {t("booking.bookingmodal.page2.form.email")}
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    aria-label="Email"
                    className="border-main-theme bg-white"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  className="border-main-theme bg-white"
                  aria-label="Accept terms and conditions"
                  checked={field.value}
                  onCheckedChange={(checked) =>
                    field.onChange(checked === true)
                  }
                />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {t("booking.bookingmodal.page2.form.terms")}
                </label>
              </div>
            )}
          />
          <FormMessage>{form.formState.errors.terms?.message}</FormMessage>
        </div>
        <div className="mt-4 flex flex-col justify-between space-y-4 sm:mt-6 sm:flex-row sm:space-y-0">
          <Button
            type="submit"
            className="w-full sm:w-auto"
            onClick={onPrevPage}
          >
            {t("booking.bookingmodal.buttons.previous")}
          </Button>
          <Button
            type="submit"
            className="w-full bg-main-theme text-white sm:w-auto"
            disabled={!form.formState.isValid || isLoading}
          >
            {isLoading ? "Loading..." : t("booking.bookingmodal.buttons.next")}
          </Button>
        </div>
      </form>
    </Form>
  );
};
