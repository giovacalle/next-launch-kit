import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

import { OAuth2RequestError } from 'arctic';

import { getUserByGoogleId } from '@/core/data-source/users';
import { GoogleUser } from '@/core/types';
import { createUserWithGoogleUseCase } from '@/core/use-cases/users';
import { google } from '@/lib/auth';
import { setSession } from '@/lib/session';

export async function GET(request: NextRequest): Promise<Response> {
  const code = request.nextUrl.searchParams.get('code');
  const state = request.nextUrl.searchParams.get('state');
  const stateCookie = cookies().get('google_oauth_state')?.value ?? null;
  const codeCookie = cookies().get('google_code_verifier')?.value ?? null;

  if (!code || !state || !stateCookie || state !== stateCookie || !codeCookie) {
    return new Response(null, {
      status: 400
    });
  }

  try {
    const { accessToken } = await google.validateAuthorizationCode(code, codeCookie);
    const googleResponse = await fetch('https://openidconnect.googleapis.com/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const googleUser = (await googleResponse.json()) as GoogleUser;

    const user = await getUserByGoogleId(googleUser.sub);

    if (user) {
      await setSession(user.id);
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/'
        }
      });
    }

    const userId = await createUserWithGoogleUseCase(googleUser);

    await setSession(userId);
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/'
      }
    });
  } catch (err) {
    console.error(err);

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
