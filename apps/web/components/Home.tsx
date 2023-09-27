import {
  Bars3Icon,
  CalendarDaysIcon,
  UserCircleIcon,
  PhotoIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/solid";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState, useRef } from "react";
import bgPicFull from "../public/Image_full.webp";
import bgPicBottom from "../public/Image_bottom.webp";
import introPic from "../public/intro.webp";
import leafPic from "../public/leaf.png";
import logoPic from "../public/naturechill-logo.png";
import Login, { useAuth } from "./Auth";
import LocaleSwitcher from "./LocaleSwitcher";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

const baseImage = {
  src: leafPic,
  alt: "Luxury Leaf Image",
  height: 100,
  width: 100,
  className: "h-auto",
  yPosition: 0, //default
};

const images = [
  {
    ...baseImage,
    rotate: 45,
    yPosition: -10,
    duration: 5,
    shake: 2,
    mobile: true,
  },
  {
    ...baseImage,
    rotate: 180,
    yPosition: -16,
    duration: 6,
    shake: 3,
    mobile: true,
  },
  {
    ...baseImage,
    rotate: 90,
    duration: 7,
    shake: 1,
    mobile: false,
  },
];

export const Navbar: React.FC = () => {
  const t = useTranslations();
  const auth = useAuth();
  const [isAtTop, setIsAtTop] = useState(true);
  const sentinelRef = useRef(null);

  useEffect(() => {
    const current = sentinelRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsAtTop(entry.isIntersecting);
      },
      { threshold: 1.0 }
    );

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (current) {
        observer.unobserve(current);
      }
    };
  }, []);
  return (
    <div>
      <div ref={sentinelRef} />
      <AnimatePresence>
        <motion.div
          className={`fixed top-0 z-50 flex w-full items-center justify-between px-4 py-2 ${
            isAtTop
              ? "bg-black bg-opacity-30 backdrop-blur-xl"
              : "bg-black bg-opacity-60 transition-colors duration-300 backdrop-blur-sm"
          }`}
          initial={{ y: 25, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.75,
          }}
        >
          <Link href="/" className="cursor-pointer" scroll={false}>
            <Image
              src={logoPic}
              alt="Naturechill logo"
              width={50}
              height={50}
            />
          </Link>
          <div className="drawer drawer-end block w-auto md:hidden">
            <input
              id="navbar-drawer"
              type="checkbox"
              className="drawer-toggle"
            />
            <div className="drawer-content">
              <label htmlFor="navbar-drawer">
                <div className="rounded-md bg-white bg-opacity-50 p-1.5 text-main-theme">
                  <Bars3Icon className="h-6 w-6 drop-shadow-2xl" />
                </div>
              </label>
            </div>
            <div className="drawer-side">
              <label htmlFor="navbar-drawer" className="drawer-overlay"></label>
              <div className="w-75 menu h-full bg-base-200 p-4 text-base-content">
                <LocaleSwitcher />
                <ul className="py-2 space-y-2">
                  <li>
                    <Link
                      href="/booking"
                      className="font-bold text-main-theme"
                      scroll={false}
                    >
                      <CalendarDaysIcon className="h-4 w-4" />
                      {t("home.hamburger.booking")}
                    </Link>
                    <Link
                      href="/gallery"
                      className="font-bold text-main-theme"
                      scroll={false}
                    >
                      <PhotoIcon className="h-4 w-4" />
                      {t("home.hamburger.gallery")}
                    </Link>
                    <Link
                      href="/contact"
                      className="font-bold text-main-theme"
                      scroll={false}
                    >
                      <QuestionMarkCircleIcon className="h-4 w-4" />
                      {t("home.hamburger.contact")}
                    </Link>
                  </li>
                  <div className="divider" />
                  <Login />
                </ul>
              </div>
            </div>
          </div>
          <nav className="hidden w-full items-center justify-between px-6 py-3 transition-colors duration-300 md:flex">
            <nav>
              <div className="space-x-8">
                <Link
                  href="/booking"
                  className="font-bold text-white transition-colors duration-300 hover:text-main-theme cursor-pointer"
                  scroll={false}
                >
                  {t("home.pages.booking")}
                </Link>
                <Link
                  href="/gallery"
                  className="font-bold text-white transition-colors duration-300 hover:text-main-theme cursor-pointer"
                  scroll={false}
                >
                  {t("home.pages.gallery")}
                </Link>
                <Link
                  href="/contact"
                  className="font-bold text-white transition-colors duration-300 hover:text-main-theme cursor-pointer"
                  scroll={false}
                >
                  {t("home.pages.contact")}
                </Link>
              </div>
            </nav>

            <div className="flex items-center space-x-4">
              <LocaleSwitcher />
            </div>
          </nav>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const IconInfo: React.FC<{
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}> = ({ src, alt, title, subtitle }) => (
  <div className="flex gap-1 sm:gap-2">
    <Image
      src={src}
      alt={alt}
      width={32}
      height={32}
      className="transform transition-all duration-200 ease-in hover:rotate-3 hover:scale-110 sm:h-10 sm:w-10"
    />
    <div className="flex flex-col gap-0.5 text-xs sm:text-sm">
      <p className="uppercase tracking-wider opacity-75">{title}</p>
      <p className="uppercase">{subtitle}</p>
      <div className="mb-1 h-px w-full bg-main-theme bg-opacity-40"></div>
    </div>
  </div>
);

export const Hero: React.FC = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const backgroundYDesktop = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "12%"]
  );
  const backgroundYMobile = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);
  const currentBackgroundY =
    windowWidth >= 640 ? backgroundYDesktop : backgroundYMobile;
  const t = useTranslations();
  return (
    <div ref={ref} className="relative min-h-[105vh]">
      <div className="flex justify-center px-12 py-24 text-center">
        <AnimatePresence>
          <motion.h1
            className="z-30 font-tangerine font-bold text-4xl tracking-[.25em] drop-shadow-2xl pt-2 md:text-6xl sm:text-5xl w-11/12"
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.75,
            }}
          >
            {t("home.hero.header")}
          </motion.h1>
        </AnimatePresence>
      </div>
      <div className="overflow-hidden absolute inset-0 z-0">
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: currentBackgroundY }}
        >
          <Image
            src={bgPicFull}
            alt="profile"
            fill
            className="object-cover brightness-75"
          />
        </motion.div>
      </div>
      <div className="absolute inset-0 z-20">
        <Image
          src={bgPicBottom}
          alt="profile"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-main-theme to-transparent backdrop-blur z-30" />
      </div>
      <div className="flex h-full w-full justify-center px-4 sm:px-0">
        <AnimatePresence>
          <motion.div
            className="z-30 mx-auto flex h-[130px] w-full max-w-xl flex-col items-center justify-center rounded-xl bg-main-theme bg-opacity-40 backdrop-blur-sm backdrop-filter sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2"
            initial={{ y: 25, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.4,
              duration: 0.75,
            }}
          >
            <div className="flex w-full flex-wrap justify-around p-2 sm:justify-evenly">
              <IconInfo
                src="/HeroHouse.svg"
                alt="Our Style"
                title={t("home.hero.info1.title")}
                subtitle={t("home.hero.info1.detail")}
              />
              <IconInfo
                src="/HeroLocation.svg"
                alt="Our Location"
                title={t("home.hero.info2.title")}
                subtitle="Sopron"
              />
              <IconInfo
                src="/HeroPrice.svg"
                alt="Our Price"
                title={t("home.hero.info3.title")}
                subtitle="60.000 Ft"
              />
            </div>
            <Link
              href="/booking"
              className="group mt-5 flex transform rounded-md bg-main-theme px-2 py-1 transition-transform duration-500 ease-in-out hover:scale-105"
              aria-label="Book Now"
              scroll={false}
            >
              {t("home.hero.headerbutton")}
              <Image
                src={"/HeroButtonArrow.svg"}
                alt="Booking Arrow CTA"
                width={12}
                height={12}
                className="ml-2 transform self-center transition-transform duration-500 ease-in-out group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Intro: React.FC = () => {
  const t = useTranslations();
  return (
    <AnimatePresence>
      <div className="flex flex-col items-center justify-center px-6 py-10 mt-14 z-30">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.75,
          }}
          viewport={{ once: true }}
        >
          <Image
            src={introPic}
            alt="Nature & Chill Woodhouse"
            quality={25}
            height={1024}
            width={1024}
            className="aspect-[4/3] rounded-[5px] object-cover brightness-75 drop-shadow-highlight"
          />
        </motion.div>
        <motion.div
          className="text-md my-6 flex flex-col gap-4 text-center font-roboto-mono"
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.75,
          }}
          viewport={{ once: true }}
        >
          <p className="drop-shadow-2xl">{t(`home.enjoy.content.first`)}</p>
          <p className="drop-shadow-2xl">{t(`home.enjoy.content.second`)}</p>
          <p className="drop-shadow-2xl">{t(`home.enjoy.content.third`)}</p>
        </motion.div>
        <motion.div
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.75,
          }}
          viewport={{ once: true }}
        >
          <Link
            href="/booking"
            className="group flex transform font-roboto-mono transition-all duration-200 ease-in hover:scale-110"
            scroll={false}
          >
            {t("home.enjoy.content.button")}
            <Image
              src={"/arrow.svg"}
              alt="Arrow Icon"
              width={35}
              height={35}
              className="ml-2 transform self-center transition-all duration-200 ease-in group-hover:translate-x-1.5"
            ></Image>
          </Link>
        </motion.div>
      </div>
      <div className="my-20 flex justify-around z-30">
        {images.map((image, index) => (
          <motion.div
            className={`${image.mobile ? "" : "hidden lg:block"}`}
            key={index}
            initial={{ y: 0, opacity: 1, x: 0, rotate: 0 }}
            whileInView={{
              y: [0, 10, 0],
              opacity: 1,
              x: [image.shake, -image.shake, image.shake],
              rotate: 10,
            }}
            transition={{
              delay: 0.4,
              y: {
                repeat: 1,
                duration: image.duration,
                ease: "easeInOut",
              },
              x: {
                repeat: 1,
                duration: image.duration,
                repeatType: "reverse",
                ease: "easeInOut",
              },
              rotate: {
                repeat: 1,
                duration: image.duration,
                repeatType: "reverse",
                ease: "easeInOut",
              },
            }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              height={image.height}
              width={image.width}
              className={image.className}
              style={{
                transform: `rotate(${image.rotate}deg) translateY(${image.yPosition}px)`,
              }}
            />
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  );
};

const ServiceIcon = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    width={35}
    height={35}
    className="ml-2 transform self-center transition-all duration-200 ease-in hover:rotate-3 hover:scale-110"
  />
);

const ServiceCard = ({ servicePic, icons, title, details }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    setShowDetails(false);
  };

  const handleArrowClick = (event) => {
    event.stopPropagation();
    setShowDetails(true);
  };

  return (
    <AnimatePresence>
      <div className="w-4/5 py-5" onClick={handleCardClick}>
        <motion.div
          className="relative flex flex-col items-center justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            delay: 0.1,
            duration: 0.75,
          }}
          viewport={{ once: true }}
        >
          <Image
            src={servicePic}
            width={1024}
            height={1024}
            onClick={handleArrowClick}
            quality={70}
            alt="Our Services on Card"
            className={`object-cover brightness-${
              showDetails ? "50" : "75"
            } cursor-pointer aspect-[4/3] rounded-[5px] drop-shadow-[10px_7px_2px_rgba(0,0,0,0.4)]`}
          />
          <div className="absolute grid h-full grid-flow-row auto-rows-fr justify-between py-1">
            <div></div>
            <motion.div
              className={`flex flex-col justify-evenly gap-1 ${
                !showDetails ? "" : "hidden"
              }`}
              initial={{ y: 25, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.75,
              }}
            >
              <h2 className="text-xl font-semibold ">{title}</h2>
              <div className="flex justify-center gap-2">
                {icons.map((icon, i) => (
                  <ServiceIcon key={i} src={icon.src} alt={icon.alt} />
                ))}
              </div>
            </motion.div>
            <motion.div
              className="flex w-full justify-center self-end"
              initial={{ y: 25, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.75,
              }}
              viewport={{ once: true }}
            >
              <Image
                src={"/servicearrow.svg"}
                alt="Arrow Icon Service Card"
                width={20}
                height={20}
                className={`ml-2 transform justify-end self-center transition-all duration-200 ease-in ${
                  showDetails ? "rotate-180" : ""
                } cursor-pointer`}
                onClick={handleArrowClick}
              />
            </motion.div>
          </div>
          <div
            className={`${
              showDetails ? "" : "hidden"
            } absolute flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-black bg-opacity-50 text-center text-white xl:w-[64em]`}
          >
            <p className="text-sm md:text-lg">{details}</p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

const services = [
  {
    servicePic: "/service1.webp",
    icons: [
      { src: "/Wifi.svg", alt: "Wifi Icon" },
      { src: "/Tv.svg", alt: "Tv" },
      { src: "/Clima.svg", alt: "Clima Icon" },
    ],
    keys: {
      title: "home.enjoy.services.service1.title",
      details: "home.enjoy.services.service1.details",
    },
  },
  {
    servicePic: "/service2.webp",
    icons: [
      { src: "/Terrace.svg", alt: "Terrace Icon" },
      { src: "/Jacuzzi.svg", alt: "Jacuzzi Icon" },
    ],
    keys: {
      title: "home.enjoy.services.service2.title",
      details: "home.enjoy.services.service2.details",
    },
  },
  {
    servicePic: "/service3.webp",
    icons: [
      { src: "/Coffee.svg", alt: "Coffee Icon" },
      { src: "/Wine.svg", alt: "Wine Icon" },
    ],
    keys: {
      title: "home.enjoy.services.service3.title",
      details: "home.enjoy.services.service3.details",
    },
  },
  {
    servicePic: "/service4.webp",
    icons: [
      { src: "/Chess.svg", alt: "Chess Icon" },
      { src: "/Tour.svg", alt: "Tour Icon" },
    ],
    keys: {
      title: "home.enjoy.services.service4.title",
      details: "home.enjoy.services.service4.details",
    },
  },
];

export const Services = () => {
  const t = useTranslations() as any;

  return (
    <AnimatePresence>
      <div className="flex flex-col items-center justify-around py-3 text-center">
        <motion.h2
          className="text-md max-w-[200px] py-4 text-center font-roboto-mono font-bold uppercase tracking-[.20em] drop-shadow-2xl"
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.75,
          }}
          viewport={{ once: true }}
        >
          {t.rich(`home.enjoy.card.title`, {
            large: (chunks) => <span className="text-xl">{chunks}</span>,
          })}
        </motion.h2>
        {services.map((service, i) => (
          <ServiceCard
            key={i}
            servicePic={service.servicePic}
            icons={service.icons}
            title={t(service.keys.title)}
            details={t(service.keys.details)}
          />
        ))}
      </div>
    </AnimatePresence>
  );
};

export const Gallery = () => {
  const t = useTranslations();
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <>
      <section ref={targetRef} className="relative h-[300vh] bg-main-theme">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <AnimatePresence>
            <div className="absolute inset-0 flex justify-center mt-20">
              <motion.h2
                className="text-md max-w-[200px] py-4 text-center font-roboto-mono font-bold uppercase tracking-[.20em] drop-shadow-2xl"
                initial={{ y: 25, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{
                  delay: 0.2,
                  duration: 0.75,
                }}
                viewport={{ once: true }}
              >
                {t.rich(`home.enjoy.gallery.title`, {
                  large: (chunks) => <span className="text-xl">{chunks}</span>,
                })}
              </motion.h2>
            </div>
          </AnimatePresence>
          <AnimatePresence>
            <motion.div
              style={{ x }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                delay: 0.4,
                duration: 0.75,
              }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              {cards.map((card) => {
                return <Card card={card} key={card.id} />;
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </>
  );
};

const Card = ({ card }: { card: CardType }) => {
  return (
    <div
      key={card.id}
      className="group relative h-[350px] w-[350px] sm:h-[450px] sm:w-[450px] overflow-hidden bg-neutral-200 rounded-md drop-shadow-[10px_7px_2px_rgba(0,0,0,0.4)]"
    >
      <Image
        src={card.url}
        alt={card.title}
        fill
        className="absolute inset-0 z-0 transition-transform duration-300 group-hover:scale-110 object-cover"
      />
    </div>
  );
};

type CardType = {
  url: string;
  title: string;
  id: number;
};

const cards: CardType[] = [
  {
    url: "/homegallerypic1.webp",
    title: "Title 1",
    id: 1,
  },
  {
    url: "/homegallerypic2.webp",
    title: "Title 2",
    id: 2,
  },
  {
    url: "/homegallerypic3.webp",
    title: "Title 3",
    id: 3,
  },
  {
    url: "/homegallerypic4.webp",
    title: "Title 4",
    id: 4,
  },
  {
    url: "/homegallerypic5.webp",
    title: "Title 5",
    id: 5,
  },
  {
    url: "/homegallerypic6.webp",
    title: "Title 6",
    id: 6,
  },
  {
    url: "/homegallerypic7.webp",
    title: "Title 7",
    id: 7,
  },
  {
    url: "/homegallerypic8.webp",
    title: "Title 8",
    id: 8,
  },
  {
    url: "/homegallerypic9.webp",
    title: "Title 9",
    id: 9,
  },
  {
    url: "/homegallerypic10.webp",
    title: "Title 10",
    id: 10,
  },
];

type ReviewProps = {
  name: string;
  rating: number;
  text: string;
  slideId: number;
  nextSlideId: number;
  prevSlideId: number;
  currentSlideId: number;
  setCurrentSlideId: (id: number) => void;
};

export const Review: FC<ReviewProps> = ({
  name,
  text,
  rating,
  slideId,
  nextSlideId,
  prevSlideId,
  setCurrentSlideId,
  currentSlideId,
}) => {
  return (
    <div
      id={`slide${slideId}`}
      className={`carousel-item relative flex h-full w-full items-center justify-center text-white ${
        currentSlideId === slideId ? "flex" : "hidden"
      }`}
    >
      <div className=" ">
        <button
          onClick={() => setCurrentSlideId(prevSlideId)}
          className="btn-circle btn opacity-80"
        >
          ❮
        </button>
      </div>
      <div className="flex w-full flex-col items-center justify-center space-y-4 rounded-xl bg-black bg-opacity-20 p-6 backdrop-blur-md backdrop-filter sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <ul className="relative flex items-center justify-center">
          {Array.from({ length: rating }).map((_, i) => (
            <li key={`${name}-star-${i.toString()}`}>
              <span className="text-lg text-yellow-500">★</span>
            </li>
          ))}
          <a
            className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform"
            title="Google Inc., Public domain, via Wikimedia Commons"
            href="https://commons.wikimedia.org/wiki/File:Google_%22G%22_Logo.svg"
          >
            <img
              width="10"
              alt='Google "G" Logo'
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/32px-Google_%22G%22_Logo.svg.png"
            />
          </a>
        </ul>
        <div className="md:text-md scrollbar-hide relative max-h-[100px] overflow-auto text-sm font-semibold lg:text-lg">
          {text}
        </div>
        <div className="text-xs md:text-sm lg:text-lg">- {name}</div>
      </div>
      <div className="">
        <button
          onClick={() => setCurrentSlideId(nextSlideId)}
          className="btn-circle btn opacity-80"
        >
          ❯
        </button>
      </div>
    </div>
  );
};

type ReviewData = {
  text: string;
  author_name: string;
  rating: number;
};

export const ReviewsContainer: FC = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentSlideId, setCurrentSlideId] = useState(1);

  useEffect(() => {
    fetch(`/api/get-reviews?language=${locale}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setReviews(data))
      .catch((error) => setError(error.message));
  }, [locale]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <AnimatePresence>
      <div className="flex flex-col items-center">
        <motion.h2
          className="text-md max-w-[200px] pb-16 text-center font-roboto-mono font-bold uppercase tracking-[.20em] drop-shadow-2xl"
          initial={{ y: 25, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.75,
          }}
          viewport={{ once: true }}
        >
          {t.rich(`home.enjoy.review.title`, {
            large: (chunks) => <span className="text-xl">{chunks}</span>,
          })}
        </motion.h2>
        <div className="carousel flex min-h-[25rem] w-full items-center justify-center bg-cover bg-center relative">
          <Image
            src={"/homegallerypic8.webp"}
            fill
            alt="Our best reviews"
            style={{ objectFit: "cover" }}
            className="absolute inset-0"
          ></Image>
          {reviews.map((review, index) => (
            <Review
              key={review.text}
              name={review.author_name}
              text={review.text}
              rating={review.rating}
              slideId={index + 1}
              nextSlideId={index + 2 > reviews.length ? 1 : index + 2}
              prevSlideId={index === 0 ? reviews.length : index}
              setCurrentSlideId={setCurrentSlideId}
              currentSlideId={currentSlideId}
            />
          ))}
        </div>
      </div>
    </AnimatePresence>
  );
};

export const Footer = () => {
  const t = useTranslations();
  return (
    <AnimatePresence>
      <footer
        className="w-full bg-gradient-to-b from-main-theme to-white/25 px-4 py-3 border-t border-white/30"
        role="contentinfo"
      >
        <div className="flex flex-col md:flex-row md:justify-evenly">
          <div className="mb-5 flex flex-col justify-center">
            <motion.h2
              className="mb-5 indent-5 text-lg md:max-w-[70%] md:text-xl lg:max-w-[75%]"
              initial={{ x: -25, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.2,
                duration: 0.75,
              }}
              viewport={{ once: true }}
            >
              {t("home.enjoy.footer.title")}
            </motion.h2>
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{
                delay: 0.6,
                duration: 0.75,
              }}
              viewport={{ once: true }}
            >
              <Link href="/booking" scroll={false}>
                <button
                  type="button"
                  className="hover:scale-102 group flex transform font-roboto-mono transition-all duration-200 ease-in"
                >
                  <Image
                    src={"/footerarrow.svg"}
                    alt="Footer Arrow Icon"
                    width={35}
                    height={35}
                    className="mx-1 transform self-center transition-all duration-200 ease-in group-hover:translate-x-1"
                  />
                  {t("home.enjoy.footer.button")}
                </button>
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="flex flex-col"
            initial={{ y: 25, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.75,
            }}
            viewport={{ once: true }}
          >
            <div className="mb-5 flex flex-col gap-10 md:flex-row md:justify-evenly">
              <nav role="navigation">
                <h2 className="mb-2 text-lg font-bold">
                  {t("home.enjoy.footer.contact")}
                </h2>
                <div>
                  <address className="mb-1">
                    9400 Sopron, Kőhalom utca 40
                  </address>
                  <p className="mb-1">
                    <a
                      href="tel:+36703928177"
                      className="underline"
                      aria-label="Call us at +36 70 392 8177"
                    >
                      +36 70 392 8177
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:nc3houses@gmail.com"
                      className="underline"
                      aria-label="Email us at nc3houses@gmail.com"
                    >
                      nc3houses@gmail.com
                    </a>
                  </p>
                </div>
              </nav>
              <nav role="navigation">
                <h2 className="mb-2 text-lg font-bold">
                  {t("home.enjoy.footer.navigation.title")}
                </h2>
                <ul>
                  <li className="mb-1">
                    <Link href="/booking" className="underline" scroll={false}>
                      {t("home.enjoy.footer.navigation.booking")}
                    </Link>
                  </li>
                  <li className="mb-1">
                    <Link href="/gallery" className="underline" scroll={false}>
                      {t("home.enjoy.footer.navigation.gallery")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="underline" scroll={false}>
                      {t("home.enjoy.footer.navigation.contact")}
                    </Link>
                  </li>
                </ul>
              </nav>
              <nav role="navigation">
                <h2 className="mb-2 text-lg font-bold">
                  {t("home.enjoy.footer.information.title")}
                </h2>
                <ul>
                  <li className="mb-1">
                    <Link href="/aszf" className="underline">
                      {t("home.enjoy.footer.information.contract")}
                    </Link>
                  </li>
                  <li>
                    <Link href="/adatvedelmi-tajekoztato" className="underline">
                      {t("home.enjoy.footer.information.data")}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="flex flex-col">
              <div className="mb-1 h-px w-full bg-white bg-opacity-40"></div>
              <div className="flex justify-between">
                <div className="flex gap-2">
                  <a
                    href="https://www.instagram.com/naturechilltreehouses/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={"/instagram.svg"}
                      alt="Follow us on Instagram"
                      width={15}
                      height={15}
                    />
                  </a>
                  <a
                    href="https://www.facebook.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src={"/facebook.svg"}
                      alt="Follow us on Facebook"
                      width={13}
                      height={13}
                    />
                  </a>
                </div>
                <div className="flex gap-2">
                  <Image
                    src={"/Visa.svg"}
                    alt="We accept Visa"
                    width={28}
                    height={28}
                  />
                  <Image
                    src={"/Mastercard.svg"}
                    alt="We accept Mastercard"
                    width={28}
                    height={28}
                  />
                  <Image
                    src={"/Maestro.svg"}
                    alt="We accept Maestro"
                    width={28}
                    height={28}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        <motion.div
          className="flex justify-center py-10"
          initial={{ y: 15, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.4,
            duration: 0.75,
          }}
          viewport={{ once: true }}
        >
          <small>{t("home.enjoy.footer.information.copyright")}</small>
        </motion.div>
      </footer>
    </AnimatePresence>
  );
};
