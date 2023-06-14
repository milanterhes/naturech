import React from "react";
import { Button } from "@react-email/button";
import { Tailwind } from "@react-email/tailwind";

export interface LoginEmailProps {
  link: string;
  intro: string;
  content: string;
  button: string;
}

export const LoginEmail = ({
  button,
  content,
  intro,
  link,
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
      <h1>{intro}</h1>
      <p>{content}</p>
      <Button
        href={link}
        className="bg-brand px-3 py-2 font-medium leading-4 text-white"
      >
        {button}
      </Button>
    </Tailwind>
  );
};
