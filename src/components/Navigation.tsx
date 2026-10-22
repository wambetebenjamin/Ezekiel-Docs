'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Monitor, MessageCircle, ChevronDown, Scale, FileText, Users, Briefcase } from 'lucide-react';
import { WHATSAPP_HREF } from '@/lib/constants';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Documents', href: '/documents' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
];

const legalLinks = [
  { name: 'Privacy Policy', href: '/legal/privacy-policy' },
  { name: 'Terms of Service', href: '/legal/terms' },
  { name: 'Cookie Policy', href: '/legal/cookie-policy' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [mobileThemeDropdownOpen, setMobileThemeDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const stored = localStorage.getItem('theme') as 'light' | 'dark' | 'auto' | null;
    if (stored) {
      setTheme(stored);
      document.documentElement.setAttribute('data-bs-theme', stored === 'auto'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : stored
      );
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setThemeDropdownOpen(false);
    setMobileThemeDropdownOpen(false);
  }, [pathname]);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    const resolvedTheme = newTheme === 'auto'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : newTheme;
    document.documentElement.setAttribute('data-bs-theme', resolvedTheme);
    setThemeDropdownOpen(false);
    setMobileThemeDropdownOpen(false);
  };

  const themeIcons = {
    light: <Sun className="w-5 h-5" />,
    dark: <Moon className="w-5 h-5" />,
    auto: <Monitor className="w-5 h-5" />,
  };

  const themeLabels = {
    light: 'Light',
    dark: 'Dark',
    auto: 'System',
  };

  const themeOptions = [
    { value: 'light' as const, label: 'Light', icon: <Sun className="w-5 h-5" /> },
    { value: 'dark' as const, label: 'Dark', icon: <Moon className="w-5 h-5" /> },
    { value: 'auto' as const, label: 'System', icon: <Monitor className="w-5 h-5" /> },
  ];

  return (
    <header
      className={`navigation fixed top-0 w-100 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-border'
          : 'bg-transparent'
      }`}
    >
      <nav className="navbar navbar-expand-xl" aria-label="Main navigation">
        <div className="container">
          <div className="d-flex align-items-center w-100 justify-content-between">
            {/* Logo */}
            <Link href="/" className="navbar-brand d-flex align-items-center gap-2" aria-label="Ezekiel Docs Home">
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

            {/* Desktop Navigation */}
            <div className="d-none d-xl-flex align-items-center gap-1 ms-auto me-3">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    pathname === item.href
                      ? 'bg-primary text-white shadow-sm'
                      : 'text-body-secondary hover:text-body-emphasis hover:bg-body-tertiary'
                  }`}
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="d-none d-xl-flex align-items-center gap-2 ms-2">
              {/* Theme Toggle */}
              <div className="dropdown">
                <button
                  className="btn btn-ghost btn-sm rounded-lg d-flex align-items-center gap-1 p-2"
                  id="bd-theme"
                  type="button"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  aria-label={`Toggle theme (${theme})`}
                  style={{ minWidth: 'auto' }}
                >
                  {themeIcons[theme]}
                  <span className="visually-hidden">Toggle theme</span>
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end dropdown-menu-hover rounded-lg shadow-lg border-0 bg-body-tertiary p-1"
                  aria-labelledby="bd-theme-text"
                  role="menu"
                >
                  {(['light', 'dark', 'auto'] as const).map((t) => (
                    <li key={t}>
                      <button
                        type="button"
                        className={`dropdown-item d-flex align-items-center gap-2 rounded px-3 py-2 ${theme === t ? 'bg-primary/10 text-primary' : 'text-body-secondary hover:bg-body-secondary'}`}
                        data-bs-theme-value={t}
                        aria-pressed={theme === t}
                        role="menuitemradio"
                        onClick={() => handleThemeChange(t)}
                      >
                        {themeIcons[t]}
                        <span>{themeLabels[t]}</span>
                        {theme === t && (
                          <span className="ms-auto text-primary">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                            </svg>
                          </span>
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp Button - Desktop */}
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-sm rounded-lg d-flex align-items-center gap-2 px-4 py-2 fw-semibold whatsapp-btn"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Mobile Toggle */}
            <button
              className="d-xl-none btn btn-ghost btn-sm rounded-lg p-2"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
              aria-label="Toggle navigation"
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-body-color" strokeWidth={2.5} />
              ) : (
                <Menu className="w-6 h-6 text-body-color" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Offcanvas */}
        <div
          className="offcanvas offcanvas-end border-0 shadow-lg"
          tabIndex={-1}
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div className="offcanvas-header border-0 pb-0">
            <div className="d-flex align-items-center justify-content-between w-100">
              <Link href="/" className="navbar-brand d-flex align-items-center gap-2" aria-label="Ezekiel Docs Home">
                <svg
                  className="h-8 w-auto text-primary"
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
              <button
                type="button"
                className="btn-close text-body-emphasis"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
          </div>

          <div className="offcanvas-body p-4 pt-0">
            <nav className="mb-4">
              <ul className="nav flex-column gap-1">
                {navigation.map((item) => (
                  <li key={item.name} className="nav-item">
                    <Link
                      href={item.href}
                      className={`nav-link px-3 py-3 rounded-xl text-base font-medium transition-colors ${
                        pathname === item.href
                          ? 'bg-primary/10 text-primary'
                          : 'text-body-secondary hover:text-body-emphasis hover:bg-body-tertiary'
                      }`}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="border-t border-border pt-4 mb-4">
              <nav>
                <ul className="nav flex-column gap-1">
                  {legalLinks.map((item) => (
                    <li key={item.name} className="nav-item">
                      <Link
                        href={item.href}
                        className="nav-link px-3 py-2 rounded-lg text-sm font-medium text-body-secondary hover:text-body-emphasis hover:bg-body-tertiary transition-colors"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="border-t border-border pt-4">
              {/* Theme Toggle - Mobile */}
              <div className="dropdown mb-3">
                <button
                  className="btn btn-outline btn-sm rounded-lg d-flex align-items-center justify-content-between w-100 py-3 px-4"
                  id="bd-theme-mobile"
                  type="button"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  aria-label={`Toggle theme (${theme})`}
                >
                  <span className="d-flex align-items-center gap-2">
                    {themeIcons[theme]}
                    <span className="font-medium">Theme</span>
                  </span>
                  <span className="text-body-tertiary">{themeLabels[theme]}</span>
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end dropdown-menu-hover rounded-lg shadow-lg border-0 bg-body-tertiary p-1 w-100"
                  aria-labelledby="bd-theme-mobile"
                  role="menu"
                >
                  {(['light', 'dark', 'auto'] as const).map((t) => (
                    <li key={t}>
                      <button
                        type="button"
                        className={`dropdown-item d-flex align-items-center gap-3 rounded px-4 py-3 ${theme === t ? 'bg-primary/10 text-primary' : 'text-body-secondary hover:bg-body-secondary'}`}
                        data-bs-theme-value={t}
                        aria-pressed={theme === t}
                        role="menuitemradio"
                        onClick={() => handleThemeChange(t)}
                      >
                        <span className="d-flex align-items-center gap-3 w-100">
                          {themeIcons[t]}
                          <span className="font-medium">{themeLabels[t]}</span>
                          {theme === t && (
                            <span className="ms-auto text-primary">
                              <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                              </svg>
                            </span>
                          )}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* WhatsApp Button - Mobile */}
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary rounded-xl d-flex align-items-center justify-content-center gap-3 w-100 py-3 fw-semibold text-base whatsapp-btn"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}