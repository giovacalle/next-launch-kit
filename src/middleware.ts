import createMiddleware from 'next-intl/middleware';
import { type NextRequest } from 'next/server';

import { routing } from '@/i18n/routing';
import { authMiddleware } from '@/middlewares/auth-middleware';
import { csrfMiddleware } from '@/middlewares/crsf-middleware';
import { maintenanceMiddleware } from '@/middlewares/maintenance-middleware';

export async function middleware(request: NextRequest) {
  const maintenance = maintenanceMiddleware(request);
  if (maintenance) return maintenance;

  const crsf = csrfMiddleware(request);
  if (crsf) return crsf;

  const auth = authMiddleware(request);
  if (auth) return auth;

  const response = createMiddleware(routing)(request);
  return response;
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
