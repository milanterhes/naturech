import { GetStaticProps, NextPage } from "next";
import { Navbar, Footer } from "../components/Home";
import { BookingIntro } from "../components/Booking";

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
      <BookingIntro />
      <Footer />
    </>
  );
};

export default BookingPage;
