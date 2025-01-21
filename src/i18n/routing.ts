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
    '/checkout/success': '/checkout/success',
    '/checkout/cancel': '/checkout/cancel',
    '/dashboard': '/dashboard',
    '/dashboard/member': '/dashboard/member',
    '/dashboard/manager': '/dashboard/manager',
    '/pricing': {
      it: '/prezzi',
      en: '/pricing'
    },
    '/profile': {
      it: '/profilo',
      en: '/profile'
    },
    '/sign-in': {
      it: '/accedi',
      en: '/sign-in'
    },
    '/sign-in/check-email': {
      it: '/accedi/controlla-email',
      en: '/sign-in/check-email'
    },
    '/sign-in/error': {
      it: '/accedi/errore',
      en: '/sign-in/error'
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
      it: '/accedi/account/reimposta-password',
      en: '/sign-in/account/reset-password'
    },
    '/sign-up': {
      it: '/registrati',
      en: '/sign-up'
    },
    '/sign-up/verify-email': {
      it: '/registrati/verifica-email',
      en: '/sign-up/verify-email'
    },
    '/sign-out': {
      it: '/esci',
      en: '/sign-out'
    }
  }
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
