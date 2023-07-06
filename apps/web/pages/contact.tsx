import type { GetStaticProps, NextPage } from "next";
import { Navbar, Footer } from "../components/Home";
import { Contact } from "../components/Contact";

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  return {
    props: {
      messages: (await import(`../dictionaries/${locale}.json`)).default,
    },
  };
};

const ContactPage: NextPage = () => {
  return (
    <>
      <Navbar />
      <Contact />
      <Footer />
    </>
  );
};

export default ContactPage;
