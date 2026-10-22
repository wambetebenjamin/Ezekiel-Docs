'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { DOCUMENT_TYPES } from '@/lib/constants';

const featuredDocs = DOCUMENT_TYPES.slice(0, 6);

export function FeaturedDocuments() {
  return (
    <section className="overflow-hidden py-7 py-sm-8 py-xl-9" aria-labelledby="featured-heading">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-5 mb-md-6">
          <motion.h2
            id="featured-heading"
            className="m-0 text-primary-emphasis text-base leading-7 fw-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Popular Documents
          </motion.h2>
          <motion.p
            className="m-0 mt-2 text-body-emphasis text-4xl tracking-tight fw-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Most Generated Documents
          </motion.p>
          <motion.p
            className="m-0 mt-4 text-body-secondary text-lg leading-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Start with our most popular templates for Kenyan businesses and freelancers
          </motion.p>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 gy-5 gx-xl-4">
          {featuredDocs.map((doc, index) => (
            <motion.div
              key={doc.slug}
              className="col"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
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
                    Generate
                    <ArrowRight className="w-4 h-4 ms-2" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-5 pt-md-6">
          <motion.a
            href="/documents"
            className="btn btn-lg btn-outline-primary text-primary icon-link icon-link-hover text-sm leading-6 fw-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            View All Documents
            <ArrowRight className="w-4 h-4 ms-2" aria-hidden="true" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}