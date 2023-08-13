import { Button } from "@react-email/button";
import { Img } from "@react-email/img";
import { Tailwind as TailwindComponent } from "@react-email/tailwind";
import React, { PropsWithChildren } from "react";
import { createTranslator } from "use-intl";
import en from "@naturechill/utils/dictionaries/en.json";
import de from "@naturechill/utils/dictionaries/de.json";
import hu from "@naturechill/utils/dictionaries/hu.json";

interface LogoProps {
  logo: string;
}

type Locales = "en" | "de" | "hu";

const msgs = {
  en: en,
  de: de,
  hu: hu,
};

export interface LoginEmailProps extends LogoProps {
  link: string;
  locale: Locales;
}

const Logo: React.FC<LogoProps> = ({ logo }) => {
  return (
    <div className="w-full flex justify-center mb-4">
      <Img src={logo} alt="logo" className="max-h-36" />
    </div>
  );
};

interface WrapperProps extends LogoProps {
  locale: Locales;
}

const Wrapper: React.FC<PropsWithChildren<WrapperProps>> = ({
  children,
  logo,
  locale,
}) => {
  return (
    <TailwindComponent
      config={{
        theme: {
          extend: {
            colors: {
              "main-theme": "#DDA771",
            },
            dropShadow: {
              highlight: "0px 0px 20px rgba(255,255,255,0.60)",
            },
          },
        },
      }}
    >
      <div className="bg-main-theme p-6 max-w-md mx-auto rounded-lg shadow-xl overflow-hidden space-y-10">
        <Logo logo={logo} />
        {children}
      </div>
    </TailwindComponent>
  );
};

export const LoginEmail = ({ link, logo, locale }: LoginEmailProps) => {
  const t = createTranslator({
    locale,
    messages: msgs[locale],
  });
  return (
    <Wrapper logo={logo} locale={locale}>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-white">
          {t("email.login.subject")}
        </h1>
        <p className="text-white">{t("email.login.content")}</p>
        <Button
          href={link}
          className="px-8 py-3 font-semibold rounded-xl bg-white text-main-theme shadow-highlight"
        >
          {t("email.login.button")}
        </Button>
      </div>
    </Wrapper>
  );
};

export interface BookingConfirmationEmailProps extends LogoProps {
  intro: string;
  salutation: string;
  description: string;
  bookingId: string;
  timePeriod: string;
  paymentType: string;
  locale: Locales;
}

export const BookingConfirmationEmail = ({
  intro,
  salutation,
  description,
  bookingId,
  timePeriod,
  paymentType,
  logo,
  locale,
}: BookingConfirmationEmailProps) => {
  return (
    <Wrapper logo={logo} locale={locale}>
      <h1 className="text-3xl font-bold text-white mb-4">{intro}</h1>
      <p className="text-white my-2">{salutation}</p>
      <p className="text-white my-2">{description}</p>
      <h3 className="text-white my-2 text-xl">{bookingId}</h3>
      <p className="text-white my-2">{timePeriod}</p>
      <p className="text-white my-2">{paymentType}</p>
    </Wrapper>
  );
};
