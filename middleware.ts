// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ar'];
const defaultLocale = 'en';

export function middleware(request: NextRequest) {
  // Get the pathname from the request
  const { pathname } = request.nextUrl;

  // Check if the pathname already has a language prefix (e.g., /ar/about)
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If the path already has a locale, do nothing.
  if (pathnameHasLocale) return;

  // If the path does *not* have a locale, determine the default and redirect if necessary.
  // In this case, our default is 'en', so we just rewrite the URL internally to /en/...
  // The user will still see the clean URL (e.g., /about) in their browser.
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.rewrite(request.nextUrl);
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)'
    // Optional: only run on root (/) URL
    // '/'
  ],
};