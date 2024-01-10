import Negotiator from "negotiator";
import { match } from "@formatjs/intl-localematcher";
import { NextRequest } from "next/server";

export const locales = ["en", "es"];
export const defaultLocale = "en";

export function getLocale(request: NextRequest) {
  const languages = new Negotiator({
    headers: Object.fromEntries(request.headers),
  }).languages();

  return match(languages, locales, defaultLocale);
}
