import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, getLocale, locales } from "./lib/i18n";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  const locale = getLocale(request);

  if (pathnameHasLocale) {
    return;
  }

  // hide default locale from url: instead of /en/my-page use /my-page
  if (locale === defaultLocale) {
    return NextResponse.rewrite(new URL(`${locale}${pathname}`, request.url));
  }

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    "/src/app",
  ],
};
