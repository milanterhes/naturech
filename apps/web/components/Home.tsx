import {
  Bars3Icon,
  CalendarDaysIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState, useRef } from "react";
import bgPic from "../public/background.jpeg";
import introPic from "../public/intro.png";
import leafPic from "../public/leaf.png";
import logoPic from "../public/naturechill-logo.png";
import Login, { useAuth } from "./Auth";
import LocaleSwitcher from "./LocaleSwitcher";
import { useSwipeable } from "react-swipeable";

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
  },
  {
    ...baseImage,
    rotate: 180,
    yPosition: -16,
  },
  {
    ...baseImage,
    rotate: 90,
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
    <>
      <div ref={sentinelRef} />
      <div
        className={`w-full px-4 py-2 z-10 fixed top-0 flex justify-between items-center ${
          isAtTop ? "" : "bg-black bg-opacity-60 transition-colors duration-300"
        }`}
      >
        <Image src={logoPic} alt="Naturechill logo" width={50} height={50} />
        <div className="drawer drawer-end w-auto">
          <input id="navbar-drawer" type="checkbox" className="drawer-toggle" />
          <div className="drawer-content">
            <label htmlFor="navbar-drawer">
              <div className="text-main-theme bg-white bg-opacity-50 rounded-md p-1">
                <Bars3Icon className="h-6 w-6 drop-shadow-2xl" />
              </div>
            </label>
          </div>
          <div className="drawer-side">
            <label htmlFor="navbar-drawer" className="drawer-overlay"></label>
            <div className="menu p-4 w-75 h-full bg-base-200 text-base-content">
              <ul>
                <li>
                  <a className="text-main-theme font-bold">
                    <CalendarDaysIcon className="h-4 w-4" />
                    {t("home.hamburger.booking")}
                  </a>
                </li>
                <div className="divider" />
                <li>
                  <a className="text-main-theme font-bold">
                    <UserCircleIcon className="h-4 w-4" />
                    {t("home.hamburger.signin")}
                  </a>
                </li>
              </ul>
              <LocaleSwitcher />
              {auth.user === null ? (
                <Login />
              ) : (
                <>
                  <p>Logged in as {auth.user.email}</p>
                  <button className="btn" onClick={auth.logout}>
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
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
      className="transition-all ease-in duration-200 transform hover:scale-110 hover:rotate-3 sm:w-10 sm:h-10"
    />
    <div className="flex flex-col text-xs sm:text-sm gap-0.5">
      <p className="uppercase opacity-75 tracking-wider">{title}</p>
      <p className="uppercase">{subtitle}</p>
      <div className="bg-[#E7B181] bg-opacity-40 w-full h-px mb-1"></div>
    </div>
  </div>
);

export const Hero: React.FC = () => {
  const t = useTranslations();
  return (
    <div className="relative min-h-[85vh]">
      <div className="absolute w-full h-full z-0">
        <Image
          src={bgPic}
          alt="profile"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-main-theme to-transparent backdrop-blur" />
      </div>
      <div className="flex justify-center py-24 px-12 text-center">
        <h1 className="uppercase text-3xl font-bowlby drop-shadow-2xl tracking-[.25em]">
          {t("home.hero.header")}
        </h1>
      </div>
      <div className="w-full h-full z-0 flex justify-center px-4 sm:px-0">
        <div className="flex flex-col justify-center items-center bg-main-theme bg-opacity-40 backdrop-filter backdrop-blur-sm rounded-xl max-w-xl w-full sm:w-5/6 md:w-3/4 lg:w-2/3 xl:w-1/2 h-[130px] mx-auto">
          <div className="flex flex-wrap justify-around sm:justify-evenly w-full p-2">
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
              subtitle="Balf"
            />
            <IconInfo
              src="/HeroPrice.svg"
              alt="Our Price"
              title={t("home.hero.info3.title")}
              subtitle="60.000 Ft"
            />
          </div>
          <button
            className="bg-[#E7B181] rounded-md py-1 px-2 mt-5 flex transition-transform duration-500 ease-in-out transform hover:scale-105 group"
            aria-label="Book Now"
          >
            {t("home.hero.headerbutton")}
            <Image
              src={"/HeroButtonArrow.svg"}
              alt="Booking Arrow CTA"
              width={12}
              height={12}
              className="self-center ml-2 transition-transform ease-in-out duration-500 transform group-hover:translate-x-1"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export const Intro: React.FC = () => {
  const t = useTranslations();
  return (
    <>
      <div className="flex justify-center flex-col items-center py-3 px-6">
        <h2 className="py-4 max-w-[200px] text-center uppercase text-md drop-shadow-2xl tracking-[.20em] font-roboto-mono font-bold">
          {t.rich(`home.enjoy.title`, {
            large: (chunks) => <span className="text-xl">{chunks}</span>,
          })}
        </h2>
        <Image
          src={introPic}
          alt="intro TODO"
          height={1024}
          width={1024}
          className="object-cover brightness-75 rounded-[5px] drop-shadow-highlight aspect-[4/3]"
        />
        <div className="my-6 flex gap-4 flex-col font-roboto-mono text-md text-center">
          <p className="drop-shadow-2xl">{t(`home.enjoy.content.first`)}</p>
          <p className="drop-shadow-2xl">{t(`home.enjoy.content.second`)}</p>
          <p className="drop-shadow-2xl">{t(`home.enjoy.content.third`)}</p>
        </div>
        <button className="flex font-roboto-mono group transition-all ease-in duration-200 transform hover:scale-110">
          {t("home.enjoy.content.button")}
          <Image
            src={"/arrow.svg"}
            alt="Arrow Icon"
            width={35}
            height={35}
            className="self-center ml-2 transition-all ease-in duration-200 transform group-hover:translate-x-1.5"
          ></Image>
        </button>
      </div>
      <div className="flex justify-around my-20">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            height={image.height}
            width={image.width}
            className={image.className}
            style={{
              transform: `rotate(${image.rotate}deg) translateY(${image.yPosition}px)`,
            }}
          />
        ))}
      </div>
    </>
  );
};

const ServiceIcon = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    width={35}
    height={35}
    className="self-center ml-2 transition-all ease-in duration-200 transform hover:scale-110 hover:rotate-3"
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
    <div className="w-4/5 py-5" onClick={handleCardClick}>
      <div className="relative flex justify-center items-center flex-col">
        <Image
          src={servicePic}
          width={1024}
          height={1024}
          alt="Our Services on Card"
          className={`object-cover brightness-${
            showDetails ? "50" : "75"
          } rounded-[5px] drop-shadow-highlight-dark aspect-[4/3]`}
        />
        <div className="absolute grid grid-flow-row auto-rows-fr h-full justify-between py-1">
          <div></div>
          <div
            className={`flex flex-col justify-evenly gap-1 ${
              !showDetails ? "" : "hidden"
            }`}
          >
            <h2 className="font-semibold text-xl ">{title}</h2>
            <div className="flex justify-center gap-2">
              {icons.map((icon, i) => (
                <ServiceIcon key={i} src={icon.src} alt={icon.alt} />
              ))}
            </div>
          </div>
          <div className="flex w-full justify-center self-end">
            <Image
              src={"/servicearrow.svg"}
              alt="Arrow Icon Service Card"
              width={20}
              height={20}
              className={`self-center justify-end ml-2 transition-all ease-in duration-200 transform ${
                showDetails ? "rotate-180" : ""
              } cursor-pointer`}
              onClick={handleArrowClick}
            />
          </div>
        </div>
        <div
          className={`${
            showDetails ? "" : "hidden"
          } absolute bg-black bg-opacity-50 overflow-hidden flex items-center justify-center h-full w-full xl:w-[64em] text-white text-center rounded-lg`}
        >
          <p className="text-sm md:text-lg">{details}</p>
        </div>
      </div>
    </div>
  );
};

const services = [
  {
    servicePic: "/service1.png",
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
    servicePic: "/service2.png",
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
    servicePic: "/service3.png",
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
    servicePic: "/service4.png",
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
    <div className="flex justify-around flex-col items-center py-3 text-center">
      <h2 className="py-4 max-w-[200px] text-center uppercase text-md drop-shadow-2xl tracking-[.20em] font-roboto-mono font-bold">
        {t.rich(`home.enjoy.card.title`, {
          large: (chunks) => <span className="text-xl">{chunks}</span>,
        })}
      </h2>
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
  );
};

const GalleryImage = ({
  src,
  alt,
  width = 100,
  height = 300,
  className = "rounded w-2/6 h-auto sm:w-1/2 sm:h-auto m-0.5 sm:m-1",
}) => (
  <Image
    src={src}
    alt={alt}
    width={width}
    height={height}
    className={className}
  />
);

const PaginationRect = ({ isActive }) => (
  <div
    className={`self-center ml-2 transition-all ease-in duration-200 transform group-hover:translate-x-1.5 w-2 h-2 rounded-full ${
      isActive ? "bg-[#9A592D]" : "bg-white"
    }`}
  ></div>
);

export const Gallery = () => {
  const t = useTranslations();
  const [currentPage, setCurrentPage] = useState(0);

  const handlers = useSwipeable({
    onSwipedLeft: () => setCurrentPage((currentPage + 1) % 4),
    onSwipedRight: () => setCurrentPage((currentPage - 1 + 4) % 4),
    trackMouse: true,
    delta: 10,
    preventScrollOnSwipe: false,
    trackTouch: true,
    rotationAngle: 0,
    swipeDuration: Infinity,
    touchEventOptions: { passive: true },
  });

  const imageSources = [
    "/gal1.jpg",
    "/gal2.jpg",
    "/gal3.jpg",
    "/gal4.jpg",
    "/gal5.jpg",
    "/gal6.jpg",
    "/gal7.jpg",
    "/gal8.jpg",
    "/gal9.jpg",
    "/gal10.jpg",
    "/gal11.jpg",
    "/gal12.jpg",
  ];

  const handleArrowClick = () => {
    setCurrentPage((currentPage + 1) % 4);
  };

  return (
    <div {...handlers} className="flex flex-col items-center py-3">
      <h2 className="py-4 max-w-[200px] text-center uppercase text-md drop-shadow-2xl tracking-[.20em] font-roboto-mono font-bold">
        {t.rich(`home.enjoy.gallery.title`, {
          large: (chunks) => <span className="text-xl">{chunks}</span>,
        })}
      </h2>
      <div className="flex justify-center w-5/6 justify-around min-h-[30vh]">
        {imageSources
          .slice(currentPage * 3, (currentPage + 1) * 3)
          .map((src, index) => (
            <GalleryImage
              key={index}
              src={src}
              alt={`Gallery Image ${index + 1}`}
            />
          ))}
      </div>
      <div className="flex justify-between lg:justify-around w-5/6 py-2">
        <div className="flex">
          {[0, 1, 2, 3].map((i) => (
            <PaginationRect key={i} isActive={i === currentPage} />
          ))}
        </div>
        <Link href="#" className="">
          {t("home.enjoy.gallery.button")}
        </Link>
        <Image
          onClick={handleArrowClick}
          src={"/arrow.svg"}
          alt="Arrow Icon"
          width={35}
          height={35}
          className="self-center ml-2 transition-all ease-in duration-200 transform hover:scale-110 active:translate-x-1.5 hidden lg:block"
        />
      </div>
    </div>
  );
};

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
      className={`carousel-item relative w-full h-full flex items-center justify-center text-white ${
        currentSlideId === slideId ? "flex" : "hidden"
      }`}
    >
      <div className=" ">
        <button
          onClick={() => setCurrentSlideId(prevSlideId)}
          className="btn btn-circle opacity-80"
        >
          ❮
        </button>
      </div>
      <div className="flex flex-col items-center justify-center bg-main-theme bg-opacity-20 backdrop-filter backdrop-blur-md rounded-xl p-6 space-y-4 w-full sm:w-4/5 md:w-2/3 lg:w-1/2 xl:w-1/3">
        <ul className="flex justify-center items-center relative">
          {Array.from({ length: rating }).map((_, i) => (
            <li key={`${name}-star-${i.toString()}`}>
              <span className="text-yellow-500 text-lg">★</span>
            </li>
          ))}
          <a
            className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"
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
        <div className="text-sm md:text-md lg:text-lg font-semibold overflow-auto relative max-h-[100px] scrollbar-hide">
          {text}
        </div>
        <div className="text-xs md:text-sm lg:text-lg">- {name}</div>
      </div>
      <div className="">
        <button
          onClick={() => setCurrentSlideId(nextSlideId)}
          className="btn btn-circle opacity-80"
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
  const [reviews, setReviews] = useState<ReviewData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [currentSlideId, setCurrentSlideId] = useState(1);

  useEffect(() => {
    fetch("/api/get-reviews")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setReviews(data))
      .catch((error) => setError(error.message));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center py-3">
      <h2 className="py-4 max-w-[200px] text-center uppercase text-md drop-shadow-2xl tracking-[.20em] font-roboto-mono font-bold">
        {t.rich(`home.enjoy.review.title`, {
          large: (chunks) => <span className="text-xl">{chunks}</span>,
        })}
      </h2>
      <div
        className="carousel w-full bg-cover bg-center min-h-[20rem] flex justify-center items-center"
        style={{ backgroundImage: `url("/gal7.jpg")` }}
      >
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
  );
};

export const Footer = () => {
  const t = useTranslations();
  return (
    <footer
      className="w-full bg-gradient-to-b from-main-theme to-white/25 py-3 px-4"
      role="contentinfo"
    >
      <div className="flex flex-col md:flex-row md:justify-evenly">
        <div className="flex flex-col justify-center mb-5">
          <h2 className="indent-5 md:max-w-[70%] lg:max-w-[75%] text-lg md:text-xl mb-5">
            {t("home.enjoy.footer.title")}
          </h2>
          <Link href="/foglalas">
            <button
              type="button"
              className="flex font-roboto-mono group transition-all ease-in duration-200 transform hover:scale-102"
            >
              <Image
                src={"/footerarrow.svg"}
                alt="Footer Arrow Icon"
                width={35}
                height={35}
                className="self-center transition-all ease-in duration-200 transform group-hover:translate-x-1 mx-1"
              />
              {t("home.enjoy.footer.button")}
            </button>
          </Link>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row md:justify-evenly gap-10 mb-5">
            <nav role="navigation">
              <h2 className="text-lg font-bold mb-2">
                {t("home.enjoy.footer.contact")}
              </h2>
              <div>
                <address className="mb-1">9400 Sopron, Kőhalom utca 40</address>
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
              <h2 className="text-lg font-bold mb-2">
                {t("home.enjoy.footer.navigation.title")}
              </h2>
              <ul>
                <li className="mb-1">
                  <Link href="/foglalas" className="underline">
                    {t("home.enjoy.footer.navigation.booking")}
                  </Link>
                </li>
                <li className="mb-1">
                  <Link href="/galeria" className="underline">
                    {t("home.enjoy.footer.navigation.gallery")}
                  </Link>
                </li>
                <li>
                  <Link href="/kapcsolat" className="underline">
                    {t("home.enjoy.footer.navigation.contact")}
                  </Link>
                </li>
              </ul>
            </nav>
            <nav role="navigation">
              <h2 className="text-lg font-bold mb-2">
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
            <div className="bg-white bg-opacity-40 w-full h-px mb-1"></div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <a
                  href="https://www.instagram.com/your_page/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image
                    src={"/instagram.svg"}
                    alt="Link to our Instagram page"
                    width={15}
                    height={15}
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
                    width={13}
                    height={13}
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
                    width={15}
                    height={15}
                  />
                </a>
              </div>
              <div className="flex gap-2">
                <Image
                  src={"/PayPal.svg"}
                  alt="We accept PayPal"
                  width={28}
                  height={28}
                />
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
        </div>
      </div>
      <div className="flex justify-center py-10">
        <small>{t("home.enjoy.footer.information.copyright")}</small>
      </div>
    </footer>
  );
};
