'use client';

import Link from 'next/link';
import { Home, RotateCcw, MessageCircle, AlertTriangle } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center bg-body-bg px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-5">
          <AlertTriangle className="w-20 h-20 text-warning mx-auto" />
        </div>
        <h1 className="text-body-emphasis text-3xl fw-bold mb-3">Something Went Wrong</h1>
        <p className="text-body-secondary text-lg leading-7 mb-5">
          We encountered an unexpected error. Our team has been notified and is working on it.
        </p>
        <div className="d-flex flex-col sm:flex-row gap-3 justify-content-center mb-4">
          <button
            onClick={reset}
            className="btn btn-primary text-white fw-semibold px-5 py-3"
          >
            <RotateCcw className="w-4 h-4 me-2" />
            Try Again
          </button>
          <Link href="/" className="btn btn-outline-primary fw-semibold px-5 py-3">
            <Home className="w-4 h-4 me-2" />
            Go Home
          </Link>
        </div>
        <div className="mb-4">
          <p className="text-body-secondary text-sm mb-3">Need immediate help?</p>
          <a
            href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20hit%20a%20server%20error"
            target="_blank"
            rel="noopener noreferrer"
            className="d-inline-flex align-items-center gap-2 text-primary fw-medium text-sm hover:text-primary-hover"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp: +254 112 272 061</span>
          </a>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="text-start mt-6 p-4 bg-body-tertiary rounded-lg text-sm">
            <summary className="fw-semibold cursor-pointer mb-2">Error Details (Development)</summary>
            <pre className="text-body-secondary overflow-auto max-h-48">{error.message}</pre>
            {error.digest && <p className="mt-2">Digest: {error.digest}</p>}
          </details>
        )}
      </div>
    </div>
  );
}