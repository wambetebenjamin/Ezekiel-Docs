import type { Metadata } from 'next'
import { Check } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { CONTAINER_CLASS } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple, transparent pricing for Kenyan SMEs, freelancers, and startups. Start free, upgrade when you need the full document library.',
}

interface Tier {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  href: string
  featured?: boolean
}

const TIERS: Tier[] = [
  {
    name: 'Free',
    price: 'KSh 0',
    period: 'forever',
    description:
      'For a first-time founder who needs one or two standard documents.',
    features: [
      '3 document generations per month',
      'Core contracts and letters',
      'Instant PDF download',
      'Email delivery of your copy',
      'Knowledge base and guides',
    ],
    cta: 'Start free',
    href: '/documents',
  },
  {
    name: 'Professional',
    price: 'KSh 1,499',
    period: 'per month',
    description:
      'For growing SMEs and freelancers who handle documents every week.',
    features: [
      'Unlimited document generations',
      'Full library of 16 plus templates',
      'Reusable party and company details',
      'Priority PDF generation',
      'Email support within one business day',
      'New templates added at no extra cost',
    ],
    cta: 'Choose Professional',
    href: '/documents',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'annual agreement',
    description:
      'For teams, law firms, and accelerators that need branded workflows.',
    features: [
      'Everything in Professional',
      'Up to 25 team accounts',
      'Custom document templates',
      'Branded PDF headers and footers',
      'Dedicated onboarding and training',
      'Account manager and SLA',
    ],
    cta: 'Talk to us',
    href: '/about',
  },
]

const COMPARISON_ROWS: Array<{ feature: string; free: string; pro: string; enterprise: string }> = [
  {
    feature: 'Monthly document generations',
    free: '3',
    pro: 'Unlimited',
    enterprise: 'Unlimited',
  },
  {
    feature: 'Kenyan-law-reviewed templates',
    free: 'Core only',
    pro: 'Full library',
    enterprise: 'Full library plus custom',
  },
  {
    feature: 'Instant PDF download',
    free: 'Yes',
    pro: 'Yes',
    enterprise: 'Yes',
  },
  {
    feature: 'Saved party details',
    free: 'No',
    pro: 'Yes',
    enterprise: 'Yes',
  },
  {
    feature: 'Team accounts',
    free: 'No',
    pro: '1 user',
    enterprise: 'Up to 25',
  },
  {
    feature: 'Branded documents',
    free: 'No',
    pro: 'No',
    enterprise: 'Yes',
  },
  {
    feature: 'Support',
    free: 'Knowledge base',
    pro: 'Email, one business day',
    enterprise: 'Dedicated account manager',
  },
]

export default function PricingPage() {
  return (
    <div className="bg-surface">
      <div className={`${CONTAINER_CLASS} py-12 sm:py-16`}>
        <header className="max-w-2xl mx-auto text-center">
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-primary">
            Pricing that respects a small business budget
          </h1>
          <p className="font-body text-base text-text-secondary mt-4">
            Start free and only upgrade when the paperwork starts flowing.
            Every plan includes lawyer-reviewed, Kenyan-law-compliant templates.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-12">
          {TIERS.map((tier) => (
            <section
              key={tier.name}
              className={[
                'rounded-lg p-6 sm:p-8 flex flex-col',
                tier.featured
                  ? 'bg-primary text-white shadow-card-hover'
                  : 'bg-surface border border-border shadow-card',
              ].join(' ')}
            >
              <h2
                className={[
                  'font-heading text-xl',
                  tier.featured ? 'text-white' : 'text-text-primary',
                ].join(' ')}
              >
                {tier.name}
              </h2>
              <p
                className={[
                  'font-heading text-4xl font-bold mt-4',
                  tier.featured ? 'text-white' : 'text-text-primary',
                ].join(' ')}
              >
                {tier.price}
              </p>
              <p
                className={[
                  'font-body text-sm mt-1',
                  tier.featured ? 'text-accent-light' : 'text-text-muted',
                ].join(' ')}
              >
                {tier.period}
              </p>
              <p
                className={[
                  'font-body text-sm leading-relaxed mt-4',
                  tier.featured ? 'text-accent-light' : 'text-text-secondary',
                ].join(' ')}
              >
                {tier.description}
              </p>
              <ul className="mt-6 space-y-3 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className={[
                        'flex-none mt-0.5',
                        tier.featured
                          ? 'text-white'
                          : 'text-primary-lighter',
                      ].join(' ')}
                      aria-hidden="true"
                    />
                    <span
                      className={[
                        'font-body text-sm',
                        tier.featured
                          ? 'text-accent-light'
                          : 'text-text-secondary',
                      ].join(' ')}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Button
                  href={tier.href}
                  variant={tier.featured ? 'white' : 'primary'}
                  fullWidth
                >
                  {tier.cta}
                </Button>
              </div>
            </section>
          ))}
        </div>

        <section className="mt-16" aria-labelledby="comparison-heading">
          <h2
            id="comparison-heading"
            className="font-heading text-2xl sm:text-3xl text-text-primary text-center"
          >
            Compare plans in detail
          </h2>
          <div className="overflow-x-auto mt-8 border border-border rounded-lg shadow-card">
            <table className="w-full border-collapse min-w-[640px]">
              <thead>
                <tr className="bg-surface-alt">
                  <th
                    scope="col"
                    className="text-left font-body text-sm font-semibold text-text-primary px-4 sm:px-6 py-4 border-b border-border"
                  >
                    Feature
                  </th>
                  <th
                    scope="col"
                    className="text-left font-body text-sm font-semibold text-text-primary px-4 sm:px-6 py-4 border-b border-border"
                  >
                    Free
                  </th>
                  <th
                    scope="col"
                    className="text-left font-body text-sm font-semibold text-primary px-4 sm:px-6 py-4 border-b border-border"
                  >
                    Professional
                  </th>
                  <th
                    scope="col"
                    className="text-left font-body text-sm font-semibold text-text-primary px-4 sm:px-6 py-4 border-b border-border"
                  >
                    Enterprise
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-b-0">
                    <td className="font-body text-sm text-text-primary px-4 sm:px-6 py-4">
                      {row.feature}
                    </td>
                    <td className="font-body text-sm text-text-secondary px-4 sm:px-6 py-4">
                      {row.free}
                    </td>
                    <td className="font-body text-sm text-text-secondary px-4 sm:px-6 py-4">
                      {row.pro}
                    </td>
                    <td className="font-body text-sm text-text-secondary px-4 sm:px-6 py-4">
                      {row.enterprise}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  )
}
