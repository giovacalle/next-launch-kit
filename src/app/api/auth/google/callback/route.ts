import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import { getUserProviderWithGoogleId } from '@/core/data-source/users-providers';
import { GoogleUser } from '@/core/types';
import { createUserWithGoogleUseCase } from '@/core/use-cases/users';

import { google } from '@/lib/auth';
import { rateLimitByIp } from '@/lib/rate-limit';
import { setSession } from '@/lib/session';

import { OAuth2RequestError } from 'arctic';

export async function GET(request: NextRequest): Promise<Response> {
  try {
    await rateLimitByIp({ key: 'google-callback', limit: 5, interval: 60000 });

    const cookieStore = await cookies();

    const error = request.nextUrl.searchParams.get('error');
    if (error) {
      // something went wrong: could be user denied access
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/sign-in'
        }
      });
    }

    const code = request.nextUrl.searchParams.get('code');
    const state = request.nextUrl.searchParams.get('state');
    const stateCookie = cookieStore.get('google_oauth_state')?.value ?? null;
    const codeCookie = cookieStore.get('google_code_verifier')?.value ?? null;

    if (!code || !state || !stateCookie || state !== stateCookie || !codeCookie) {
      return new Response(null, {
        status: 400
      });
    }

    const { accessToken } = await google.validateAuthorizationCode(code, codeCookie);
    const googleResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const googleUser = (await googleResponse.json()) as GoogleUser;

    const user = await getUserProviderWithGoogleId(googleUser.sub);

    if (user) {
      await setSession(user.user_id);
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/dashboard'
        }
      });
    }

    const { id } = await createUserWithGoogleUseCase(googleUser);

    await setSession(id);
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/dashboard'
      }
    });
  } catch (err) {
    if (err instanceof OAuth2RequestError) {
      // invalid code
      return new Response(null, {
        status: 400
      });
    }

    return new Response(null, {
      status: 500
    });
  }
}
