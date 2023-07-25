import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneArrowDownLeftIcon,
} from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

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
  const t = useTranslations();
  const [formState, setFormState] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      !formState.fullName ||
      !formState.email ||
      !formState.subject ||
      !formState.message
    ) {
      alert("All fields must be filled");
      return;
    }
    setIsSubmitting(true);
    console.log(formState);
    const res = await fetch("/api/sendcontact/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formState),
    });

    if (res.ok) {
      console.log("Email sent successfully");
      setIsSubmitting(false);
      setShowSuccess(true);
      setFormState(initialFormState);
    } else {
      console.log("Failed to send email");
      setIsSubmitting(false);
    }
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
            {t("contact.hero.title")}
          </h3>
        </div>
      </section>
      <section className="0 mt-10 flex flex-col">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 px-4 md:px-0"
        >
          <span className="self-center rounded-full border-2 border-white px-8 py-1">
            1
          </span>
          <label className="flex w-full flex-col items-center">
            {t("contact.form.name.title")}
            <input
              type="text"
              name="fullName"
              value={formState.fullName}
              onChange={handleChange}
              placeholder={t("contact.form.name.placeholder")}
              className="mx-auto w-full border-b-2 border-white bg-transparent text-center text-white placeholder:text-white placeholder:opacity-60 focus:outline-none md:w-2/3 lg:w-1/2"
            />
          </label>
          <span className="self-center rounded-full border-2 border-white px-8 py-1">
            2
          </span>
          <label className="flex flex-col items-center">
            {t("contact.form.email.title")}
            <input
              type="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              placeholder={t("contact.form.email.placeholder")}
              className="mx-auto w-full border-b-2 border-white bg-transparent text-center text-white placeholder:text-white placeholder:opacity-60 focus:outline-none md:w-2/3 lg:w-1/2"
            />
          </label>
          <span className="self-center rounded-full border-2 border-white px-8 py-1">
            3
          </span>
          <label className="flex flex-col items-center">
            {t("contact.form.subject.title")}
            <input
              type="text"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              placeholder={t("contact.form.subject.placeholder")}
              className="mx-auto w-full border-b-2 border-white bg-transparent text-center text-white placeholder:text-white placeholder:opacity-60 focus:outline-none md:w-2/3 lg:w-1/2"
            />
          </label>
          <span className="self-center rounded-full border-2 border-white px-8 py-1">
            4
          </span>
          <label className="flex flex-col items-center">
            {t("contact.form.textbox.title")}
            <textarea
              name="message"
              value={formState.message}
              onChange={handleChange}
              placeholder={t("contact.form.textbox.placeholder")}
              rows={5}
              className="mx-auto w-full rounded-xl border-2 border-white bg-transparent text-center text-white placeholder:items-center placeholder:text-white placeholder:opacity-60 focus:outline-none md:w-2/3 lg:w-1/2"
            />
          </label>
          {showSuccess && (
            <div
              className="
      fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-70 flex flex-col items-center justify-center text-center text-white text-2xl z-50
    "
              onClick={() => setShowSuccess(false)}
            >
              <CheckCircleIcon className="h-16 w-16 text-green-500" />
              {t("contact.form.submitmessage.title")}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className="text-md w-full transform self-center rounded-full bg-white bg-opacity-70 px-2 py-2 text-secondary-theme transition duration-500 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-secondary-theme active:bg-secondary-theme active:text-white sm:w-2/3 sm:text-lg md:w-1/2 md:text-xl lg:w-1/3 lg:text-2xl xl:text-3xl 2xl:text-4xl"
          >
            {isSubmitting ? (
              <svg
                aria-hidden="true"
                role="status"
                className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="#DDA771"
                />
              </svg>
            ) : (
              t("contact.form.button.title")
            )}
          </button>
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
            {t("contact.form.available.title")}
            <br />
            {t("contact.form.available.week")}
            <br />
            {t("contact.form.available.weekend")}
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
