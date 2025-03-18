import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { Montserrat } from 'next/font/google';
import { notFound } from 'next/navigation';

import { applicationName } from '@/core/consts';

import { cn } from '@/lib/tailwind';
import { TRPCProvider } from '@/lib/trpc/client';

import { Toaster } from 'sonner';

import { PostHogProvider } from '@/components/providers/posthog';
import { ThemeProvider } from '@/components/providers/theme-provider';

import { Locale, routing } from '@/i18n/routing';

import '@/app/globals.css';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  let { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) locale = 'en';

  const t = await getTranslations('common.metadata');

  return {
    metadataBase: new URL(`https://nextlaunchkit.com/${locale}`),
    referrer: 'origin-when-cross-origin',
    generator: 'Next.js',
    title: applicationName,
    icons: {
      icon: '/favicon.ico',
      apple: '/nextlaunchkit.png'
    },
    authors: [
      {
        name: 'Giova',
        url: 'https://giova.dev'
      }
    ],
    description: t('description'),
    keywords: t('keywords').split(', '),
    openGraph: {
      type: 'website',
      url: `https://nextlaunchkit.com/${locale}`,
      locale,
      siteName: applicationName,
      title: applicationName,
      description: t('description'),
      images: [
        {
          url: t('openGraph.image'),
          alt: t('openGraph.alt')
        }
      ]
    }
  };
}

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
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
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={cn('scroll-smooth bg-background antialiased', montserrat.className)}>
        <Toaster richColors position="top-center" />
        <TRPCProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <PostHogProvider>
              <NextIntlClientProvider messages={messages}>
                <main className="grid min-h-svh">{children}</main>
              </NextIntlClientProvider>
            </PostHogProvider>
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
