import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState, useCallback } from "react";
import Link from "next/link";
import faq from "../data/faq";
import guestInfo from "../data/guestInfo";
import services from "../data/services";
import bookingherobg from "../public/bookingherobg.webp";
import { FC } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { AnimatePresence, motion } from "framer-motion";
import { useDateSelector } from "./DateSelector";
import { DatePickerWithRange } from "./Calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { ProfileForm, ProfileFormPage2 } from "./BookingForm";

type IconTextProps = {
  imgWidth: number;
  imgHeight: number;
  title: string;
  subtitle: string;
  d: string;
  pathLength?: number;
};

const IconText: React.FC<IconTextProps> = ({
  d,
  pathLength,
  imgWidth,
  imgHeight,
  title,
  subtitle,
}) => {
  return (
    <div className="relative flex space-x-1">
      <svg
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        width={imgWidth}
        height={imgHeight}
        className="h-6 w-6 self-start md:h-8 md:w-8 lg:h-10 lg:w-10 xl:h-12 xl:w-12"
      >
        <path
          d={d}
          stroke="#E7B181"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            strokeDasharray: pathLength,
            strokeDashoffset: pathLength,
            animation: `draw 2s ease-in-out both`,
          }}
        />
      </svg>

      <div className="flex h-full flex-col items-center justify-center">
        <h3 className="text-sm font-bold sm:text-lg md:text-xl xl:text-2xl">
          {title}
        </h3>
      </div>
    </div>
  );
};

export const BookingMain = () => {
  const t = useTranslations();
  const { endDate, startDate } = useDateSelector();
  const [showModalPage, setShowModalPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [guests, setGuests] = useState(3);

  const handleNextPage = () => setCurrentPage((prev) => prev + 1);
  const handlePreviousPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <AnimatePresence>
      <div className="relative flex flex-col items-center bg-[url('/bookingbg.webp')] bg-cover bg-top pt-[80px]">
        <div className="absolute inset-0 bg-black bg-opacity-20" />
        <div className="relative flex h-[35vh] w-11/12 justify-center sm:h-[40vh] md:h-[60vh] 2xl:h-[80vh]">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.75,
            }}
          >
            <Image
              src={bookingherobg}
              alt="Book Termin Now"
              fill
              className="rounded-xl object-cover drop-shadow-[0px_7px_2px_rgba(0,0,0,0.4)]"
            />
          </motion.div>
          <div className="absolute inset-0 rounded-xl bg-black bg-opacity-40" />
          <motion.header
            className="absolute inset-0 flex flex-col items-start px-5 py-5 text-3xl font-semibold text-white md:text-4xl lg:text-5xl"
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.75,
            }}
          >
            <h1>{t("booking.intro.header1")},</h1>
            <h2>{t("booking.intro.header2")},</h2>
            <h2>{t("booking.intro.header3")}</h2>
          </motion.header>
          <motion.section
            className="absolute bottom-0 flex h-32 w-5/6 translate-y-[15%] transform flex-col items-center justify-around rounded-xl border border-b-[#E7B181]/50 border-l-[#E7B181]/50 border-r-[#FFFFFF]/75 border-t-[#FFFFFF]/75 bg-gradient-opacity px-2 drop-shadow-[0px_5px_2px_rgba(0,0,0,0.4)] backdrop-blur-[2px] backdrop-filter sm:h-44 sm:w-3/6 md:h-64 xl:w-2/6 2xl:h-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.75,
            }}
          >
            <div className="flex flex-col w-full justify-center items-center">
              <DatePickerWithRange setShowModalPage={setShowModalPage} />
            </div>
            <Dialog
              open={showModalPage}
              onOpenChange={(open) => {
                if (open && startDate && endDate) {
                  setShowModalPage(true);
                } else {
                  setShowModalPage(false);
                  !showModalPage &&
                    alert(t("booking.introcard.arrival.withoutselectedalert"));
                }
              }}
            >
              <DialogTrigger>
                <motion.button
                  aria-label="Search Dates"
                  initial={{ y: 25, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.6,
                    duration: 0.75,
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-10 w-10 sm:h-16 sm:w-16 md:h-20 md:w-20"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 15.75l-2.489-2.489m0 0a3.375 3.375 0 10-4.773-4.773 3.375 3.375 0 004.774 4.774zM21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      style={{
                        strokeDasharray: 81.292,
                        strokeDashoffset: 81.292,
                        animation: `draw 3s ease-in-out forwards`,
                      }}
                    />
                  </svg>
                </motion.button>
              </DialogTrigger>
              <DialogContent className="overflow-scroll max-h-[85%] max-w-[95%] lg:max-w-[90%] lg:gap-6">
                {currentPage === 1 ? (
                  <ProfileForm
                    showModalPage={showModalPage}
                    setShowModalPage={setShowModalPage}
                    onNextPage={handleNextPage}
                    setGuests={setGuests}
                  />
                ) : (
                  <ProfileFormPage2
                    onPrevPage={handlePreviousPage}
                    guests={guests}
                  />
                )}
              </DialogContent>
            </Dialog>
          </motion.section>
        </div>

        <BookingInfo />
      </div>
    </AnimatePresence>
  );
};

export const BookingInfo: React.FC = ({}) => {
  const t = useTranslations() as any;
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);

  const openServiceModal = useCallback(() => {
    setIsServiceModalOpen(true);
  }, []);

  const openFaqModal = useCallback(() => {
    setIsFaqModalOpen(true);
  }, []);

  return (
    <AnimatePresence>
      <section className="relative flex w-full flex-col items-center gap-10 pb-32">
        <motion.div
          className="mt-24 flex flex-col justify-center text-center text-4xl"
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.75,
          }}
          viewport={{ once: true }}
        >
          <h2>{t("booking.info.title1")}</h2>
          <h2>{t("booking.info.title2")}</h2>
        </motion.div>
        <motion.div
          className="flex h-full w-11/12 max-w-3xl flex-col items-center justify-between gap-5 rounded-lg border-2 px-4 py-3 sm:w-5/6 md:w-4/6 md:px-10 md:py-6 2xl:max-w-5xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.75,
          }}
          viewport={{ once: true }}
        >
          <ul className="items-around items-between flex list-none flex-col space-y-5 pl-0">
            <motion.li
              className="flex w-full flex-col items-start justify-between gap-2 min-[372px]:flex-row sm:flex-row sm:items-center md:gap-4"
              initial={{ y: 25, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.75,
              }}
              viewport={{ once: true }}
            >
              <p className="text-lg lg:text-xl xl:text-2xl">
                {t("booking.info.availability.days.fourdays")}
              </p>
              <span className="text-lg font-semibold lg:text-xl xl:text-2xl">
                {t("booking.info.availability.price.fourdays")}
              </span>
            </motion.li>
            <motion.li
              className="flex w-full flex-col items-start justify-between gap-2 min-[372px]:flex-row sm:flex-row sm:items-center md:gap-4"
              initial={{ y: 25, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.75,
              }}
              viewport={{ once: true }}
            >
              <p className="text-lg lg:text-xl xl:text-2xl">
                {t("booking.info.availability.days.weekend")}
              </p>
              <span className="text-lg font-semibold lg:text-xl xl:text-2xl">
                {t("booking.info.availability.price.weekend")}
              </span>
            </motion.li>
            <motion.li
              className="flex w-full flex-col items-start justify-between gap-2 min-[372px]:flex-row sm:flex-row sm:items-center md:gap-4"
              initial={{ y: 25, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.75,
              }}
              viewport={{ once: true }}
            >
              <p className="text-lg lg:text-xl xl:text-2xl">
                {t("booking.info.availability.days.specialdays")}
              </p>
              <span className="text-lg font-semibold lg:text-xl xl:text-2xl">
                {t("booking.info.availability.price.specialdays")}
              </span>
            </motion.li>
          </ul>
          <motion.div
            className="text-center text-sm md:text-base lg:text-lg xl:text-xl"
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.8,
              duration: 0.75,
            }}
            viewport={{ once: true }}
          >
            {t("booking.info.availability.priceinfo")}
          </motion.div>
        </motion.div>
        <div className="flex h-full w-11/12 max-w-3xl flex-col items-center justify-between gap-5 rounded-lg border-2 px-4 py-3 sm:w-5/6 md:w-4/6 md:px-10 md:py-6 2xl:max-w-5xl">
          <motion.h3
            className="py-2 text-xl font-semibold md:text-2xl 2xl:text-3xl"
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.75,
            }}
            viewport={{ once: true }}
          >
            {t("booking.info.services.card.title")}
          </motion.h3>
          {services.map((row, rowIndex) => (
            <motion.section
              key={rowIndex}
              className="flex w-full justify-around"
              initial={{ y: 25, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.75,
              }}
              viewport={{ once: true }}
            >
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
            </motion.section>
          ))}
          <motion.button
            type="button"
            aria-label="Open service modal"
            onClick={openServiceModal}
            className="hover:scale-102 group flex transform font-roboto-mono transition-all duration-200 ease-in"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              dealy: 1,
              duration: 0.75,
            }}
            viewport={{ once: true }}
          >
            <Image
              src={"/bngdetailico.svg"}
              alt="Footer Arrow Icon"
              width={35}
              height={35}
              className="mx-1 transform self-center transition-all duration-200 ease-in group-hover:translate-x-1"
            />
            {t("booking.info.services.card.button")}
          </motion.button>
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
          <motion.h3
            className="py-2 text-3xl font-semibold md:text-4xl 2xl:text-5xl"
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.75,
            }}
            viewport={{ once: true }}
          >
            {t("booking.info.important.title")}
          </motion.h3>
          <ul className="my-5 flex h-full w-11/12 flex-col items-center space-y-5 text-center text-sm sm:w-5/6 sm:text-base md:w-4/6 md:text-lg lg:text-xl xl:text-2xl">
            {guestInfo.map((info, index) => (
              <motion.li
                key={index}
                initial={{ y: 25, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.4,
                  duration: 0.75,
                }}
                viewport={{ once: true }}
                className={
                  index !== guestInfo.length - 1
                    ? "relative before:absolute before:-bottom-5 before:left-1/2 before:block before:-translate-x-1/2 before:transform before:content-['.']"
                    : ""
                }
              >
                {t(info)}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="flex h-full w-11/12 max-w-3xl flex-col items-center justify-between gap-5 rounded-lg border-2 px-4 py-3 sm:w-5/6 md:w-4/6 md:px-10 md:py-6 2xl:max-w-5xl">
          <motion.h3
            className="pt-2 text-2xl font-semibold md:text-3xl 2xl:text-4xl"
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.75,
            }}
            viewport={{ once: true }}
          >
            {t("booking.info.faq.title")}
          </motion.h3>
          <Accordion
            type="single"
            collapsible
            className="flex flex-col items-center"
          >
            {faq.map((item, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="my-5 flex h-full w-11/12 flex-col items-center space-y-5 text-center text-sm sm:w-5/6 sm:text-base md:w-4/6 md:text-lg lg:text-xl xl:text-2xl"
              >
                <AccordionTrigger className="tracking-widest">
                  <motion.div
                    initial={{ y: 25, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{
                      delay: 0.4,
                      duration: 0.75,
                    }}
                    viewport={{ once: true }}
                  >
                    {t(item.question)}
                  </motion.div>
                </AccordionTrigger>
                <AccordionContent className="mb-2 text-xs md:text-sm 2xl:text-lg">
                  <p>{t(item.answer)}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        <motion.h3
          className="text-xl font-semibold md:text-2xl 2xl:text-3xl"
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.6,
            duration: 0.75,
          }}
          viewport={{ once: true }}
        >
          {t("booking.info.help.title")}
        </motion.h3>
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.8,
            duration: 0.75,
          }}
          viewport={{ once: true }}
        >
          <Link
            href="/contact"
            className="md:text-md group flex transform rounded-md bg-[#E7B181] px-2 py-2 text-xs transition-transform duration-500 ease-in-out hover:scale-105 sm:text-sm lg:text-lg xl:text-2xl 2xl:text-3xl"
            aria-label="Contact Us Now"
          >
            {t("booking.info.help.button")}
            <Image
              src={"/HeroButtonArrow.svg"}
              alt="Contact us now"
              width={12}
              height={12}
              className="ml-2 mt-0.5 h-3 h-3 w-3 w-3 transform self-center transition-transform duration-500 ease-in-out group-hover:translate-x-1 sm:h-4 sm:w-4 lg:h-5 lg:w-5 xl:h-6 xl:w-6 2xl:h-7 2xl:w-7"
            />
          </Link>
        </motion.div>
      </section>
    </AnimatePresence>
  );
};
