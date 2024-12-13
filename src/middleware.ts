import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { authMiddleware } from '@/middlewares/auth-middleware';
import { csrfMiddleware } from '@/middlewares/crsf-middleware';

export async function middleware(request: NextRequest) {
  const crsf = csrfMiddleware(request);
  if (crsf) return crsf;

  const auth = authMiddleware(request);
  if (auth) return auth;

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
};
