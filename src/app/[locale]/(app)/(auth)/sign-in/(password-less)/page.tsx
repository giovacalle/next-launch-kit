import { useTranslations } from 'next-intl';
import NextLink from 'next/link';

import { Icon } from '@iconify/react/dist/iconify.js';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Link } from '@/i18n/routing';

import { MagicLinkForm } from './magic-link-form';

export default function Signin() {
  const t = useTranslations('pages.auth.sign-in');

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{t('title')}</CardTitle>
        <CardDescription>{t('description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="w-full gap-2" asChild>
          <NextLink href="/api/auth/google">
            <Icon icon="devicon:google" width={24} height={24} />
            {t('loginWithGoogle')}
          </NextLink>
        </Button>
        <div className="relative mb-4 mt-6 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            {t('continueWithEmail')}
          </span>
        </div>
        <MagicLinkForm />
        <div className="relative my-6 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-card px-2 text-muted-foreground">
            {t('otherOptions')}
          </span>
        </div>
        <Button variant="secondary" className="w-full gap-2" asChild>
          <Link href="/sign-in/account">
            <Icon icon="mdi:email" width={20} height={20} />
            {t('loginWithAccount')}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
