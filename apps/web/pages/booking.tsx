import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { metaTagsData } from "../data/meta";

import { useEffect } from "react";
import { BookingMain } from "../components/Booking";
import { DateSelectorProvider } from "../components/DateSelector";
import { Footer, Navbar } from "../components/Home";

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  return {
    props: {
      locale,
      messages: (await import(`@naturechill/utils/dictionaries/${locale}.json`))
        .default,
    },
  };
};
interface BookingPageProps {
  locale: string;
}

const BookingPage: NextPage<BookingPageProps> = ({ locale }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <DateSelectorProvider>
      <Head>
        <title>{metaTagsData["booking"][locale].title}</title>
        <meta
          name="description"
          content={metaTagsData["booking"][locale].description}
        />
      </Head>
      <Navbar />
      <BookingMain />
      <Footer />
    </DateSelectorProvider>
  );
};

export default BookingPage;
