import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';

import { applicationName } from '@/core/consts';

import { cn } from '@/lib/tailwind';
import { TRPCProvider } from '@/lib/trpc/client';

import { Toaster } from 'sonner';

import { PostHogProvider } from '@/components/providers/posthog';
import { ThemeProvider } from '@/components/providers/theme-provider';

import '@/app/globals.css';

export const metadata: Metadata = {
  title: applicationName,
  icons: {
    icon: '/favicon.ico',
    apple: '/nextlaunchkit.png'
  },
  description: 'Next.js starter with batteries included',
  keywords: [
    'next.js',
    'starter kit',
    'saas',
    'launch',
    'launch kit',
    'digital product starter kit',
    'launch your first product',
    'start build',
    'easy next.js starter kit',
    'blueprint saas kit',
    'kit for your app'
  ]
};

const montserrat = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap'
});

export default async function RootLayout({
  children,
  locale
}: Readonly<{
  children: React.ReactNode;
  locale: string;
}>) {
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
              <main className="grid min-h-svh">{children}</main>
            </PostHogProvider>
          </ThemeProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
