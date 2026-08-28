import { useEffect, useRef } from 'react';

/**
 * Hook that adds the `.in` class to elements with `.reveal`
 * when they scroll into view using IntersectionObserver.
 *
 * @param {Object} [options]
 * @param {string} [options.threshold=0.1] - Visibility threshold
 * @param {string} [options.rootMargin='0px 0px -40px 0px'] - Root margin
 */
export function useScrollReveal({ threshold = 0.1, rootMargin = '0px 0px -40px 0px' } = {}) {
  const containerRef = useRef(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const target = containerRef.current || document;
    const elements = target.querySelectorAll('.reveal:not(.in)');

    if (prefersReducedMotion) {
      // Immediately show all elements
      elements.forEach((el) => el.classList.add('in'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return containerRef;
}
