'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, FileText, MessageCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="py-5"
        >
          <div className="mb-4">
            <span className="display-1 fw-bold text-primary">404</span>
          </div>
          <h1 className="m-0 text-body-emphasis text-3xl sm:text-4xl fw-bold mb-3">
            Page Not Found
          </h1>
          <p className="m-0 mt-3 text-body-secondary text-lg leading-8 max-w-lg mx-auto mb-5">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or doesn&apos;t exist.
          </p>

          <div className="d-flex flex-wrap gap-3 justify-content-center mb-6">
            <Link href="/" className="btn btn-primary">
              <Home className="w-4 h-4 me-2" />
              Go Home
            </Link>
            <Link href="/documents" className="btn btn-outline-primary">
              <FileText className="w-4 h-4 me-2" />
              Browse Documents
            </Link>
            <Link href="/generate/nda" className="btn btn-outline-secondary">
              <Search className="w-4 h-4 me-2" />
              Create a Document
            </Link>
          </div>

          <div className="d-flex flex-wrap gap-2 justify-content-center mb-6 text-body-secondary text-sm">
            <a href="/about" className="text-decoration-none text-body-secondary hover:text-primary">About Us</a>
            <span className="mx-2">·</span>
            <a href="/pricing" className="text-decoration-none text-body-secondary hover:text-primary">Pricing</a>
            <span className="mx-2">·</span>
            <a href="/privacy" className="text-decoration-none text-body-secondary hover:text-primary">Privacy</a>
            <span className="mx-2">·</span>
            <a href="/terms" className="text-decoration-none text-body-secondary hover:text-primary">Terms</a>
          </div>

          <a
            href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20hit%20a%20404%20page"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-primary whatsapp-btn d-inline-flex align-items-center"
          >
            <MessageCircle className="w-4 h-4 me-2" />
            Report This Link
          </a>
        </motion.div>

        {/* Decorative elements */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="position-absolute bottom-0 start-50 translate-middle-x opacity-10"
          style={{ pointerEvents: 'none' }}
        >
          <FileText className="w-32 h-32 text-primary" />
        </motion.div>
      </div>
    </div>
  );
}