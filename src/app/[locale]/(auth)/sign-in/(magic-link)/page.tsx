import NextLink from 'next/link';

import { Icon } from '@iconify/react/dist/iconify.js';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

import { Link, routing } from '@/i18n/routing';

import { MagicLinkForm } from './magic-link-form';

export default function Signin() {
  return (
    <div className="flex min-h-screen flex-col gap-6 bg-white">
      <Card className="mx-auto mt-20 w-full max-w-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant="outline" className="w-full gap-2" asChild>
            <NextLink href="/api/auth/google" locale={routing.defaultLocale}>
              <Icon icon="mdi:google" width={24} height={24} />
              Login with Google
            </NextLink>
          </Button>
          <div className="after:border-border relative mb-4 mt-6 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="text-muted-foreground relative z-10 bg-white px-2">
              or continue with email
            </span>
          </div>
          <MagicLinkForm />
          <div className="after:border-border relative my-6 text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="text-muted-foreground relative z-10 bg-white px-2">Other options</span>
          </div>
          <Button variant="secondary" className="w-full gap-2" asChild>
            <Link href="/sign-in/account" locale={routing.defaultLocale}>
              <Icon icon="mdi:email" width={24} height={24} />
              Create an account
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
