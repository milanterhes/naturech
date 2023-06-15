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
import LocaleSwitcher from "./LocaleSwitcher";
import { useTranslations } from "next-intl";
import Login from "./Auth";
import { useState } from "react";

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
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export const Hero: React.FC = () => {
  const t = useTranslations();
  return (
    <div className="relative min-h-[65vh]">
      <div className="absolute w-full h-full z-0">
        <Image
          src={bgPic}
          alt="profile"
          fill
          className="object-cover brightness-75"
        />
      </div>
      <div className="flex justify-center py-24 px-12 text-center">
        <h1 className="uppercase text-3xl  font-bowlby drop-shadow-2xl tracking-[.25em]">
          {t(`home.hero`)}
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
          } rounded-[5px] drop-shadow-2xl aspect-[4/3]`}
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
          <div className="absolute bg-black bg-opacity-50 flex items-center justify-center h-full w-full text-white text-center">
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
    <div className="flex justify-center flex-col items-center py-3">
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
