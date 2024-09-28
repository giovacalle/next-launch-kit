import { ReactNode } from 'react';

import { Resend } from 'resend';

const resend = new Resend(process.env.EMAIL_SERVER_PASSWORD!);

export async function sendEmail(email: string, subject: string, body: ReactNode) {
  const { error } = await resend.emails.send({
    from: process.env.EMAIL_FROM!,
    to: email,
    subject,
    react: body
  });

  if (error) throw error;
}
