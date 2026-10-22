'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Shield, AlertTriangle, Clock, Gavel, Globe, Lock, Download, CreditCard, RefreshCw, X, Check, User } from 'lucide-react';

const sections = [
  {
    id: 'introduction',
    title: 'Introduction & Acceptance',
    icon: FileText,
    content: `
      <p>Welcome to Ezekiel Docs ("we," "our," "us"). These Terms of Service ("Terms") govern your access to and use of our website ezekieldocs.com and our document generation services ("Services").</p>
      <p>By accessing or using our Services, you agree to be bound by these Terms and our <Link href="/privacy">Privacy Policy</Link>. If you disagree with any part, you may not use our Services.</p>
      <p><strong>These Terms constitute a legally binding agreement between you and Ezekiel Docs Limited, a company registered in Kenya.</strong></p>
    `,
  },
  {
    id: 'definitions',
    title: 'Definitions',
    icon: FileText,
    content: `
      <ul>
        <li><strong>"User," "You," "Your":</strong> The individual or entity accessing the Services.</li>
        <li><strong>"Document":</strong> Any legal document generated through our platform.</li>
        <li><strong>"Template":</strong> A pre-drafted legal document structure with customizable fields.</li>
        <li><strong>"Subscription":</strong> A paid plan (Professional, Enterprise) with recurring billing.</li>
        <li><strong>"Content":</strong> Information you input into Templates to generate Documents.</li>
        <li><strong>"DPA":</strong> Kenya Data Protection Act, 2019.</li>
      </ul>
    `,
  },
  {
    id: 'services',
    title: 'Description of Services',
    icon: Shield,
    content: `
      <p>Ezekiel Docs provides:</p>
      <ul>
        <li>Access to a library of lawyer-reviewed legal document Templates for Kenyan law</li>
        <li>An online questionnaire to populate Templates with your Content</li>
        <li>PDF generation and download of completed Documents</li>
        <li>Account management, document history, and subscription features (for paid plans)</li>
      </ul>
      <p className="mt-3"><strong>Important:</strong> Our Services provide document automation, <strong>not legal advice</strong>. We are not a law firm. Templates are for general informational purposes and may not address your specific circumstances. Consult a qualified Kenyan advocate for legal advice.</p>
    `,
  },
  {
    id: 'eligibility',
    title: 'Eligibility & Accounts',
    icon: User,
    content: `
      <p>You must be at least 18 years old and have legal capacity to enter contracts. By registering, you represent that:</p>
      <ul>
        <li>You are 18+ and legally capable</li>
        <li>Your registration information is accurate and complete</li>
        <li>You will maintain account security and notify us of unauthorized access</li>
        <li>You are responsible for all activity under your account</li>
      </ul>
      <p>We may refuse or terminate accounts at our discretion.</p>
    `,
  },
  {
    id: 'user-content',
    title: 'Your Content & Responsibilities',
    icon: Download,
    content: `
      <p>You retain ownership of Content you submit. By using our Services, you grant us a license to:</p>
      <ul>
        <li>Process, store, and transmit Content to generate Documents</li>
        <li>Store Documents temporarily (7 days default) for your download</li>
        <li>Use anonymized, aggregated data to improve our Templates</li>
      </ul>
      <p>You represent that your Content:</p>
      <ul>
        <li>Is accurate, complete, and not misleading</li>
        <li>Does not violate any law or third-party rights</li>
        <li>Is not used for illegal, fraudulent, or harmful purposes</li>
      </ul>
      <p>We may remove Content that violates these Terms or applicable law.</p>
    `,
  },
  {
    id: 'no-legal-advice',
    title: 'No Legal Advice Disclaimer',
    icon: Gavel,
    content: `
      <div className="alert alert-warning border-0 rounded-3 bg-warning/10 border-warning">
        <h4 className="fw-semibold text-warning-emphasis"><Check className="w-4 h-4 me-2" /> Critical Disclaimer</h4>
        <p className="mb-0">EZEKIEL DOCS IS NOT A LAW FIRM. OUR TEMPLATES AND SERVICES DO NOT CONSTITUTE LEGAL ADVICE, LEGAL OPINIONS, OR AN ADVOCATE-CLIENT RELATIONSHIP.</p>
      </div>
      <ul>
        <li>Templates are standardized and may not suit your specific situation</li>
        <li>Laws change; we update Templates periodically but not in real-time</li>
        <li>You should have a qualified Kenyan advocate review important documents</li>
        <li>We are not liable for consequences of using Documents without legal review</li>
      </ul>
    `,
  },
  {
    id: 'subscriptions',
    title: 'Subscriptions & Billing',
    icon: CreditCard,
    content: `
      <h4>Plans</h4>
      <ul>
        <li><strong>Free:</strong> Limited templates, 3 generations/month</li>
        <li><strong>Professional:</strong> KSh 999/month, all templates, unlimited generations</li>
        <li><strong>Enterprise:</strong> Custom pricing, contact sales</li>
      </ul>
      <h4>Billing</h4>
      <ul>
        <li>Subscriptions auto-renew monthly unless cancelled</li>
        <li>Prices in KSh, inclusive of applicable taxes</li>
        <li>Payment via M-Pesa, card, or bank transfer (Enterprise)</li>
        <li>Failed payments: service suspended after 3 retries, cancelled after 14 days</li>
      </ul>
      <h4>Cancellation</h4>
      <p>Cancel anytime in Account Settings. Access continues until period ends. No refunds for partial months (except as required by law).</p>
    `,
  },
  {
    id: 'refunds',
    title: 'Refunds',
    icon: RefreshCw,
    content: `
      <p>Refunds are considered case-by-case for:</p>
      <ul>
        <li>Technical failures preventing document generation (within 48 hours)</li>
        <li>Duplicate charges</li>
        <li>Unauthorized transactions (reported promptly)</li>
      </ul>
      <p>No refunds for: change of mind, not reading terms, documents not suiting your needs (see <strong>No Legal Advice</strong>), or after document download.</p>
      <p>Request refunds at billing@ezekieldocs.com within 14 days.</p>
    `,
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    icon: Lock,
    content: `
      <p>We own all rights to:</p>
      <ul>
        <li>Our Templates, platform code, design, and branding</li>
        <li>Ezekiel Docs name, logo, and trademarks</li>
      </ul>
      <p>You may not: copy, modify, distribute, reverse-engineer, or create derivative works of our Templates or platform (except generating Documents for your own use).</p>
      <p>Documents you generate are yours to use, but the underlying Template structure remains our IP.</p>
    `,
  },
  {
    id: 'acceptable-use',
    title: 'Acceptable Use',
    icon: AlertTriangle,
    content: `
      <p>You agree not to:</p>
      <ul>
        <li>Use Services for illegal activities or fraud</li>
        <li>Impersonate others or provide false information</li>
        <li>Attempt to access other users' accounts or data</li>
        <li>Reverse-engineer, scrape, or overload our systems</li>
        <li>Generate documents for unlawful purposes</li>
        <li>Resell or commercialize Templates without Enterprise license</li>
        <li>Violate any Kenyan law or these Terms</li>
      </ul>
      <p>Violation may result in immediate termination without refund.</p>
    `,
  },
  {
    id: 'warranty-disclaimer',
    title: 'Disclaimer of Warranties',
    icon: Shield,
    content: `
      <p>SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE." TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING:</p>
      <ul>
        <li>Merchantability, fitness for a particular purpose</li>
        <li>Accuracy, completeness, or currency of Templates</li>
        <li>Uninterrupted, error-free, or secure access</li>
        <li>Legal validity or enforceability of generated Documents</li>
      </ul>
      <p>Some jurisdictions limit warranty disclaimers; the above applies to the fullest extent permitted.</p>
    `,
  },
  {
    id: 'limitation-liability',
    title: 'Limitation of Liability',
    icon: AlertTriangle,
    content: `
      <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW:</p>
      <ul>
        <li>We are not liable for indirect, incidental, special, consequential, or punitive damages</li>
        <li>Our total liability shall not exceed the greater of: (a) KSh 10,000 or (b) fees you paid in the 12 months preceding the claim</li>
        <li>This applies regardless of legal theory (contract, tort, negligence, etc.)</li>
      </ul>
      <p>Liability for death/personal injury from our negligence, fraud, or matters excluded by law is not limited.</p>
    `,
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    icon: Shield,
    content: `
      <p>You agree to indemnify, defend, and hold harmless Ezekiel Docs, its officers, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:</p>
      <ul>
        <li>Your use of the Services</li>
        <li>Your Content or Documents</li>
        <li>Your violation of these Terms or applicable law</li>
        <li>Your violation of third-party rights</li>
      </ul>
    `,
  },
  {
    id: 'termination',
    title: 'Termination',
    icon: X,
    content: `
      <p>We may suspend or terminate your access immediately for:</p>
      <ul>
        <li>Breach of these Terms</li>
        <li>Illegal or harmful activity</li>
        <li>Non-payment of fees</li>
        <li>Extended inactivity (12+ months for free accounts)</li>
      </ul>
      <p>Upon termination: your license ends, you must cease use, and we may delete your data per our <Link href="/privacy">Privacy Policy</Link>. Provisions that should survive (IP, disclaimers, liability limits, indemnification) survive.</p>
    `,
  },
  {
    id: 'governing-law',
    title: 'Governing Law & Dispute Resolution',
    icon: Gavel,
    content: `
      <p><strong>Governing Law:</strong> These Terms are governed by the laws of Kenya.</p>
      <p><strong>Dispute Resolution:</strong></p>
      <ol>
        <li>First: Good-faith negotiation (30 days from notice)</li>
        <li>Second: Mediation under the Nairobi Centre for International Arbitration (NCIA) rules</li>
        <li>Third: Binding arbitration in Nairobi, English language, single arbitrator</li>
        <li>Court: If arbitration unavailable, exclusive jurisdiction of Kenyan courts</li>
      </ol>
      <p>You may also lodge complaints with the Office of the Data Protection Commissioner (ODPC) for data matters.</p>
    `,
  },
  {
    id: 'changes',
    title: 'Changes to Terms',
    icon: RefreshCw,
    content: `
      <p>We may modify these Terms. Material changes: 30 days' notice via email and website notice. Continued use after effective date = acceptance. If you disagree, cancel your account before the effective date.</p>
    `,
  },
  {
    id: 'general',
    title: 'General Provisions',
    icon: FileText,
    content: `
      <ul>
        <li><strong>Entire Agreement:</strong> These Terms + Privacy Policy + Cookie Policy = entire agreement</li>
        <li><strong>Severability:</strong> If any provision is unenforceable, the rest remain</li>
        <li><strong>Waiver:</strong> Failure to enforce a right is not a waiver</li>
        <li><strong>Assignment:</strong> We may assign; you may not without consent</li>
        <li><strong>Force Majeure:</strong> Not liable for delays beyond our control</li>
        <li><strong>Language:</strong> English version prevails in conflicts</li>
      </ul>
    `,
  },
  {
    id: 'contact',
    title: 'Contact Information',
    icon: Globe,
    content: `
      <address className="not-italic">
        <strong>Ezekiel Docs Limited</strong><br />
        Nairobi, Kenya<br />
        Email: legal@ezekieldocs.com<br />
        Phone: +254 112 272 061<br />
        WhatsApp: <a href="https://wa.me/254112272061" className="text-primary">+254 112 272 061</a>
      </address>
    `,
  },
];

export default function TermsPage() {
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
                  Terms of Service
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="m-0 mt-4 text-white/90 text-lg sm:text-xl leading-8"
                >
                  The rules governing your use of Ezekiel Docs. Please read carefully.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="overflow-hidden py-5 py-sm-6 bg-body-tertiary border-bottom">
        <div className="container">
          <nav className="d-flex flex-wrap gap-2 gap-md-3 justify-content-center" aria-label="Terms of service sections">
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
            Ready to Create Your Documents?
          </h2>
          <p className="m-0 mt-3 text-white/90 text-lg leading-8 max-w-2xl mx-auto">
            Start with our Free plan or upgrade for unlimited access.
          </p>
          <div className="mt-6 d-flex flex-col sm:flex-row gap-3 justify-content-center">
            <Link
              href="/generate/nda"
              className="btn btn-lg btn-light fw-semibold"
            >
              Get Started Free
            </Link>
            <a
              href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20have%20questions%20about%20the%20terms"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-outline-light fw-semibold whatsapp-btn"
            >
              <Globe className="w-4 h-4 me-2" />
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}