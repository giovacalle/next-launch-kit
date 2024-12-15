import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Montserrat } from 'next/font/google';

import { cn } from '@/lib/tailwind';

import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';

import { Locale, routing } from '@/i18n/routing';

import '@/assets/globals.css';

export const metadata: Metadata = {
  title: 'Next.js Base Template',
  description: 'Starter kit for Next.js projects'
};

const montserrat = Montserrat({
  weight: '400',
  subsets: ['latin'],
  display: 'swap'
});

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) throw new Error('Locale not found');

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} className={cn('scroll-smooth', montserrat.className)}>
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>"
      />
      <body className="text-foreground flex h-screen w-screen flex-col gap-5 bg-background">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="max-h-screen min-h-[70vh] overflow-auto p-5">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
