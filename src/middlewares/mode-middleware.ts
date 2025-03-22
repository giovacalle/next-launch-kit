import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { MODE } from '@/core/consts';

const MAINTENANCE_PATHS = ['/maintenance', '/manutenzione'];
const COMING_SOON_PATHS = ['/', '/it'];

export function modeMiddleware(request: NextRequest): NextResponse | null {
  const { pathname } = request.nextUrl;

  switch (MODE) {
    case 'coming-soon':
      const comingSoonPathsRegex = new RegExp(
        `^(${COMING_SOON_PATHS.map(path => path.replace(/\//g, '\\/')).join('|')})$`
      );

      if (!comingSoonPathsRegex.test(pathname))
        return NextResponse.redirect(new URL('/', request.url));

      return null;
    case 'maintenance':
      const maintenancePathsRegex = new RegExp(
        `(${MAINTENANCE_PATHS.map(path => path.replace(/\//g, '\\/')).join('|')})`
      );

      if (!maintenancePathsRegex.test(pathname))
        return NextResponse.redirect(new URL('/maintenance', request.url));

      return null;
    default:
      return null;
  }
}
