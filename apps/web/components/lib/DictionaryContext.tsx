"use client";

import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IDictionary, getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";
export interface IDictionaryState {
  dictionary: IDictionary | null;
  locale: Locale | null;
}

export const DictionaryContext = createContext<IDictionaryState>({
  dictionary: null,
  locale: null,
});

export const useDictionary = () => {
  const context = useContext(DictionaryContext);

  if (context === undefined) {
    throw new Error(
      "useDictionary must be used inside DictionaryContext.Provider"
    );
  }

  return context;
};

export const DictionaryContextProvider: React.FC<
  PropsWithChildren<{ locale: Locale; dictionary: IDictionary }>
> = ({ children, locale, dictionary }) => {
  console.log("provider", locale, dictionary);
  return (
    <DictionaryContext.Provider value={{ dictionary, locale }}>
      {children}
    </DictionaryContext.Provider>
  );
};
