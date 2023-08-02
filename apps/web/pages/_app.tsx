import "ui/styles.css";
import { Bowlby_One_SC, Roboto_Mono, Tangerine } from "next/font/google";
import { NextIntlProvider } from "next-intl";
import { trpc } from "../utils/trpc";
import { AuthContextProvider } from "../components/Auth";
import "react-calendar/dist/Calendar.css";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Image from "next/image";
import logoPic from "../public/naturechill-logo.png";

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

const tangerine = Tangerine({
  variable: "--font-tangerine",
  weight: ["400", "700"],
  subsets: ["latin"],
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pageKey = router.asPath;
  return (
    <NextIntlProvider messages={pageProps.messages} locale={pageProps.locale}>
      <AuthContextProvider>
        <main
          className={`${bowlby.variable} ${robotoMono.variable} ${tangerine.variable} bg-main-theme text-white`}
        >
          <AnimatePresence initial={false} mode="wait">
            <motion.div
              key={router.route}
              initial="initialState"
              animate="animateState"
              exit="exitState"
              transition={{
                duration: 0.85,
                ease: [0.23, 1, 0.32, 1],
              }}
              variants={{
                initialState: {
                  opacity: 0,
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                },
                animateState: {
                  opacity: 1,
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)",
                },
                exitState: {
                  clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)",
                },
              }}
              className="w-full min-h-screen"
            >
              <Component {...pageProps} key={pageKey} />
            </motion.div>
          </AnimatePresence>
        </main>
      </AuthContextProvider>
    </NextIntlProvider>
  );
}

export default trpc.withTRPC(MyApp);
