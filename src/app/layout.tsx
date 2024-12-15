import type { Metadata } from 'next';

import '@/assets/globals.css';

export const metadata: Metadata = {
  title: 'Next.js Base Template',
  description: 'Starter kit for Next.js projects'
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
