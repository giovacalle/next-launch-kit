import Link from 'next/link';

export default function Signin() {
  return (
    <form className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input type="email" id="email" className="rounded-md bg-slate-200 p-2 text-black" />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm">
          Password
        </label>
        <input type="password" id="password" className="rounded-md bg-slate-200 p-2 text-black" />
      </div>
      <button className="rounded-md bg-blue-600 p-2 text-white hover:bg-blue-500">Sign in</button>
      <Link href="/forgot-password" className="ml-auto mt-5 text-center text-sm underline">
        Forgot password?
      </Link>
    </form>
  );
}
