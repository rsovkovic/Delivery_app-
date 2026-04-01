import { useState, useEffect } from 'react';

export const useHasHydrated = () => {
  const [hasHydrated, setHasHydrated] = useState(false);
  useEffect(() => {
    const handler = requestAnimationFrame(() => {
      setHasHydrated(true);
    });
    return () => cancelAnimationFrame(handler);
  }, []);

  return hasHydrated;
};
