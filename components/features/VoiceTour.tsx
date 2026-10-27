'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

const TOUR_SCRIPT =
  'Welcome to Ezekiel Docs, your go-to platform for fast, affordable legal documents built for Kenyan businesses. Whether you need an NDA, a service agreement, or an employment contract, just fill in your details and download a ready-to-sign PDF in minutes. Every document is reviewed by lawyers and compliant with Kenyan law. Scroll down to pick your document and get started today.'

export function VoiceTour() {
  const [speaking, setSpeaking] = useState(false)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [supported, setSupported] = useState(false)
  const hasTriggeredRef = useRef(false)

  const speak = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(TOUR_SCRIPT)
    utterance.rate = 0.95
    utterance.pitch = 1.1
    utterance.lang = 'en-KE'
    utterance.onstart = () => setSpeaking(true)
    utterance.onend = () => {
      setSpeaking(false)
      setHasPlayed(true)
    }
    utterance.onerror = () => {
      setSpeaking(false)
      setHasPlayed(true)
    }
    window.speechSynthesis.speak(utterance)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }
    setSupported(true)

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const triggerTour = () => {
      if (hasTriggeredRef.current) return
      hasTriggeredRef.current = true
      window.removeEventListener('scroll', triggerTour)
      document.removeEventListener('click', triggerTour)
      if (!reducedMotion) {
        speak()
      }
    }

    window.addEventListener('scroll', triggerTour, { passive: true })
    document.addEventListener('click', triggerTour, { once: true })

    return () => {
      window.removeEventListener('scroll', triggerTour)
      document.removeEventListener('click', triggerTour)
      window.speechSynthesis.cancel()
    }
  }, [speak])

  const handleClick = () => {
    if (speaking) {
      window.speechSynthesis.cancel()
      setSpeaking(false)
      setHasPlayed(true)
      return
    }
    hasTriggeredRef.current = true
    speak()
  }

  if (!supported) return null

  const label = speaking
    ? 'Site voice tour, click to mute'
    : hasPlayed
      ? 'Replay tour'
      : 'Hear what this site is about'

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className="group fixed left-6 bottom-safe z-[9998] h-14 w-14 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-light transition-colors"
    >
      {speaking && (
        <span
          className="voice-ring absolute inset-0 rounded-full border-2 border-primary"
          aria-hidden="true"
        />
      )}
      {speaking ? (
        <VolumeX size={24} aria-hidden="true" />
      ) : (
        <Volume2 size={24} aria-hidden="true" />
      )}
      <span className="pointer-events-none absolute left-16 whitespace-nowrap rounded-sm bg-text-primary text-white font-body text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
        {label}
      </span>
    </button>
  )
}
