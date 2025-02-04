import { LangSelector } from '@/components/lang-selector/lang-selector';
import { Logo } from '@/components/logo/logo';

export default function ComingSoonHeader() {
  return (
    <header className="absolute top-0 z-20 h-max w-full bg-transparent p-5 py-3 md:px-8">
      <nav className="flex items-center justify-between gap-5 text-sm font-medium">
        <Logo />
        <LangSelector />
      </nav>
    </header>
  );
}
