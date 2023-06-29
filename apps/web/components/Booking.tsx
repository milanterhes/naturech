import Image from "next/image";
import bookingherobg from "../public/bookingherobg.webp";
import { useTranslations } from "next-intl";

type IconTextProps = {
  imgSrc: string;
  imgAlt: string;
  imgWidth: number;
  imgHeight: number;
  title: string;
  subtitle: string;
};

const IconText: React.FC<IconTextProps> = ({
  imgSrc,
  imgAlt,
  imgWidth,
  imgHeight,
  title,
  subtitle,
}) => {
  return (
    <div className="flex items-center space-x-1">
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={imgWidth}
        height={imgHeight}
        className="self-start"
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
export const BookingIntro: React.FC = () => {
  const t = useTranslations();
  return (
    <main className="relative flex h-full min-h-screen flex-col items-center bg-[url('/bookingbg.webp')] bg-cover bg-top pt-[80px]">
      <div className="absolute inset-0 bg-black bg-opacity-20" />
      <div className="relative flex h-[35vh] w-[88%] justify-center sm:h-[40vh] md:h-[60vh] 2xl:h-[80vh]">
        <Image
          src={bookingherobg}
          alt="Book Termin Now"
          fill
          className="rounded-xl object-cover drop-shadow-[0px_7px_2px_rgba(0,0,0,0.4)]"
        />
        <div className="absolute inset-0 rounded-xl bg-black bg-opacity-40" />
        <header className="absolute inset-0 flex flex-col items-start px-5 py-5 text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
          <h1>{t("booking.intro.header1")},</h1>
          <h1>{t("booking.intro.header2")},</h1>
          <h1>{t("booking.intro.header3")}</h1>
        </header>
        <section className="absolute bottom-0 flex h-32 w-5/6 translate-y-1/3 transform flex-col items-center justify-around rounded-xl border border-b-[#E7B181]/50 border-l-[#E7B181]/50 border-r-[#FFFFFF]/75 border-t-[#FFFFFF]/75 bg-gradient-opacity px-2 drop-shadow-[0px_5px_2px_rgba(0,0,0,0.4)] backdrop-blur-[2px] backdrop-filter sm:h-44 md:h-64 2xl:h-80">
          <div className="flex w-full justify-around">
            <IconText
              imgSrc={"/arrivalicon.svg"}
              imgAlt={"Arrival Date Icon"}
              imgWidth={30}
              imgHeight={30}
              title={t("booking.card.arrival.title")}
              subtitle={t("booking.card.arrival.detail")}
            />
            <IconText
              imgSrc={"/arrivalicon.svg"}
              imgAlt={"Departure Date Icon"}
              imgWidth={30}
              imgHeight={30}
              title={t("booking.card.departure.title")}
              subtitle={t("booking.card.departure.detail")}
            />
            <IconText
              imgSrc={"/personcounticon.svg"}
              imgAlt={"Guests Icon"}
              imgWidth={28}
              imgHeight={28}
              title={t("booking.card.guests.title")}
              subtitle={t("booking.card.guests.detail")}
            />
          </div>
          <button aria-label="Search Dates">
            <Image
              src={"/calsearchicon.svg"}
              alt="Date Finder Icon"
              width={50}
              height={50}
              className="h-10 w-10 sm:h-16 sm:w-16 md:h-20 md:w-20"
            />
          </button>
        </section>
      </div>
    </main>
  );
};
