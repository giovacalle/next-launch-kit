import { getTranslations } from 'next-intl/server';

export default async function PrivacyPolicyPage() {
  const t = await getTranslations('pages.privacy');

  return (
    <div className="px-4 py-12 text-center md:px-6 md:py-24 lg:py-32">
      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
        {t('title')}
      </h1>
    </div>
  );
}
