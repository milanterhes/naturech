import {
  Bars3Icon,
  CalendarDaysIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import bgPic from "../public/background.jpeg";
import introPic from "../public/intro.png";
import logoPic from "../public/naturechill-logo.png";
import leafPic from "../public/leaf.png";
import service4Pic from "../public/service4.png";
import LocaleSwitcher from "./LocaleSwitcher";
import { useTranslations } from "next-intl";
import { useState, FC, useEffect } from "react";
import Link from "next/link";

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
  return (
    <div className="w-full px-4 py-2 z-10 fixed top-0 flex justify-between items-center">
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
          <div className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            <ul>
              {/* Sidebar content here */}
              <li>
                <a className="text-main-theme font-bold">
                  <CalendarDaysIcon className="h-4 w-4" />
                  Foglalás
                </a>
              </li>
              <div className="divider" />
              <li>
                <a className="text-main-theme font-bold">
                  <UserCircleIcon className="h-4 w-4" />
                  Bejelentkezés
                </a>
              </li>
            </ul>
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
};

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
          {t("home.hero")}
        </h1>
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
      <div className="flex justify-around">
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
        {!showDetails ? (
          <div className="absolute flex flex-col gap-5">
            <h2>{title}</h2>
            <div className="flex justify-center gap-3 py-5">
              {icons.map((icon, i) => (
                <ServiceIcon key={i} src={icon.src} alt={icon.alt} />
              ))}
            </div>
            <Image
              src={"/servicearrow.svg"}
              alt="Arrow Icon Service Card"
              width={20}
              height={20}
              className="self-center ml-2 transition-all ease-in duration-200 transform hover:scale-110 hover:rotate-3 cursor-pointer"
              onClick={handleArrowClick}
            />
          </div>
        ) : (
          <div className="absolute bg-black bg-opacity-50 flex items-center justify-center h-full w-full text-white text-center rounded-lg">
            <p className="text-lg">{details}</p>
          </div>
        )}
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
    title: "Kényelmi szolgáltatások",
    details: "Valami1",
  },
  {
    servicePic: "/service2.png",
    icons: [
      { src: "/Terrace.svg", alt: "Terrace Icon" },
      { src: "/Jacuzzi.svg", alt: "Jacuzzi Icon" },
    ],
    title: "Felszereltség",
    details: "Valami2",
  },
  {
    servicePic: "/service3.png",
    icons: [
      { src: "/Coffee.svg", alt: "Coffee Icon" },
      { src: "/Wine.svg", alt: "Wine Icon" },
    ],
    title: "Ellátás",
    details: "Valami3",
  },
  {
    servicePic: "/service4.png",
    icons: [
      { src: "/Chess.svg", alt: "Chess Icon" },
      { src: "/Tour.svg", alt: "Tour Icon" },
    ],
    title: "Szabadidos tevékenységek",
    details: "Valami4",
  },
];

export const Services = () => {
  const t = useTranslations();

  return (
    <div className="flex justify-center flex-col items-center py-3 text-center">
      <h2 className="py-4 max-w-[200px] text-center uppercase text-md drop-shadow-2xl tracking-[.20em] font-roboto-mono font-bold">
        {t.rich(`home.enjoy.card.title`, {
          large: (chunks) => <span className="text-xl">{chunks}</span>,
        })}
      </h2>
      {services.map((service, i) => (
        <ServiceCard key={i} {...service} />
      ))}
    </div>
  );
};

const GalleryImage = ({
  src,
  alt,
  width = 90,
  height = 300,
  className = "rounded",
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
    <div className="flex flex-col items-center py-3">
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
      <div className="flex justify-around w-3/4 py-2">
        <div className="flex">
          {[0, 1, 2, 3].map((i) => (
            <PaginationRect key={i} isActive={i === currentPage} />
          ))}
        </div>
        <Link href="#" className="">
          összes
        </Link>
        <Image
          onClick={handleArrowClick}
          src={"/arrow.svg"}
          alt="Arrow Icon"
          width={35}
          height={35}
          className="self-center ml-2 transition-all ease-in duration-200 transform hover:scale-110 active:translate-x-1.5"
        />
      </div>
    </div>
  );
};

type ReviewProps = {
  name: string;
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
      <div className="absolute left-5 top-1/2 transform -translate-y-1/2">
        <button
          onClick={() => setCurrentSlideId(prevSlideId)}
          className="btn btn-circle opacity-80"
        >
          ❮
        </button>
      </div>
      <div className="flex flex-col bg-main-theme bg-opacity-20 backdrop-filter backdrop-blur-md rounded-xl p-6 text-center space-y-4 w-3/6 sm:w-4/6 h-[150px]">
        <div className="text-lg font-semibold">{text}</div>
        <div className="text-base">{name}</div>
      </div>
      <div className="absolute right-5 top-1/2 transform -translate-y-1/2">
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
  return (
    <footer
      className="w-full bg-gradient-to-b from-main-theme to-white/25 py-3 px-4"
      role="contentinfo"
    >
      <div className="flex flex-col md:flex-row md:justify-evenly">
        <div className="flex flex-col justify-center mb-5">
          <h2 className="indent-5 md:max-w-[29%] text-lg mb-5">
            A természet és a luxus tökéletes egyensúlya - Nature & Chill faházak
          </h2>
          <button
            type="button"
            className="flex font-roboto-mono group transition-all ease-in duration-200 transform hover:scale-102"
          >
            <Image
              src={"/footerarrow.svg"}
              alt="Footer Arrow Icon"
              width={35}
              height={35}
              className="self-center transition-all ease-in duration-200 transform group-hover:translate-x-1 mx-2"
            />
            Foglalás
          </button>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col md:flex-row md:justify-evenly gap-10 mb-5">
            <nav role="navigation">
              <h2 className="text-lg font-bold mb-2">Kapcsolat</h2>
              <div>
                <p className="mb-1">9400 Sopron, Kőhalom utca 40</p>
                <p className="mb-1">
                  <a href="tel:+36703928177" className="underline">
                    +36 70 392 8177
                  </a>
                </p>
                <p>
                  <a href="mailto:nc3houses@gmail.com" className="underline">
                    nc3houses@gmail.com
                  </a>
                </p>
              </div>
            </nav>
            <nav role="navigation">
              <h2 className="text-lg font-bold mb-2">Oldalak</h2>
              <ul>
                <li className="mb-1">
                  <a href="/foglalas" className="underline">
                    Foglalás
                  </a>
                </li>
                <li className="mb-1">
                  <a href="/galeria" className="underline">
                    Galéria
                  </a>
                </li>
                <li>
                  <a href="/kapcsolat" className="underline">
                    Kapcsolat
                  </a>
                </li>
              </ul>
            </nav>
            <nav role="navigation">
              <h2 className="text-lg font-bold mb-2">Információ</h2>
              <ul>
                <li className="mb-1">
                  <a href="/aszf" className="underline">
                    ÁSZF
                  </a>
                </li>
                <li>
                  <a href="/adatvedelmi-tajekoztato" className="underline">
                    Adatvédelmi tájékoztató
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="flex flex-col">
            <div className="bg-white bg-opacity-40 w-full h-px mb-1"></div>
            <div className="flex justify-between">
              <div className="flex gap-2">
                <Image
                  src={"/instagram.svg"}
                  alt="Link to our Instagram page"
                  width={15}
                  height={15}
                  className=""
                />
                <Image
                  src={"/facebook.svg"}
                  alt="Link to our Facebook page"
                  width={13}
                  height={13}
                  className=""
                />
                <Image
                  src={"/tiktok.svg"}
                  alt="Link to our TikTok page"
                  width={15}
                  height={15}
                  className=""
                />
              </div>
              <div className="flex gap-2">
                <Image
                  src={"/PayPal.svg"}
                  alt="Footer PayPal Icon"
                  width={28}
                  height={28}
                />
                <Image
                  src={"/Visa.svg"}
                  alt="Footer Visa Icon"
                  width={28}
                  height={28}
                />
                <Image
                  src={"/Mastercard.svg"}
                  alt="Footer Mastercard Icon"
                  width={28}
                  height={28}
                />
                <Image
                  src={"/Maestro.svg"}
                  alt="Footer Maestro Icon"
                  width={28}
                  height={28}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center py-10">
        <small>© 2023 Nature & Chill | Minden jog fentartva</small>
      </div>
    </footer>
  );
};
