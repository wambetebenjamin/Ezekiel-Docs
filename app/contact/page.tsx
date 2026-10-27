import type { Metadata } from 'next'
import { Clock, Mail, MessageCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { ContactForm } from '@/components/features/ContactForm'
import {
  CONTAINER_CLASS,
  DEFAULT_WHATSAPP_LINK,
  WHATSAPP_DISPLAY,
} from '@/lib/site'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contact the Ezekiel Docs team about legal document automation for Kenyan SMEs. Send an enquiry or chat on WhatsApp for a fast response.',
  alternates: { canonical: '/contact' },
}

const contactChannels = [
  {
    icon: MessageCircle,
    title: 'WhatsApp',
    detail: WHATSAPP_DISPLAY,
    note: 'Fastest response, Monday to Saturday.',
    href: DEFAULT_WHATSAPP_LINK,
    external: true,
  },
  {
    icon: Mail,
    title: 'Email',
    detail: 'hello@ezekieldocs.co.ke',
    note: 'For document and partnership questions.',
    href: 'mailto:hello@ezekieldocs.co.ke',
    external: false,
  },
  {
    icon: Clock,
    title: 'Response time',
    detail: 'Within one business day',
    note: 'Urgent requests are handled first on WhatsApp.',
    href: null,
    external: false,
  },
]

export default function ContactPage() {
  return (
    <main>
      <section className="bg-surface-alt border-b border-border">
        <div className={`${CONTAINER_CLASS} py-12 sm:py-16`}>
          <p className="font-body text-sm font-semibold text-primary uppercase tracking-wide">
            Contact us
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl text-text-primary mt-3 max-w-2xl">
            Questions about a document? We are here to help.
          </h1>
          <p className="font-body text-base text-text-secondary mt-4 max-w-2xl leading-relaxed">
            Tell us what your business needs and our team will point you to the
            right document or answer questions about pricing, enterprise
            accounts, and lawyer review.
          </p>
        </div>
      </section>

      <section className={`${CONTAINER_CLASS} py-12 sm:py-16`}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-4">
            {contactChannels.map((channel) => {
              const Icon = channel.icon
              const content = (
                <Card className="h-full">
                  <div className="flex items-start gap-4">
                    <span className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-md bg-accent-light text-primary">
                      <Icon size={20} aria-hidden="true" />
                    </span>
                    <div>
                      <h2 className="font-heading text-lg text-text-primary">
                        {channel.title}
                      </h2>
                      <p className="font-body text-sm text-text-primary font-medium mt-1">
                        {channel.detail}
                      </p>
                      <p className="font-body text-sm text-text-secondary mt-1">
                        {channel.note}
                      </p>
                    </div>
                  </div>
                </Card>
              )

              if (channel.href) {
                return (
                  <a
                    key={channel.title}
                    href={channel.href}
                    {...(channel.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-lg"
                  >
                    {content}
                  </a>
                )
              }

              return <div key={channel.title}>{content}</div>
            })}
          </div>

          <Card className="lg:col-span-3">
            <h2 className="font-heading text-2xl text-text-primary">
              Send an enquiry
            </h2>
            <p className="font-body text-sm text-text-secondary mt-2 mb-6">
              Fields marked by the form are required. Your details are handled
              under our privacy policy.
            </p>
            <ContactForm />
          </Card>
        </div>
      </section>
    </main>
  )
}
