import { headers } from 'next/headers';

import { RateLimitError } from '@/core/types';

const CLEANUP_INTERVAL = 1000 * 60; // 1 minute

// NOTE: Keep in mind that this rate limiter only works when deploying to a single VPS instance (which is what we are doing in this kit).
//       For more information, read the README.md.

export async function getIp() {
  const headersList = await headers();

  const forwardedFor = headersList.get('x-forwarded-for');
  const realIp = headersList.get('x-real-ip');

  if (forwardedFor) return forwardedFor.split(',')[0].trim();

  if (realIp) return realIp.trim();

  return null;
}

export function rateLimit(limit: number, interval: number) {
  const callTracker: { [key: string]: { counter: number; expiresAt: number } } = {};

  const cleanup = () => {
    const now = Date.now();
    for (const key in callTracker) {
      if (callTracker[key].expiresAt <= now) {
        delete callTracker[key];
      }
    }
  };

  // Automatically clean up expired keys every Xms (defined in const)
  setInterval(cleanup, CLEANUP_INTERVAL);

  return async function (key: string) {
    const now = Date.now();

    // Initialize the key if not present or if the expiration has passed
    if (!callTracker[key] || callTracker[key].expiresAt <= now) {
      callTracker[key] = { counter: 0, expiresAt: now + interval };
    }

    // Check if the limit has been reached
    if (callTracker[key].counter < limit) {
      callTracker[key].counter++;
      return Promise.resolve();
    } else {
      // If limit is reached, reject the call
      return Promise.reject(new RateLimitError(`Rate limit exceeded for key: ${key}`));
    }
  };
}

export async function rateLimitByKey({
  key = 'app',
  limit = 1,
  interval = 5000
}: {
  key?: string;
  limit?: number;
  interval?: number;
}) {
  const limitReq = rateLimit(limit, interval);
  await limitReq(key);
}

export async function rateLimitByIp({
  key = 'app',
  limit = 1,
  interval = 5000
}: {
  key?: string;
  limit?: number;
  interval?: number;
}) {
  const ip = await getIp();

  if (!ip) throw new RateLimitError();

  const limitReq = rateLimit(limit, interval);

  await limitReq(`${key}-${ip}`);
}
