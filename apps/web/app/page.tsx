import Image from "next/image";
import bgPic from "../public/background.jpeg";
import logoPic from "../public/naturechill-logo.png";
import {
  Bars3Icon,
  CalendarDaysIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";

const Navbar: React.FC = () => {
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
          <ul className="menu p-4 w-80 h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <a className="text-main-theme font-bold">
                <CalendarDaysIcon className="h-4 w-4" />
                Foglalás
              </a>
            </li>
            <div className="divider"></div>
            <li>
              <a className="text-main-theme font-bold">
                <UserCircleIcon className="h-4 w-4" />
                Bejelentkezés
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <main>
      <Navbar />
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
          <h1 className="uppercase text-3xl text-white font-bowlby drop-shadow-2xl tracking-[.25em]">
            Erdei Éden Balfon
          </h1>
        </div>
      </div>
      <div className="bg-main-theme h-[760px]">Test lol</div>
    </main>
  );
}
