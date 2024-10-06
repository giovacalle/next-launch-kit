import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // not the best way to check if user is logged in but in middleware we can't access db to check session status
  const isLogged = request.cookies.has('auth-session');

  // if user already logged in, redirect to home page
  if (isLogged) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/sign-in/:path*', '/sign-up/:path*', '/api/auth/:path*']
};
