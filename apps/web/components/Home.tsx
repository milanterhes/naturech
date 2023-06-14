import {
  Bars3Icon,
  CalendarDaysIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import bgPic from "../public/background.jpeg";
import introPic from "../public/intro.png";
import logoPic from "../public/naturechill-logo.png";
import LocaleSwitcher from "./LocaleSwitcher";
import { useTranslations } from "next-intl";
import Login from "./Auth";

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
    <div className="flex justify-center flex-col items-center py-3 px-6">
      <h2 className="py-4 max-w-[200px] text-center uppercase text-md drop-shadow-2xl tracking-[.20em] font-roboto-mono font-bold">
        {t(`home.enjoy.title`)}
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
    </div>
  );
};
