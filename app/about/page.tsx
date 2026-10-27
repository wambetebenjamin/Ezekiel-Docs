import type { Metadata } from 'next'
import Image from 'next/image'
import {
  HeartHandshake,
  LockKeyhole,
  Scale,
  Sparkles,
} from 'lucide-react'
import { CONTAINER_CLASS } from '@/lib/site'
import { TEAM_MEMBERS } from '@/lib/content'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Ezekiel Docs makes Kenyan legal documents accessible to first-time SME owners, freelancers, and startups through lawyer-reviewed automation.',
}

const VALUES = [
  {
    name: 'Accessibility',
    description:
      'Plain language and guided questions put legal paperwork within reach of every business owner.',
    icon: Sparkles,
  },
  {
    name: 'Integrity',
    description:
      'Every template is reviewed by Kenyan advocates and aligned with the statutes that govern local business.',
    icon: Scale,
  },
  {
    name: 'Privacy',
    description:
      'Your data is handled under the Data Protection Act 2019 and never sold to third parties.',
    icon: LockKeyhole,
  },
  {
    name: 'Partnership',
    description:
      'We succeed when Kenyan SMEs succeed, and we build around the realities of running a small business.',
    icon: HeartHandshake,
  },
]

const PARTNER_LABELS = [
  'Partner Logo',
  'Partner Logo',
  'Partner Logo',
  'Partner Logo',
]

export default function AboutPage() {
  return (
    <div className="bg-surface">
      <div className={CONTAINER_CLASS}>
        <section className="py-12 sm:py-16 max-w-3xl">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-primary">
            Legal paperwork should not require a law degree
          </h1>
          <h2 className="font-heading text-2xl sm:text-3xl text-text-primary mt-10">
            Our mission
          </h2>
          <p className="font-body text-base text-text-primary leading-relaxed mt-4">
            Ezekiel Docs exists to remove the fear, cost, and delay that stops
            Kenyan small business owners from getting their paperwork right.
            Most SMEs will never hire a lawyer for a routine contract, yet they
            still need documents they can trust. We combine lawyer-reviewed
            templates with a calm, question-and-answer generator so that a
            first-time founder can produce a compliant agreement in minutes.
          </p>
          <p className="font-body text-base text-text-secondary leading-relaxed mt-4">
            The platform is built around Kenyan law, Kenyan currency, and the
            situations local businesses actually face, from tenancy and
            employment to freelancing, lending, and selling goods.
          </p>
        </section>

        <section
          className="py-12 sm:py-16 border-t border-border"
          aria-labelledby="team-heading"
        >
          <h2
            id="team-heading"
            className="font-heading text-2xl sm:text-3xl text-text-primary"
          >
            The team
          </h2>
          <p className="font-body text-base text-text-secondary mt-3 max-w-2xl">
            A small team of legal, product, and engineering professionals based
            in Kenya.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
            {TEAM_MEMBERS.map((member) => (
              <article
                key={member.name}
                className="border border-border rounded-lg shadow-card p-6 bg-surface"
              >
                <Image
                  src={member.image}
                  alt={`Portrait of ${member.name}`}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full object-cover"
                />
                <h3 className="font-heading text-lg text-text-primary mt-4">
                  {member.name}
                </h3>
                <p className="font-body text-sm text-primary font-medium mt-1">
                  {member.role}
                </p>
                <p className="font-body text-sm text-text-secondary leading-relaxed mt-3">
                  {member.bio}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="py-12 sm:py-16 border-t border-border"
          aria-labelledby="partners-heading"
        >
          <h2
            id="partners-heading"
            className="font-heading text-2xl sm:text-3xl text-text-primary"
          >
            Our partners
          </h2>
          <p className="font-body text-base text-text-secondary mt-3 max-w-2xl">
            We work with law firms, business associations, and startup hubs to
            keep our templates accurate and useful.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
            {PARTNER_LABELS.map((label, index) => (
              <div
                key={index}
                className="h-28 rounded-md border border-dashed border-border bg-surface-alt flex items-center justify-center"
              >
                <span className="font-body text-xs text-text-muted">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="py-12 sm:py-16 border-t border-border"
          aria-labelledby="values-heading"
        >
          <h2
            id="values-heading"
            className="font-heading text-2xl sm:text-3xl text-text-primary"
          >
            What we stand for
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10">
            {VALUES.map((value) => {
              const Icon = value.icon
              return (
                <div
                  key={value.name}
                  className="border border-border rounded-lg p-5 bg-surface shadow-card"
                >
                  <div className="h-11 w-11 rounded-md bg-accent-light p-2 flex items-center justify-center">
                    <Icon
                      size={28}
                      className="text-primary-lighter"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="font-heading text-lg text-text-primary mt-3">
                    {value.name}
                  </h3>
                  <p className="font-body text-sm text-text-secondary leading-relaxed mt-2">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
