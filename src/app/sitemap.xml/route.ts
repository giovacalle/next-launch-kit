// eslint-disable-next-line check-file/folder-naming-convention
import { Locale } from 'next-intl';

import { MODE } from '@/core/consts';

import { getPathname, routing } from '@/i18n/routing';

export const dynamic = 'force-static';

export async function GET(): Promise<Response> {
  const entries: ReturnType<typeof getEntries>[] = [];

  switch (MODE) {
    case 'coming-soon':
      entries.push(getEntries('/'));
      break;
    case 'maintenance':
      entries.push(getEntries('/maintenance'));
      break;
    default:
      entries.push(
        ...Object.keys(routing.pathnames)
          // ideally, you'd want to hide some pages from be indexed (e.g. auth routes, maintenance, etc)
          .filter(p => !['/maintenance', '/dashboard'].includes(p))
          .map(p => getEntries(p as Href))
      );
      break;
  }

  const sitemap = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${entries
    .map(
      entry => `
    <url>
      <loc>${entry.url}</loc>${Object.entries(entry.alternates.languages)
        .map(
          ([locale, url]) => `
      <xhtml:link rel="alternate" hreflang="${locale}" href="${url}" />`
        )
        .join('')}
      <lastmod>${new Date().toISOString()}</lastmod>
    </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
}

type Href = Parameters<typeof getPathname>[number]['href'];

function getEntries(href: Href) {
  return {
    url: getUrl(href, routing.defaultLocale),
    alternates: {
      languages: Object.fromEntries(
        routing.locales.filter(l => l !== routing.defaultLocale).map(l => [l, getUrl(href, l)])
      )
    }
  };
}

function getUrl(href: Href, locale: Locale) {
  const pathname = getPathname({ locale, href });
  return process.env.BASE_URL + pathname;
}
