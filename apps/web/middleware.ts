import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { i18n } from "./i18n-config";

import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

const PUBLIC_FILE = /\.(.*)$/;

function getLocale(request: NextRequest): string | undefined {
  // Negotiator expects plain object so we need to transform headers
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // Use negotiator and intl-localematcher to get best locale
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;
  return matchLocale(languages, locales, i18n.defaultLocale);
}

export async function middleware(req: NextRequest) {
  if (
    req.nextUrl.pathname.startsWith("/_next") ||
    req.nextUrl.pathname.includes("/api/") ||
    PUBLIC_FILE.test(req.nextUrl.pathname)
  ) {
    return;
  }

  if (req.nextUrl.locale === "default") {
    const locale = getLocale(req);

    console.log(locale);

    return NextResponse.redirect(
      new URL(`/${locale}${req.nextUrl.pathname}${req.nextUrl.search}`, req.url)
    );
  }
}
