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

const BASE_URL = process.env.BASE_URL;

export default function VerifyEmail({ token }: { token: string }) {
  return (
    <Html>
      <Head />
      <Preview>{applicationName} Email verification</Preview>
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
                <Heading className="text-xl font-bold">Verify your email</Heading>
                <Text className="mb-8 text-sm font-medium">
                  Hi there, to complete your registration, please click the link below:
                </Text>
                <Text className="text-base font-medium">
                  <Link
                    href={`${BASE_URL}/api/auth/verify-email/?token=${token}`}
                    target="_blank"
                    className="text-[#2754C5]">
                    Confirm registration
                  </Link>
                </Text>
              </Section>
              <Hr className="mx-0 my-6 w-full border border-solid border-gray-400" />
              <Text className="text-center text-xs text-gray-700">
                © 2025 {applicationName}. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
