import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

import '@/assets/globals.css';
import { cn } from '@/lib/tailwind';

export const metadata: Metadata = {
  title: 'Next.js Base Template',
  description: 'Starter kit for Next.js projects'
};

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('scroll-smooth', montserrat.className)}>
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>"
      />
      <body className="text-foreground flex h-screen w-screen flex-col gap-5 bg-background">
        <Header />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
