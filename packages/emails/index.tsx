import React, { PropsWithChildren } from "react";
import { Button } from "@react-email/button";
import { Img } from "@react-email/img";
import { Tailwind as TailwindComponent } from "@react-email/tailwind";

interface LogoProps {
  logo: string;
}

export interface LoginEmailProps extends LogoProps {
  link: string;
  intro: string;
  content: string;
  button: string;
  lang: "en" | "de" | "hu";
}

const Logo: React.FC<LogoProps> = ({ logo }) => {
  return (
    <div className="w-full flex justify-center mb-4">
      <Img src={logo} alt="logo" className="max-h-36" />
    </div>
  );
};

const Tailwind: React.FC<PropsWithChildren<LogoProps>> = ({
  children,
  logo,
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

export const LoginEmail = ({
  button,
  content,
  intro,
  link,
  logo,
}: LoginEmailProps) => {
  return (
    <Tailwind logo={logo}>
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold text-white">{intro}</h1>
        <p className="text-white">{content}</p>
        <Button
          href={link}
          className="px-8 py-3 font-semibold rounded-xl bg-white text-main-theme shadow-highlight"
        >
          {button}
        </Button>
      </div>
    </Tailwind>
  );
};

export interface BookingConfirmationEmailProps extends LogoProps {
  intro: string;
  salutation: string;
  description: string;
  bookingId: string;
  timePeriod: string;
  paymentType: string;
}

export const BookingConfirmationEmail = ({
  intro,
  salutation,
  description,
  bookingId,
  timePeriod,
  paymentType,
  logo,
}: BookingConfirmationEmailProps) => {
  return (
    <Tailwind logo={logo}>
      <h1 className="text-3xl font-bold text-white mb-4">{intro}</h1>
      <p className="text-white my-2">{salutation}</p>
      <p className="text-white my-2">{description}</p>
      <h3 className="text-white my-2 text-xl">{bookingId}</h3>
      <p className="text-white my-2">{timePeriod}</p>
      <p className="text-white my-2">{paymentType}</p>
    </Tailwind>
  );
};
