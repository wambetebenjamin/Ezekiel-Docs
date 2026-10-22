'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

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
        </div>
      </div>
    </section>
  );
}
