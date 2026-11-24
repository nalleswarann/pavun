import React, { useState, useEffect, useRef } from 'react';
import './ScrollytellingTracker.css';

interface ScrollytellingTrackerProps {
  currentPage?: string;
}

export const ScrollytellingTracker: React.FC<ScrollytellingTrackerProps> = () => {
  const [isVisible, setIsVisible] = useState(false);
  const isVisibleRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY || document.documentElement.scrollTop;

          const shouldBeVisible = scrollTop > 240;
          if (shouldBeVisible !== isVisibleRef.current) {
            isVisibleRef.current = shouldBeVisible;
            setIsVisible(shouldBeVisible);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Quick Return to Top Button for Subpages & Long Scroll */}
      {isVisible && (
        <button
          type="button"
          className="pavun-scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top of page"
        >
          <span className="pavun-scroll-to-top__arrow">↑</span>
          <span className="pavun-scroll-to-top__label">TOP</span>
        </button>
      )}
    </>
  );
};

export default ScrollytellingTracker;
