import { useEffect, useState } from 'react';

export default function useBreakpoint(breakpoint: number) {
  const [isMatch, setIsMatch] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const controller = new AbortController();

    setIsMatch(mediaQuery.matches);

    mediaQuery.addEventListener(
      'change',
      (event: MediaQueryListEvent) => {
        setIsMatch(event.matches);
      },
      {
        signal: controller.signal
      }
    );

    return () => {
      controller.abort();
    };
  }, [breakpoint]);

  return isMatch;
}
