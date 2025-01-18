import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Montserrat } from 'next/font/google';

import { cn } from '@/lib/tailwind';
import { TRPCProvider } from '@/lib/trpc/client';

import { Toaster } from 'sonner';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

export default async function BaseLayout({
  children,
  locale
}: Readonly<{
  children: React.ReactNode;
  locale: string;
}>) {
  const messages = await getMessages();

  return (
    <html lang={locale} className={cn('scroll-smooth', montserrat.className)}>
      <link rel="icon" href="/favicon.svg" />
      <body className="bg-background">
        <Toaster richColors position="top-center" />
        <NextIntlClientProvider messages={messages}>
          <TRPCProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </TRPCProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
