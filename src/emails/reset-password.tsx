import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Tailwind,
  Text
} from '@react-email/components';

import { applicationName } from '@/core/consts';

const BASE_URL = process.env.BASE_URL;

export default function ResetPasswordEmail({ token }: { token: string }) {
  return (
    <Html>
      <Head />
      <Preview>{applicationName} Reset password</Preview>
      <Tailwind>
        <Body className="bg-white font-sans text-black">
          <Container className="mx-auto my-10 rounded border border-solid border-gray-200">
            <Section className="w-full bg-violet-500">
              <Text className="text-center text-lg font-bold text-white">{applicationName}</Text>
            </Section>
            <Section className="p-4">
              <Section>
                <Heading className="text-xl font-bold">Reset your password</Heading>
                <Text className="mb-8 text-sm font-medium">
                  Hi there, to reset your password, please click the link below:
                </Text>
                <Text className="text-base font-medium">
                  <Link
                    href={`${BASE_URL}/sign-in/reset-password/?token=${token}`}
                    target="_blank"
                    className="text-[#2754C5]">
                    Reset password
                  </Link>
                </Text>
              </Section>
              <Hr className="mx-0 my-6 w-full border border-solid border-gray-400" />
              <Text className="text-center text-xs text-gray-700">
                © 2024 {applicationName}. All rights reserved.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
