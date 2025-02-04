import { getTranslations } from 'next-intl/server';

import { applicationName } from '@/core/consts';

import { Button } from '@/components/ui/button';

import { Link } from '@/i18n/routing';

export default async function Footer() {
  const t = await getTranslations('common.footer');

  return (
    <footer className="flex h-max w-full flex-col items-center gap-2 self-end border-t p-5 text-xs sm:flex-row md:px-8">
      <p>
        © 2025 {applicationName}. {t('rightReserved')}
      </p>
      <nav className="flex gap-5 sm:ml-auto">
        <Button variant="link" asChild>
          <Link href="/terms-of-service">{t('termsOfService')}</Link>
        </Button>
        <Button variant="link" asChild>
          <Link href="/privacy-policy">{t('privacyPolicy')}</Link>
        </Button>
      </nav>
    </footer>
  );
}
