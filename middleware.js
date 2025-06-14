import { NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';

const locales = ['en', 'bn'];
const defaultLocale = 'en';

function getLocale(request) {
  const acceptLanguage = request.headers.get('accept-language') || '';
  const languages = acceptLanguage.split(',').map(lang => lang.split(';')[0]);
  return match(languages, locales, defaultLocale);
}

export function middleware(request) {
  const pathname = new URL(request.url).pathname;

  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}`)
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/((?!api|_next|.*\\..*).*)',
  ],
};