import { cookies } from 'next/headers';

import { MODE } from '@/core/consts';

import { getCurrentUser, google } from '@/lib/auth';
import { rateLimitByIp } from '@/lib/rate-limit';

import { generateCodeVerifier, generateState } from 'arctic';

export async function GET(): Promise<Response> {
  try {
    await rateLimitByIp({ key: 'google', limit: 5, interval: 60000 });

    // block google sign-in when the app is not in live mode
    if (MODE !== 'live') {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/'
        }
      });
    }

    // redirect to the sign-in page if the user is already signed in
    const user = await getCurrentUser();
    if (user) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: '/sign-in'
        }
      });
    }

    const state = generateState();
    const codeVerifier = generateCodeVerifier();

    const googleRedirectUrl = await google.createAuthorizationURL(state, codeVerifier, {
      scopes: ['email', 'profile']
    });

    const cookieStore = await cookies();

    cookieStore.set('google_oauth_state', state, {
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      httpOnly: true,
      maxAge: 60 * 10
    });

    cookieStore.set('google_code_verifier', codeVerifier, {
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      httpOnly: true,
      maxAge: 60 * 10
    });

    return Response.redirect(googleRedirectUrl);
  } catch {
    return new Response(null, {
      status: 302,
      headers: {
        Location: '/sign-in'
      }
    });
  }
}
