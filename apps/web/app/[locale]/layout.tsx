import "ui/styles.css";
import { Bowlby_One_SC, Roboto_Mono } from "next/font/google";
import { Locale, i18n } from "../../i18n-config";

const bowlby = Bowlby_One_SC({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bowlby",
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: Locale };
}) {
  console.log("layout", params);
  return (
    <html
      lang={params.locale}
      className={`${bowlby.variable} ${robotoMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
