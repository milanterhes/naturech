import { GetStaticProps, NextPage } from "next";
import { Hero, Intro, Navbar } from "../components/Home";

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      // You can get the messages from anywhere you like. The recommended pattern
      // is to put them in JSON files separated by locale (e.g. `en.json`).
      messages: (await import(`../dictionaries/${context.locale}.json`))
        .default,
    },
  };
};

const HomePage: NextPage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Intro />
    </>
  );
};

export default HomePage;
