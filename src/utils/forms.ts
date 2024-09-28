import { ZodObject, ZodRawShape, z } from 'zod';

export function addHoneyPot<T extends ZodRawShape>(schema: ZodObject<T>) {
  return schema.extend({
    accept: z.literal('') // honeypot fake field, if is empty it's not a bot
  });
}
