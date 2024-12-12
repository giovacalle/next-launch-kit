import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { SESSION_COOKIE_NAME } from './lib/session';

export async function middleware(request: NextRequest) {
  // not the best way to check if user is logged in but in middleware we can't access db to check session status
  const isLogged = request.cookies.has(SESSION_COOKIE_NAME);

  // if user already logged in, redirect to home page
  if (isLogged) return NextResponse.redirect(new URL('/', request.url));

  return NextResponse.next();
}

export const config = {
  matcher: ['/sign-in/:path*', '/sign-up/:path*', '/api/auth/:path*']
};
