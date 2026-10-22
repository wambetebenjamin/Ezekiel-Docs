'use client';

import { useEffect, useState } from 'react';
import { FileText } from 'lucide-react';

export function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [showSkip, setShowSkip] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    const skipTimer = setTimeout(() => setShowSkip(true), 3000);

    const handleLoad = () => {
      clearInterval(timer);
      clearTimeout(skipTimer);
      setProgress(100);
      setTimeout(() => setShow(false), 300);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
    }

    return () => {
      clearInterval(timer);
      clearTimeout(skipTimer);
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  if (!show) return null;

  return (
    <div
      className="loader-wrapper"
      role="status"
      aria-label="Loading Ezekiel Docs"
      aria-busy="true"
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <svg
            className="w-20 h-20 text-primary"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
            style={{
              animation: prefersReducedMotion ? 'none' : 'spin 2s linear infinite',
            }}
          >
            <path
              d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 2v8a2 2 0 0 0 2 2h8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 13H8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M16 17H8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M10 9H8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <style jsx>{`
            @keyframes spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </div>
        <div className="text-center">
          <p className="text-lg font-semibold text-body-emphasis">Ezekiel Docs</p>
          <p className="text-sm text-body-secondary">Your legal documents, done right.</p>
        </div>
        <div
          className="w-64 h-2 bg-secondary-bg rounded-full overflow-hidden"
          role="progressbar"
          aria-valuenow={Math.min(progress, 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading progress"
        >
          <div
            className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            style={{
              width: prefersReducedMotion ? '100%' : `${Math.min(progress, 100)}%`,
            }}
          />
        </div>
        {prefersReducedMotion && (
          <p className="text-sm text-body-secondary" aria-live="polite">
            Loading: {Math.round(progress)}%
          </p>
        )}
        {showSkip && (
          <button
            onClick={() => setShow(false)}
            className="text-sm text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 px-3 py-1 rounded"
            aria-label="Skip loading screen"
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
}