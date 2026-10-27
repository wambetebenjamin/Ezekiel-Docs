'use client'

import Link from 'next/link'
import { X } from 'lucide-react'
import { useEffect } from 'react'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

const LINKS = [
  { href: '/documents', label: 'Documents' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="md:hidden border-t border-border bg-surface">
      <div className="flex justify-end px-4 pt-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center text-text-secondary"
        >
          <X size={22} />
        </button>
      </div>
      <nav className="flex flex-col px-4 pb-6" aria-label="Mobile navigation">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            onClick={onClose}
            className="min-h-[48px] flex items-center font-body text-base text-text-secondary border-b border-border"
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/documents"
          onClick={onClose}
          className="mt-4 min-h-[48px] flex items-center justify-center rounded-md bg-primary text-white text-sm font-medium"
        >
          Start a Document
        </Link>
      </nav>
    </div>
  )
}
