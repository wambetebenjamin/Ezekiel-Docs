'use client';

import Link from 'next/link';
import { Check, X, Download, Shield, Users, FileText, Crown, MessageCircle, Globe, Lock, Zap, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    name: 'Free',
    price: 0,
    period: '/month',
    description: 'Perfect for trying out Ezekiel Docs',
    features: [
      { text: 'Access to NDA template', included: true },
      { text: 'Access to 1-page agreements', included: true },
      { text: '3 document generations/month', included: true },
      { text: 'Basic PDF download', included: true },
      { text: 'All 12+ document types', included: false },
      { text: 'Unlimited generations', included: false },
      { text: 'Advanced PDF options (watermark, password)', included: false },
      { text: 'Document editing before download', included: false },
      { text: 'Priority email support', included: false },
      { text: 'Team collaboration', included: false },
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Professional',
    price: 999,
    period: '/month',
    description: 'For growing businesses and freelancers',
    features: [
      { text: 'Access to NDA template', included: true },
      { text: 'Access to 1-page agreements', included: true },
      { text: '3 document generations/month', included: true },
      { text: 'Basic PDF download', included: true },
      { text: 'All 12+ document types', included: true },
      { text: 'Unlimited generations', included: true },
      { text: 'Advanced PDF options (watermark, password)', included: true },
      { text: 'Document editing before download', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Team collaboration', included: false },
    ],
    cta: 'Get Started',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: null,
    period: '',
    description: 'For large organizations with custom needs',
    features: [
      { text: 'Access to NDA template', included: true },
      { text: 'Access to 1-page agreements', included: true },
      { text: '3 document generations/month', included: true },
      { text: 'Basic PDF download', included: true },
      { text: 'All 12+ document types', included: true },
      { text: 'Unlimited generations', included: true },
      { text: 'Advanced PDF options (watermark, password)', included: true },
      { text: 'Document editing before download', included: true },
      { text: 'Priority email support', included: true },
      { text: 'Team collaboration', included: true },
      { text: 'Custom templates', included: true },
      { text: 'API access', included: true },
      { text: 'Dedicated account manager', included: true },
      { text: 'SSO & advanced security', included: true },
      { text: 'On-premise deployment option', included: true },
      { text: 'Custom SLA & support', included: true },
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const comparisonRows = [
  { category: 'Document Access', features: ['NDA & basic agreements', 'All 12+ document types', 'Custom templates'] },
  { category: 'Generations', features: ['3/month', 'Unlimited', 'Unlimited'] },
  { category: 'PDF Features', features: ['Basic download', 'Advanced (watermark, password)', 'Advanced + bulk export'] },
  { category: 'Editing', features: ['Not included', 'In-browser editor', 'In-browser + collaborative'] },
  { category: 'Team', features: ['Single user', 'Up to 5 users', 'Unlimited users'] },
  { category: 'Support', features: ['Community', 'Priority email', 'Dedicated manager + SLA'] },
  { category: 'Security', features: ['Standard', 'Standard', 'SSO, audit logs, on-premise'] },
  { category: 'API', features: ['Not included', 'Not included', 'Full API access'] },
];

export default function PricingPage() {
  return (
    <div className="min-vh-100">
      {/* Hero */}
      <section className="overflow-hidden py-9 py-xl-10 position-relative">
        <div className="position-absolute inset-0 z-n1">
          <div className="overlay position-absolute inset-0 bg-primary" style={{ opacity: 0.95 }} />
        </div>
        <div className="container position-relative z-1">
          <div className="row align-items-center">
            <div className="col-12 col-xl-8">
              <div className="text-center text-xl-start">
                <h1 className="m-0 text-white tracking-tight text-4xl sm:text-5xl md:text-6xl fw-bold">
                  Simple, Transparent Pricing
                </h1>
                <p className="m-0 mt-4 text-white/90 text-lg sm:text-xl leading-8">
                  Choose the plan that fits your needs. No hidden fees. Cancel anytime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-3 gy-5 gx-4 justify-content-center">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                className="col"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className={`card h-100 border-0 shadow-sm ${plan.popular ? 'border-2 border-primary shadow-lg' : ''} bg-body-bg relative`}>
                  {plan.popular && (
                    <div className="position-absolute top-0 start-50 translate-middle-x -translate-y-1/2 bg-primary text-white px-3 py-1 rounded-pill text-sm fw-semibold">
                      Most Popular
                    </div>
                  )}
                  <div className="card-body p-4 p-md-5 d-flex flex-column">
                    <div className="mb-4">
                      <h3 className="m-0 text-body-emphasis fw-bold text-xl">{plan.name}</h3>
                      <p className="m-0 mt-1 text-body-secondary text-sm">{plan.description}</p>
                    </div>
                    
                    <div className="mb-4">
                      {plan.price !== null ? (
                        <>
                          <span className="text-4xl fw-bold text-body-emphasis">KSh {plan.price.toLocaleString()}</span>
                          <span className="text-body-secondary fw-medium">{plan.period}</span>
                        </>
                      ) : (
                        <span className="text-4xl fw-bold text-body-emphasis">Custom</span>
                      )}
                    </div>

                    <ul className="list-unstyled flex-1 mb-4 space-y-3">
                      {plan.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="d-flex align-items-center gap-3 text-sm"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + i * 0.05 }}
                        >
                          {feature.included ? (
                            <Check className="w-5 h-5 text-success flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-body-tertiary flex-shrink-0" />
                          )}
                          <span className={feature.included ? 'text-body-secondary' : 'text-body-tertiary'}>
                            {feature.text}
                          </span>
                        </motion.li>
                      ))}
                    </ul>

                    {plan.price !== null ? (
                      <Link
                        href={`/generate/nda?plan=${plan.name.toLowerCase()}`}
                        className={`btn fw-semibold w-100 ${plan.popular ? 'btn-primary' : 'btn-outline-primary'}`}
                      >
                        {plan.cta}
                      </Link>
                    ) : (
                      <a
                        href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%27m%20interested%20in%20Enterprise%20plan"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary fw-semibold w-100 whatsapp-btn"
                      >
                        <MessageCircle className="w-4 h-4 me-2" />
                        {plan.cta}
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* FAQ under pricing */}
          <div className="mt-10">
            <h3 className="text-center text-body-emphasis fw-semibold text-lg mb-6">Still have questions?</h3>
            <div className="row row-cols-1 row-cols-md-2 gy-4 gx-4 max-w-4xl mx-auto">
              {[
                { q: 'Can I switch plans later?', a: 'Yes, you can upgrade or downgrade at any time. Changes take effect at the start of your next billing cycle.' },
                { q: 'Is there a free trial?', a: 'Our Free plan is free forever with no trial period needed. You can upgrade to Professional anytime.' },
                { q: 'What payment methods do you accept?', a: 'We accept M-Pesa, card payments, and bank transfers for annual Enterprise plans.' },
                { q: 'Can I cancel anytime?', a: 'Yes, you can cancel your subscription at any time. You\'ll retain access until the end of your billing period.' },
              ].map((faq, i) => (
                <div key={i} className="col">
                  <div className="card h-100 border-0 shadow-sm bg-body-bg p-4">
                    <h4 className="text-body-emphasis fw-semibold mb-2">{faq.q}</h4>
                    <p className="m-0 text-body-secondary text-sm">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-8 mb-xl-10">
            <h2 className="m-0 text-primary-emphasis text-base leading-7 fw-semibold">Detailed Comparison</h2>
            <p className="m-0 mt-2 text-body-emphasis text-3xl tracking-tight fw-bold">
              Feature Breakdown
            </p>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered mb-0" role="table">
              <thead className="bg-body-bg">
                <tr>
                  <th className="text-body-emphasis fw-semibold p-3" scope="col">Feature</th>
                  <th className="text-center text-body-emphasis fw-semibold p-3" scope="col">Free</th>
                  <th className="text-center text-body-emphasis fw-semibold p-3 bg-primary/5" scope="col">Professional</th>
                  <th className="text-center text-body-emphasis fw-semibold p-3" scope="col">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, rowIndex) => (
                  <tr key={row.category} className={rowIndex % 2 === 0 ? 'bg-body-bg' : ''}>
                    <td className="fw-medium text-body-emphasis p-3">{row.category}</td>
                    <td className="text-center text-body-secondary text-sm p-3">{row.features[0]}</td>
                    <td className="text-center text-body-secondary text-sm p-3 bg-primary/5 fw-medium">{row.features[1]}</td>
                    <td className="text-center text-body-secondary text-sm p-3">{row.features[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-primary text-white">
        <div className="container text-center">
          <h2 className="m-0 text-white tracking-tight text-3xl sm:text-4xl fw-bold">
            Ready to Get Started?
          </h2>
          <p className="m-0 mt-3 text-white/90 text-lg leading-8 max-w-2xl mx-auto">
            Join thousands of Kenyan businesses using Ezekiel Docs. Start free, upgrade when you need more.
          </p>
          <div className="mt-6 d-flex flex-col sm:flex-row gap-3 justify-content-center">
            <Link
              href="/generate/nda"
              className="btn btn-lg btn-light fw-semibold"
            >
              Start Free Now
            </Link>
            <a
              href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20have%20questions%20about%20pricing"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-outline-light fw-semibold whatsapp-btn"
            >
              <MessageCircle className="w-4 h-4 me-2" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}