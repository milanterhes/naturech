import { GetStaticProps, NextPage } from "next";
import { Hero, Intro, Navbar, Services } from "../components/Home";
import Calendar from "../components/Calendar";

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  return {
    props: {
      messages: (await import(`../dictionaries/${locale}.json`)).default,
    },
  };
};

const HomePage: NextPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Calendar />
      <Intro />
      <Services />
    </>
  );
};

export default HomePage;
