import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { SESSION_COOKIE_NAME } from '@/lib/session';

const PROTECTED_PATHS = ['/dashboard'];
const LOGIN_PATHS = ['/sign-in', '/accedi', '/sign-up', '/registrati'];

export function authMiddleware(request: NextRequest): NextResponse | null {
  if (request.method !== 'GET') return null;

  const { pathname } = request.nextUrl;

  /* 
    In Next.js middleware, it's recommended to only check for the existence of a session cookie to handle redirection. 
    To avoid blocking requests by making API or database calls.
    BUT keep in mind that this is just a 'easy check', you should add a session verification in each route that needs it.
  */
  const isAuthenticated = request.cookies.has(SESSION_COOKIE_NAME);

  // if not authenticated, hide some pages
  if (!isAuthenticated) {
    const protectedPathsRegex = new RegExp(
      `^(${PROTECTED_PATHS.map(path => path.replace(/\//g, '\\/')).join('|')})`
    );

    if (protectedPathsRegex.test(pathname))
      return NextResponse.redirect(new URL('/sign-in', request.url));

    return null;
  }

  // if authenticated, we hide all login pages
  const protectedPathsRegex = new RegExp(
    `^(${LOGIN_PATHS.map(path => path.replace(/\//g, '\\/')).join('|')})`
  );

  if (protectedPathsRegex.test(pathname)) return NextResponse.redirect(new URL('/', request.url));

  return null;
}
