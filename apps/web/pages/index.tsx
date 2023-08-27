import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { metaTagsData } from "../data/meta";
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
      locale,
      messages: (await import(`@naturechill/utils/dictionaries/${locale}.json`))
        .default,
    },
  };
};
interface HomePageProps {
  locale: string;
}

const HomePage: NextPage<HomePageProps> = ({ locale }) => {
  return (
    <>
      <Head>
        <title>{metaTagsData["home"][locale].title}</title>
        <meta
          name="description"
          content={metaTagsData["home"][locale].description}
        />
      </Head>
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
