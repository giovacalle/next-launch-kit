import Link from 'next/link';

import { getUserPlanUseCase } from '@/core/use-cases/subscriptions';
import { getUserProfileUseCase } from '@/core/use-cases/users-profile';

import { enforceAuthenticatedUser } from '@/lib/auth';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default async function ProfilePage2() {
  const user = await enforceAuthenticatedUser();

  const profile = await getUserProfileUseCase(user.id);

  const currrentPlan = await getUserPlanUseCase(user.id);

  const link = `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL!}?prefilled_email=${encodeURIComponent(user.email)}`;

  return (
    <div className="flex min-h-screen flex-col gap-6 bg-white">
      <Card className="mx-auto max-w-2xl">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <Avatar className="h-24 w-24">
              <AvatarImage src={profile.avatar ?? ''} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          <CardTitle className="text-2xl font-bold">{profile.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-semibold">Email</h3>
              <p className="text-gray-600">{user.email}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Ruolo</h3>
              <Badge variant="secondary" className="capitalize">
                {'member'}
              </Badge>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Plan</h3>
              <Badge variant="primary" className="capitalize">
                {currrentPlan}
              </Badge>
              <Link
                href={link}
                className="mt-1 block underline"
                target="_blank"
                rel="noopener noreferrer">
                Manage subscription
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
