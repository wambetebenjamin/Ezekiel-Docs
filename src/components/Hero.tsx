'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, CheckCircle, Download, Lock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const trustItems = [
  { icon: Shield, label: 'Kenyan Law Compliant' },
  { icon: CheckCircle, label: 'Lawyer Reviewed' },
  { icon: Download, label: 'Instant PDF Download' },
  { icon: Lock, label: 'Secure & Private' },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-body-tertiary py-7 py-sm-8 py-xl-9" aria-labelledby="hero-heading">
      <div className="container">
        <div className="min-vh-100 row align-items-center">
          <div className="col-12 col-xl-8">
            <div className="pt-9 pt-md-10 pt-xl-11 pb-7 pb-md-8 pb-xl-9 max-w-2xl mx-auto mx-xl-0">
              <div className="mt-4 pt-2">
                <div className="text-center text-xl-start">
                  <motion.h1
                    id="hero-heading"
                    className="m-0 text-body-emphasis tracking-tight text-6xl fw-bold hero-headline"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    Generate legal documents
                    <br />
                    <span className="text-primary">in minutes</span>
                  </motion.h1>
                  <motion.p
                    className="m-0 mt-4 text-body-secondary text-lg leading-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.1 }}
                  >
                    Create legally compliant Kenyan contracts, agreements, and legal forms. 
                    Fill in your details, download a ready-to-sign PDF. No lawyer needed for standard documents.
                  </motion.p>
                  <motion.div
                    className="mt-4 pt-3 d-flex align-items-center justify-content-center justify-content-xl-start column-gap-3 flex-wrap"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                  >
                    <Link
                      href="/documents"
                      className="btn btn-lg btn-primary text-white text-sm fw-semibold px-5 py-3"
                    >
                      Start a Document
                    </Link>
                    <Link
                      href="/documents"
                      className="btn btn-lg text-body-emphasis icon-link icon-link-hover bg-body-secondary-hover text-sm leading-6 fw-semibold px-5 py-3"
                    >
                      See Document Types
                      <ArrowRight className="w-4 h-4 ms-2" aria-hidden="true" />
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-xl-4">
            <div className="pt-3 pt-md-4 pt-xl-12 pb-2 pb-md-3 pb-xl-6">
              <div className="relative">
                <Image
                  src="/images/hero-illustration.jpg"
                  alt="Legal document automation illustration"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1280px"
                  className="object-cover rounded-3"
                  priority
                />
                <div className="absolute bottom-0 end-0 m-4 p-4 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-border max-w-sm">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="p-2 bg-primary/10 rounded-xl">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="m-0 fw-semibold text-body-emphasis">Document Ready</p>
                      <p className="m-0 text-sm text-body-secondary">NDA generated</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="p-2 bg-success/10 rounded-xl">
                      <Download className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="m-0 fw-semibold text-body-emphasis">PDF Downloaded</p>
                      <p className="m-0 text-sm text-body-secondary">Ready to sign</p>
                    </div>
                  </div>
                  <div className="d-flex align-items-center gap-3">
                    <div className="p-2 bg-info/10 rounded-xl">
                      <Shield className="w-5 h-5 text-info" />
                    </div>
                    <div>
                      <p className="m-0 fw-semibold text-body-emphasis">Kenya Compliant</p>
                      <p className="m-0 text-sm text-body-secondary">Lawyer reviewed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="container mt-5 mt-xl-6">
        <div className="row g-3 g-xl-4 justify-content-center">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="col-6 col-md-3 d-flex align-items-center justify-content-center justify-content-md-start gap-2 trust-icon"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-2 bg-body-bg rounded-xl border border-border d-flex align-items-center justify-content-center">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <span className="fw-medium text-body-emphasis text-sm d-none d-md-block">{item.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}