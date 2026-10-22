'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `Ezekiel Docs ("we", "our", "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website ezekieldocs.com and use our services. Please read this policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.`
  },
  {
    id: 'data-collection',
    title: 'Information We Collect',
    content: `We collect information that you provide directly to us when you create an account, generate documents, subscribe to our newsletter, or contact us. This includes personal identification information (name, email, phone number, ID/passport number), billing information, document content, and communication preferences. We also collect usage data automatically through cookies and similar technologies, including IP address, browser type, pages visited, and time spent on pages.`
  },
  {
    id: 'data-use',
    title: 'How We Use Your Information',
    content: `We use your information to provide and improve our services, generate documents, process payments, send notifications, respond to inquiries, and comply with legal obligations. We may use your email to send service updates, promotional offers, and legal tips. You can opt out of marketing communications at any time by clicking the unsubscribe link in emails or updating your preferences.`
  },
  {
    id: 'data-sharing',
    title: 'Information Sharing and Disclosure',
    content: `We do not sell your personal information. We may share your data with service providers who perform services on our behalf (payment processing, email delivery, cloud storage), legal authorities when required by law, and business partners with your consent. In the event of a merger or acquisition, your information may be transferred to the new entity.`
  },
  {
    id: 'data-security',
    title: 'Data Security',
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption (AES-256 at rest, TLS 1.3 in transit), access controls, regular security assessments, and employee training. However, no method of transmission over the Internet is 100% secure.`
  },
  {
    id: 'data-retention',
    title: 'Data Retention',
    content: `We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer retention period is required by law. Document data is retained for 7 years for legal compliance. Account information is retained while your account is active and for 2 years after closure. You may request deletion of your data at any time.`
  },
  {
    id: 'user-rights',
    title: 'Your Rights Under Kenya Data Protection Act 2019',
    content: `As a data subject in Kenya, you have the right to: (1) Access your personal data, (2) Rectify inaccurate data, (3) Erase your data ("right to be forgotten"), (4) Restrict processing, (5) Data portability, (6) Object to processing, (7) Withdraw consent, (8) Lodge a complaint with the Office of the Data Protection Commissioner. To exercise these rights, contact us at privacy@ezekieldocs.com.`
  },
  {
    id: 'cookies',
    title: 'Cookies and Tracking Technologies',
    content: `We use cookies and similar technologies to improve your experience, analyze traffic, and personalize content. Our Cookie Policy details the types of cookies we use, their purposes, and how you can manage them. You can control cookies through our cookie consent banner or your browser settings.`
  },
  {
    id: 'third-party',
    title: 'Third-Party Links',
    content: `Our website may contain links to third-party websites, including payment processors, legal resources, and partner sites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any personal information.`
  },
  {
    id: 'children',
    title: "Children's Privacy",
    content: `Our services are not directed to individuals under 18. We do not knowingly collect personal information from children. If you believe we have collected information from a minor, please contact us immediately and we will take steps to delete such information.`
  },
  {
    id: 'international',
    title: 'International Data Transfers',
    content: `Your information may be transferred to and processed in countries other than Kenya, including the United States and Europe, where our service providers operate. We ensure appropriate safeguards are in place, including Standard Contractual Clauses and adequacy decisions, to protect your data during such transfers.`
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated effective date. For material changes, we will provide additional notice via email or prominent notice on our website. Your continued use of our services after the effective date constitutes acceptance of the updated policy.`
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: `If you have questions about this Privacy Policy or our data practices, please contact us at: Email: privacy@ezekieldocs.com, Phone: +254 112 272 061, Address: Nairobi, Kenya. You can also reach us via WhatsApp at https://wa.me/254112272061. Our Data Protection Officer can be reached at dpo@ezekieldocs.com.`
  },
];

export default function PrivacyPolicyPage() {
  const [activeSection, setActiveSection] = useState<string | null>('introduction');

  return (
    <div className="min-h-screen bg-body-bg">
      {/* Hero */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1 className="m-0 text-body-emphasis text-4xl sm:text-5xl tracking-tight fw-bold">
              Privacy Policy
            </motion.h1>
            <motion.p className="m-0 mt-4 text-body-secondary text-lg leading-8">
              Kenya Data Protection Act 2019 Compliant. Last updated: January 2025.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-4 bg-body-bg border-y border-border">
        <div className="container">
          <nav aria-label="Table of contents">
            <ul className="nav flex-column flex-md-row flex-wrap justify-content-center gap-2 gap-md-3">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className={`text-sm fw-medium rounded-pill px-3 py-2 transition-colors ${
                      activeSection === section.id
                        ? 'bg-primary text-white'
                        : 'text-body-secondary hover:text-primary bg-body-tertiary'
                    }`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveSection(section.id);
                      document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      {/* Content */}
      <section className="py-7 py-sm-8 py-xl-9">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10">
              <div className="card border-border overflow-hidden">
                <div className="card-body p-4 p-xl-6">
                  {sections.map((section, index) => (
                    <motion.section
                      key={section.id}
                      id={section.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="mb-6 mb-md-7 last:mb-0"
                    >
                      <h2 className="text-body-emphasis text-2xl fw-bold mb-3 pb-2 border-b border-border">
                        {section.title}
                      </h2>
                      <div className="text-body-secondary leading-8">
                        {section.content.split('\n\n').map((paragraph, pIndex) => (
                          <p key={pIndex} className="mb-4">{paragraph}</p>
                        ))}
                      </div>
                      {index < sections.length - 1 && (
                        <hr className="my-6 text-body-emphasis opacity-10" />
                      )}
                    </motion.section>
                  ))}
                </div>
              </div>

              <div className="text-center mt-6 mt-md-8">
                <Link href="/" className="btn btn-outline-primary fw-semibold px-5 py-3">
                  <ChevronRight className="w-4 h-4 me-2" />
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}