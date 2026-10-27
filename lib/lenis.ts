'use client'

import Lenis from 'lenis'

/**
 * Initialises Lenis smooth scroll with the project standard options.
 * Returns the Lenis instance so callers can destroy it on unmount.
 * When the user prefers reduced motion, native scrolling is retained.
 */
export function initLenis(): Lenis | null {
  if (typeof window === 'undefined') {
    return null
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)',
  ).matches

  if (prefersReducedMotion) {
    return null
  }

  const lenis = new Lenis({
    duration: 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    touchMultiplier: 2,
    infinite: false,
    autoRaf: true,
  })

  return lenis
}
