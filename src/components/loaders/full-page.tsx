'use client';

import { useEffect } from 'react';

import { Icon } from '@iconify/react';

export function FullPageLoading() {
  useEffect(() => {
    document.body.classList.add('overflow-hidden');

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 z-9999 flex h-full w-full flex-col items-center justify-center bg-black/80">
      <Icon icon="mdi:loading" width={100} height={100} color="white" className="animate-spin" />
    </div>
  );
}
