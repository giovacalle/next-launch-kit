import Link from 'next/link';

import { enforceAuthenticatedUser } from '@/lib/auth';

import { getUserPlanUseCase } from '@/core/use-cases/subscriptions';

export default async function ProfilePage() {
  const user = await enforceAuthenticatedUser();

  const currrentPlan = await getUserPlanUseCase(user.id);

  const link = `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL!}?prefilled_email=${encodeURIComponent(user.email)}`;

  return (
    <div className="flex w-full gap-10">
      <aside className="w-1/4">
        <h2 className="text-2xl font-bold">Profile</h2>
      </aside>
      <section className="flex w-3/4 flex-col gap-5">
        <div className="flex flex-col gap-2">
          <h3 className="font-semibold">Manage subscription</h3>
          <p className="mb-2">
            Your current plan is <b className="capitalize">{currrentPlan}</b>
          </p>
          <p>Through the link here down below you can manage your subscription.</p>
          <Link href={link} className="underline" target="_blank" rel="noopener noreferrer">
            Manage subscription
          </Link>
        </div>
      </section>
    </div>
  );
}
