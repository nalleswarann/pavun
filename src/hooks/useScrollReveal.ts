import { useEffect } from 'react';

/**
 * useScrollReveal Hook
 * 
 * High-performance, hardware-accelerated IntersectionObserver that automatically
 * reveals titles, paragraphs, images, banners, and cards as the user scrolls into view.
 * Fully responsive and optimized for Desktop, Tablet, and Mobile devices (60-120fps).
 */
export function useScrollReveal(triggerKey?: unknown) {
  useEffect(() => {
    // Check for browser support
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      // Fallback: reveal everything immediately if IntersectionObserver is not supported
      const allReveal = document.querySelectorAll(
        '.pavun-reveal, .pavun-reveal-title, .pavun-reveal-text, .pavun-reveal-divider, .pavun-reveal-img, .pavun-reveal-card, .pavun-reveal-banner, .pavun-reveal-stagger'
      );
      allReveal.forEach((el) => el.classList.add('pavun-revealed'));
      return;
    }

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      const allReveal = document.querySelectorAll(
        '.pavun-reveal, .pavun-reveal-title, .pavun-reveal-text, .pavun-reveal-divider, .pavun-reveal-img, .pavun-reveal-card, .pavun-reveal-banner, .pavun-reveal-stagger'
      );
      allReveal.forEach((el) => el.classList.add('pavun-revealed'));
      return;
    }

    const observerCallback: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pavun-revealed');
          // Once revealed, unobserve to avoid redundant layout checks
          observer.unobserve(entry.target);
        }
      });
    };

    // Responsive margins: on mobile, trigger slightly earlier so user doesn't see blank content while fast-scrolling
    const isMobile = window.innerWidth <= 768;
    const rootMargin = isMobile ? '0px 0px -20px 0px' : '0px 0px -48px 0px';

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin,
      threshold: 0.08,
    });

    const selector =
      '.pavun-reveal, .pavun-reveal-title, .pavun-reveal-text, .pavun-reveal-divider, .pavun-reveal-img, .pavun-reveal-card, .pavun-reveal-banner, .pavun-reveal-stagger';

    const elements = document.querySelectorAll(selector);
    elements.forEach((el) => {
      // Check if element is already within viewport on initial mount
      const rect = el.getBoundingClientRect();
      const inViewOnLoad = rect.top < window.innerHeight && rect.bottom > 0;
      if (inViewOnLoad) {
        el.classList.add('pavun-revealed');
      } else {
        observer.observe(el);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [triggerKey]);
}

export default useScrollReveal;
