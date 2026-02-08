import { useEffect, useState } from 'react';

interface UseSplashScreenOptions {
  minDuration?: number;
  onComplete?: () => void;
}

/**
 * Hook to manage splash screen visibility and timing
 * @param condition - Condition that determines when splash screen shows (e.g., loading state)
 * @param options - Configuration options
 * @returns Boolean indicating if splash screen should be visible
 */
export const useSplashScreen = (condition: boolean, options: UseSplashScreenOptions = {}) => {
  const { minDuration = 1500, onComplete } = options;
  const [isShowingSplash, setIsShowingSplash] = useState(condition);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (condition) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsShowingSplash(true);
      setStartTime(Date.now());
    } else if (startTime !== null) {
      const elapsed = Date.now() - startTime;
      const remainingTime = Math.max(0, minDuration - elapsed);

      if (remainingTime > 0) {
        const timer = setTimeout(() => {
          setIsShowingSplash(false);
          onComplete?.();
        }, remainingTime);
        return () => clearTimeout(timer);
      } else {
        setIsShowingSplash(false);
        onComplete?.();
      }
    }
  }, [condition, startTime, minDuration, onComplete]);

  return isShowingSplash;
};
