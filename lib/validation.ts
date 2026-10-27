import { z } from 'zod'
import { DOCUMENTS } from './documents'

const slugs = DOCUMENTS.map((documentItem) => documentItem.slug) as [
  string,
  ...string[],
]

export const generateDocumentSchema = z.object({
  slug: z.enum(slugs),
  token: z.string().optional(),
  v2Token: z.string().optional(),
  partyAName: z.string().trim().min(2, 'First party name is required'),
  partyAIdNumber: z.string().trim().min(3, 'First party ID is required'),
  partyAAddress: z.string().trim().min(5, 'First party address is required'),
  partyBName: z.string().trim().min(2, 'Second party name is required'),
  partyBIdNumber: z.string().trim().min(3, 'Second party ID is required'),
  partyBAddress: z.string().trim().min(5, 'Second party address is required'),
  contactEmail: z.string().trim().email('A valid contact email is required'),
})

export const enquirySchema = z.object({
  name: z.string().trim().min(2, 'Please enter your name'),
  email: z.string().trim().email('Please enter a valid email address'),
  subject: z.string().trim().min(3, 'Please add a short subject'),
  message: z.string().trim().min(20, 'Tell us a little more in your message'),
  token: z.string().optional(),
  v2Token: z.string().optional(),
})

export type GenerateDocumentInput = z.infer<typeof generateDocumentSchema>
export type EnquiryInput = z.infer<typeof enquirySchema>
