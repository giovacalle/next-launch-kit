import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

import * as schema from '@/db/schema';

declare global {
  // eslint-disable-next-line no-var
  var client: ReturnType<typeof createInstance> | null;
}

const createInstance = () => {
  // Disable prefetch as it is not supported for "Transaction" pool mode
  return postgres(process.env.DATABASE_URL!, {
    prepare: false,
    idle_timeout: 30, // 30 seconds
    max_lifetime: 60 * 30 // 30 minutes
  });
};

let client: ReturnType<typeof createInstance> | null = null;

if (process.env.NODE_ENV === 'production') {
  client = createInstance();
} else {
  if (!global.client) global.client = createInstance();
  client = global.client;
}

export const db = drizzle(client!, { schema });
