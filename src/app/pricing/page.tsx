'use client';

import { motion } from 'framer-motion';
import { Check, X, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { PRICING_TIERS, FAQ_ITEMS } from '@/lib/constants';

const featureMatrix = [
  { feature: 'Document Types', free: '3 basic', professional: 'All 12+', enterprise: 'All 12+ + Custom' },
  { feature: 'Generations/Month', free: '3', professional: 'Unlimited', enterprise: 'Unlimited' },
  { feature: 'PDF Download', free: 'Standard', professional: 'Priority', enterprise: 'Priority' },
  { feature: 'Edit Before Download', free: false, professional: true, enterprise: true },
  { feature: 'Save Party Details', free: false, professional: true, enterprise: true },
  { feature: 'Audit Trail', free: false, professional: true, enterprise: true },
  { feature: 'Email Support', free: true, professional: true, enterprise: true },
  { feature: 'WhatsApp Support', free: false, professional: true, enterprise: true },
  { feature: 'Lawyer-Reviewed Clauses', free: false, professional: true, enterprise: true },
  { feature: 'Team Collaboration', free: false, professional: false, enterprise: true },
  { feature: 'Custom Templates', free: false, professional: false, enterprise: true },
  { feature: 'API Access', free: false, professional: false, enterprise: true },
  { feature: 'SSO & Advanced Security', free: false, professional: false, enterprise: true },
  { feature: 'Dedicated Account Manager', free: false, professional: false, enterprise: true },
];

export default function PricingPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-body-bg">
      {/* Page Header */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1 className="m-0 text-body-emphasis text-4xl sm:text-5xl md:text-6xl tracking-tight fw-bold">
              Simple, Transparent Pricing
            </motion.h1>
            <motion.p className="m-0 mt-4 text-body-secondary text-lg leading-8">
              Choose the plan that fits your needs. No hidden fees. Cancel anytime.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-7 py-sm-8 py-xl-9">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-5 gx-xl-4">
            {PRICING_TIERS.map((tier, index) => (
              <motion.div
                key={tier.name}
                className="col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
              >
                <div className={`card h-100 border-border overflow-hidden ${tier.popular ? 'border-primary shadow-lg' : ''} relative`}>
                  {tier.popular && (
                    <div className="absolute top-0 start-50 translate-middle-x -mt-3">
                      <span className="badge bg-primary text-white px-3 py-1 rounded-pill">Most Popular</span>
                    </div>
                  )}
                  <div className="card-body d-flex flex-column p-4 p-xl-5">
                    <div className="mb-4">
                      <h3 className="card-title text-body-emphasis text-xl fw-bold mb-2">{tier.name}</h3>
                      <div className="d-flex align-items-baseline gap-1 mb-2">
                        <span className="text-4xl fw-bold text-body-emphasis">
                          {tier.price === null ? 'Custom' : `KSh ${tier.price.toLocaleString()}`}
                        </span>
                        {tier.price !== null && (
                          <span className="text-body-tertiary">/{tier.period}</span>
                        )}
                      </div>
                      <p className="m-0 text-body-secondary text-sm">{tier.description}</p>
                    </div>

                    <ul className="nav flex-column gap-3 flex-1 mb-4">
                      {tier.features.map((feature, i) => (
                        <li key={i} className="d-flex align-items-start gap-3 text-sm">
                          {feature ? (
                            <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                          ) : (
                            <X className="w-5 h-5 text-body-tertiary flex-shrink-0 mt-0.5" />
                          )}
                          <span className={feature ? 'text-body-secondary' : 'text-body-tertiary'}>
                            {feature || 'Not included'}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={tier.name === 'Enterprise' ? 'https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20want%20Enterprise%20plan' : '/documents'}
                      target={tier.name === 'Enterprise' ? '_blank' : undefined}
                      rel={tier.name === 'Enterprise' ? 'noopener noreferrer' : undefined}
                      className={`btn ${tier.ctaVariant === 'primary' ? 'btn-primary' : tier.ctaVariant === 'secondary' ? 'btn-secondary' : 'btn-outline-primary'} w-100 fw-semibold py-3`}
                    >
                      {tier.cta}
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feature Comparison Table */}
          <div className="mt-7 overflow-x-auto">
            <motion.h2 className="m-0 text-body-emphasis text-2xl fw-bold mb-4 text-center">
              Detailed Comparison
            </motion.h2>
            <table className="table table-bordered border-border">
              <thead className="bg-body-tertiary">
                <tr>
                  <th className="text-body-emphasis fw-semibold sticky-left">Feature</th>
                  {PRICING_TIERS.map(tier => (
                    <th key={tier.name} className={`text-center fw-semibold ${tier.popular ? 'text-primary' : ''}`}>
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {featureMatrix.map((row, i) => (
                  <tr key={row.feature} className={i % 2 === 0 ? 'bg-body-tertiary/50' : ''}>
                    <td className="fw-medium text-body-emphasis">{row.feature}</td>
                    {PRICING_TIERS.map(tier => (
                      <td key={tier.name} className="text-center text-sm">
                        {typeof row[tier.name.toLowerCase() as keyof typeof row] === 'boolean'
                          ? row[tier.name.toLowerCase() as keyof typeof row]
                            ? <Check className="w-5 h-5 text-success mx-auto" />
                            : <X className="w-5 h-5 text-body-tertiary mx-auto" />
                          : (
                            <span className={tier.popular ? 'fw-semibold text-primary' : ''}>
                              {row[tier.name.toLowerCase() as keyof typeof row]}
                            </span>
                          )}
                        </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-7 py-sm-8 py-xl-9 bg-body-tertiary">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <motion.h2 className="m-0 text-body-emphasis text-3xl fw-bold text-center mb-5">
              Frequently Asked Questions
            </motion.h2>
            <div className="accordion" id="pricingFaq">
              {FAQ_ITEMS.map((item, index) => (
                <motion.div
                  key={item.question}
                  className="accordion-item border-border mb-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <h3 className="accordion-header" id={`pricingFaqHeading${index}`}>
                    <button
                      className={`accordion-button ${openFaq !== index ? 'collapsed' : ''} fw-medium text-body-emphasis`}
                      type="button"
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      aria-expanded={openFaq === index}
                      aria-controls={`pricingFaqCollapse${index}`}
                    >
                      {item.question}
                    </button>
                  </h3>
                  <div
                    id={`pricingFaqCollapse${index}`}
                    className={`accordion-collapse ${openFaq === index ? 'show' : ''}`}
                    aria-labelledby={`pricingFaqHeading${index}`}
                    data-bs-parent="#pricingFaq"
                  >
                    <div className="accordion-body">
                      <p className="m-0 text-body-secondary text-sm leading-7">{item.answer}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-7 py-sm-8 py-xl-9">
        <div className="container">
          <div className="card bg-primary border-0 rounded-3 overflow-hidden text-center p-5 p-xl-7 mx-auto max-w-2xl">
            <h2 className="text-white text-3xl fw-bold mb-3">Ready to Get Started?</h2>
            <p className="text-white/90 text-lg mb-4">
              Join thousands of Kenyan businesses using Ezekiel Docs for their legal needs.
            </p>
            <div className="d-flex flex-col sm:flex-row gap-3 justify-content-center">
              <Link href="/documents" className="btn btn-lg btn-light text-primary fw-semibold px-6 py-3">
                Start Free
              </Link>
              <a
                href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20have%20questions%20about%20pricing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-outline-light text-white fw-semibold px-6 py-3"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}