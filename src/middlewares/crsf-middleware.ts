import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function csrfMiddleware(request: NextRequest): NextResponse | null {
  if (request.method === 'GET') return null;

  const originHeader = request.headers.get('Origin');
  const hostHeader = request.headers.get('Host') || request.headers.get('X-Forwarded-Host');

  if (originHeader === null || hostHeader === null) {
    return new NextResponse(null, {
      status: 403
    });
  }

  let origin: URL;

  try {
    origin = new URL(originHeader);
  } catch {
    return new NextResponse(null, {
      status: 403
    });
  }

  if (origin.host !== hostHeader) {
    return new NextResponse(null, {
      status: 403
    });
  }

  return null;
}
