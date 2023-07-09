import { usePathname } from "next/navigation";
import Link from "next/link";
import { i18n } from "../i18n-config";

export default function LocaleSwitcher() {
  const pathName = usePathname();
  const redirectedPathName = (locale: string) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  const flagComponents = {
    en: <img width="10" alt="UK flag" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Nuvola_United_Kingdom_flag.svg/32px-Nuvola_United_Kingdom_flag.svg.png" />,
    de: <img width="10" alt="German flag" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Nuvola_German_flag.svg/32px-Nuvola_German_flag.svg.png" />,
    hu: <img width="10" alt="Hungary flag" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Nuvola_Hungary_flag.svg/32px-Nuvola_Hungary_flag.svg.png" />,
  };

  return (
    <div>
      <ul className="md:flex gap-5 items-center">
        {i18n.locales.map((locale) => {
          return (
            <li key={locale}>
              <Link href={redirectedPathName(locale)} passHref>
                <span>{flagComponents[locale]}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
