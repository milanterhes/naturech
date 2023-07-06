import React from "react";
import Image from "next/image";
import { useState } from "react";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneArrowDownLeftIcon,
} from "@heroicons/react/24/outline";

interface FormState {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const initialFormState: FormState = {
  fullName: "",
  email: "",
  subject: "",
  message: "",
};

export const Contact = () => {
  const [formState, setFormState] = useState<FormState>(initialFormState);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <>
      <section className="flex flex-col items-center bg-gradient-to-b from-main-theme to-white pb-2 pt-20 drop-shadow-[0px_7px_2px_rgba(0,0,0,0.4)]">
        <div className="grid h-[30rem] w-11/12 grid-cols-5 gap-4">
          <div
            className="pb-full octagon relative w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/contactimg.webp')",
              backgroundPosition: "0 0",
            }}
          ></div>
          <div
            className="pb-full octagon relative w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/contactimg.webp')",
              backgroundPosition: "25% 0",
            }}
          ></div>
          <div
            className="pb-full octagon relative w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/contactimg.webp')",
              backgroundPosition: "50% 0",
            }}
          ></div>
          <div
            className="pb-full octagon relative w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/contactimg.webp')",
              backgroundPosition: "75% 0",
            }}
          ></div>
          <div
            className="pb-full octagon relative w-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/contactimg.webp')",
              backgroundPosition: "100% 0",
            }}
          ></div>
        </div>
        <div className="px-4 sm:px-6 lg:px-8 xl:px-10 2xl:px-14">
          <h3 className="mx-auto py-10 text-center text-2xl leading-normal tracking-wide text-black md:text-3xl lg:text-3xl xl:text-4xl 2xl:text-5xl">
            Örömmel várjuk, hogy meghallgassuk az Ön igényeit és elképzeléseit.
            A luxus szállásunkon a kiváló szolgáltatás és az egyéni odafigyelés
            a norma, és minden kérdésére, észrevételére vagy ajánlására
            nyitottak vagyunk. Forduljon hozzánk bizalommal.
          </h3>
        </div>
      </section>
      <section className="0 mt-10 flex flex-col border-b border-secondary-theme/30">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 px-4 md:px-0"
        >
          <span className="self-center rounded-full border-2 border-white px-8 py-1">
            1
          </span>
          <label className="flex w-full flex-col items-center">
            Ön neve
            <input
              type="text"
              name="fullName"
              value={formState.fullName}
              onChange={handleChange}
              placeholder="Írja le a teljes nevét"
              className="mx-auto w-full border-b-2 border-white bg-transparent text-center text-white placeholder:text-white placeholder:opacity-60 focus:outline-none md:w-2/3 lg:w-1/2"
            />
          </label>
          <span className="self-center rounded-full border-2 border-white px-8 py-1">
            2
          </span>
          <label className="flex flex-col items-center">
            Email címe
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder="Írja le az email címét"
              className="mx-auto w-full border-b-2 border-white bg-transparent text-center text-white placeholder:text-white placeholder:opacity-60 focus:outline-none md:w-2/3 lg:w-1/2"
            />
          </label>
          <span className="self-center rounded-full border-2 border-white px-8 py-1">
            3
          </span>
          <label className="flex flex-col items-center">
            Tárgy
            <input
              type="text"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              placeholder="Írja le az üzenet tárgyát"
              className="mx-auto w-full border-b-2 border-white bg-transparent text-center text-white placeholder:text-white placeholder:opacity-60 focus:outline-none md:w-2/3 lg:w-1/2"
            />
          </label>
          <span className="self-center rounded-full border-2 border-white px-8 py-1">
            4
          </span>
          <label className="flex flex-col items-center">
            Üzenet
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder="Írja le véleményét"
              rows={5}
              className="mx-auto w-full rounded-xl border-2 border-white bg-transparent text-center text-white placeholder:items-center placeholder:text-white placeholder:opacity-60 focus:outline-none md:w-2/3 lg:w-1/2"
            />
          </label>
        </form>
        <div className="my-20 flex flex-col items-center space-y-4 text-center md:space-y-8 lg:space-y-12">
          <div className="flex flex-col items-center space-y-2 md:space-y-4 lg:space-y-6">
            <MapPinIcon className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" />
            <p className="text-sm md:text-lg lg:text-xl">
              9400 Sopron, Kőhalom utca 40
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 md:space-y-4 lg:space-y-6">
            <EnvelopeIcon className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" />
            <p className="text-sm md:text-lg lg:text-xl">nc3houses@gmail.com</p>
          </div>
          <div className="flex flex-col items-center space-y-2 md:space-y-4 lg:space-y-6">
            <PhoneArrowDownLeftIcon className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10" />
            <p className="text-sm md:text-lg lg:text-xl">+36 70 392 8177</p>
          </div>
          <div className="text-sm md:text-lg lg:text-xl">
            Telefonos elérhetőség:
            <br />
            H-P 09:00 – 19:00
            <br />
            Sz-V 10:00 – 14:00
          </div>
          <div className="flex space-x-4 md:space-x-8 lg:space-x-10">
            <a
              href="https://www.instagram.com/your_page/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/instagram.svg"}
                alt="Link to our Instagram page"
                width={30}
                height={30}
                className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
              />
            </a>
            <a
              href="https://www.facebook.com/your_page/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/facebook.svg"}
                alt="Link to our Facebook page"
                width={30}
                height={30}
                className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
              />
            </a>
            <a
              href="https://www.tiktok.com/@your_page/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src={"/tiktok.svg"}
                alt="Link to our TikTok page"
                width={30}
                height={30}
                className="h-6 w-6 md:h-8 md:w-8 lg:h-10 lg:w-10"
              />
            </a>
          </div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.506748916146!2d16.590650315976607!3d47.681354979192455!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476aae84e8a6a1b7%3A0x400c4290c1e1160!2s9400%20Sopron%2C%20K%C5%91halom%20utca%2040%2C%20Hungary!5e0!3m2!1sen!2sus!4v1626096473969!5m2!1sen!2sus"
            width="600"
            height="450"
            loading="lazy"
            title="Google Maps - Sopron, Kőhalom utca 40"
            className="mt-4 w-full rounded-2xl border-4 border-secondary-theme/40 shadow-2xl shadow-black md:w-4/5 lg:w-3/4 xl:w-2/3 2xl:w-1/2"
          ></iframe>
        </div>
      </section>
    </>
  );
};
