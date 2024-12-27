import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Montserrat } from 'next/font/google';

import { cn } from '@/lib/tailwind';

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
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>"
      />
      <body className="bg-background">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
