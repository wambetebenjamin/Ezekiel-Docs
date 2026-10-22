'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: `By accessing and using Ezekiel Docs ("the Service"), you accept and agree to be bound by these Terms of Service ("Terms"), including our Privacy Policy and Cookie Policy. If you do not agree to these Terms, you may not use the Service. We reserve the right to modify these Terms at any time. Your continued use after changes constitutes acceptance.`
  },
  {
    id: 'no-legal-advice',
    title: 'No Legal Advice - Important Disclaimer',
    content: `⚠️ IMPORTANT: Ezekiel Docs provides automated document generation templates and legal information. WE ARE NOT A LAW FIRM AND DO NOT PROVIDE LEGAL ADVICE. Our templates are not a substitute for advice from a qualified advocate. The documents generated are based on standard Kenyan legal forms but may not address your specific circumstances. We strongly recommend having any generated document reviewed by a licensed Kenyan advocate before signing. Your use of our Service does not create an advocate-client relationship.`
  },
  {
    id: 'service-description',
    title: 'Service Description',
    content: `Ezekiel Docs is an online platform that provides automated legal document generation for Kenyan businesses and individuals. Users select a document type, complete a guided questionnaire, and receive a professionally formatted PDF document. We offer various document types including NDAs, service agreements, employment contracts, and more. The Service is provided "as is" and "as available" without warranties of any kind.`
  },
  {
    id: 'user-accounts',
    title: 'User Accounts',
    content: `You may create an account to access certain features. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. You must provide accurate, current, and complete information. We reserve the right to suspend or terminate accounts that violate these Terms. You must be at least 18 years old to create an account.`
  },
  {
    id: 'subscriptions',
    title: 'Subscriptions and Payments',
    content: `We offer Free, Professional (KSh 999/month), and Enterprise (custom) plans. Professional subscriptions auto-renew monthly unless cancelled. Payments are processed via secure third-party providers. We do not store full payment details. Refunds are not provided for partial months. Price changes will be communicated 30 days in advance. Enterprise plans require a separate agreement.`
  },
  {
    id: 'document-use',
    title: 'Generated Documents',
    content: `Documents generated through our Service are for your personal or business use only. You may not resell, redistribute, or sublicense our templates. We grant you a non-exclusive, non-transferable license to use, modify, and sign the generated PDFs. You are responsible for ensuring the document suits your needs and complies with applicable laws. We make no guarantees about the legal enforceability of generated documents.`
  },
  {
    id: 'intellectual-property',
    title: 'Intellectual Property',
    content: `All content, templates, software, trademarks, and intellectual property on Ezekiel Docs are owned by us or our licensors. You may not copy, modify, distribute, sell, or create derivative works of our platform or templates without written permission. Generated documents are your property for the purpose of your specific transaction.`
  },
  {
    id: 'user-conduct',
    title: 'User Conduct',
    content: `You agree not to: (1) Use the Service for illegal purposes, (2) Impersonate any person or entity, (3) Interfere with the Service's security, (4) Upload malicious code, (5) Scrape or extract data systematically, (6) Use the Service to harass or defame others, (7) Generate documents for fraudulent purposes. Violation may result in immediate termination.`
  },
  {
    id: 'disclaimer',
    title: 'Disclaimer of Warranties',
    content: `THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, AND ACCURACY. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR THAT GENERATED DOCUMENTS WILL BE LEGALLY ENFORCEABLE IN YOUR SPECIFIC SITUATION.`
  },
  {
    id: 'limitation',
    title: 'Limitation of Liability',
    content: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, EZEKIEL DOCS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS OPPORTUNITIES, ARISING FROM YOUR USE OF THE SERVICE. OUR TOTAL LIABILITY FOR ANY CLAIM SHALL NOT EXCEED THE AMOUNT YOU PAID US IN THE 12 MONTHS PRECEDING THE CLAIM, OR KSH 10,000, WHICHEVER IS GREATER.`
  },
  {
    id: 'indemnification',
    title: 'Indemnification',
    content: `You agree to indemnify, defend, and hold harmless Ezekiel Docs, its officers, directors, employees, and agents from any claims, damages, losses, liabilities, and expenses (including legal fees) arising from your use of the Service, violation of these Terms, or infringement of any third-party rights.`
  },
  {
    id: 'termination',
    title: 'Termination',
    content: `We may terminate or suspend your access to the Service immediately, without prior notice, for any reason including breach of these Terms. Upon termination, your right to use the Service ceases. Provisions that should survive termination (liability, indemnification, IP rights) will remain in effect. You may terminate your account at any time by contacting us.`
  },
  {
    id: 'governing-law',
    title: 'Governing Law and Dispute Resolution',
    content: `These Terms are governed by the laws of the Republic of Kenya. Any dispute arising from these Terms or the Service shall be resolved through: (1) Good faith negotiation, (2) If unresolved, mediation under the Nairobi Centre for International Arbitration (NCIA) rules, (3) If mediation fails, binding arbitration in Nairobi, Kenya, in English. The award shall be final and enforceable in any court of competent jurisdiction.`
  },
  {
    id: 'general',
    title: 'General Provisions',
    content: `These Terms constitute the entire agreement between you and Ezekiel Docs. If any provision is found unenforceable, the remaining provisions remain in effect. Our failure to enforce any right is not a waiver. You may not assign these Terms without our consent. We may assign our rights freely. Headings are for convenience only.`
  },
  {
    id: 'contact',
    title: 'Contact Information',
    content: `For questions about these Terms, contact us at: Email: legal@ezekieldocs.com, Phone: +254 112 272 061, WhatsApp: https://wa.me/254112272061, Address: Nairobi, Kenya.`
  },
];

export default function TermsPage() {
  const [activeSection, setActiveSection] = useState<string | null>('acceptance');

  return (
    <div className="min-h-screen bg-body-bg">
      {/* Hero */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1 className="m-0 text-body-emphasis text-4xl sm:text-5xl tracking-tight fw-bold">
              Terms of Service
            </motion.h1>
            <motion.p className="m-0 mt-4 text-body-secondary text-lg leading-8">
              Please read carefully. Last updated: January 2025.
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

      {/* Prominent Warning */}
      <section className="py-4 bg-warning-bg-subtle border-y border-warning-border-subtle">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-10">
              <div className="p-4 p-md-5 bg-warning/10 border border-warning rounded-xl">
                <div className="d-flex align-items-start gap-3">
                  <motion.div
                    className="w-8 h-8 flex-shrink-0 rounded-full bg-warning d-flex align-items-center justify-content-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-warning-emphasis fw-bold text-lg">!</span>
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="fw-bold text-warning-emphasis mb-2">No Legal Advice</h3>
                    <p className="m-0 text-warning-emphasis text-sm">
                      Ezekiel Docs is not a law firm. Our templates are not legal advice. Always consult a qualified Kenyan advocate before signing any legal document.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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