import React from "react";
import { Button } from "@react-email/button";
import { Tailwind } from "@react-email/tailwind";

export interface LoginEmailProps {
  link: string;
  intro: string;
  content: string;
  button: string;
  lang: "en" | "de" | "hu";
}

export const LoginEmail = ({
  button,
  content,
  intro,
  link,
  lang,
}: LoginEmailProps) => {
  return (
    <Tailwind
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
      <div className="bg-main-theme p-6 max-w-md mx-auto rounded-lg shadow-xl overflow-hidden text-center space-y-10">
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

export interface BookingConfirmationEmailProps {
  link: string;
  intro: string;
  bookingDetails: string;
  button: string;
  lang: "en" | "de" | "hu";
}

export const BookingConfirmationEmail = ({
  button,
  bookingDetails,
  intro,
  link,
  lang,
}: BookingConfirmationEmailProps) => {
  return (
    <Tailwind
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
      <div className="bg-main-theme p-6 max-w-md mx-auto rounded-lg shadow-xl overflow-hidden text-center space-y-10">
        <h1 className="text-3xl font-bold text-white">{intro}</h1>
        <p className="text-white">{bookingDetails}</p>
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
