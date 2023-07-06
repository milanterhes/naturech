import type { GetStaticProps, NextPage } from "next";
import { Navbar, Footer } from "../components/Home";
import { GalleryIntro, GalleryGrid } from "../components/Gallery";

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
      <GalleryIntro />
      <GalleryGrid />
      <Footer />
    </>
  );
};

export default BookingPage;
