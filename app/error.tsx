'use client'

import { useEffect } from 'react'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DEFAULT_WHATSAPP_LINK, WHATSAPP_DISPLAY } from '@/lib/site'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('Application error', error)
  }, [error])

  return (
    <div className="bg-surface min-h-[70vh] flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="font-heading text-8xl text-accent leading-none">500</p>
        <h1 className="font-heading text-2xl text-text-primary mt-6">
          Something went wrong
        </h1>
        <p className="font-body text-sm sm:text-base text-text-secondary max-w-md mx-auto mt-3 leading-relaxed">
          Our team has been notified. If you need immediate help, reach us on
          WhatsApp: {WHATSAPP_DISPLAY}
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button type="button" onClick={reset} size="lg">
            Try again
          </Button>
          <a
            href={DEFAULT_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center gap-2 rounded-md bg-[#25D366] text-white px-5 py-2.5 text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
