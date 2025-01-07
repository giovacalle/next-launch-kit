import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button';

export default async function Home() {
  const t = await getTranslations('pages.home');

  return (
    <>
      <section className="w-full bg-white py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                {t('title')}
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                {t('subtitle')}
              </p>
            </div>
            <div className="space-x-4">
              <Button>{t('cta')}</Button>
              <Button variant="outline">{t('more')}</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-background py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6">
            <div className="flex flex-col justify-center space-y-8 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {t('features.title')}
                </h2>
                <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('features.subtitle')}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 sm:grid-cols-2 md:gap-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4">
                <Icon icon="ph:calendar-fill" width={50} height={50} className="text-primary" />
                <h3 className="text-xl font-bold">{t('features.rooms.title')}</h3>
                <p className="text-center text-sm text-gray-500">
                  {t('features.rooms.description')}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4">
                <Icon
                  icon="material-symbols:computer-outline-rounded"
                  width={50}
                  height={50}
                  className="text-secondary"
                />
                <h3 className="text-xl font-bold">{t('features.pcs.title')}</h3>
                <p className="text-center text-sm text-gray-500">{t('features.pcs.description')}</p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border-gray-800 p-4">
                <Icon
                  icon="material-symbols:headphones-outline-rounded"
                  width={50}
                  height={50}
                  className="text-tertiary"
                />
                <h3 className="text-xl font-bold">{t('features.tools.title')}</h3>
                <p className="text-center text-sm text-gray-500">
                  {t('features.tools.description')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full bg-white py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                {t('pricing.title')}
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                {t('pricing.subtitle')}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="lg" asChild>
                <Link href="/pricing">{t('pricing.startFreeTrial')}</Link>
              </Button>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {t('pricing.noCardRequired')}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
