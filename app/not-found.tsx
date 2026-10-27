import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { DEFAULT_WHATSAPP_LINK, WHATSAPP_DISPLAY } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false },
}

export default function NotFound() {
  return (
    <div className="bg-surface min-h-[70vh] flex items-center">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <p className="font-heading text-8xl text-accent leading-none">404</p>
        <h1 className="font-heading text-2xl text-text-primary mt-6">
          Page not found
        </h1>
        <p className="font-body text-sm sm:text-base text-text-secondary max-w-md mx-auto mt-3 leading-relaxed">
          The page you are looking for may have moved, or the link might be
          incorrect. Head back home to find the documents you need.
        </p>
        <div className="mt-8 flex flex-col items-center gap-4">
          <Button href="/" size="lg">
            Back to Homepage
          </Button>
          <a
            href={DEFAULT_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center gap-2 font-body text-sm text-primary hover:text-primary-light"
          >
            <MessageCircle size={18} aria-hidden="true" />
            Chat on WhatsApp: {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>
    </div>
  )
}
