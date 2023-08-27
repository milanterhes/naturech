import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { metaTagsData } from "../data/meta";
import { Navbar, Footer } from "../components/Home";
import { Contact } from "../components/Contact";
import { useEffect } from "react";

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

interface ContactPageProps {
  locale: string;
}

const ContactPage: NextPage<ContactPageProps> = ({ locale }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Head>
        <title>{metaTagsData["contact"][locale].title}</title>
        <meta
          name="description"
          content={metaTagsData["contact"][locale].description}
        />
      </Head>
      <Navbar />
      <Contact />
      <Footer />
    </>
  );
};

export default ContactPage;
