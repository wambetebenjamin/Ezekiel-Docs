import Link from 'next/link'
import { Facebook, Linkedin, Twitter } from 'lucide-react'
import {
  DEFAULT_WHATSAPP_LINK,
  SITE_TAGLINE,
  WHATSAPP_DISPLAY,
} from '@/lib/site'

const documentLinks = [
  { href: '/generate/nda', label: 'NDA' },
  { href: '/generate/service-agreement', label: 'Service Agreement' },
  { href: '/generate/employment-contract', label: 'Employment Contract' },
  { href: '/generate/tenancy-agreement', label: 'Tenancy Agreement' },
]

const companyLinks = [
  { href: '/about', label: 'About' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/contact', label: 'Contact' },
]

const legalLinks = [
  { href: '/legal/privacy-policy', label: 'Privacy Policy' },
  { href: '/legal/terms', label: 'Terms of Service' },
  { href: '/legal/cookie-policy', label: 'Cookie Policy' },
]

const socialLinks = [
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
]

export function Footer() {
  return (
    <footer className="bg-text-primary text-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-12">
          <div>
            <p className="font-heading text-xl text-white">Ezekiel Docs</p>
            <p className="mt-3 font-body text-sm text-accent-light leading-relaxed max-w-xs">
              {SITE_TAGLINE} Legal document automation built for Kenyan SMEs,
              freelancers, and startups.
            </p>
            <div className="flex gap-3 mt-5">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-md border border-white/20 text-accent-light hover:bg-white/10 transition-colors"
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          <FooterColumn title="Documents" links={documentLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Legal" links={legalLinks} />
        </div>

        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <p className="font-body text-xs text-accent-light">
            {new Date().getFullYear()} Ezekiel Docs. All rights reserved.
          </p>
          <a
            href={DEFAULT_WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs text-accent-light hover:text-white transition-colors min-h-[44px] inline-flex items-center"
          >
            WhatsApp: {WHATSAPP_DISPLAY}
          </a>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: Array<{ href: string; label: string }>
}) {
  return (
    <div>
      <h2 className="font-heading text-base text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={`${title}-${link.label}`}>
            <Link
              href={link.href}
              className="font-body text-sm text-accent-light hover:text-white transition-colors min-h-[44px] inline-flex items-center"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
