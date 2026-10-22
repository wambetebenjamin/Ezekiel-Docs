'use client';

import { useEffect, useState } from 'react';
import { X, Check, Cookie, Shield } from 'lucide-react';

interface ConsentPreferences {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const DEFAULT_PREFERENCES: ConsentPreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

const STORAGE_KEY = 'ezekiel-docs-cookie-consent';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>(DEFAULT_PREFERENCES);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setPreferences({ ...DEFAULT_PREFERENCES, ...parsed });
      } catch {
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
  }, []);

  const savePreferences = (newPrefs: ConsentPreferences) => {
    setPreferences(newPrefs);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newPrefs));
    applyConsent(newPrefs);
    setShowBanner(false);
    setShowModal(false);
  };

  const acceptAll = () => {
    const allAccepted: ConsentPreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
  };

  const rejectAll = () => {
    savePreferences(DEFAULT_PREFERENCES);
  };

  const togglePreference = (key: keyof ConsentPreferences) => {
    if (key === 'necessary') return;
    setPreferences((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      savePreferences(updated);
      return updated;
    });
  };

  const applyConsent = (prefs: ConsentPreferences) => {
    if (prefs.analytics) {
      // Enable analytics scripts (Vercel Analytics, etc.)
      document.cookie = 'analytics_consent=true; path=/; max-age=31536000; SameSite=Lax';
    } else {
      document.cookie = 'analytics_consent=false; path=/; max-age=31536000; SameSite=Lax';
    }

    if (prefs.marketing) {
      document.cookie = 'marketing_consent=true; path=/; max-age=31536000; SameSite=Lax';
    } else {
      document.cookie = 'marketing_consent=false; path=/; max-age=31536000; SameSite=Lax';
    }

    if (prefs.functional) {
      document.cookie = 'functional_consent=true; path=/; max-age=31536000; SameSite=Lax';
    } else {
      document.cookie = 'functional_consent=false; path=/; max-age=31536000; SameSite=Lax';
    }
  };

  if (!showBanner && !showModal) return null;

  return (
    <>
      {showBanner && (
        <div
          className="fixed bottom-0 left-0 right-0 z-[9999] pb-safe bg-body-tertiary border-t border-border shadow-lg animate-slide-up"
          role="dialog"
          aria-label="Cookie consent"
          aria-describedby="cookie-description"
        >
          <div className="container px-4 py-4">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <Cookie className="w-5 h-5" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-body-emphasis">We value your privacy</h3>
                  <p id="cookie-description" className="text-sm text-body-secondary mt-1 max-w-3xl">
                    We use cookies to enhance your experience, analyze site traffic, and personalize content.
                    By clicking "Accept All", you consent to our use of cookies per the
                    <a href="/legal/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>
                    and Kenya Data Protection Act 2019.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <button
                  onClick={rejectAll}
                  className="btn btn-outline-secondary btn-sm fw-semibold"
                  aria-label="Reject all non-essential cookies"
                >
                  Reject All
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="btn btn-outline-primary btn-sm fw-semibold"
                  aria-label="Manage cookie preferences"
                >
                  Manage Preferences
                </button>
                <button
                  onClick={acceptAll}
                  className="btn btn-primary btn-sm fw-semibold"
                  aria-label="Accept all cookies"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-modal-title"
        >
          <div className="bg-body-bg rounded-4 shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 id="cookie-modal-title" className="text-lg font-semibold text-body-emphasis">
                Cookie Preferences
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-1 text-body-secondary hover:text-body-emphasis focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                aria-label="Close preferences"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 space-y-4">
              <p className="text-sm text-body-secondary">
                Customize your cookie preferences below. Necessary cookies cannot be disabled as they are essential for the website to function properly.
              </p>

              <div className="space-y-3">
                {([
                  { key: 'necessary', label: 'Necessary', description: 'Required for core functionality like security, authentication, and accessibility.', icon: Shield },
                  { key: 'functional', label: 'Functional', description: 'Enable enhanced features like saved preferences, language selection, and personalized content.', icon: Cookie },
                  { key: 'analytics', label: 'Analytics', description: 'Help us understand how visitors interact with our site to improve user experience.', icon: Check },
                  { key: 'marketing', label: 'Marketing', description: 'Used to deliver relevant advertisements and measure marketing campaign effectiveness.', icon: Check },
                ] as const).map(({ key, label, description, icon: Icon }) => (
                  <div key={key} className="flex items-start gap-3 p-3 bg-body-tertiary rounded-3">
                    <div className="flex-shrink-0 w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <Icon className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-sm font-medium text-body-emphasis">{label}</h4>
                          <p className="text-xs text-body-secondary mt-0.5">{description}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={preferences[key]}
                            onChange={() => togglePreference(key)}
                            disabled={key === 'necessary'}
                            className="sr-only peer"
                            aria-label={`Enable ${label} cookies`}
                          />
                          <div className={`w-11 h-6 rounded-full transition-colors peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2 ${
                            preferences[key] ? 'bg-primary' : 'bg-gray-300'
                          }`}>
                            <span className={`inline-block w-5 h-5 transform rounded-full bg-white shadow transition-transform ${
                              preferences[key] ? 'translate-x-5' : 'translate-x-0'
                            }`} />
                          </div>
                        </label>
                      </div>
                      {key === 'necessary' && (
                        <p className="text-xs text-body-secondary mt-1">Always active - required for site functionality</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  onClick={rejectAll}
                  className="btn btn-outline-secondary btn-sm fw-semibold flex-1"
                >
                  Reject All
                </button>
                <button
                  onClick={acceptAll}
                  className="btn btn-primary btn-sm fw-semibold flex-1"
                >
                  Accept All
                </button>
              </div>
            </div>

            <div className="p-4 border-t border-border">
              <p className="text-xs text-body-secondary text-center">
                You can change your preferences at any time by clicking the "Cookie Preferences" link in the footer.
                Learn more in our <a href="/legal/cookie-policy" className="text-primary hover:underline">Cookie Policy</a>.
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.3s ease-out; }
      `}</style>
    </>
  );
}