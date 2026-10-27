'use client'

import { useEffect } from 'react'
import type Lenis from 'lenis'
import { initLenis } from '@/lib/lenis'

export function SmoothScroll() {
  useEffect(() => {
    const lenis: Lenis | null = initLenis()
    return () => {
      lenis?.destroy()
    }
  }, [])

  return null
}
