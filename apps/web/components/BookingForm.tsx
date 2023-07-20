import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Checkbox } from "../components/ui/checkbox";
import Link from "next/link";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import Image from "next/image";
import { Textarea } from "./ui/textarea";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui//table";

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
import React from "react";
import { Input } from "./ui/input";
import { useTranslations } from "next-intl";

import { loadStripe } from "@stripe/stripe-js";

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
  house_number_1: z.boolean().default(false),
  paymentType: z.enum(["fullPrice", "halfPrice"], {
    required_error: required_paymentError_message,
  }),
});

interface ProfileFormProps {
  startDate: Date;
  endDate: Date;
  showModalPage: boolean;
  setShowModalPage: React.Dispatch<React.SetStateAction<boolean>>;
  onNextPage: () => void;
  setHouse1: React.Dispatch<React.SetStateAction<boolean>>;
  setGuests: React.Dispatch<React.SetStateAction<string>>;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  startDate,
  endDate,
  showModalPage,
  setShowModalPage,
  onNextPage,
  setHouse1,
  setGuests,
}) => {
  const t = useTranslations();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { house_number_1: true },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    const isValid = await form.trigger();
    setHouse1(values.house_number_1);
    setGuests(values.guests);

    if (isValid) {
      onNextPage();
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-xl bg-white p-4 text-black drop-shadow-[0px_5px_2px_rgba(0,0,0,0.4)] backdrop-blur-[2px] backdrop-filter sm:space-y-5 sm:p-6 max-h-screen overflow-auto w-10/12 sm:w-max"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div className="flex items-center justify-between rounded-md bg-main-theme p-3">
            <p className="mr-1 font-semibold">
              {t("booking.bookingmodal.page1.date.arrival")}:
            </p>
            <p>{startDate.toLocaleDateString()}</p>
          </div>
          <div className="flex items-center justify-between rounded-md bg-main-theme p-3">
            <p className="mr-1 font-semibold">
              {t("booking.bookingmodal.page1.date.departure")}:
            </p>
            <p>{endDate.toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="md:w-42 md:h-42 h-24 w-24 overflow-hidden rounded-full sm:h-28 sm:w-28">
            <Image
              src="/gal5.jpg"
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
                  <FormField
                    control={form.control}
                    name="house_number_1"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-2">
                        <FormControl>
                          <Checkbox
                            defaultChecked
                            disabled
                            checked={field.value}
                            onCheckedChange={(checked) => {
                              if (typeof checked === "boolean") {
                                field.onChange(checked);
                              }
                            }}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            {t(
                              "booking.bookingmodal.page1.tablebody.woodhouse1"
                            )}
                          </FormLabel>
                          <FormDescription>
                            {t(
                              "booking.bookingmodal.page1.tablebody.description"
                            )}
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </TableCell>
                <TableCell className="font-medium">120.000 Ft</TableCell>
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
                <TableCell>
                  <FormField
                    control={form.control}
                    name="paymentType"
                    render={({ field }) => (
                      <RadioGroup
                        onValueChange={(value) =>
                          field.onChange(value as "fullPrice" | "halfPrice")
                        }
                        defaultValue={field.value}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-start sm:justify-items-center"
                      >
                        <Label
                          htmlFor="fullPrice"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-main-theme [&:has([data-state=checked])]:border-secondary-theme"
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
                          (120.000 Ft)
                        </Label>
                        <Label
                          htmlFor="halfPrice"
                          className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-main-theme [&:has([data-state=checked])]:border-secondary-theme"
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
                          (60.000 Ft)
                        </Label>
                        <FormMessage />
                      </RadioGroup>
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-24 flex flex-col justify-between space-y-4 sm:mt-20 sm:flex-row sm:space-y-0">
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
  fullname: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  street: z.string().min(2, {
    message: "Street must be at least 2 characters.",
  }),
  city: z.string().min(2, {
    message: "City must be at least 2 characters.",
  }),
  phoneNumber: z.string().regex(/^[0-9]+$/, {
    message: "Phone number can only contain numbers.",
  }),
  country: z.string().min(2, {
    message: "Country must be at least 2 characters.",
  }),
  terms: z.boolean().refine((value) => value === true, {
    message: "You must accept the terms and conditions.",
  }),
});

type ProfileFormPage2Props = {
  startDate: Date;
  endDate: Date;
  onPrevPage: () => void;
  house1: string;
  guests: number;
};

export const ProfileFormPage2 = ({
  startDate,
  endDate,
  onPrevPage,
  house1,
  guests,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const t = useTranslations();
  const form = useForm<z.infer<typeof formSchemaPage2>>({
    resolver: zodResolver(formSchemaPage2),
    defaultValues: {},
  });

  async function onSubmitPage2(values: z.infer<typeof formSchemaPage2>) {
    setIsLoading(true);
    console.log(values);

    const { email } = values;

    const response = await fetch("/api/stripe/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, house1, guests, endDate, startDate }),
    });
    const { sessionId } = await response.json();

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

    // Simulate a network request.
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    form.reset();
    setIsSubmitted(true);
  }
  if (isSubmitted) {
    return <p>Thank you for your submission!</p>;
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmitPage2)}
        className="max-h-screen w-10/12 space-y-4 overflow-auto rounded-xl bg-white p-4 text-black drop-shadow-[0px_5px_2px_rgba(0,0,0,0.4)] backdrop-blur-[2px] backdrop-filter sm:w-max sm:space-y-5 sm:p-6"
      >
        {" "}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div className="flex items-center justify-between rounded-md bg-main-theme p-3">
            <p className="mr-1 font-semibold">
              {t("booking.bookingmodal.page2.date.arrival")}:
            </p>
            <p>{startDate.toLocaleDateString()}</p>
          </div>
          <div className="flex items-center justify-between rounded-md bg-main-theme p-3">
            <p className="mr-1 font-semibold">
              {t("booking.bookingmodal.page2.date.departure")}:
            </p>
            <p>{endDate.toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex w-full flex-col items-stretch space-y-6 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="flex flex-col rounded-md bg-gray-400 p-3">
            <h2>{t("booking.bookingmodal.page2.house.title")}</h2>
            <span>{house1 ? "Ház Fakopáncs" : "Nincs kiválasztva ház"}</span>
          </div>
          <div className="flex flex-col rounded-md bg-gray-400 p-3">
            <h2>{t("booking.bookingmodal.page2.price.title")}</h2>
            <span>120.000 Ft</span>
          </div>
          <div className="flex flex-col rounded-md bg-gray-400 p-3">
            <h2>{t("booking.bookingmodal.page2.guests.title")}</h2>
            <span>{guests}</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 w-full md:w-max">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("booking.bookingmodal.page2.form.name")}
                  </FormLabel>
                  <FormControl className="border border-main-theme/50">
                    <Input {...field} aria-label="Full Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("booking.bookingmodal.page2.form.email")}
                  </FormLabel>
                  <FormControl className="border border-main-theme/50">
                    <Input {...field} aria-label="Email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 w-full md:w-max">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("booking.bookingmodal.page2.form.street")}
                  </FormLabel>
                  <FormControl className="border border-main-theme/50">
                    <Input {...field} aria-label="Street" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("booking.bookingmodal.page2.form.city")}
                  </FormLabel>
                  <FormControl className="border border-main-theme/50">
                    <Input {...field} aria-label="City" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 w-full md:w-max">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("booking.bookingmodal.page2.form.phone")}
                  </FormLabel>
                  <FormControl className="border border-main-theme/50">
                    <Input {...field} aria-label="Phone Number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {t("booking.bookingmodal.page2.form.country")}
                  </FormLabel>
                  <FormControl className="border border-main-theme/50">
                    <Input {...field} aria-label="Country" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="fullname"
            render={({ field }) => (
              <Textarea
                placeholder={t("booking.bookingmodal.page2.form.textarea")}
                className="border border-main-theme/50 my-10 w-full"
              />
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
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