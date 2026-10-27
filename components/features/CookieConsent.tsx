'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'
import {
  useCookieConsentStore,
  type CookiePreferences,
} from '@/lib/stores/cookie-consent-store'

const TOGGLE_ROWS: Array<{
  key: keyof CookiePreferences
  label: string
  description: string
  locked?: boolean
}> = [
  {
    key: 'necessary',
    label: 'Necessary cookies',
    description: 'Required for the site to work. They cannot be switched off.',
    locked: true,
  },
  {
    key: 'functional',
    label: 'Functional cookies',
    description: 'Remember your choices, such as saved document drafts.',
  },
  {
    key: 'analytics',
    label: 'Analytics cookies',
    description: 'Show us which pages are useful so we can improve the service.',
  },
  {
    key: 'marketing',
    label: 'Marketing cookies',
    description: 'Used for relevant updates about new document templates.',
  },
]

export function CookieConsent() {
  const { visible, preferences, hydrate, acceptAll, savePreferences } =
    useCookieConsentStore()
  const [modalOpen, setModalOpen] = useState(false)
  const [draft, setDraft] = useState<CookiePreferences>(preferences)

  useEffect(() => {
    hydrate()
  }, [hydrate])

  useEffect(() => {
    setDraft(preferences)
  }, [preferences, visible])

  if (!visible && !modalOpen) return null

  return (
    <>
      {visible && (
        <div className="fixed bottom-0 inset-x-0 z-[9997] bg-surface border-t border-border shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pb-safe">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="font-body text-sm text-text-secondary max-w-2xl">
                We use cookies to improve your experience. Read our{' '}
                <Link
                  href="/legal/cookie-policy"
                  className="text-primary underline underline-offset-2"
                >
                  Cookie Policy
                </Link>
                .
              </p>
              <div className="flex gap-3 flex-none">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="min-h-[44px] px-4 rounded-md border border-border text-text-secondary font-body text-sm hover:border-primary hover:text-primary transition-colors"
                >
                  Manage Preferences
                </button>
                <button
                  type="button"
                  onClick={acceptAll}
                  className="min-h-[44px] px-4 rounded-md bg-primary text-white font-body text-sm hover:bg-primary-light transition-colors"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {modalOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/40 flex items-end sm:items-center justify-center sm:p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Cookie preferences"
        >
          <div className="bg-surface w-full sm:max-w-md sm:mx-4 rounded-t-2xl sm:rounded-2xl shadow-modal max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-5 border-b border-border">
              <h2 className="font-heading text-lg text-text-primary">
                Cookie preferences
              </h2>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close preferences"
                className="min-h-[44px] min-w-[44px] flex items-center justify-center text-text-secondary"
              >
                <X size={20} />
              </button>
            </div>
            <div className="px-5">
              {TOGGLE_ROWS.map((row) => (
                <div
                  key={row.key}
                  className="flex justify-between items-start sm:items-center gap-4 py-3 border-b border-border"
                >
                  <div className="pr-2">
                    <p className="font-body text-sm font-medium text-text-primary">
                      {row.label}
                    </p>
                    <p className="font-body text-xs text-text-muted mt-1 leading-relaxed">
                      {row.description}
                    </p>
                  </div>
                  <label className="cookie-toggle mt-1">
                    <input
                      type="checkbox"
                      checked={
                        row.locked ? true : draft[row.key]
                      }
                      disabled={row.locked}
                      onChange={(event) =>
                        setDraft((current) => ({
                          ...current,
                          [row.key]: event.target.checked,
                        }))
                      }
                      aria-label={row.label}
                    />
                    <span className="cookie-toggle-slider" />
                  </label>
                </div>
              ))}
            </div>
            <div className="p-5">
              <button
                type="button"
                onClick={() => {
                  savePreferences(draft)
                  setModalOpen(false)
                }}
                className="w-full min-h-[44px] rounded-md bg-primary text-white font-body text-sm hover:bg-primary-light transition-colors"
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
