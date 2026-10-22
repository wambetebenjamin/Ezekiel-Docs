import Link from 'next/link';
import { Scale, MessageCircle, Twitter, Linkedin, Facebook } from 'lucide-react';
import { FOOTER_LINKS, SOCIAL_LINKS, WHATSAPP_HREF } from '@/lib/constants';

const socialIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Twitter,
  Linkedin,
  Facebook,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="overflow-hidden py-6 py-sm-7 py-xl-8 bg-body-tertiary" role="contentinfo">
      <div className="container">
        <div className="row gy-5">
          <div className="col-12 col-xl-6">
            <div className="pb-3 max-w-lg position-relative">
              <Link href="/" className="d-flex align-items-center gap-2 mb-4" aria-label="Ezekiel Docs Home">
                <svg
                  className="h-9 w-auto text-primary"
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
              <p className="m-0 text-body-secondary text-lg leading-8 max-w-xl">
                Your legal documents, done right. Generate compliant Kenyan legal documents in minutes.
              </p>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="d-inline-flex align-items-center gap-2 mt-4 text-primary fw-semibold text-sm hover:text-primary-hover"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp Support</span>
              </a>
            </div>
          </div>

          <div className="col-12 col-xl-6">
            <div className="row row-cols-2 row-cols-md-4 gx-3 gy-5">
              <div className="col">
                <h4 className="fw-semibold text-body-emphasis mb-3">Product</h4>
                <nav>
                  <ul className="nav flex-column gap-2">
                    {FOOTER_LINKS.product.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-body-secondary text-sm hover:text-primary transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="col">
                <h4 className="fw-semibold text-body-emphasis mb-3">Legal</h4>
                <nav>
                  <ul className="nav flex-column gap-2">
                    {FOOTER_LINKS.legal.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-body-secondary text-sm hover:text-primary transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="col">
                <h4 className="fw-semibold text-body-emphasis mb-3">Company</h4>
                <nav>
                  <ul className="nav flex-column gap-2">
                    {FOOTER_LINKS.company.map((link) => (
                      <li key={link.label}>
                        <Link href={link.href} className="text-body-secondary text-sm hover:text-primary transition-colors">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <div className="col">
                <h4 className="fw-semibold text-body-emphasis mb-3">Support</h4>
                <nav>
                  <ul className="nav flex-column gap-2">
                    {FOOTER_LINKS.support.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          target={link.href.startsWith('http') ? '_blank' : undefined}
                          rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-body-secondary text-sm hover:text-primary transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <hr className="my-6 text-body-emphasis opacity-10" />

        <div className="d-flex flex-column flex-xl-row gap-5 justify-content-between align-items-xl-center">
          <div className="order-first order-xl-last">
            <ul className="nav row gy-4 gx-sm-4 row-cols-2 row-cols-sm-auto">
              {SOCIAL_LINKS.map((social) => {
                const IconComponent = socialIconMap[social.icon];
                return (
                  <li key={social.name} className="nav-item">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`social ${social.name.toLowerCase()} p-2 rounded-lg d-flex align-items-center justify-content-center`}
                      aria-label={social.name}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="order-last order-xl-first">
            <Link href="/" className="link-body-emphasis d-flex align-items-center text-decoration-none">
              <Scale className="w-6 h-6 text-primary me-2" />
              <span className="fw-bold">Ezekiel Docs</span>
            </Link>
          </div>

          <div className="order-last order-xl-first">
            <p className="mb-0 text-body-secondary leading-6 text-sm">
              © {currentYear} Ezekiel Docs. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}