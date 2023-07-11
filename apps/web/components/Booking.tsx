import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import faq from "../data/faq";
import guestInfo from "../data/guestInfo";
import services from "../data/services";
import bookingherobg from "../public/bookingherobg.webp";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";
import { FC } from "react";

type IconTextProps = {
  imgSrc: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  title: string;
  subtitle: string;
  onClick?: () => void;
};

const IconText: React.FC<IconTextProps> = ({
  imgSrc,
  imgAlt,
  imgWidth,
  imgHeight,
  title,
  subtitle,
  onClick,
}) => {
  return (
    <div className="relative flex items-center space-x-1" onClick={onClick}>
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={imgWidth}
        height={imgHeight}
        className="h-6 w-6 cursor-pointer self-start md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12"
      />

      <div className="flex h-full flex-col">
        <h3 className="text-xs font-bold sm:text-lg md:text-xl xl:text-2xl">
          {title}
        </h3>
        <small className="md:text-md text-[0.5rem] sm:text-sm xl:text-lg">
          {subtitle}
        </small>
      </div>
    </div>
  );
};

interface BookingMainProps {
  startDate: Date;
  endDate: Date;
  onIconTextClick: () => void;
  isDateSelected: boolean;
  setIsDateSelected: React.Dispatch<React.SetStateAction<boolean>>;
  showModalPage: boolean;
  setShowModalPage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const BookingMain: FC<BookingMainProps> = ({
  startDate,
  endDate,
  onIconTextClick,
  isDateSelected,
  setIsDateSelected,
  showModalPage,
  setShowModalPage
}) => {
  const t = useTranslations();
  return (
    <div className="relative flex flex-col items-center bg-[url('/bookingbg.webp')] bg-cover bg-top pt-[80px]">
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      <div className="relative flex h-[35vh] w-11/12 justify-center sm:h-[40vh] md:h-[60vh] 2xl:h-[80vh]">
        <Image
          src={bookingherobg}
          alt="Book Termin Now"
          fill
          className="rounded-xl object-cover drop-shadow-[0px_7px_2px_rgba(0,0,0,0.4)]"
        />
        <div className="absolute inset-0 rounded-xl bg-black bg-opacity-40" />
        <header className="absolute inset-0 flex flex-col items-start px-5 py-5 text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
          <h1>{t("booking.intro.header1")},</h1>
          <h2>{t("booking.intro.header2")},</h2>
          <h2>{t("booking.intro.header3")}</h2>
        </header>
        <section className="absolute bottom-0 flex h-32 w-4/6 translate-y-[15%] transform flex-col items-center justify-around rounded-xl border border-b-[#E7B181]/50 border-l-[#E7B181]/50 border-r-[#FFFFFF]/75 border-t-[#FFFFFF]/75 bg-gradient-opacity px-2 drop-shadow-[0px_5px_2px_rgba(0,0,0,0.4)] backdrop-blur-[2px] backdrop-filter sm:h-44 sm:w-3/6 md:h-64 xl:w-2/6 2xl:h-80">
          <div className="flex w-full justify-around gap-4 sm:justify-center md:gap-3">
            <IconText
              imgSrc={"/arrivalicon.svg"}
              imgAlt={"Arrival Date Icon"}
              imgWidth={50}
              imgHeight={50}
              title={t("booking.introcard.arrival.title")}
              subtitle={
                isDateSelected
                  ? startDate.toLocaleDateString()
                  : t("booking.introcard.arrival.detail")
              }
              onClick={onIconTextClick}
            />
            <IconText
              imgSrc={"/arrivalicon.svg"}
              imgAlt={"Departure Date Icon"}
              imgWidth={50}
              imgHeight={50}
              title={t("booking.introcard.departure.title")}
              subtitle={
                isDateSelected
                  ? endDate.toLocaleDateString()
                  : t("booking.introcard.arrival.detail")
              }
              onClick={onIconTextClick}
            />
          </div>
          <button aria-label="Search Dates" onClick={() => setShowModalPage(true)}>
            <MagnifyingGlassCircleIcon className="h-10 w-10 sm:h-16 sm:w-16 md:h-20 md:w-20" />
          </button>
        </section>
      </div>

      <BookingInfo />
    </div>
  );
};

export const BookingInfo: React.FC = ({}) => {
  const t = useTranslations() as any;
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

  const openServiceModal = () => {
    setIsServiceModalOpen(true);
  };

  const openFaqModal = () => {
    setIsFaqModalOpen(true);
  };

  return (
    <section className="relative flex w-full flex-col items-center gap-10 pb-32">
      <div className="mt-24 flex flex-col justify-center text-center text-4xl">
        <h2>{t("booking.info.title1")}</h2>
        <h2>{t("booking.info.title2")}</h2>
      </div>
      <div className="flex h-full w-11/12 max-w-3xl flex-col items-center justify-between gap-5 rounded-lg border-2 px-4 py-3 sm:w-5/6 md:w-4/6 md:px-10 md:py-6 2xl:max-w-5xl">
        <ul className="items-around items-between flex list-none flex-col space-y-5 pl-0">
          <li className="flex w-full flex-col items-start justify-between gap-2 min-[372px]:flex-row sm:flex-row sm:items-center md:gap-4">
            <p className="text-lg lg:text-xl xl:text-2xl">
              {t("booking.info.availability.days.fourdays")}
            </p>
            <span className="text-lg font-semibold lg:text-xl xl:text-2xl">
              {t("booking.info.availability.price.fourdays")}
            </span>
          </li>
          <li className="flex w-full flex-col items-start justify-between gap-2 min-[372px]:flex-row sm:flex-row sm:items-center md:gap-4">
            <p className="text-lg lg:text-xl xl:text-2xl">
              {t("booking.info.availability.days.weekend")}
            </p>
            <span className="text-lg font-semibold lg:text-xl xl:text-2xl">
              {t("booking.info.availability.price.weekend")}
            </span>
          </li>
          <li className="flex w-full flex-col items-start justify-between gap-2 min-[372px]:flex-row sm:flex-row sm:items-center md:gap-4">
            <p className="text-lg lg:text-xl xl:text-2xl">
              {t("booking.info.availability.days.specialdays")}
            </p>
            <span className="text-lg font-semibold lg:text-xl xl:text-2xl">
              {t("booking.info.availability.price.specialdays")}
            </span>
          </li>
        </ul>
        <div className="text-center text-sm md:text-base lg:text-lg xl:text-xl">
          {t("booking.info.availability.priceinfo")}
        </div>
      </div>
      <div className="flex h-full w-11/12 max-w-3xl flex-col items-center justify-between gap-5 rounded-lg border-2 px-4 py-3 sm:w-5/6 md:w-4/6 md:px-10 md:py-6 2xl:max-w-5xl">
        <h3 className="py-2 text-xl font-semibold md:text-2xl 2xl:text-3xl">
          {t("booking.info.services.card.title")}
        </h3>
        {services.map((row, rowIndex) => (
          <section key={rowIndex} className="flex w-full justify-around">
            {row.map((service, index) => (
              <Image
                key={index}
                src={service.icon}
                alt={t(service.alt)}
                width={50}
                height={50}
                className="lg:h-18 lg:w-18 h-8 w-8 md:h-12 md:w-12"
              />
            ))}
          </section>
        ))}
        <button
          type="button"
          onClick={openServiceModal}
          className="hover:scale-102 group flex transform font-roboto-mono transition-all duration-200 ease-in"
        >
          <Image
            src={"/bngdetailico.svg"}
            alt="Footer Arrow Icon"
            width={35}
            height={35}
            className="mx-1 transform self-center transition-all duration-200 ease-in group-hover:translate-x-1"
          />
          {t("booking.info.services.card.button")}
        </button>
        {isServiceModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
            onClick={(e) =>
              e.target === e.currentTarget && setIsServiceModalOpen(false)
            }
          >
            <div className="flex h-4/6 w-11/12 flex-col overflow-auto rounded-lg bg-white p-4 text-black sm:w-3/4 lg:w-1/2">
              <h2 className="mb-4 text-3xl font-semibold md:text-5xl 2xl:text-6xl">
                {t("booking.info.services.card.title")}
              </h2>
              <ul>
                {services.flat().map((service, index) => (
                  <li
                    key={index}
                    className="mb-2 text-xs md:text-sm 2xl:text-lg"
                  >
                    <h3 className="font-bold">{t(service.alt)}</h3>
                    <p>{t(service.info)}</p>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setIsServiceModalOpen(false)}
                className="mb-4 mt-auto inline-block rounded-md bg-main-theme px-3 py-2 text-sm text-white hover:bg-secondary-theme sm:text-base"
              >
                {t("booking.info.services.popup.popupclosebutton")}
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex w-full flex-col items-center bg-black bg-opacity-20 backdrop-blur-[2px]">
        <h3 className="py-2 text-3xl font-semibold md:text-4xl 2xl:text-5xl">
          {t("booking.info.important.title")}
        </h3>
        <ul className="my-5 flex h-full w-11/12 flex-col items-center space-y-5 text-center text-sm sm:w-5/6 sm:text-base md:w-4/6 md:text-lg lg:text-xl xl:text-2xl">
          {guestInfo.map((info, index) => (
            <li
              key={index}
              className={
                index !== guestInfo.length - 1
                  ? "relative before:absolute before:-bottom-5 before:left-1/2 before:block before:-translate-x-1/2 before:transform before:content-['.']"
                  : ""
              }
            >
              {t(info)}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex h-full w-11/12 max-w-3xl flex-col items-center justify-between gap-5 rounded-lg border-2 px-4 py-3 sm:w-5/6 md:w-4/6 md:px-10 md:py-6 2xl:max-w-5xl">
        <h3 className="pt-2 text-xl font-semibold md:text-2xl 2xl:text-3xl">
          {t("booking.info.faq.title")}
        </h3>
        <ul className="my-5 flex h-full w-11/12 flex-col items-center space-y-5 text-center text-sm sm:w-5/6 sm:text-base md:w-4/6 md:text-lg lg:text-xl xl:text-2xl">
          <li>{t("booking.info.faq.titlequestions.q1")}</li>
          <li>{t("booking.info.faq.titlequestions.q2")}</li>
          <li>{t("booking.info.faq.titlequestions.q3")}</li>
          <li className="tracking-widest">...</li>
        </ul>
        <button onClick={openFaqModal}>
          <Image
            src={"/servicearrow.svg"}
            alt="Arrow Icon Faq"
            width={30}
            height={30}
            className={`h-6 w-6 transition-all duration-300 ease-in hover:rotate-180 md:h-8 md:w-8 lg:h-12 lg:w-12 ${
              isFaqModalOpen ? "rotate-180" : ""
            } cursor-pointer`}
          />
        </button>
        {isFaqModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-40"
            onClick={(e) =>
              e.target === e.currentTarget && setIsFaqModalOpen(false)
            }
          >
            <div className="flex h-4/6 w-11/12 flex-col overflow-auto rounded-lg bg-white p-4 text-black sm:w-3/4 lg:w-1/2">
              <h2 className="mb-4 text-3xl font-semibold md:text-5xl 2xl:text-6xl">
                {t("booking.info.faq.title")}
              </h2>
              <ul>
                {faq.map((item, index) => (
                  <li
                    key={index}
                    className="mb-2 text-xs md:text-sm 2xl:text-lg"
                  >
                    <h3 className="font-bold">{t(item.question)}</h3>
                    <p>{t(item.answer)}</p>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setIsFaqModalOpen(false)}
                className="mb-4 mt-auto inline-block rounded-md bg-main-theme px-3 py-2 text-sm text-white hover:bg-secondary-theme sm:text-base"
              >
                {t("booking.info.services.popup.popupclosebutton")}
              </button>
            </div>
          </div>
        )}
      </div>
      <h3 className="text-xl font-semibold md:text-2xl 2xl:text-3xl">
        {t("booking.info.help.title")}
      </h3>
      <button
        className="md:text-md group flex transform rounded-md bg-[#E7B181] px-2 py-2 text-xs transition-transform duration-500 ease-in-out hover:scale-105 sm:text-sm lg:text-lg xl:text-2xl 2xl:text-3xl"
        aria-label="Book Now"
      >
        {t("booking.info.help.button")}
        <Image
          src={"/HeroButtonArrow.svg"}
          alt="Contact us now"
          width={12}
          height={12}
          className="ml-2 mt-0.5 h-3 h-3 w-3 w-3 transform self-center transition-transform duration-500 ease-in-out group-hover:translate-x-1 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7"
        />
      </button>
    </section>
  );
};
