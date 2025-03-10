import { applicationName } from '@/core/consts';

import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';

import { Locale } from '@/i18n/routing';

const BASE_URL = process.env.BASE_URL;

const translations = {
  en: {
    preview: `${applicationName} Magic link`,
    heading: 'Magic link',
    text: 'Hi there, please click the link below to sign in:',
    link: 'Sign in with magic link',
    footer: `© 2025 ${applicationName}. All rights reserved.`
  },
  it: {
    preview: `${applicationName} Link magico`,
    heading: 'Link magico',
    text: 'Ciao, clicca sul link qui sotto per accedere:',
    link: 'Accedi con il link magico',
    footer: `© 2025 ${applicationName}. Tutti i diritti riservati.`
  }
} as Record<
  Locale,
  { preview: string; heading: string; text: string; link: string; footer: string }
>;

export default function MagicLinkEmail({
  token,
  locale = 'en'
}: {
  token: string;
  locale: Locale;
}) {
  const t = translations[locale];

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Tailwind>
        <Body className="bg-white font-sans text-black">
          <Container className="mx-auto my-10 rounded border border-solid border-gray-200">
            <Section className="mt-5">
              <Img
                src={`${BASE_URL}/static/logo.png`}
                alt="Logo"
                width={100}
                height={100}
                className="mx-auto rounded-md object-cover object-center"
              />
            </Section>
            <Section className="p-4">
              <Section>
                <Heading className="text-xl font-bold">{t.heading}</Heading>
                <Text className="mb-8 text-sm font-medium">{t.text}</Text>
                <Text className="text-base font-medium">
                  <Link
                    href={`${BASE_URL}/api/auth/magic-link/?token=${token}`}
                    target="_blank"
                    className="text-[#2754C5]">
                    {t.link}
                  </Link>
                </Text>
              </Section>
              <Hr className="mx-0 my-6 w-full border border-solid border-gray-400" />
              <Text className="text-center text-xs text-gray-700">{t.footer}</Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
