import React from "react";
import { Button } from "@react-email/button";
import { Tailwind } from "@react-email/tailwind";
import { Html } from "@react-email/html";

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
      <div className="bg-main-theme">
        <h1>{intro}</h1>
        <p>{content}</p>
        <Button
          href={link}
          className="px-3 py-2 text-white bg-black rounded-xl shadow-highlight"
        >
          {button}
        </Button>
      </div>
    </Tailwind>
  );
};
