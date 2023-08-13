import { GetStaticProps, NextPage } from "next";
import { Navbar } from "../components/Home";

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context.locale === "default" ? "de" : context.locale;
  return {
    props: {
      messages: (await import(`@naturechill/utils/dictionaries/${locale}.json`))
        .default,
    },
  };
};

const LoginInfo: NextPage = () => {
  return (
    <div>
      <Navbar />
      <p>Sent an email with the login link</p>
    </div>
  );
};

export default LoginInfo;
