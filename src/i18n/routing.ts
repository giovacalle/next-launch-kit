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
    '/sign-in/magic-link': {
      it: '/accedi/magic-link',
      en: '/sign-in/magic-link'
    },
    '/sign-in/forgot-password': {
      it: '/accedi/password-dimenticata',
      en: '/sign-in/forgot-password'
    },
    '/sign-in/reset-password': {
      it: '/accedi/reset-password',
      en: '/sign-in/reset-password'
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
