import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Hero } from '@/components/features/Hero'
import { TrustBar } from '@/components/features/TrustBar'
import { HowItWorks } from '@/components/features/HowItWorks'
import { DocumentCard } from '@/components/features/DocumentCard'
import { TestimonialCard } from '@/components/features/TestimonialCard'
import { Accordion } from '@/components/ui/Accordion'
import { Button } from '@/components/ui/Button'
import { DOCUMENTS } from '@/lib/documents'
import { FAQ_ITEMS, TESTIMONIALS } from '@/lib/content'
import { CONTAINER_CLASS } from '@/lib/site'

export default function HomePage() {
  const featuredDocuments = DOCUMENTS.slice(0, 6)

  return (
    <>
      <Hero />
      <TrustBar />

      <section
        className="py-16 sm:py-20 bg-surface"
        aria-labelledby="featured-documents-heading"
      >
        <div className={CONTAINER_CLASS}>
          <h2
            id="featured-documents-heading"
            className="font-heading text-2xl sm:text-3xl text-text-primary text-center"
          >
            Popular legal documents
          </h2>
          <p className="font-body text-base text-text-secondary text-center max-w-2xl mx-auto mt-3">
            Every template is drafted for Kenyan law and reviewed by practicing
            advocates before it reaches the library.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
            {featuredDocuments.map((documentItem, index) => (
              <DocumentCard
                key={documentItem.slug}
                documentItem={documentItem}
                index={index}
              />
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button href="/documents" variant="outline">
              Browse all documents
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      <HowItWorks />

      <section
        className="py-16 sm:py-20 bg-surface"
        aria-labelledby="testimonials-heading"
      >
        <div className={CONTAINER_CLASS}>
          <h2
            id="testimonials-heading"
            className="font-heading text-2xl sm:text-3xl text-text-primary text-center"
          >
            Trusted by Kenyan business owners
          </h2>
          <p className="font-body text-base text-text-secondary text-center max-w-2xl mx-auto mt-3">
            Founders, freelancers, and small teams use Ezekiel Docs to handle
            paperwork confidently.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {TESTIMONIALS.map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-16 sm:py-20 bg-surface-alt"
        aria-labelledby="faq-heading"
      >
        <div className={`${CONTAINER_CLASS} max-w-3xl`}>
          <h2
            id="faq-heading"
            className="font-heading text-2xl sm:text-3xl text-text-primary text-center"
          >
            Frequently asked questions
          </h2>
          <p className="font-body text-base text-text-secondary text-center mt-3">
            Straight answers about validity, editing, and how the platform
            works.
          </p>
          <div className="mt-10">
            <Accordion items={FAQ_ITEMS} />
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-surface">
        <div className={CONTAINER_CLASS}>
          <div className="bg-primary rounded-xl px-6 py-12 sm:px-12 sm:py-16 text-center max-w-4xl mx-auto">
            <h2 className="font-heading text-2xl sm:text-3xl text-white">
              Ready to sort your legal paperwork?
            </h2>
            <p className="font-body text-base text-accent-light max-w-xl mx-auto mt-4">
              Pick a document, answer a few plain questions, and hold a
              professional PDF in minutes. No legal jargon and no retainer
              required.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button href="/documents" variant="white" size="lg">
                Start a Document
              </Button>
              <Link
                href="/pricing"
                className="min-h-[48px] inline-flex items-center justify-center rounded-md border border-white/40 px-6 py-3 text-base font-body font-medium text-white hover:bg-white/10 transition-colors"
              >
                View pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
