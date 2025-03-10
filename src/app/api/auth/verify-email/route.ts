import { NextRequest } from 'next/server';

import { i18nError } from '@/core/types';
import { verifyEmailUseCase } from '@/core/use-cases/users';

import { rateLimitByIp } from '@/lib/rate-limit';

import { Locale } from '@/i18n/routing';

export async function GET(request: NextRequest): Promise<Response> {
  try {
    await rateLimitByIp({ key: 'verify-email', limit: 5, interval: 60000 });

    const token = request.nextUrl.searchParams.get('token');

    if (!token) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/sign-in'
        }
      });
    }

    const locale = (request.nextUrl.searchParams.get('locale') ?? 'en') as Locale;

    await verifyEmailUseCase(token, locale);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/sign-up/verify-email/?verified=true'
      }
    });
  } catch (err) {
    if (err instanceof i18nError) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/sign-up/verify-email/?code=${encodeURIComponent(err.code)}`
        }
      });
    }

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/sign-in'
      }
    });
  }
}
