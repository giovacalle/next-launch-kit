import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

if (process.env.NODE_ENV !== 'production') {
  config({ path: '.env.example' });
}

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  },
  out: './.drizzle'
});
