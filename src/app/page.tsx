import { Icon } from '@iconify/react';

import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2 className="text-2xl">A bunch of buttons</h2>
      <div className="flex flex-wrap items-center justify-center gap-2">
        <Button>Click me</Button>
        <Button variant="secondary">Click me</Button>
        <Button variant="outline">Click me</Button>
        <Button variant="danger">Click me</Button>
        <Button
          variant="unstyled"
          rounded="full"
          className="bg-violet-400 text-white hover:bg-violet-500">
          <Icon icon="tabler:click" width={30} height={30} />
        </Button>
      </div>
      <h3 className="text-xl">With breakpoint variants</h3>
      <div className="flex items-center gap-2">
        <Button
          size={{
            initial: 'sm',
            sm: 'md',
            md: 'lg'
          }}>
          Change the width of browser
        </Button>
      </div>
    </div>
  );
}
