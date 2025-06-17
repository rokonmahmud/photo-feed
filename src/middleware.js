import { NextResponse } from "next/server";
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'

let defaultLocale = 'en'
let locales = ['bn', 'en']

function getLocale(request) {
  const acceptedLanguage = request.headers.get('accept-language') ?? undefined
  let headers = { 'accept-language': acceptedLanguage }
  let languages = new Negotiator({ headers }).languages()

  console.log("Detected languages:", languages);

  return match(languages, locales, defaultLocale) // e.g. 'en'
}

export function middleware(request) {
  console.log('middleware is running')
  const pathname = request.nextUrl.pathname
  console.log(pathname)
  const pathnameIsMissingLocale = locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  )

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request)
    const redirectUrl = new URL(`/${locale}${pathname}`, request.url)

    console.log("Redirecting to:", redirectUrl.toString())

    return NextResponse.redirect(redirectUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api|assets|.*\\..*|_next).*)'
  ],
} 


