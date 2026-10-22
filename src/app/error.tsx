'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, RefreshCw, MessageCircle, AlertTriangle, Shield } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-5"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-danger/10 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-danger" />
          </div>
          <h1 className="m-0 text-body-emphasis text-3xl sm:text-4xl fw-bold mb-3">
            Something Went Wrong
          </h1>
          <p className="m-0 mt-3 text-body-secondary text-lg leading-8 max-w-lg mx-auto mb-5">
            We&apos;re sorry, but an unexpected error occurred. Our team has been notified and is looking into it.
          </p>

          <div className="d-flex flex-wrap gap-3 justify-content-center mb-6">
            <button
              onClick={reset}
              className="btn btn-primary"
              disabled={!reset}
            >
              <RefreshCw className="w-4 h-4 me-2" />
              Try Again
            </button>
            <Link href="/" className="btn btn-outline-primary">
              <Home className="w-4 h-4 me-2" />
              Go Home
            </Link>
          </div>

          {process.env.NODE_ENV === 'development' && error.digest && (
            <details className="text-start max-w-lg mx-auto mb-4 p-3 bg-body-tertiary rounded-3 text-sm">
              <summary className="fw-semibold text-body-secondary cursor-pointer">
                Error Details (Development)
              </summary>
              <pre className="mt-2 text-xs text-danger overflow-auto">{error.message}</pre>
              <code className="text-xs text-body-tertiary">{error.digest}</code>
            </details>
          )}

          <div className="d-flex flex-wrap gap-2 justify-content-center mb-6 text-body-secondary text-sm">
            <a href="/about" className="text-decoration-none text-body-secondary hover:text-primary">About</a>
            <span className="mx-2">·</span>
            <a href="/privacy" className="text-decoration-none text-body-secondary hover:text-primary">Privacy</a>
            <span className="mx-2">·</span>
            <a href="/terms" className="text-decoration-none text-body-secondary hover:text-primary">Terms</a>
          </div>

          <a
            href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20encountered%20an%20error"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary whatsapp-btn d-inline-flex align-items-center"
          >
            <MessageCircle className="w-4 h-4 me-2" />
            Contact Support
          </a>
        </motion.div>

        {/* Reassurance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 p-4 bg-success/5 border border-success/20 rounded-3"
        >
          <div className="d-flex align-items-center justify-content-center gap-2 text-success mb-2">
            <Shield className="w-5 h-5" />
            <span className="fw-semibold">Your data is safe</span>
          </div>
          <p className="m-0 text-success-emphasis text-sm">
            This error didn&apos;t affect your documents or account information. Everything is securely stored.
          </p>
        </motion.div>
      </div>
    </div>
  );
}