'use client';

import Link from 'next/link';
import { Home, Search, MessageCircle, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen d-flex align-items-center justify-content-center bg-body-bg px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-5">
          <span className="display-1 fw-bold text-primary">404</span>
        </div>
        <h1 className="text-body-emphasis text-3xl fw-bold mb-3">Page Not Found</h1>
        <p className="text-body-secondary text-lg leading-7 mb-5">
          Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
        </p>
        <div className="d-flex flex-col sm:flex-row gap-3 justify-content-center">
          <Link href="/" className="btn btn-primary text-white fw-semibold px-5 py-3">
            <Home className="w-4 h-4 me-2" />
            Go Home
          </Link>
          <Link href="/documents" className="btn btn-outline-primary fw-semibold px-5 py-3">
            <Search className="w-4 h-4 me-2" />
            Browse Documents
          </Link>
        </div>
        <div className="mt-6">
          <p className="text-body-secondary text-sm mb-3">Need help? We're here for you.</p>
          <a
            href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20hit%20a%20404%20error"
            target="_blank"
            rel="noopener noreferrer"
            className="d-inline-flex align-items-center gap-2 text-primary fw-medium text-sm hover:text-primary-hover"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}