import nodemailer, { type Transporter } from 'nodemailer'

let transporter: Transporter | null = null

function getTransporter(): Transporter | null {
  const host = process.env.SMTP_HOST
  const port = process.env.SMTP_PORT
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS

  if (!host || !port || !user || !pass) {
    return null
  }

  if (!transporter) {
    transporter = nodemailer.createTransport({
      host,
      port: Number(port),
      secure: Number(port) === 465,
      auth: { user, pass },
    })
  }

  return transporter
}

const FROM =
  process.env.SMTP_FROM ?? 'Ezekiel Docs <no-reply@ezekieldocs.co.ke>'

interface DocumentEmailData {
  to: string
  documentName: string
  filename: string
  fullName: string
}

export async function sendDocumentConfirmationEmail(
  data: DocumentEmailData,
): Promise<boolean> {
  const mailer = getTransporter()

  if (!mailer) {
    console.info('SMTP not configured, skipping document confirmation email')
    return false
  }

  await mailer.sendMail({
    from: FROM,
    to: data.to,
    subject: `Your ${data.documentName} is ready`,
    text: `Hello ${data.fullName},\n\nYour ${data.documentName} has been generated successfully and is ready to download as ${data.filename}.\n\nThank you for using Ezekiel Docs.\n\nEzekiel Docs\nYour legal documents, done right.`,
  })

  return true
}

export interface EnquiryData {
  name: string
  email: string
  subject: string
  message: string
}

export async function sendEnquiryEmail(
  data: EnquiryData,
): Promise<boolean> {
  const mailer = getTransporter()

  if (!mailer) {
    console.info('SMTP not configured, skipping enquiry email')
    return false
  }

  await mailer.sendMail({
    from: FROM,
    to: process.env.SMTP_USER ?? FROM,
    replyTo: data.email,
    subject: `Website enquiry: ${data.subject}`,
    text: `Name: ${data.name}\nEmail: ${data.email}\nSubject: ${data.subject}\n\n${data.message}`,
  })

  return true
}
