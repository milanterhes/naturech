import { GetStaticProps, NextPage } from "next";
import { BookingMain } from "../components/Booking";
import { Footer, Navbar } from "../components/Home";
import { useState } from "react";

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  return {
    props: {
      messages: (await import(`../dictionaries/${locale}.json`)).default,
    },
  };
};

const BookingPage: NextPage = () => {

  return (
    <>
      <Navbar />
      <BookingMain />
      <Footer />
    </>
  );
};

export default BookingPage;
