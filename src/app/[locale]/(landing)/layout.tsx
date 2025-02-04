import { MODE } from '@/core/consts';

import Footer from './_components/footer';
import Header from './_components/header';

export default async function NavigationLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {MODE === 'live' && <Header />}
      {children}
      {MODE === 'live' && <Footer />}
    </>
  );
}
