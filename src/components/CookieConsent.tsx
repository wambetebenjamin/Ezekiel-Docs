'use client';

import { useEffect, useState } from 'react';
import { X, Check, ChevronDown, ChevronUp, Shield, Database, BarChart2, Megaphone } from 'lucide-react';

const CONSENT_KEY = 'ezekiel-docs-cookie-consent';

type Consent = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

const defaultConsent: Consent = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [consent, setConsent] = useState<Consent>(defaultConsent);

  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setConsent({ ...defaultConsent, ...parsed });
      } catch {
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const saveConsent = (newConsent: Consent) => {
    setConsent(newConsent);
    localStorage.setItem(CONSENT_KEY, JSON.stringify(newConsent));
    setShowBanner(false);
    setShowModal(false);
  };

  const acceptAll = () => {
    saveConsent({ necessary: true, functional: true, analytics: true, marketing: true });
  };

  const rejectAll = () => {
    saveConsent(defaultConsent);
  };

  const toggleCategory = (category: keyof Consent) => {
    if (category === 'necessary') return;
    const newConsent = { ...consent, [category]: !consent[category] };
    setConsent(newConsent);
  };

  const handleSavePreferences = () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    setShowModal(false);
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {showBanner && (
        <div className="cookie-banner pb-safe" role="dialog" aria-label="Cookie consent">
          <div className="cookie-banner-content">
            <div className="cookie-banner-text">
              <p>
                We use cookies to enhance your experience, analyze traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies per the{' '}
                <a href="/legal/cookie-policy" target="_blank" rel="noopener noreferrer">
                  Kenya Data Protection Act 2019
                </a>
                .
              </p>
            </div>
            <div className="cookie-banner-buttons">
              <button className="cookie-btn cookie-btn-primary" onClick={acceptAll}>
                Accept All
              </button>
              <button className="cookie-btn cookie-btn-secondary" onClick={() => setShowModal(true)}>
                Manage Preferences
              </button>
              <button className="cookie-btn cookie-btn-secondary" onClick={rejectAll}>
                Reject All
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="cookie-modal-overlay" onClick={() => setShowModal(false)} role="dialog" aria-label="Cookie preferences" aria-modal="true">
          <div className="cookie-modal" onClick={e => e.stopPropagation()}>
            <div className="cookie-modal-header">
              <h2 className="cookie-modal-title">Cookie Preferences</h2>
              <button className="cookie-modal-close" onClick={() => setShowModal(false)} aria-label="Close preferences">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="cookie-modal-body">
              <p className="text-body-secondary text-sm mb-6">
                We use cookies to improve your experience. Choose which categories you allow. 
                Necessary cookies cannot be disabled as they are required for the site to function.
              </p>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="cookie-category-name">Necessary</span>
                  </div>
                  <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">Always Active</span>
                </div>
                <p className="cookie-category-desc">
                  Required for core functionality like security, authentication, and cookie consent management. 
                  These cannot be turned off.
                </p>
                <div className="cookie-toggle">
                  <input type="checkbox" id="necessary" checked disabled />
                  <label htmlFor="necessary">Enabled</label>
                </div>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <div className="flex items-center gap-2">
                    <Database className="w-5 h-5 text-success" />
                    <span className="cookie-category-name">Functional</span>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="functional"
                      checked={consent.functional}
                      onChange={() => toggleCategory('functional')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <p className="cookie-category-desc">
                  Enable enhanced functionality like saved preferences, form auto-fill, and personalized content.
                </p>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-5 h-5 text-info" />
                    <span className="cookie-category-name">Analytics</span>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="analytics"
                      checked={consent.analytics}
                      onChange={() => toggleCategory('analytics')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <p className="cookie-category-desc">
                  Help us understand how visitors interact with our site using Vercel Analytics. 
                  Data is anonymized and aggregated.
                </p>
              </div>

              <div className="cookie-category">
                <div className="cookie-category-header">
                  <div className="flex items-center gap-2">
                    <Megaphone className="w-5 h-5 text-warning" />
                    <span className="cookie-category-name">Marketing</span>
                  </div>
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={consent.marketing}
                      onChange={() => toggleCategory('marketing')}
                    />
                    <span className="slider"></span>
                  </label>
                </div>
                <p className="cookie-category-desc">
                  Allow personalized ads and marketing communications based on your browsing behavior.
                </p>
              </div>

              <p className="text-xs text-body-tertiary mt-6">
                You can change your preferences at any time by clicking "Manage Preferences" in the cookie banner. 
                Read our <a href="/legal/cookie-policy" className="text-primary underline">Cookie Policy</a> for details.
              </p>
            </div>
            <div className="cookie-modal-footer">
              <button className="cookie-btn cookie-btn-secondary" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button className="cookie-btn cookie-btn-primary" onClick={handleSavePreferences}>
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .switch {
          position: relative;
          display: inline-block;
          width: 44px;
          height: 24px;
        }
        .switch input {
          opacity: 0;
          width: 0;
          height: 0;
        }
        .slider {
          position: absolute;
          cursor: pointer;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: var(--bs-border-color);
          transition: 0.3s;
          border-radius: 24px;
        }
        .slider:before {
          position: absolute;
          content: "";
          height: 18px;
          width: 18px;
          left: 3px;
          bottom: 3px;
          background-color: white;
          transition: 0.3s;
          border-radius: 50%;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
        }
        input:checked + .slider {
          background-color: var(--bs-primary);
        }
        input:checked + .slider:before {
          transform: translateX(20px);
        }
        input:disabled + .slider {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `}</style>
    </>
  );
}