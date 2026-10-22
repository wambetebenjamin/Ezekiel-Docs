'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Cookie, Database, BarChart2, Megaphone, Shield, Settings } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

const cookieCategories = [
  {
    id: 'necessary',
    name: 'Necessary Cookies',
    icon: Shield,
    description: 'These cookies are essential for the website to function properly. They enable core functionality such as security, authentication, session management, and cookie consent preferences.',
    legalBasis: 'Legitimate Interest (GDPR Art. 6(1)(f)) / Necessary for contract performance (DPA 2019 S.30)',
    required: true,
    cookies: [
      { name: 'session_id', purpose: 'Maintains user session across pages', expiry: 'Session' },
      { name: 'csrf_token', purpose: 'Prevents cross-site request forgery attacks', expiry: 'Session' },
      { name: 'cookie_consent', purpose: 'Stores your cookie preferences', expiry: '1 year' },
      { name: 'theme_preference', purpose: 'Remembers your light/dark mode choice', expiry: '1 year' },
    ]
  },
  {
    id: 'functional',
    name: 'Functional Cookies',
    icon: Settings,
    description: 'These cookies enable enhanced functionality and personalization, such as remembering your form inputs, saved preferences, and customized content.',
    legalBasis: 'Consent (GDPR Art. 6(1)(a)) / Consent (DPA 2019 S.30)',
    required: false,
    cookies: [
      { name: 'form_autofill', purpose: 'Remembers form data for faster completion', expiry: '90 days' },
      { name: 'saved_parties', purpose: 'Stores frequently used party details', expiry: '1 year' },
      { name: 'document_history', purpose: 'Keeps track of recently generated documents', expiry: '30 days' },
      { name: 'language_pref', purpose: 'Remembers your preferred language', expiry: '1 year' },
    ]
  },
  {
    id: 'analytics',
    name: 'Analytics Cookies',
    icon: BarChart2,
    description: 'These cookies help us understand how visitors interact with our website by collecting anonymous, aggregated data. This information helps us improve the user experience.',
    legalBasis: 'Consent (GDPR Art. 6(1)(a)) / Consent (DPA 2019 S.30)',
    required: false,
    cookies: [
      { name: '_ga', purpose: 'Google Analytics - distinguishes users', expiry: '2 years' },
      { name: '_gid', purpose: 'Google Analytics - distinguishes users', expiry: '24 hours' },
      { name: '_gat', purpose: 'Google Analytics - throttles request rate', expiry: '1 minute' },
      { name: 'vercel_analytics', purpose: 'Vercel Analytics - page views and performance', expiry: 'Session' },
    ]
  },
  {
    id: 'marketing',
    name: 'Marketing Cookies',
    icon: Megaphone,
    description: 'These cookies are used to deliver personalized advertisements and marketing communications based on your browsing behavior and interests.',
    legalBasis: 'Consent (GDPR Art. 6(1)(a)) / Consent (DPA 2019 S.30)',
    required: false,
    cookies: [
      { name: '_fbp', purpose: 'Meta Pixel - tracks conversions from Facebook ads', expiry: '3 months' },
      { name: '_gcl_au', purpose: 'Google Ads - tracks conversions', expiry: '3 months' },
      { name: 'linkedin_insights', purpose: 'LinkedIn Insights - tracks B2B conversions', expiry: '30 days' },
    ]
  },
];

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `This Cookie Policy explains how Ezekiel Docs ("we", "our", "us") uses cookies and similar technologies on our website ezekieldocs.com. It explains what these technologies are, why we use them, and your rights to control their use. This policy complies with the Kenya Data Protection Act 2019 and international standards.`
  },
  {
    id: 'what-are-cookies',
    title: 'What Are Cookies',
    content: `Cookies are small text files stored on your device (computer, phone, tablet) when you visit a website. They are widely used to make websites work, improve efficiency, and provide information to site owners. Cookies can be "session cookies" (deleted when you close your browser) or "persistent cookies" (remain until expiry or manual deletion). Similar technologies include web beacons, pixels, and local storage.`
  },
  {
    id: 'how-we-use',
    title: 'How We Use Cookies',
    content: `We use cookies for several purposes: (1) Essential operations - keeping you logged in, securing your session, remembering your consent choices; (2) Functionality - remembering your preferences, form data, and settings; (3) Analytics - understanding how you use our site to improve it; (4) Marketing - showing relevant ads and measuring campaign effectiveness. We never use cookies to collect sensitive personal information without your explicit consent.`
  },
  {
    id: 'categories',
    title: 'Cookie Categories',
    content: `We organize cookies into four categories based on their purpose. You can manage your preferences for each category through our cookie consent banner. Necessary cookies cannot be disabled as they are required for the website to function.`
  },
  {
    id: 'third-party',
    title: 'Third-Party Cookies',
    content: `We use third-party services that may set their own cookies: Google Analytics (analytics), Vercel Analytics (performance), Meta Pixel (advertising), Google Ads (advertising), LinkedIn Insights (advertising). These third parties have their own privacy policies. We encourage you to review them. We only share anonymized, aggregated data with these providers.`
  },
  {
    id: 'your-choices',
    title: 'Your Choices and Rights',
    content: `You have the right to: (1) Accept or reject non-essential cookies via our cookie banner; (2) Withdraw consent at any time by clicking "Manage Preferences" in the cookie banner footer; (3) Delete cookies through your browser settings; (4) Opt out of analytics via browser add-ons; (5) Opt out of personalized ads via platform settings (Google Ads Settings, Meta Ad Preferences); (6) Exercise your rights under Kenya DPA 2019 including access, rectification, erasure, and objection.`
  },
  {
    id: 'managing-cookies',
    title: 'Managing Cookies in Your Browser',
    content: `Most browsers allow you to control cookies through settings: Chrome (Settings > Privacy > Cookies), Firefox (Options > Privacy > Cookies), Safari (Preferences > Privacy), Edge (Settings > Cookies). Blocking all cookies may break website functionality. We recommend only blocking third-party or marketing cookies if you prefer.`
  },
  {
    id: 'data-protection',
    title: 'Kenya Data Protection Act 2019 Compliance',
    content: `Our cookie practices comply with the Data Protection Act 2019: (1) We obtain informed consent before setting non-essential cookies; (2) We provide clear information about each cookie's purpose; (3) We allow easy withdrawal of consent; (4) We only process personal data with a lawful basis; (5) We implement appropriate security measures; (6) We respect data subject rights including access, rectification, and erasure.`
  },
  {
    id: 'retention',
    title: 'Cookie Retention Periods',
    content: `Cookie retention varies by category: Necessary cookies are session-based or up to 1 year; Functional cookies up to 1 year; Analytics cookies up to 2 years; Marketing cookies up to 13 months. You can delete cookies at any time through our cookie preferences or your browser.`
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: `We may update this Cookie Policy to reflect changes in our practices or legal requirements. We will post the updated policy on this page with a revised effective date. For material changes, we will provide notice via our cookie banner or email. Your continued use constitutes acceptance of the updated policy.`
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: `If you have questions about this Cookie Policy or our use of cookies, contact us at: Email: privacy@ezekieldocs.com, Phone: +254 112 272 061, WhatsApp: https://wa.me/254112272061, Address: Nairobi, Kenya.`
  },
];

export default function CookiePolicyPage() {
  const [activeSection, setActiveSection] = useState<string | null>('introduction');
  const [activeCategory, setActiveCategory] = useState<string | null>('necessary');

  return (
    <div className="min-h-screen bg-body-bg">
      {/* Hero */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1 className="m-0 text-body-emphasis text-4xl sm:text-5xl tracking-tight fw-bold">
              Cookie Policy
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

      {/* Cookie Categories Overview */}
      <section className="py-5 py-md-6" id="categories">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center mb-5">
            <h2 className="text-body-emphasis text-3xl fw-bold mb-3">Cookie Categories</h2>
            <p className="text-body-secondary">Manage your preferences for each category below. Necessary cookies cannot be disabled.</p>
          </div>

          <div className="row row-cols-1 row-cols-md-2 gy-4 gx-xl-4">
            {cookieCategories.map((category, index) => (
              <motion.div
                key={category.id}
                className="col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="card h-100 border-border overflow-hidden p-4 p-xl-5">
                  <div className="d-flex align-items-start gap-3 mb-3">
                    <div className={`p-2 rounded-xl ${category.required ? 'bg-primary/10' : 'bg-body-tertiary'} flex-shrink-0`}>
                      <category.icon className={`w-6 h-6 ${category.required ? 'text-primary' : 'text-body-tertiary'}`} />
                    </div>
                    <div>
                      <h3 className="fw-semibold text-body-emphasis mb-1">{category.name}</h3>
                      {category.required && (
                        <span className="badge bg-primary text-white text-xs">Always Active</span>
                      )}
                    </div>
                  </div>
                  <p className="text-body-secondary text-sm leading-6 mb-4">{category.description}</p>
                  <p className="text-body-tertiary text-xs mb-4"><strong>Legal Basis:</strong> {category.legalBasis}</p>
                  <div className="mb-3">
                    <strong className="text-body-emphasis text-sm">Cookies in this category:</strong>
                    <ul className="list-unstyled mt-2 mb-0">
                      {category.cookies.map((cookie) => (
                        <li key={cookie.name} className="text-xs text-body-secondary mb-1 d-flex align-items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          <span><strong>{cookie.name}:</strong> {cookie.purpose} (Expires: {cookie.expiry})</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
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