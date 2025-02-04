import { NextRequest } from 'next/server';

import { signInUseCase } from '@/core/use-cases/magic-links';

import { rateLimitByIp } from '@/lib/rate-limit';
import { setSession } from '@/lib/session';

export async function GET(request: NextRequest): Promise<Response> {
  try {
    await rateLimitByIp({ key: 'magic-token', limit: 5, interval: 60000 });

    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/sign-in'
        }
      });
    }

    const user = await signInUseCase(token);

    await setSession(user.id);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/dashboard'
      }
    });
  } catch {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/sign-in/error'
      }
    });
  }
}
