import { notFound } from 'next/navigation';

import BaseLayout from '@/components/layout/layouts/base-layout';
import MinimalLayout from '@/components/layout/layouts/minimal-layout';

import { Locale, routing } from '@/i18n/routing';

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

  if (process.env.MAINTENANCE_MODE === '1') {
    return <MinimalLayout locale={locale}>{children}</MinimalLayout>;
  }

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
