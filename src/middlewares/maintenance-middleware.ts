import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function maintenanceMiddleware(request: NextRequest): NextResponse | null {
  if (process.env.MAINTENANCE_MODE !== '1') return null;

  const { pathname } = request.nextUrl;

  const maintenancePathsRegex = new RegExp(
    `(${MAINTENANCE_PATHS.map(path => path.replace(/\//g, '\\/')).join('|')})`
  );

  if (!maintenancePathsRegex.test(pathname))
    return NextResponse.redirect(new URL('/maintenance', request.url));

  return null;
}

const MAINTENANCE_PATHS = ['/maintenance', '/manutenzione'];
