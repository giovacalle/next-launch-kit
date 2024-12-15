import { LayoutLinks } from './components/layout-links';

export default function AuthLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col gap-5 rounded-lg border-2 border-slate-600 p-3 md:mx-auto md:max-w-md">
      {children}
      <LayoutLinks />
    </div>
  );
}
