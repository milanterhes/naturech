import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { metaTagsData } from "../data/meta";
import { Navbar, Footer } from "../components/Home";
import { GalleryIntro, GalleryGrid } from "../components/Gallery";
import { useEffect } from "react";
import Image from "next/image";

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

interface GalleryPageProps {
  locale: string;
}

const GalleryPage: NextPage<GalleryPageProps> = ({ locale }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Head>
        <title>{metaTagsData["gallery"][locale].title}</title>
        <meta
          name="description"
          content={metaTagsData["gallery"][locale].description}
        />
      </Head>
      <div
        style={{
          position: "absolute",
          height: "100vh",
          width: "100%",
          clipPath: "inset(0 0 0 0)",
        }}
      >
        <div
          style={{
            position: "fixed",
            height: "100%",
            width: "100%",
            left: "0",
            top: "0",
          }}
        >
          <Image
            src={"/gallerysmallscreen.webp"}
            fill
            alt="Our Gallery Page"
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </div>

      <Navbar />
      <GalleryIntro />
      <GalleryGrid />
      <Footer />
    </>
  );
};

export default GalleryPage;
