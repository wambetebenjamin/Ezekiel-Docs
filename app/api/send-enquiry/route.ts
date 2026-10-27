import { NextResponse } from 'next/server'
import { enquirySchema } from '@/lib/validation'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { sendEnquiryEmail } from '@/lib/nodemailer'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { success: false, error: 'Invalid request body' },
      { status: 400 },
    )
  }

  const parsed = enquirySchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Please complete every field before sending.',
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  const recaptcha = await verifyRecaptcha(
    parsed.data.v2Token ?? parsed.data.token,
  )
  if (recaptcha.requireV2 && !parsed.data.v2Token) {
    return NextResponse.json({ requireV2: true }, { status: 403 })
  }

  if (!recaptcha.success) {
    return NextResponse.json(
      {
        success: false,
        error:
          'We could not verify the security check. Please try again or use WhatsApp.',
      },
      { status: 403 },
    )
  }

  try {
    await sendEnquiryEmail(parsed.data)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Enquiry email failed', error)
    return NextResponse.json(
      {
        success: false,
        error:
          'Your message could not be sent right now. Please use WhatsApp instead.',
      },
      { status: 500 },
    )
  }
}
