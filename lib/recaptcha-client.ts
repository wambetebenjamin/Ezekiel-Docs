'use client'

declare global {
  interface Window {
    grecaptcha?: {
      ready: (callback: () => void) => void
      execute: (siteKey: string, options: { action: string }) => Promise<string>
      render: (
        element: HTMLElement,
        options: Record<string, unknown>,
      ) => number
    }
  }
}

const SCRIPT_ID = 'recaptcha-v3-script'
const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

let scriptPromise: Promise<void> | null = null

function loadRecaptchaScript(): Promise<void> {
  if (typeof window === 'undefined') {
    return Promise.resolve()
  }

  if (!SITE_KEY) {
    return Promise.resolve()
  }

  if (window.grecaptcha) {
    return Promise.resolve()
  }

  if (scriptPromise) {
    return scriptPromise
  }

  scriptPromise = new Promise<void>((resolve, reject) => {
    const existing = document.getElementById(SCRIPT_ID)
    if (existing) {
      existing.addEventListener('load', () => resolve())
      return
    }

    const script = document.createElement('script')
    script.id = SCRIPT_ID
    script.src = `https://www.google.com/recaptcha/api.js?render=${SITE_KEY}`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA'))
    document.head.appendChild(script)
  })

  return scriptPromise
}

/**
 * Executes reCAPTCHA v3 and returns an invisible token.
 * Returns a local development token when no site key is configured.
 */
export async function executeRecaptchaV3(
  action: string,
): Promise<string> {
  if (!SITE_KEY) {
    return 'dev-recaptcha-token'
  }

  await loadRecaptchaScript()

  if (!window.grecaptcha) {
    return 'dev-recaptcha-token'
  }

  return new Promise<string>((resolve) => {
    window.grecaptcha?.ready(async () => {
      const token = await window.grecaptcha!.execute(SITE_KEY, { action })
      resolve(token)
    })
  })
}

/**
 * Loads the reCAPTCHA v2 script on demand when a low v3 score requires
 * an explicit challenge. Returns true when rendering is available.
 */
export async function loadRecaptchaV2(
  container: HTMLElement,
  onVerified: (token: string) => void,
): Promise<boolean> {
  if (!SITE_KEY) {
    return false
  }

  await new Promise<void>((resolve) => {
    if (window.grecaptcha?.render) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = `https://www.google.com/recaptcha/api.js`
    script.async = true
    script.defer = true
    script.onload = () => resolve()
    document.head.appendChild(script)
  })

  window.grecaptcha?.render(container, {
    sitekey: SITE_KEY,
    theme: 'light',
    size: 'normal',
    callback: (token: string) => onVerified(token),
  })

  return true
}
