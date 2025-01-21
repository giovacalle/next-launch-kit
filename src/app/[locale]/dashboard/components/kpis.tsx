import { ComponentProps } from 'react';

import { cn } from '@/lib/tailwind';

import { Icon, IconProps } from '@iconify/react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

function Kpis({ children, className, ...rest }: ComponentProps<'div'>) {
  return (
    <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3', className)} {...rest}>
      {children}
    </div>
  );
}

type KpiProps = {
  title: string;
  value: number;
  limit: number;
  description?: string;
  icon?: IconProps['icon'];
};
function Kpi({ title, value, limit, description, icon }: KpiProps) {
  const usagePercentage = (value / limit) * 100;

  return (
    <Card className="border-gray-300">
      <CardHeader className="flex flex-row justify-between pb-2">
        <CardTitle className="text-base font-semibold">{title}</CardTitle>
        {icon && <Icon icon={icon} width={20} height={20} className="text-gray-400" />}
      </CardHeader>
      <CardContent>
        <span
          className={cn(
            'text-2xl font-bold',
            usagePercentage < 50 && 'text-green-600',
            usagePercentage > 50 && 'text-yellow-500',
            usagePercentage > 75 && 'text-red-600'
          )}>{`${value}/${limit}`}</span>
        <p className="text-xs text-gray-400">{description}</p>
      </CardContent>
    </Card>
  );
}

type PreviewProps = ComponentProps<typeof Card> & {
  title: string;
  description: string;
};
function Preview({ children, className, title, description, ...rest }: PreviewProps) {
  return (
    <Card className={cn('border-gray-300', className)} {...rest}>
      <CardHeader className="flex flex-col pb-2">
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

export { Kpis as Root, Kpi, Preview };
