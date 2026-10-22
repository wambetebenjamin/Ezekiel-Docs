'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DocumentsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <div className="min-h-screen">
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <motion.h1 className="m-0 text-body-emphasis text-4xl sm:text-5xl md:text-6xl tracking-tight fw-bold">
              Document Library
            </motion.h1>
          </div>
        </div>
      </section>
    </div>
  );
}
