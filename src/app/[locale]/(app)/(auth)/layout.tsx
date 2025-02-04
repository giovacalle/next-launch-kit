import { Logo } from '@/components/logo/logo';

export default async function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center justify-center gap-10 px-4 md:px-6">
      <Logo />
      {children}
    </div>
  );
}
