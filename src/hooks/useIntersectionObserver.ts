import { useCallback, useEffect, useRef } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  hasNextPage: boolean;
  fetchNextPage: () => void;
}

const useIntersectionObserver = ({ threshold = 0.1, hasNextPage, fetchNextPage }: UseIntersectionObserverProps) => {
  const target = useRef<HTMLDivElement>(null);

  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    },
    [hasNextPage, fetchNextPage],
  );

  useEffect(() => {
    if (!target.current) return;

    const curTarget = target.current;

    const observer = new IntersectionObserver(observerCallback, { threshold });

    observer.observe(curTarget);

    return () => {
      if (curTarget) observer.unobserve(curTarget);
    };
  }, [observerCallback, threshold]);

  return { target };
};

export default useIntersectionObserver;
