'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Monitor, MessageCircle, ChevronDown } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Documents', href: '/documents' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const [mobileThemeDropdownOpen, setMobileThemeDropdownOpen] = useState(false);
  const pathname = usePathname();
  const desktopDropdownRef = useRef<HTMLDivElement>(null);
  const mobileDropdownRef = useRef<HTMLDivElement>(null);

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
    setMobileMenuOpen(false);
    setThemeDropdownOpen(false);
    setMobileThemeDropdownOpen(false);
  }, [pathname]);

  const handleThemeChange = useCallback((newTheme: 'light' | 'dark' | 'auto') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    const resolvedTheme = newTheme === 'auto'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : newTheme;
    document.documentElement.setAttribute('data-bs-theme', resolvedTheme);
    setThemeDropdownOpen(false);
    setMobileThemeDropdownOpen(false);
  }, []);

  const handleClickOutside = useCallback((event: MouseEvent, ref: React.RefObject<HTMLDivElement | null>, setter: (open: boolean) => void) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      setter(false);
    }
  }, []);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      handleClickOutside(event, desktopDropdownRef, setThemeDropdownOpen);
      handleClickOutside(event, mobileDropdownRef, setMobileThemeDropdownOpen);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [handleClickOutside]);

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

  const whatsappHref = 'https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20need%20help%20with%20a%20legal%20document';

  const themeOptions = [
    { value: 'light' as const, label: 'Light', icon: <Sun className="w-5 h-5" /> },
    { value: 'dark' as const, label: 'Dark', icon: <Moon className="w-5 h-5" /> },
    { value: 'auto' as const, label: 'System', icon: <Monitor className="w-5 h-5" /> },
  ];

  return (
    <header className="navigation fixed top-0 w-100 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
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
              {/* Theme Toggle - Desktop */}
              <div className="relative" ref={desktopDropdownRef}>
                <button
                  onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
                  className="btn btn-ghost btn-sm rounded-lg d-flex align-items-center gap-2 px-3 py-2"
                  aria-expanded={themeDropdownOpen}
                  aria-haspopup="true"
                  aria-label={`Theme: ${themeLabels[theme]}. Click to change.`}
                >
                  <span className="d-flex align-items-center justify-content-center w-9 h-9 rounded-full bg-body-tertiary">
                    {themeIcons[theme]}
                  </span>
                  <ChevronDown className="w-4 h-4 text-body-tertiary" />
                </button>

                {themeDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 z-50 animate-fade-in">
                    <div className="bg-body-bg rounded-xl shadow-lg border border-border overflow-hidden p-1">
                      {themeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleThemeChange(option.value)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                            theme === option.value
                              ? 'bg-primary/10 text-primary'
                              : 'text-body-secondary hover:bg-body-secondary hover:text-body-emphasis'
                          }`}
                          role="menuitemradio"
                          aria-checked={theme === option.value}
                        >
                          <span className="flex-shrink-0 w-5 h-5">{option.icon}</span>
                          <span className="flex-1 text-left">{option.label}</span>
                          {theme === option.value && (
                            <svg className="w-5 h-5 text-primary flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* WhatsApp Button - Desktop */}
              <a
                href={whatsappHref}
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

            <div className="border-t border-border pt-4">
              {/* Theme Toggle - Mobile */}
              <div className="relative mb-3" ref={mobileDropdownRef}>
                <button
                  onClick={() => setMobileThemeDropdownOpen(!mobileThemeDropdownOpen)}
                  className="btn btn-outline btn-sm rounded-lg d-flex align-items-center justify-content-between w-100 py-3 px-4"
                  aria-expanded={mobileThemeDropdownOpen}
                  aria-haspopup="true"
                  aria-label={`Theme: ${themeLabels[theme]}. Click to change.`}
                >
                  <span className="d-flex align-items-center gap-2">
                    <span className="d-flex align-items-center justify-content-center w-9 h-9 rounded-full bg-body-tertiary">
                      {themeIcons[theme]}
                    </span>
                    <span className="font-medium">Theme</span>
                  </span>
                  <span className="text-body-tertiary">{themeLabels[theme]}</span>
                  <ChevronDown className={`w-4 h-4 text-body-tertiary transition-transform ${mobileThemeDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {mobileThemeDropdownOpen && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 animate-fade-in">
                    <div className="bg-body-bg rounded-xl shadow-lg border border-border overflow-hidden p-1">
                      {themeOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleThemeChange(option.value)}
                          className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                            theme === option.value
                              ? 'bg-primary/10 text-primary'
                              : 'text-body-secondary hover:bg-body-secondary hover:text-body-emphasis'
                          }`}
                          role="menuitemradio"
                          aria-checked={theme === option.value}
                        >
                          <span className="flex-shrink-0 w-5 h-5">{option.icon}</span>
                          <span className="flex-1 text-left">{option.label}</span>
                          {theme === option.value && (
                            <svg className="w-5 h-5 text-primary flex-shrink-0" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* WhatsApp Button - Mobile */}
              <a
                href={whatsappHref}
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