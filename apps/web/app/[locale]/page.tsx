import { Hero, Intro, Navbar } from "../../components/Home";
import { DictionaryContextProvider } from "../../components/lib/DictionaryContext";
import { getDictionary } from "../../get-dictionary";
import { Locale } from "../../i18n-config";

export default async function Page({ params }: { params: { locale: Locale } }) {
  console.log("page", params);
  const dictionary = await getDictionary(params.locale);
  return (
    <DictionaryContextProvider locale={params.locale} dictionary={dictionary}>
      <main className="bg-main-theme text-white">
        <Navbar />
        <Hero />
        <Intro />
      </main>
    </DictionaryContextProvider>
  );
}
