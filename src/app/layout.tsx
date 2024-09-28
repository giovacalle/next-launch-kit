import type { Metadata } from 'next';

import '@/assets/globals.css';

export const metadata: Metadata = {
  title: 'Next.js Base Template',
  description: 'Starter kit for Next.js projects'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🚀</text></svg>"
      />
      <body className="flex h-screen w-screen flex-col gap-5 bg-slate-400">
        <header className="flex bg-slate-700 p-2 text-white">
          <h1 className="text-4xl">Next.js Base Template</h1>
        </header>
        <main className="max-h-screen min-h-[70vh] overflow-auto p-5">{children}</main>
        <footer className="flex flex-1 items-center justify-center bg-slate-800 p-2 text-white">
          <p className="text-2xl">Made with ❤️</p>
        </footer>
      </body>
    </html>
  );
}
