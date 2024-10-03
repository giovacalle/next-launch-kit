import { randomBytes } from 'crypto';
import { PgTransactionConfig } from 'drizzle-orm/pg-core';

import { db } from '@/db/config';

export function generateRandomToken(length: number): Promise<string> {
  return new Promise((resolve, reject) => {
    randomBytes(Math.ceil(length / 2), (err, buffer) => {
      if (err) {
        return reject(err);
      }
      resolve(buffer.toString('hex').slice(0, length));
    });
  });
}

export async function dbTransaction(
  cb: (tx: typeof db) => Promise<unknown>,
  config?: PgTransactionConfig
) {
  await db.transaction(cb, config);
}
