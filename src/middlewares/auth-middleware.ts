import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { SESSION_COOKIE_NAME } from '@/lib/session';

export function authMiddleware(request: NextRequest): NextResponse | null {
  if (request.method !== 'GET') return null;

  // not the best way to check if user is logged in but in middleware we can't access db to check session status
  const isAuthenticated = request.cookies.has(SESSION_COOKIE_NAME);

  // if not authenticated, continue to next middleware
  if (!isAuthenticated) return null;

  // if authenticated, we hide some pages
  const { pathname } = request.nextUrl;

  const matcher = /^\/(sign-in|sign-up|api\/auth)(\/.*|$)/;
  if (matcher.test(pathname)) return NextResponse.redirect(new URL('/', request.url));

  return null;
}
