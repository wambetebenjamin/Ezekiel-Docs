'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Sun, Moon, Monitor } from 'lucide-react';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Documents', href: '/documents' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'About', href: '/about' },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | 'auto'>('auto');
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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const handleThemeChange = (newTheme: 'light' | 'dark' | 'auto') => {
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    const resolvedTheme = newTheme === 'auto'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : newTheme;
    document.documentElement.setAttribute('data-bs-theme', resolvedTheme);
  };

  const themeIcons = {
    light: <Sun className="w-5 h-5" />,
    dark: <Moon className="w-5 h-5" />,
    auto: <Monitor className="w-5 h-5" />,
  };

  const themeLabels = {
    light: 'Light',
    dark: 'Dark',
    auto: 'Auto',
  };

  return (
    <header
      className={`navigation position-absolute w-100 bg-body-tertiary/95 backdrop-blur-sm shadow border-b border-light border-opacity-10 rounded-b-3 rounded-b-sm-4 transition-all duration-300 z-50 ${
        scrolled ? 'fixed top-0 shadow-md' : ''
      }`}
    >
      <nav className="navbar navbar-expand-xl" aria-label="Main navigation">
        <div className="container py-1">
          <Link href="/" className="navbar-brand" aria-label="Ezekiel Docs Home">
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

          <div className="dropdown ms-3 order-last">
            <button
              className="btn btn-primary text-white btn-sm rounded dropdown-toggle d-flex align-items-center gap-2"
              id="bd-theme"
              type="button"
              aria-expanded="false"
              data-bs-toggle="dropdown"
              aria-label={`Toggle theme (${theme})`}
            >
              {themeIcons[theme]}
              <span className="visually-hidden" id="bd-theme-text">Toggle theme</span>
            </button>

            <ul
              className="p-1 dropdown-menu dropdown-menu-end dropdown-menu-hover end-0 rounded-3 shadow bg-body-tertiary"
              style={{ '--bs-dropdown-min-width': '9rem' } as React.CSSProperties}
              aria-labelledby="bd-theme-text"
              role="menu"
            >
              <li style={{ color: 'var(--bs-tertiary-bg)' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="mt-n1 d-inline-block position-absolute top-0 end-0 translate-middle"
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                >
                  <path
                    className="carret-dropdown-path"
                    d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z"
                  />
                </svg>
              </li>
              {(['light', 'dark', 'auto'] as const).map((t) => (
                <li key={t}>
                  <button
                    type="button"
                    className={`dropdown-item d-flex align-items-center rounded-1 ${theme === t ? 'active' : ''} ${t === 'dark' ? 'my-1' : ''}`}
                    data-bs-theme-value={t}
                    aria-pressed={theme === t}
                    role="menuitemradio"
                    onClick={() => handleThemeChange(t)}
                  >
                    {themeIcons[t]}
                    <span className="ms-2">{themeLabels[t]}</span>
                    {theme === t && (
                      <svg
                        fill="currentColor"
                        className="bi ms-auto active-check"
                        width="1em"
                        height="1em"
                        viewBox="0 0 16 16"
                        aria-hidden="true"
                      >
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
                      </svg>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <button
            className="navbar-toggler ms-auto"
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

          <div
            className="offcanvas offcanvas-end border-0 rounded-s-0 rounded-s-sm-4"
            tabIndex={-1}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header" style={{ padding: '2rem 2rem 1.5rem 2rem' }}>
              <h5 className="offcanvas-title m-0" id="offcanvasNavbarLabel">
                <Link href="/" className="navbar-brand">
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
              </h5>
              <button
                type="button"
                className="btn-close text-body-emphasis"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="offcanvas-body">
              <ul className="navbar-nav align-items-xl-center flex-grow-1 column-gap-4 row-gap-4 row-gap-xl-2">
                {navigation.map((item) => (
                  <li key={item.name} className="nav-item">
                    <Link
                      href={item.href}
                      className={`px-3 text-body-emphasis bg-body-secondary-hover nav-link rounded-3 text-base leading-6 fw-semibold ${
                        pathname === item.href
                          ? 'bg-primary text-white'
                          : ''
                      }`}
                      aria-current={pathname === item.href ? 'page' : undefined}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
                <li className="nav-item ms-xl-auto">
                  <Link
                    href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20need%20help%20with%20a%20legal%20document"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 text-body-emphasis bg-body-secondary-hover border nav-link rounded-3 text-base leading-6 fw-semibold text-center whatsapp-btn"
                  >
                    Chat on WhatsApp
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}