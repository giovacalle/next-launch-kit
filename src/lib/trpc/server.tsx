import 'server-only';

import { cache } from 'react';

import { createHydrationHelpers } from '@trpc/react-query/rsc';

import { createCallerFactory, createQueryClient, createTRPCContext } from './init';
import { AppRouter, appRouter } from './router';

const getQueryClient = cache(createQueryClient);
const caller = createCallerFactory(appRouter)(createTRPCContext);
// @ts-expect-error broken types i think
export const { trpc, HydrateClient } = createHydrationHelpers<AppRouter>(caller, getQueryClient);
