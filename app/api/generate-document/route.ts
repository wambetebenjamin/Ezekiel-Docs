import { NextResponse } from 'next/server'
import { generatePdf } from '@/lib/pdf'
import { getDocumentBySlug } from '@/lib/documents'
import { generateDocumentSchema } from '@/lib/validation'
import { verifyRecaptcha } from '@/lib/recaptcha'
import { sendDocumentConfirmationEmail } from '@/lib/nodemailer'

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

  const parsed = generateDocumentSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: 'Some details are missing or incorrect.',
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 400 },
    )
  }

  const input = parsed.data
  const documentItem = getDocumentBySlug(input.slug)
  if (!documentItem) {
    return NextResponse.json(
      { success: false, error: 'Unknown document type' },
      { status: 404 },
    )
  }

  const recaptcha = await verifyRecaptcha(input.v2Token ?? input.token)
  if (recaptcha.requireV2 && !input.v2Token) {
    return NextResponse.json({ requireV2: true }, { status: 403 })
  }

  try {
    const formData = body as Record<string, string>
    const pdf = await generatePdf(documentItem, formData)

    let downloadUrl = pdf.dataUrl

    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const { put } = await import('@vercel/blob')
        const blob = await put(`documents/${pdf.filename}`, pdf.blob, {
          access: 'public',
          contentType: 'application/pdf',
        })
        downloadUrl = blob.url
      } catch (blobError) {
        console.error('Blob upload failed, falling back to data URL', blobError)
      }
    }

    try {
      await sendDocumentConfirmationEmail({
        to: input.contactEmail,
        documentName: documentItem.name,
        filename: pdf.filename,
        fullName: input.partyAName,
      })
    } catch (emailError) {
      console.error('Confirmation email failed', emailError)
    }

    return NextResponse.json({
      success: true,
      filename: pdf.filename,
      reference: pdf.reference,
      downloadUrl,
    })
  } catch (error) {
    console.error('Document generation failed', error)
    return NextResponse.json(
      {
        success: false,
        error:
          'We could not generate your document. Please try again in a moment.',
      },
      { status: 500 },
    )
  }
}
