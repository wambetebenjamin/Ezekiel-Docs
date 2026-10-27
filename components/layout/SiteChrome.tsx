'use client'

import { useState } from 'react'
import { LoadingScreen } from '@/components/features/LoadingScreen'
import { CookieConsent } from '@/components/features/CookieConsent'
import { WhatsAppButton } from '@/components/features/WhatsAppButton'
import { VoiceTour } from '@/components/features/VoiceTour'

export function SiteChrome() {
  const [loading, setLoading] = useState(true)

  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      <WhatsAppButton />
      <VoiceTour />
      <CookieConsent />
    </>
  )
}
