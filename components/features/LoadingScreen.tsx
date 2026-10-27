'use client'

import { useEffect, useRef, useState } from 'react'

interface LoadingScreenProps {
  onComplete: () => void
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0)
  const [showSkip, setShowSkip] = useState(false)
  const completedRef = useRef(false)

  useEffect(() => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    if (reducedMotion) {
      setProgress(100)
      const timer = window.setTimeout(() => finish(), 1000)
      return () => window.clearTimeout(timer)
    }

    const startedAt = Date.now()
    const duration = 2500
    const interval = window.setInterval(() => {
      const elapsed = Date.now() - startedAt
      const next = Math.min(100, Math.round((elapsed / duration) * 100))
      setProgress(next)
      if (next >= 100) {
        window.clearInterval(interval)
        window.setTimeout(() => finish(), 350)
      }
    }, 60)

    const skipTimer = window.setTimeout(() => setShowSkip(true), 3000)
    const maxTimer = window.setTimeout(() => finish(), 4200)

    function finish() {
      if (completedRef.current) return
      completedRef.current = true
      window.clearInterval(interval)
      window.clearTimeout(skipTimer)
      window.clearTimeout(maxTimer)
      onComplete()
    }

    return () => {
      window.clearInterval(interval)
      window.clearTimeout(skipTimer)
      window.clearTimeout(maxTimer)
    }
  }, [onComplete])

  const skip = () => {
    if (completedRef.current) return
    completedRef.current = true
    onComplete()
  }

  return (
    <div
      role="status"
      aria-label="Loading Ezekiel Docs"
      className="fixed inset-0 z-[10000] bg-surface flex flex-col items-center justify-center px-6"
    >
      <div className="w-full max-w-[240px] flex flex-col items-center">
        <svg
          width="40"
          height="52"
          viewBox="0 0 40 52"
          fill="none"
          aria-hidden="true"
        >
          <path
            className="loading-document-path"
            d="M6 2 H26 L34 10 V50 H6 Z M26 2 V10 H34 M12 20 H28 M12 28 H28 M12 36 H22"
            stroke="#1B4332"
            strokeWidth="1.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>

        <p className="loading-wordmark font-heading text-lg text-text-primary mt-5">
          Ezekiel Docs
        </p>

        <div className="w-full max-w-[200px] h-0.5 bg-border mt-6 overflow-hidden">
          <div
            className="loading-progress-fill h-full bg-primary"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="font-body text-xs text-text-muted mt-2">{progress}%</p>
      </div>

      {showSkip && (
        <button
          type="button"
          onClick={skip}
          className="absolute bottom-8 right-8 min-h-[44px] min-w-[44px] font-body text-sm text-text-muted underline hover:text-text-primary"
        >
          Skip
        </button>
      )}
      <span className="sr-only">
        Loading Ezekiel Docs, please wait. {progress} percent complete.
      </span>
    </div>
  )
}
