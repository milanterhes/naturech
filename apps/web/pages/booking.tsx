import { GetStaticProps, NextPage } from "next";
import { BookingMain } from "../components/Booking";
import { Footer, Navbar } from "../components/Home";
import { useState, useEffect } from "react";
import { DatePickerWithRange } from "../components/Calendar";
import { ProfileForm, ProfileFormPage2 } from "../components/BookingForm";
import {
  DateSelectorProvider,
  useDateSelector,
} from "../components/DateSelector";

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  return {
    props: {
      messages: (await import(`../dictionaries/${locale}.json`)).default,
    },
  };
};

const BookingPage: NextPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DateSelectorProvider>
      <Navbar />
      <BookingMain />
      <Footer />
    </DateSelectorProvider>
  );
};

export default BookingPage;
