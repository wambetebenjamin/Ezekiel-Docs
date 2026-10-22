'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronUp } from 'lucide-react';
import { DOCUMENT_TYPES, DOCUMENT_CATEGORIES } from '@/lib/constants';

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredDocs = activeCategory === 'All'
    ? DOCUMENT_TYPES
    : DOCUMENT_TYPES.filter((doc) => doc.category === activeCategory);

  return (
    <div className="min-h-screen">
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1 className="m-0 text-body-emphasis text-4xl sm:text-5xl md:text-6xl tracking-tight fw-bold">
              Document Library
            </motion.h1>
            <motion.p className="m-0 mt-4 text-body-secondary text-lg leading-8">
              Browse all available legal document templates. Filter by category to find what you need.
            </motion.p>
          </div>
        </div>
      </section>

      <section className="py-4 bg-body-bg border-y border-border">
        <div className="container">
          <div className="d-flex flex-wrap justify-content-center gap-2">
            {DOCUMENT_CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category);
                }}
                className={`btn btn-sm rounded-pill px-4 py-2 fw-medium transition-all ${
                  activeCategory === category
                    ? 'btn-primary text-white shadow-sm'
                    : 'btn-outline-secondary text-secondary hover:bg-secondary/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-7 py-sm-8 py-xl-9">
        <div className="container">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 gy-5 gx-xl-4">
            {filteredDocs.map((doc, index) => (
              <motion.div
                key={doc.slug}
                className="col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Link
                  href={`/generate/${doc.slug}`}
                  className="doc-card card h-100 border-border overflow-hidden text-decoration-none"
                >
                  <div className="card-body d-flex flex-column p-4 p-xl-5">
                    <div className="p-2 bg-primary/10 rounded-xl d-inline-flex mb-4">
                      <span className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="card-title text-body-emphasis text-lg leading-6 fw-semibold mb-2">
                      {doc.name}
                    </h3>
                    <p className="card-text text-body-secondary text-sm leading-6 flex-1 mb-4 line-clamp-2">
                      {doc.description}
                    </p>
                    <div className="d-flex align-items-center justify-content-between mb-4 pt-3 border-t border-border">
                      <span className="badge bg-primary/10 text-primary text-xs px-3 py-2">
                        {doc.estimatedTime}
                      </span>
                      <span className="badge bg-body-tertiary text-body-secondary text-xs px-3 py-2">
                        {doc.category}
                      </span>
                    </div>
                    <div className="d-flex align-items-center text-primary fw-semibold text-sm icon-link icon-link-hover">
                      Generate Document
                      <ChevronUp className="w-4 h-4 ms-2" aria-hidden="true" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {filteredDocs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-body-secondary text-lg">No documents found in this category.</p>
            </div>
          )}

          <div className="text-center pt-5 pt-md-6">
            <motion.a
              href="/pricing"
              className="btn btn-lg btn-primary text-white icon-link icon-link-hover text-sm leading-6 fw-semibold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              View Pricing Plans
              <ChevronUp className="w-4 h-4 ms-2" aria-hidden="true" />
            </motion.a>
          </div>
        </div>
      </section>
    </div>
  );
}