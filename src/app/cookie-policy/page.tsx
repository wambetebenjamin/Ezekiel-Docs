'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Cookie, Shield, Database, Eye, Globe, Settings, Check, X } from 'lucide-react';

interface CookieItem {
  name: string;
  purpose: string;
  duration: string;
  provider?: string;
}

interface CookieCategory {
  id: string;
  name: string;
  icon: any;
  description: string;
  cookies: CookieItem[];
  required: boolean;
}

const cookieCategories: CookieCategory[] = [
  {
    id: 'necessary',
    name: 'Necessary Cookies',
    icon: Shield,
    description: 'Required for the website to function properly. Cannot be disabled.',
    cookies: [
      { name: 'session_id', purpose: 'Maintains user session across pages', duration: 'Session' },
      { name: 'csrf_token', purpose: 'Prevents cross-site request forgery attacks', duration: 'Session' },
      { name: 'cookie_consent', purpose: 'Stores your cookie preferences', duration: '1 year' },
      { name: 'next_auth', purpose: 'Authentication token for logged-in users', duration: '30 days' },
    ],
    required: true,
  },
  {
    id: 'analytics',
    name: 'Analytics Cookies',
    icon: Database,
    description: 'Help us understand how visitors interact with our site to improve it.',
    cookies: [
      { name: '_ga', purpose: 'Google Analytics: distinguishes users', duration: '2 years' },
      { name: '_ga_*', purpose: 'Google Analytics 4: persists session state', duration: '2 years' },
      { name: '_gid', purpose: 'Google Analytics: distinguishes users (24h)', duration: '24 hours' },
    ],
    required: false,
  },
  {
    id: 'functional',
    name: 'Functional Cookies',
    icon: Settings,
    description: 'Enable enhanced functionality and personalization.',
    cookies: [
      { name: 'theme_preference', purpose: 'Remembers light/dark mode choice', duration: '1 year' },
      { name: 'language', purpose: 'Remembers selected language', duration: '1 year' },
      { name: 'recent_documents', purpose: 'Shows recently viewed templates', duration: '30 days' },
    ],
    required: false,
  },
  {
    id: 'marketing',
    name: 'Marketing Cookies',
    icon: Globe,
    description: 'Used to deliver relevant advertisements and track campaign effectiveness.',
    cookies: [
      { name: '_fbp', purpose: 'Meta Pixel: tracks conversions from Facebook ads', duration: '3 months' },
      { name: '_gcl_au', purpose: 'Google Ads: tracks conversions', duration: '3 months' },
    ],
    required: false,
  },
  {
    id: 'third-party',
    name: 'Third-Party Cookies',
    icon: Eye,
    description: 'Set by external services we use.',
    cookies: [
      { name: 'recaptcha', purpose: 'Google reCAPTCHA: bot detection and fraud prevention', duration: 'Session-2 years', provider: 'Google' },
      { name: 'whatsapp_widget', purpose: 'WhatsApp chat widget: enables chat functionality', duration: 'Session', provider: 'Meta' },
      { name: 'vercel_analytics', purpose: 'Vercel: privacy-friendly analytics', duration: '1 year', provider: 'Vercel' },
    ],
    required: false,
  },
];

const sections = [
  {
    id: 'introduction',
    title: 'Introduction',
    content: `
      <p>This Cookie Policy explains how Ezekiel Docs ("we," "our," "us") uses cookies and similar tracking technologies on ezekieldocs.com.</p>
      <p>We comply with the Kenya Data Protection Act, 2019 and the EU ePrivacy Directive (where applicable). By using our website with cookies enabled in your browser, you consent to our use of cookies as described here.</p>
    `,
  },
  {
    id: 'what-are-cookies',
    title: 'What Are Cookies?',
    content: `
      <p>Cookies are small text files stored on your device (computer, phone, tablet) when you visit a website. They help websites remember your preferences, understand how you use the site, and provide relevant content.</p>
      <p>Similar technologies include local storage, session storage, and tracking pixels. We refer to all of these as "cookies" in this policy.</p>
    `,
  },
  {
    id: 'categories',
    title: 'Cookie Categories',
    content: `
      <p>We use cookies in the following categories. You can manage your preferences at any time via our <button className="btn btn-sm btn-link p-0 text-primary" onClick={() => window.dispatchEvent(new Event('cookie-consent:open'))}>Cookie Settings</button>.</p>
      ${cookieCategories.map(cat => `
        <div className="card border-0 shadow-sm bg-body-tertiary mb-4">
          <div className="card-body">
            <div className="d-flex align-items-start gap-3">
              <div className="w-10 h-10 flex-shrink-0 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <${cat.icon.name} className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <h5 className="m-0 text-body-emphasis fw-semibold">${cat.name}</h5>
                  ${cat.required ? '<span className="badge bg-primary text-xs">Required</span>' : '<span className="badge bg-secondary text-xs">Optional</span>'}
                </div>
                <p className="m-0 text-body-secondary text-sm mb-3">${cat.description}</p>
                <div className="table-responsive">
                  <table className="table table-sm mb-0">
                    <thead><tr><th>Cookie</th><th>Purpose</th><th>Duration</th>${cat.id === 'third-party' ? '<th>Provider</th>' : ''}</tr></thead>
                    <tbody>
                      ${cat.cookies.map(c => `
                        <tr>
                          <td className="fw-monospace text-sm">${c.name}</td>
                          <td className="text-sm">${c.purpose}</td>
                          <td className="text-sm">${c.duration}</td>
                          ${cat.id === 'third-party' && c.provider ? `<td className="text-sm">${c.provider}</td>` : ''}
                        </tr>
                      `).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      `).join('')}
    `,
  },
  {
    id: 'purposes',
    title: 'Purposes of Processing',
    content: `
      <ul>
        <li><strong>Strictly Necessary:</strong> Enable core functionality (security, authentication, consent management)</li>
        <li><strong>Analytics:</strong> Measure site traffic, user behavior, and performance to improve our services</li>
        <li><strong>Functional:</strong> Remember preferences (theme, language) for better experience</li>
        <li><strong>Marketing:</strong> Measure ad campaign effectiveness, show relevant ads</li>
        <li><strong>Fraud Prevention:</strong> reCAPTCHA protects against bots and abuse</li>
      </ul>
    `,
  },
  {
    id: 'legal-basis',
    title: 'Legal Basis (DPA 2019)',
    content: `
      <ul>
        <li><strong>Necessary cookies:</strong> Legitimate interest (Art. 30 DPA) – essential for service provision</li>
        <li><strong>Analytics, functional, marketing:</strong> Consent (Art. 32 DPA) – freely given, specific, informed</li>
        <li>You can withdraw consent anytime via Cookie Settings</li>
      </ul>
    `,
  },
  {
    id: 'third-parties',
    title: 'Third-Party Providers',
    content: `
      <p>We use these third-party services that set their own cookies:</p>
      <ul>
        <li><strong>Google (Analytics, reCAPTCHA, Ads):</strong> Privacy Policy: policies.google.com/privacy</li>
        <li><strong>Meta (Facebook Pixel, WhatsApp):</strong> Privacy Policy: facebook.com/policy</li>
        <li><strong>Vercel (Hosting, Analytics):</strong> Privacy Policy: vercel.com/privacy</li>
      </ul>
      <p>These providers act as data processors under Data Processing Agreements compliant with the DPA.</p>
    `,
  },
  {
    id: 'manage',
    title: 'Managing Your Preferences',
    content: `
      <h4>Via Our Cookie Banner</h4>
      <p>Click the floating cookie icon or "Cookie Settings" link in the footer to open the preference center. Toggle categories on/off and save.</p>
      <h4>Via Browser Settings</h4>
      <p>Most browsers allow you to:</p>
      <ul>
        <li>Block all cookies (may break site functionality)</li>
        <li>Block third-party cookies only</li>
        <li>Clear cookies on exit</li>
        <li>See and delete specific cookies</li>
      </ul>
      <p>Links: <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener">Chrome</a> | <a href="https://support.mozilla.org/en-US/kb/cookies" target="_blank" rel="noopener">Firefox</a> | <a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener">Safari</a> | <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener">Edge</a></p>
    `,
  },
  {
    id: 'retention',
    title: 'Retention Periods',
    content: `
      <p>Cookie durations vary: session cookies expire when you close your browser; persistent cookies last from 24 hours to 2 years (see tables above). You can delete them anytime via browser settings.</p>
    `,
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: `
      <p>We may update this policy. Material changes will be posted with a new "Last Updated" date. Continued use constitutes acceptance. Check periodically.</p>
    `,
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: `
      <address className="not-italic">
        <strong>Ezekiel Docs Limited</strong><br />
        Data Protection Officer: dpo@ezekieldocs.com<br />
        General: privacy@ezekieldocs.com<br />
        Phone: +254 112 272 061<br />
        WhatsApp: <a href="https://wa.me/254112272061" className="text-primary">+254 112 272 061</a>
      </address>
    `,
  },
];

export default function CookiePolicyPage() {
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
                  Cookie Policy
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="m-0 mt-4 text-white/90 text-lg sm:text-xl leading-8"
                >
                  How we use cookies and similar technologies. Manage your preferences anytime.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="overflow-hidden py-5 py-sm-6 bg-body-tertiary border-bottom">
        <div className="container">
          <nav className="d-flex flex-wrap gap-2 gap-md-3 justify-content-center" aria-label="Cookie policy sections">
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
                      <h2 className="m-0 text-body-emphasis text-xl fw-semibold leading-6 mb-3">
                        {section.title}
                      </h2>
                      <div className="text-body-secondary leading-7" dangerouslySetInnerHTML={{ __html: section.content }} />
                      {index < sections.length - 1 && <hr className="mt-8 border-body-tertiary" />}
                    </motion.section>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-6 p-4 bg-body-tertiary rounded-3">
                <h3 className="m-0 text-body-emphasis fw-semibold mb-3">Quick Actions</h3>
                <div className="d-flex flex-wrap gap-2">
                  <button
                    className="btn btn-primary"
                    onClick={() => window.dispatchEvent(new Event('cookie-consent:open'))}
                  >
                    <Settings className="w-4 h-4 me-2" />
                    Open Cookie Settings
                  </button>
                  <a href="/privacy" className="btn btn-outline-secondary">
                    <Shield className="w-4 h-4 me-2" />
                    Privacy Policy
                  </a>
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
            Questions About Cookies?
          </h2>
          <p className="m-0 mt-3 text-white/90 text-lg leading-8 max-w-2xl mx-auto">
            Our team is happy to clarify how we use cookies and your data.
          </p>
          <div className="mt-6 d-flex flex-col sm:flex-row gap-3 justify-content-center">
            <a
              href="mailto:dpo@ezekieldocs.com"
              className="btn btn-lg btn-light fw-semibold"
            >
              Email DPO
            </a>
            <a
              href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20have%20a%20cookie%20question"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-outline-light fw-semibold whatsapp-btn"
            >
              <Cookie className="w-4 h-4 me-2" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}