import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export type Locale = (typeof routing.locales)[number];

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'it'],
  // Used when no locale matches
  defaultLocale: 'en',
  // doing so, for 'it' will be empty
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/privacy-policy': '/privacy-policy',
    '/checkout/success': '/checkout/success',
    '/checkout/cancel': '/checkout/cancel',
    '/dashboard': '/dashboard',
    '/maintenance': {
      it: '/manutenzione'
    },
    '/terms-of-service': {
      it: '/termini-di-servizio'
    },
    '/pricing': {
      it: '/prezzi'
    },
    '/sign-in': {
      it: '/accedi'
    },
    '/sign-in/check-email': {
      it: '/accedi/controlla-email'
    },
    '/sign-in/error': {
      it: '/accedi/errore'
    },
    '/sign-in/account': {
      it: '/accedi/account'
    },
    '/sign-in/account/forgot-password': {
      it: '/accedi/account/password-dimenticata'
    },
    '/sign-in/account/reset-password': {
      it: '/accedi/account/reimposta-password'
    },
    '/sign-up': {
      it: '/registrati'
    },
    '/sign-up/verify-email': {
      it: '/registrati/verifica-email'
    }
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
