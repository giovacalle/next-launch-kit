'use client';

import { trpc } from '@/lib/trpc/client';

export function TestTrpc() {
  const [data] = trpc.helloThere.useSuspenseQuery();

  return <div>{data}</div>;
}
