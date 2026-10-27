export interface RecaptchaResult {
  success: boolean
  score: number
  requireV2: boolean
}

const PASS_THROUGH: RecaptchaResult = {
  success: true,
  score: 1,
  requireV2: false,
}

/**
 * Verifies a reCAPTCHA token server side.
 * When no secret key is configured (local development) verification is
 * bypassed so the document flow remains testable without external services.
 */
export async function verifyRecaptcha(
  token: string | undefined,
): Promise<RecaptchaResult> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY

  if (!secretKey) {
    return PASS_THROUGH
  }

  if (!token) {
    return { success: false, score: 0, requireV2: true }
  }

  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
        cache: 'no-store',
      },
    )

    const data = (await response.json()) as {
      success: boolean
      score?: number
    }

    const score = typeof data.score === 'number' ? data.score : 0

    if (!data.success) {
      return { success: false, score, requireV2: true }
    }

    if (score < 0.5) {
      return { success: false, score, requireV2: true }
    }

    return { success: true, score, requireV2: false }
  } catch {
    return { success: false, score: 0, requireV2: true }
  }
}
