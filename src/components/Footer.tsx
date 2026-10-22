import Link from 'next/link';
import { FileText, Scale, Shield, Lock, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Documents', href: '/documents' },
    { name: 'Pricing', href: '/pricing' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'FAQ', href: '#faq' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Press', href: '/press' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/legal/privacy-policy' },
    { name: 'Terms of Service', href: '/legal/terms' },
    { name: 'Cookie Policy', href: '/legal/cookie-policy' },
  ],
  support: [
    { name: 'Help Center', href: '/help' },
    { name: 'Contact Us', href: '/contact' },
    { name: 'WhatsApp', href: 'https://wa.me/254112272061' },
  ],
};

const socialLinks = [
  { name: 'Twitter', href: 'https://twitter.com/ezekieldocs', icon: 'twitter' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/ezekieldocs', icon: 'linkedin' },
  { name: 'Facebook', href: 'https://facebook.com/ezekieldocs', icon: 'facebook' },
  { name: 'Instagram', href: 'https://instagram.com/ezekieldocs', icon: 'instagram' },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="overflow-hidden py-6 py-sm-7 py-xl-8 bg-body-tertiary">
      <div className="container">
        <div className="row gy-5">
          <div className="col-12 col-xl-4">
            <div className="pb-3 max-w-lg">
              <Link href="/" className="link-body-emphasis d-flex align-items-center text-decoration-none mb-4">
                <svg
                  className="h-10 w-auto text-primary"
                  viewBox="0 0 120 40"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect x="0" y="0" width="40" height="40" rx="8" fill="currentColor" />
                  <path
                    d="M10 12h20M10 20h15M10 28h10"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <text
                    x="50"
                    y="28"
                    fontFamily="'Inter var', sans-serif"
                    fontSize="20"
                    fontWeight="700"
                    fill="currentColor"
                  >
                    Ezekiel Docs
                  </text>
                </svg>
              </Link>
              <p className="text-body-secondary text-sm leading-7">
                Your legal documents, done right. Generate Kenyan-law-compliant contracts in minutes.
                Trusted by SMEs, freelancers, and startups across Kenya.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <a
                  href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20need%20help%20with%20a%20legal%20document"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary text-white btn-sm fw-semibold d-flex align-items-center gap-2 whatsapp-btn"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </a>
                <a
                  href="mailto:support@ezekieldocs.com"
                  className="btn btn-outline-primary btn-sm fw-semibold d-flex align-items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email Us
                </a>
              </div>
            </div>
          </div>

          <div className="col-12 col-sm-6 col-xl-2">
            <h4 className="text-body-emphasis fw-semibold text-sm leading-6">Product</h4>
            <ul className="nav flex-column mt-3 gap-2">
              {footerLinks.product.map((link) => (
                <li key={link.name} className="nav-item">
                  <Link
                    href={link.href}
                    className="p-0 text-body-secondary nav-link leading-6 text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-xl-2">
            <h4 className="text-body-emphasis fw-semibold text-sm leading-6">Company</h4>
            <ul className="nav flex-column mt-3 gap-2">
              {footerLinks.company.map((link) => (
                <li key={link.name} className="nav-item">
                  <Link
                    href={link.href}
                    className="p-0 text-body-secondary nav-link leading-6 text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-xl-2">
            <h4 className="text-body-emphasis fw-semibold text-sm leading-6">Legal</h4>
            <ul className="nav flex-column mt-3 gap-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name} className="nav-item">
                  <Link
                    href={link.href}
                    className="p-0 text-body-secondary nav-link leading-6 text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-12 col-sm-6 col-xl-2">
            <h4 className="text-body-emphasis fw-semibold text-sm leading-6">Support</h4>
            <ul className="nav flex-column mt-3 gap-2">
              {footerLinks.support.map((link) => (
                <li key={link.name} className="nav-item">
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="p-0 text-body-secondary nav-link leading-6 text-sm hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="container">
        <hr className="my-6 text-body-emphasis opacity-10" />

        <div className="d-flex flex-column flex-xl-row gap-5 justify-content-between align-items-xl-center">
          <div className="order-first order-xl-last">
            <ul className="nav row gy-3 gx-sm-3 row-cols-2 row-cols-sm-auto gap-4">
              {socialLinks.map((social) => (
                <li key={social.name} className="nav-item">
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`social ${social.icon.toLowerCase()} p-2 rounded-3 d-flex align-items-center justify-content-center transition-all`}
                    aria-label={social.name}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      {social.icon === 'twitter' && (
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                      )}
                      {social.icon === 'linkedin' && (
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
                      )}
                      {social.icon === 'facebook' && (
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                      )}
                      {social.icon === 'instagram' && (
                        <>
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </>
                      )}
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-last order-xl-first">
            <Link href="/" className="link-body-emphasis d-flex align-items-center text-decoration-none">
              <svg
                className="h-6 w-auto text-primary"
                viewBox="0 0 120 40"
                fill="none"
                aria-hidden="true"
              >
                <rect x="0" y="0" width="40" height="40" rx="8" fill="currentColor" />
                <path
                  d="M10 12h20M10 20h15M10 28h10"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
                <text
                  x="50"
                  y="28"
                  fontFamily="'Inter var', sans-serif"
                  fontSize="20"
                  fontWeight="700"
                  fill="currentColor"
                >
                  Ezekiel Docs
                </text>
              </svg>
            </Link>
          </div>

          <div className="order-first order-xl-last xl:order-none">
            <p className="mb-0 text-body-secondary leading-6 text-sm text-center text-xl-start">
              © {currentYear} Ezekiel Docs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}