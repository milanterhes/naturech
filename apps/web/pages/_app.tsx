import "ui/styles.css";
import { Bowlby_One_SC, Roboto_Mono } from "next/font/google";
import { NextIntlProvider } from "next-intl";

const bowlby = Bowlby_One_SC({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bowlby",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  weight: ["400"],
  subsets: ["latin"],
});

export default function MyApp({ Component, pageProps }) {
  return (
    <NextIntlProvider messages={pageProps.messages} locale={pageProps.locale}>
      <main
        className={`${bowlby.variable} ${robotoMono.variable} bg-main-theme text-white`}
      >
        <Component {...pageProps} />
      </main>
    </NextIntlProvider>
  );
}
