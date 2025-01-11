import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export type Locale = 'en' | 'it';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'it'],
  // Used when no locale matches
  defaultLocale: 'it',
  // doing so, for 'it' will be empty
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/maintenance': {
      it: '/manutenzione',
      en: '/maintenance'
    },
    '/checkout': '/checkout',
    '/profile': {
      it: '/profilo',
      en: '/profile'
    },
    '/sign-in': {
      it: '/accedi',
      en: '/sign-in'
    },
    '/sign-in/account': {
      it: '/accedi/account',
      en: '/sign-in/account'
    },
    '/sign-in/account/forgot-password': {
      it: '/accedi/account/password-dimenticata',
      en: '/sign-in//account/forgot-password'
    },
    '/sign-in/account/reset-password': {
      it: '/accedi/account/reset-password',
      en: '/sign-in/account/reset-password'
    },
    '/sign-up': {
      it: '/registrati',
      en: '/sign-up'
    },
    '/sign-out': {
      it: '/esci',
      en: '/sign-out'
    },
    '/pricing': {
      it: '/prezzi',
      en: '/pricing'
    }
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
