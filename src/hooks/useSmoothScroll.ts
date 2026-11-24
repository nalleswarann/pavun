/**
 * useSmoothScroll Hook - High Performance Scroll Management
 * 
 * Preserves 100% native, hardware-accelerated 120Hz/144Hz compositor scrolling.
 * Never hijacks wheel events with preventDefault, eliminating input latency and frame drops.
 */

interface SmoothScrollOptions {
  enabled?: boolean;
  ease?: number;
  isModalOpen?: boolean;
}

export function useSmoothScroll({
  enabled = false,
  isModalOpen = false,
}: SmoothScrollOptions = {}) {
  // If native scrolling is preferred (enabled = false or touch/modal active),
  // we do not intercept wheel events at all to guarantee zero-lag compositor performance.
  if (!enabled || isModalOpen) {
    return;
  }
}

export default useSmoothScroll;
