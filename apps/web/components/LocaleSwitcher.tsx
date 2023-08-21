import { useRouter } from "next/router";
import Link from "next/link";

export default function LocaleSwitcher() {
  const router = useRouter();
  const flagComponents = {
    en: (
      <img
        width="16"
        alt="UK flag"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Nuvola_United_Kingdom_flag.svg/32px-Nuvola_United_Kingdom_flag.svg.png"
      />
    ),
    de: (
      <img
        width="16"
        alt="German flag"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Nuvola_German_flag.svg/32px-Nuvola_German_flag.svg.png"
      />
    ),
    hu: (
      <img
        width="16"
        alt="Hungary flag"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Nuvola_Hungary_flag.svg/32px-Nuvola_Hungary_flag.svg.png"
      />
    ),
  };

  return (
    <div>
      <ul className="flex md:gap-5 md:items-center">
        {router.locales
          ?.filter((locale) => locale !== "default")
          .map((locale) => {
            return (
              <li key={locale}>
                <Link href={router.asPath} locale={locale} passHref>
                  <span>{flagComponents[locale]}</span>
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
