import type { GetStaticProps, NextPage } from "next";
import { Navbar, Footer } from "../components/Home";
import { GalleryIntro, GalleryGrid } from "../components/Gallery";
import { useEffect } from "react";

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
    <>
      <Navbar />
      <GalleryIntro />
      <GalleryGrid />
      <Footer />
    </>
  );
};

export default BookingPage;
