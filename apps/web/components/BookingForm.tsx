import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { Checkbox } from "../components/ui/checkbox";
import Link from "next/link";
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

const formSchema = z.object({
  guests: z.string({
    required_error: "Nincs kiválasztva a vendégek száma.",
  }),
  house_number_1: z.boolean().default(false),
});

interface ProfileFormProps {
  startDate: Date;
  endDate: Date;
  showModalPage: boolean;
  setShowModalPage: React.Dispatch<React.SetStateAction<boolean>>;
  onNextPage: () => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  startDate,
  endDate,
  showModalPage,
  setShowModalPage,
  onNextPage,
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { house_number_1: true },
  });

  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    console.log(values);
    const isValid = await form.trigger();

    if (isValid) {
      onNextPage();
    }

    setIsLoading(false);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 rounded-xl bg-white p-4 text-black drop-shadow-[0px_5px_2px_rgba(0,0,0,0.4)] backdrop-blur-[2px] backdrop-filter sm:space-y-5 sm:p-6"
      >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div className="flex items-center justify-between rounded-md bg-gray-100 p-3">
            <p className="mr-1 font-semibold">Érkezés:</p>
            <p>{startDate.toLocaleDateString()}</p>
          </div>
          <div className="flex items-center justify-between rounded-md bg-gray-100 p-3">
            <p className="mr-1 font-semibold">Távozás:</p>
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
            Nature & Chill Luxus faházak
          </h2>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Válasszon faházat</TableHead>
                <TableHead>Ár</TableHead>
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
                          <FormLabel>Luxus Faház, Fakopáncs</FormLabel>
                          <FormDescription>
                            Maximum 3 Főre foglalható(2 felnőtt, 1 gyerek)
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
                            <SelectTrigger>
                              <SelectValue placeholder="Válassza ki a vendégek számát" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">1 Fő (felnőtt)</SelectItem>
                            <SelectItem value="2">2 Fő (felnőtt)</SelectItem>
                            <SelectItem value="3">
                              3 Fő (felnőtt + gyerek)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div className="mt-4 flex flex-col justify-between space-y-4 sm:mt-6 sm:flex-row sm:space-y-0">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              onClick={() => setShowModalPage(!showModalPage)}
            >
              Vissza
            </Button>
            <Button
              type="submit"
              className="w-full bg-main-theme text-white sm:w-auto"
            >
              Tovább
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
  terms: z.boolean().refine(value => value === true, {
    message: "You must accept the terms and conditions.",
  }),
});

export const ProfileFormPage2 = ({ startDate, endDate }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const form = useForm<z.infer<typeof formSchemaPage2>>({
    resolver: zodResolver(formSchemaPage2),
    defaultValues: {},
  });

  async function onSubmitPage2(values: z.infer<typeof formSchemaPage2>) {
    setIsLoading(true);
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

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
        className="space-y-4 rounded-xl bg-white p-4 text-black drop-shadow-[0px_5px_2px_rgba(0,0,0,0.4)] backdrop-blur-[2px] backdrop-filter sm:space-y-5 sm:p-6"
      >
        {" "}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
          <div className="flex items-center justify-between rounded-md bg-gray-100 p-3">
            <p className="mr-1 font-semibold">Érkezés:</p>
            <p>{startDate.toLocaleDateString()}</p>
          </div>
          <div className="flex items-center justify-between rounded-md bg-gray-100 p-3">
            <p className="mr-1 font-semibold">Távozás:</p>
            <p>{endDate.toLocaleDateString()}</p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <div className="flex flex-col rounded-md bg-gray-100 p-3">
            <h2>Választott ház:</h2>
            <span>Fakopáncs</span>
          </div>
          <div className="flex flex-col rounded-md bg-gray-100 p-3">
            <h2>Ár</h2>
            <span>120.000 Ft</span>
          </div>
          <div className="flex flex-col rounded-md bg-gray-100 p-3">
            <h2>Vendégek száma:</h2>
            <span>3</span>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Teljes Név</FormLabel>
                  <FormControl>
                    <Input placeholder="Ön teljes neve" {...field} />
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
                  <FormLabel>Email cím</FormLabel>
                  <FormControl>
                    <Input placeholder="Ön e-mail címe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Utca, házszám</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Város</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefonszám</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
                  <FormLabel>Ország</FormLabel>
                  <FormControl>
                    <Input {...field} />
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
              <Textarea placeholder="Type your message here." />
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" aria-label="Accept terms and conditions" checked={field.value} 
        onCheckedChange={(checked) => field.onChange(checked === true)} />
                <label
                  htmlFor="terms"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Accept terms and conditions
                </label>
              </div>
            )}
          />
          <FormMessage>{form.formState.errors.terms?.message}</FormMessage>
        </div>
        <div className="mt-4 flex flex-col justify-between space-y-4 sm:mt-6 sm:flex-row sm:space-y-0">
          <Button type="submit" className="w-full sm:w-auto">
            Vissza
          </Button>
          <Button
            type="submit"
            className="w-full bg-main-theme text-white sm:w-auto"
            disabled={!form.formState.isValid || isLoading}
          >
            {isLoading ? "Loading..." : "Tovább"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
