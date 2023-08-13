import { GetStaticProps, NextPage } from "next";
import { useEffect } from "react";
import { BookingMain } from "../components/Booking";
import { DateSelectorProvider } from "../components/DateSelector";
import { Footer, Navbar } from "../components/Home";

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  return {
    props: {
      messages: (await import(`@naturechill/utils/dictionaries/${locale}.json`))
        .default,
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
