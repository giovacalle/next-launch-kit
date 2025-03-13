import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';

import { MODE } from '@/core/consts';

import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button';

import ComingSoonHeader from './_components/coming-soon-header';

export default async function Home() {
  const t = await getTranslations('pages.home');

  return (
    <>
      {MODE === 'coming-soon' && <ComingSoonHeader />}
      <section
        id="hero"
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden py-12 md:py-24 lg:py-32">
        <div className="bg-grid absolute inset-0 opacity-100"></div>
        <div className="container relative z-20 px-4 md:px-6">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-around">
            <div className="max-w-xl space-y-4 text-center lg:text-left">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                {t('hero.title')}
              </h1>
              <p className="mx-auto max-w-xl md:text-xl lg:mx-0">{t('hero.subtitle')}</p>
              <div className="flex gap-4 max-lg:justify-center">
                <Button asChild>
                  <Link href="#how-composed">{t('hero.cta')}</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="https://github.com/giovacalle/next-launch-kit">
                    <Icon icon="akar-icons:github-fill" />
                    GitHub
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative aspect-square h-[300px] sm:h-[350px] md:h-[400px]">
                <Image
                  src="/nextlaunchkit.png"
                  alt="Next Launch Kit"
                  fill
                  className="rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section id="how-composed" className="mx-auto w-full py-12 text-center md:py-24 lg:py-32">
        <h2 className="text-3xl font-bold sm:text-5xl">{t('howComposed.title')}</h2>
        <p className="mx-auto mt-4 px-5 text-lg lg:max-w-[60svw]">{t('howComposed.subtitle')}</p>
        <div className="mx-auto mt-8 grid w-max grid-cols-1 items-start gap-x-10 gap-y-5 md:grid-cols-2 lg:grid-cols-3">
          <p className="col-span-full text-lg font-bold">{t('howComposed.whatsInside')}</p>
          <div className="flex flex-col gap-2">
            <span>🚀 Next.js 15</span>
            <span>✏️ TypeScript</span>
            <span>🐘 Postgres</span>
            <span>🔒 Authentication</span>
            <span>🔑 Google OAuth & Magic Link</span>
          </div>
          <div className="flex flex-col gap-2">
            <span>🌐 i18n</span>
            <span>💳 Stripe</span>
            <span>✉️ Email (Resend)</span>
            <span>⚙️ Coming soon and Maintenance mode</span>
            <span>📊 Posthog (for analytics)</span>
          </div>
          <div className="flex flex-col gap-2">
            <span>🎨 Tailwind CSS</span>
            <span>🖼️ ShadCN</span>
            <span>{t('howComposed.andMore')}</span>
          </div>
        </div>
      </section>
      <section id="more" className="bg-grid mx-auto w-full py-12 text-center md:py-24 lg:py-32">
        <h2 className="text-3xl font-bold sm:text-5xl">{t('more.title')}</h2>
        <p className="mx-auto mt-4 max-w-[80svw] text-lg">{t('more.subtitle')}</p>
        <p className="mx-auto mb-8 mt-4 max-w-[80svw] text-sm">{t('more.ps')}</p>
        <Button asChild>
          <Link href="https://github.com/giovacalle/next-launch-kit">
            <Icon icon="akar-icons:github-fill" />
            GitHub
          </Link>
        </Button>
      </section>
    </>
  );
}
