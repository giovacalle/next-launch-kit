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

  const protectedPathsRegex = new RegExp(
    `(${PROTECTED_PATHS.map(path => path.replace(/\//g, '\\/')).join('|')})`
  );

  if (protectedPathsRegex.test(pathname)) return NextResponse.redirect(new URL('/', request.url));

  return null;
}

const PROTECTED_PATHS = [
  '/sign-in',
  '/accedi',
  '/sign-in/magic-link',
  '/accedi/magic-link',
  '/sign-in/forgot-password',
  '/accedi/password-dimenticata',
  '/sign-in/reset-password',
  '/accedi/reset-password',
  '/sign-up',
  '/registrati'
];
