'use client'

import { MessageCircle } from 'lucide-react'
import { DEFAULT_WHATSAPP_LINK } from '@/lib/site'

export function WhatsAppButton() {
  return (
    <a
      href={DEFAULT_WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="whatsapp-entrance fixed right-6 bottom-safe z-[9998] h-14 w-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-[0_4px_12px_rgba(37,211,102,0.35)] group"
    >
      <MessageCircle size={24} aria-hidden="true" />
      <span className="pointer-events-none absolute right-16 whitespace-nowrap rounded-sm bg-text-primary text-white font-body text-xs px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity">
        Chat with us on WhatsApp
      </span>
    </a>
  )
}
