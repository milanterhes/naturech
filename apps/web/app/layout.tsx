import "ui/styles.css";
import { Bowlby_One_SC } from "next/font/google";

const bowlby = Bowlby_One_SC({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-bowlby",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${bowlby.variable}`}>
      <body>{children}</body>
    </html>
  );
}
