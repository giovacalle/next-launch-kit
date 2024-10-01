import { headers } from 'next/headers';

const CLEANUP_INTERVAL = 1000 * 60; // 1 minute

export function getIp() {
  const forwardedFor = headers().get('x-forwarded-for');
  const realIp = headers().get('x-real-ip');

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
      return Promise.reject(new Error(`Rate limit exceeded for key: ${key}`));
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
  const ip = getIp();

  if (!ip) throw new Error('Rate limit exceeded (ip)');

  const limitReq = rateLimit(limit, interval);

  await limitReq(`${key}-${ip}`);
}
