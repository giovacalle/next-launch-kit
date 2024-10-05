import { getCurrentUser } from '@/lib/session';

export default async function Home() {
  const user = await getCurrentUser();

  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <h1 className="text-4xl">Hello :)</h1>
      <div className="flex items-center">
        <p>{user ? 'You are now authenticated!' : 'You are not authenticated!'}</p>
      </div>
    </div>
  );
}
