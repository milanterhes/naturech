import { GetStaticProps, NextPage } from "next";
import {
  Footer,
  Gallery,
  Hero,
  Intro,
  Navbar,
  ReviewsContainer,
  Services,
} from "../components/Home";
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
      <Intro />
      <Services />
      <Gallery />
      <ReviewsContainer />
      <Footer />
    </>
  );
};

export default HomePage;
