import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl">Hello :)</h1>
      <div className="flex items-center gap-10">
        <Link href="/sign-in" className="ml-auto mt-5 text-center text-lg underline">
          Sign in
        </Link>
        <Link href="/sign-up" className="ml-auto mt-5 text-center text-lg underline">
          Sign up
        </Link>
      </div>
    </div>
  );
}
