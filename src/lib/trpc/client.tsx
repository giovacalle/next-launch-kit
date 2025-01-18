'use client';

import { useState } from 'react';

import { QueryClientProvider } from '@tanstack/react-query';
import { httpBatchLink } from '@trpc/client';
import { createTRPCReact } from '@trpc/react-query';

import { createQueryClient } from './init';
import { AppRouter } from './router';

export const trpc = createTRPCReact<AppRouter>();

function getUrl() {
  if (typeof window !== 'undefined') return '/api/trpc';
  return `${process.env.BASE_URL}/api/trpc`;
}

const clientQueryClientSingleton = createQueryClient();

export function TRPCProvider(
  props: Readonly<{
    children: React.ReactNode;
  }>
) {
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: getUrl()
        })
      ]
    })
  );

  return (
    <trpc.Provider client={trpcClient} queryClient={clientQueryClientSingleton}>
      <QueryClientProvider client={clientQueryClientSingleton}>
        {props.children}
      </QueryClientProvider>
    </trpc.Provider>
  );
}
