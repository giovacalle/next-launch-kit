import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/routing';

export default async function Footer() {
  const t = await getTranslations('common.footer');

  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t bg-white px-4 py-6 sm:flex-row md:px-6">
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2025 TeamResources. {t('rightReserved')}
      </p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link className="text-xs underline-offset-4 hover:underline" href="/">
          {t('termsOfService')}
        </Link>
        <Link className="text-xs underline-offset-4 hover:underline" href="/">
          {t('privacyPolicy')}
        </Link>
      </nav>
    </footer>
  );
}
