import { cookies } from 'next/headers';

import { generateCodeVerifier, generateState } from 'arctic';

import { google } from '@/lib/auth';
import { rateLimitByIp } from '@/lib/rate-limit';

export async function GET(): Promise<Response> {
  try {
    await rateLimitByIp({ key: 'google', limit: 5, interval: 60000 });

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
  } catch (err) {
    console.error(err);

    return new Response(null, {
      status: 302,
      headers: {
        Location: '/sign-in'
      }
    });
  }
}
