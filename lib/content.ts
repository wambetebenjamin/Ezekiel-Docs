import type { AccordionItem } from '@/components/ui/Accordion'

export const FAQ_ITEMS: AccordionItem[] = [
  {
    question: 'Are these documents legally valid in Kenya?',
    answer:
      'Yes. Every Ezekiel Docs template is reviewed by qualified Kenyan lawyers and drafted to align with the relevant Kenyan statutes, including the Contract Act, the Employment Act 2007, the Land Act 2012, and the Data Protection Act 2019. Once correctly filled, dated, and signed, the documents create binding obligations between the parties, subject to the usual rules of contract.',
  },
  {
    question: 'Can I edit the document after downloading?',
    answer:
      'You can regenerate a document as many times as you need before downloading. The PDF itself is flattened for signing and sharing, so the safest way to make a change is to update your answers in the generator and download a fresh copy. This keeps every version consistent and properly formatted.',
  },
  {
    question: 'Do I need to have the document witnessed or notarised?',
    answer:
      'Most simple contracts in Kenya do not require notarisation, but they should be signed by both parties and ideally witnessed by two independent adults. Property documents, affidavits, and documents for use abroad often require a commissioner for oaths or a notary public. Each generated PDF includes witness signature blocks and plain guidance on when extra formalities apply.',
  },
  {
    question: 'How long does it take to generate a document?',
    answer:
      'Most documents take between five and ten minutes to complete. Once you submit the final form, your PDF is generated instantly and the download begins immediately. There is no waiting period, no manual review queue, and no appointment to book.',
  },
  {
    question: 'What happens if I make a mistake in the form?',
    answer:
      'You can move back to any step using the edit links on the review screen before you submit. If you notice a mistake after downloading, simply correct the answer and generate a new PDF. Nothing is finalised until you sign the document, so correcting an early draft costs nothing.',
  },
  {
    question: 'How much does it cost to use Ezekiel Docs?',
    answer:
      'You can create an account and generate your first documents free of charge. The Professional plan unlocks the full document library, priority generation, and email support for a flat monthly fee. The Enterprise plan adds team accounts, custom templates, and dedicated onboarding. See the pricing page for the current figures.',
  },
]

export interface Testimonial {
  name: string
  role: string
  quote: string
  image: string
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: 'Amara Otieno',
    role: 'Founder, Mara Craft Studio, Nairobi',
    quote:
      'I needed an NDA before my first supplier meeting and I had never used a lawyer before. I answered the questions over a cup of tea and had a proper Kenyan contract in my inbox within minutes.',
    image: '/images/portrait-amara-otieno.jpg',
  },
  {
    name: 'Brian Mwangi',
    role: 'Operations Lead, SwiftMovers KE',
    quote:
      'Our tenancy and service agreements used to cost us legal fees every quarter. Now the team generates compliant documents in-house and only sends the unusual cases to our advocate.',
    image: '/images/portrait-brian-mwangi.jpg',
  },
  {
    name: 'Fatuma Adan',
    role: 'Independent Graphic Designer, Mombasa',
    quote:
      'The freelancer contract explained every clause in plain English. My clients take me more seriously now, and I always get paid on the terms we agreed.',
    image: '/images/portrait-fatuma-adan.jpg',
  },
]

export interface TeamMember {
  name: string
  role: string
  bio: string
  image: string
}

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Brian Mwangi',
    role: 'Co-Founder and Legal Lead',
    bio: 'An advocate of the High Court of Kenya with ten years of experience advising small businesses, Brian leads document review and keeps every template aligned with Kenyan statute.',
    image: '/images/portrait-brian-mwangi.jpg',
  },
  {
    name: 'Amara Otieno',
    role: 'Co-Founder and Product Lead',
    bio: 'A product designer and former SME owner, Amara builds the step-by-step generator so that first-time founders can complete legal paperwork without feeling intimidated.',
    image: '/images/portrait-amara-otieno.jpg',
  },
  {
    name: 'Kevin Otieno',
    role: 'Head of Engineering',
    bio: 'Kevin builds the secure document pipeline, PDF engine, and privacy controls that keep client data protected across every generation request.',
    image: '/images/portrait-kevin-otieno.jpg',
  },
]
