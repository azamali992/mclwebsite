import { useState, useEffect, useRef, useMemo } from 'react';

export default function useInView({ threshold = 0.15, repeat = false } = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  const options = useMemo(() => ({ threshold, repeat }), [threshold, repeat]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (!options.repeat) observer.unobserve(el);
        } else if (options.repeat) {
          setInView(false);
        }
      },
      { threshold: options.threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView];
}
