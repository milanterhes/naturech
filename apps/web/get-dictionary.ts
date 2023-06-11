import "server-only";
import type { Locale } from "./i18n-config";
import D from "./dictionaries/de.json";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  de: () => import("./dictionaries/de.json").then((module) => module.default),
  hu: () => import("./dictionaries/hu.json").then((module) => module.default),
};

export type IDictionary = typeof D;

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
