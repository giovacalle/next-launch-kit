import { Suspense } from 'react';

import { HydrateClient, trpc } from '@/lib/trpc/server';

import { TestTrpc } from './_components/test-trpc';

export default function Dashboard() {
  void trpc.helloThere.prefetch();

  return (
    <HydrateClient>
      <div>
        <h1>Overview</h1>
        <Suspense fallback="loading...">
          <TestTrpc />
        </Suspense>
      </div>
    </HydrateClient>
  );
}
