export const SITE_NAME = 'Ezekiel Docs'
export const SITE_TAGLINE = 'Your legal documents, done right.'
export const SITE_DESCRIPTION =
  'Generate Kenyan-law-compliant legal documents for your SME, freelance business, or startup in minutes. Fill in your details, review, and download a ready-to-sign PDF.'

export const WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '254112272061'

export const WHATSAPP_DISPLAY = '+254 112 272 061'

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const DEFAULT_WHATSAPP_LINK = buildWhatsAppLink(
  'Hi Ezekiel Docs, I need help with a legal document',
)

export const CONTAINER_CLASS =
  'w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'
