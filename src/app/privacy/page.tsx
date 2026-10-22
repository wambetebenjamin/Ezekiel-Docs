'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Shield, Lock, Database, Mail, Cookie, Trash2, Eye, User, Download, AlertTriangle, Globe } from 'lucide-react';

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    icon: Shield,
    content: `
      <p>Ezekiel Docs ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ezekieldocs.com and use our document generation services.</p>
      <p>We comply with the Kenya Data Protection Act, 2019 ("DPA") and international best practices. By using our services, you agree to the collection and use of information in accordance with this policy.</p>
    `,
  },
  {
    id: 'data-controller',
    title: 'Data Controller',
    icon: User,
    content: `
      <p>The data controller for your personal information is:</p>
      <address className="not-italic">
        <strong>Ezekiel Docs Limited</strong><br />
        Nairobi, Kenya<br />
        Email: privacy@ezekieldocs.com<br />
        Phone: +254 112 272 061
      </address>
      <p>If you have questions about this policy or your data rights, contact our Data Protection Officer at dpo@ezekieldocs.com.</p>
    `,
  },
  {
    id: 'data-collected',
    title: 'Information We Collect',
    icon: Database,
    content: `
      <h4>Personal Information You Provide</h4>
      <ul>
        <li><strong>Account Data:</strong> Name, email address, phone number, password (hashed)</li>
        <li><strong>Document Data:</strong> Information you enter into document forms (party names, addresses, contract terms, financial details)</li>
        <li><strong>Contact Data:</strong> Messages you send via contact forms, WhatsApp, or email</li>
        <li><strong>Payment Data:</strong> Billing address, payment method details (processed by our payment providers, not stored by us)</li>
      </ul>
      <h4>Automatically Collected Information</h4>
      <ul>
        <li><strong>Usage Data:</strong> Pages visited, time spent, documents generated, features used</li>
        <li><strong>Device Data:</strong> IP address, browser type, operating system, device identifiers</li>
        <li><strong>Location Data:</strong> Country-level location from IP (for compliance and fraud prevention)</li>
        <li><strong>Cookies & Tracking:</strong> See our <Link href="/cookie-policy">Cookie Policy</Link> for details</li>
      </ul>
    `,
  },
  {
    id: 'purpose',
    title: 'How We Use Your Information',
    icon: Eye,
    content: `
      <ul>
        <li><strong>Service Delivery:</strong> Generate, store, and deliver your legal documents</li>
        <li><strong>Account Management:</strong> Create and manage your account, authenticate you</li>
        <li><strong>Communication:</strong> Send document download links, service updates, billing receipts, and respond to enquiries</li>
        <li><strong>Improvement:</strong> Analyze usage to improve our templates, features, and user experience</li>
        <li><strong>Legal Compliance:</strong> Comply with Kenyan law, including the DPA, tax regulations, and anti-money laundering requirements</li>
        <li><strong>Security:</strong> Detect and prevent fraud, abuse, and unauthorized access</li>
        <li><strong>Marketing:</strong> With your consent, send newsletters and promotional offers (you can opt out anytime)</li>
      </ul>
      <p className="mt-3"><strong>Legal Basis (DPA):</strong> We process data based on: (a) contract performance, (b) legal obligation, (c) legitimate interests, (d) consent.</p>
    `,
  },
  {
    id: 'sharing',
    title: 'Information Sharing & Disclosure',
    icon: Mail,
    content: `
      <p>We do not sell your personal information. We share data only as follows:</p>
      <ul>
        <li><strong>Service Providers:</strong> Cloud hosting (Vercel), PDF storage (Vercel Blob), email (SMTP), analytics (privacy-friendly), payment processors (PesaPal, Stripe)</li>
        <li><strong>Legal Requirements:</strong> When required by Kenyan law, court order, or government authority</li>
        <li><strong>Business Transfers:</strong> In a merger, acquisition, or sale of assets (with notice)</li>
        <li><strong>Your Consent:</strong> When you explicitly authorize sharing (e.g., sending a document to a counter-party)</li>
      </ul>
      <p>All processors sign Data Processing Agreements compliant with the DPA.</p>
    `,
  },
  {
    id: 'retention',
    title: 'Data Retention',
    icon: Trash2,
    content: `
      <ul>
        <li><strong>Account Data:</strong> Retained while your account is active, then deleted within 30 days of closure</li>
        <li><strong>Generated Documents:</strong> Stored for 7 days for download, then permanently deleted (Enterprise: per agreement)</li>
        <li><strong>Usage Logs:</strong> 12 months for analytics and security</li>
        <li><strong>Payment Records:</strong> 7 years for tax compliance (Kenya Revenue Authority)</li>
        <li><strong>Contact Messages:</strong> 2 years for customer service history</li>
      </ul>
      <p>You can request earlier deletion of your data (see Your Rights below).</p>
    `,
  },
  {
    id: 'rights',
    title: 'Your Rights (Under DPA 2019)',
    icon: Download,
    content: `
      <p>As a data subject in Kenya, you have the right to:</p>
      <ul>
        <li><strong>Access:</strong> Request a copy of your personal data</li>
        <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
        <li><strong>Erasure:</strong> Request deletion ("right to be forgotten") where applicable</li>
        <li><strong>Restriction:</strong> Limit processing in certain circumstances</li>
        <li><strong>Portability:</strong> Receive your data in a structured, machine-readable format</li>
        <li><strong>Objection:</strong> Object to processing based on legitimate interests or direct marketing</li>
        <li><strong>Withdraw Consent:</strong> Withdraw consent at any time (does not affect prior lawful processing)</li>
        <li><strong>Complain:</strong> Lodge a complaint with the Office of the Data Protection Commissioner (ODPC)</li>
      </ul>
      <p>To exercise these rights, email dpo@ezekieldocs.com. We respond within 30 days per DPA requirements.</p>
    `,
  },
  {
    id: 'security',
    title: 'Data Security',
    icon: Lock,
    content: `
      <p>We implement appropriate technical and organizational measures:</p>
      <ul>
        <li>Encryption in transit (TLS 1.3) and at rest (AES-256)</li>
        <li>Regular security assessments and penetration testing</li>
        <li>Access controls: principle of least privilege, multi-factor authentication for staff</li>
        <li>Incident response plan with 72-hour breach notification to ODPC per DPA</li>
        <li>Staff training on data protection and privacy</li>
      </ul>
      <p>No internet transmission is 100% secure. We cannot guarantee absolute security but strive to protect your data.</p>
    `,
  },
  {
    id: 'international',
    title: 'International Transfers',
    icon: Globe,
    content: `
      <p>Our servers are hosted in Kenya (Africa region) and the European Union. When data leaves Kenya, we ensure:</p>
      <ul>
        <li>Adequacy decisions by the Data Commissioner, or</li>
        <li>Standard Contractual Clauses approved by the ODPC, or</li>
        <li>Binding Corporate Rules, or</li>
        <li>Your explicit consent</li>
      </ul>
      <p>Vercel (our hosting provider) processes data in EU regions with adequate safeguards.</p>
    `,
  },
  {
    id: 'cookies',
    title: 'Cookies & Tracking',
    icon: Cookie,
    content: `
      <p>We use cookies for essential functionality, analytics, and preferences. See our detailed <Link href="/cookie-policy">Cookie Policy</Link> for:</p>
      <ul>
        <li>Types of cookies we use</li>
        <li>Purpose and duration of each cookie</li>
        <li>How to manage your cookie preferences</li>
        <li>Third-party cookies (Google reCAPTCHA, analytics)</li>
      </ul>
    `,
  },
  {
    id: 'children',
    title: 'Children\'s Privacy',
    icon: AlertTriangle,
    content: `
      <p>Our services are not directed to individuals under 18. We do not knowingly collect personal data from children. If you believe we have collected data from a minor, contact us immediately for deletion.</p>
    `,
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    icon: AlertTriangle,
    content: `
      <p>We may update this policy. Material changes will be notified via email and/or prominent website notice. The "Last Updated" date below reflects the latest revision. Continued use after changes constitutes acceptance.</p>
    `,
  },
  {
    id: 'contact',
    title: 'Contact Us',
    icon: Mail,
    content: `
      <address className="not-italic">
        <strong>Ezekiel Docs Limited</strong><br />
        Data Protection Officer: dpo@ezekieldocs.com<br />
        General: privacy@ezekieldocs.com<br />
        Phone: +254 112 272 061<br />
        WhatsApp: <a href="https://wa.me/254112272061" className="text-primary">+254 112 272 061</a><br />
        Address: Nairobi, Kenya
      </address>
      <p className="mt-3">You may also contact the Office of the Data Protection Commissioner (ODPC) at www.odpc.go.ke.</p>
    `,
  },
];

export default function PrivacyPage() {
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
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="m-0 text-white tracking-tight text-4xl sm:text-5xl md:text-6xl fw-bold"
                >
                  Privacy Policy
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="m-0 mt-4 text-white/90 text-lg sm:text-xl leading-8"
                >
                  How we collect, use, and protect your personal information under the Kenya Data Protection Act, 2019.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="overflow-hidden py-5 py-sm-6 bg-body-tertiary border-bottom">
        <div className="container">
          <nav className="d-flex flex-wrap gap-2 gap-md-3 justify-content-center" aria-label="Privacy policy sections">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="btn btn-sm btn-outline-secondary rounded-pill"
              >
                {section.title}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9">
        <div className="container">
          <div className="row">
            <div className="col-12 col-xl-9 mx-auto">
              <div className="card border-0 shadow-sm bg-body-bg">
                <div className="card-body p-4 p-md-6">
                  <p className="text-body-secondary text-sm mb-6">
                    Last Updated: October 2025 | Version 1.0
                  </p>

                  {sections.map((section, index) => (
                    <motion.section
                      key={section.id}
                      id={section.id}
                      className="mb-8 pb-8 last:mb-0 last:pb-0"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-50px' }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <div className="d-flex align-items-start gap-3">
                        <div className="w-10 h-10 flex-shrink-0 mt-0.5 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          <section.icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="m-0 text-body-emphasis text-xl fw-semibold leading-6">
                            {section.title}
                          </h2>
                          <div className="mt-3 text-body-secondary leading-7" dangerouslySetInnerHTML={{ __html: section.content }} />
                        </div>
                      </div>
                      {index < sections.length - 1 && <hr className="mt-8 border-body-tertiary" />}
                    </motion.section>
                  ))}
                </div>
              </div>

              {/* Back to top */}
              <div className="text-center mt-6">
                <a href="#" className="btn btn-sm btn-outline-primary">
                  Back to Top
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-primary text-white">
        <div className="container text-center">
          <h2 className="m-0 text-white tracking-tight text-3xl sm:text-4xl fw-bold">
            Questions About Your Data?
          </h2>
          <p className="m-0 mt-3 text-white/90 text-lg leading-8 max-w-2xl mx-auto">
            Our Data Protection Officer is here to help. Contact us anytime.
          </p>
          <div className="mt-6 d-flex flex-col sm:flex-row gap-3 justify-content-center">
            <a
              href="mailto:dpo@ezekieldocs.com"
              className="btn btn-lg btn-light fw-semibold"
            >
              Email DPO
            </a>
            <a
              href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20have%20a%20privacy%20question"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-outline-light fw-semibold whatsapp-btn"
            >
              <Mail className="w-4 h-4 me-2" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}