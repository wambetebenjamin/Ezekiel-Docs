import { create } from 'zustand'

export const COOKIE_CONSENT_KEY = 'ezekiel-docs-cookie-consent'

export interface CookiePreferences {
  necessary: boolean
  functional: boolean
  analytics: boolean
  marketing: boolean
}

interface CookieConsentState {
  visible: boolean
  preferences: CookiePreferences
  hydrate: () => void
  acceptAll: () => void
  savePreferences: (preferences: CookiePreferences) => void
  dismiss: () => void
}

const defaultPreferences: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
}

function persist(preferences: CookiePreferences) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(
    COOKIE_CONSENT_KEY,
    JSON.stringify({ ...preferences, decidedAt: new Date().toISOString() }),
  )
}

export const useCookieConsentStore = create<CookieConsentState>((set) => ({
  visible: false,
  preferences: defaultPreferences,
  hydrate: () => {
    if (typeof window === 'undefined') return
    const stored = window.localStorage.getItem(COOKIE_CONSENT_KEY)
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as Partial<CookiePreferences>
        set({
          visible: false,
          preferences: { ...defaultPreferences, ...parsed, necessary: true },
        })
        return
      } catch {
        window.localStorage.removeItem(COOKIE_CONSENT_KEY)
      }
    }
    set({ visible: true })
  },
  acceptAll: () => {
    const all: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    }
    persist(all)
    set({ visible: false, preferences: all })
  },
  savePreferences: (preferences) => {
    const next = { ...preferences, necessary: true }
    persist(next)
    set({ visible: false, preferences: next })
  },
  dismiss: () => set({ visible: false }),
}))
