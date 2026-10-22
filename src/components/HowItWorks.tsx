'use client';

import { motion } from 'framer-motion';
import { FileText, Edit, Download, CheckCircle } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Choose Document',
    description: 'Select from 12+ legally compliant document types: NDAs, service agreements, employment contracts, and more.',
    icon: FileText,
  },
  {
    number: '02',
    title: 'Fill in Details',
    description: 'Complete our guided form with party details, terms, and conditions. Smart fields adapt to each document type.',
    icon: Edit,
  },
  {
    number: '03',
    title: 'Download & Sign',
    description: 'Get your professionally formatted PDF instantly. Review, sign, and share; all legally binding under Kenyan law.',
    icon: Download,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary" aria-labelledby="how-heading">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-5 mb-md-6">
          <motion.h2
            id="how-heading"
            className="m-0 text-primary-emphasis text-base leading-7 fw-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="m-0 mt-2 text-body-emphasis text-4xl tracking-tight fw-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Three Simple Steps
          </motion.p>
          <motion.p
            className="m-0 mt-4 text-body-secondary text-lg leading-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            From selection to signed document in minutes, not days
          </motion.p>
        </div>

        <div className="row row-cols-1 row-cols-md-3 gy-5 gx-xl-4">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              className="col how-step"
              style={{ '--index': index } as React.CSSProperties}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
            >
              <div className="card h-100 border-border overflow-hidden p-4 p-xl-5">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <span className="text-primary fw-bold text-2xl font-mono">{step.number}</span>
                  <div className="p-2 bg-primary/10 rounded-xl">
                    <step.icon className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <h3 className="card-title text-body-emphasis text-lg leading-6 fw-semibold mb-3">
                  {step.title}
                </h3>
                <p className="card-text text-body-secondary text-sm leading-6 mb-4">
                  {step.description}
                </p>
                <div className="d-flex align-items-center gap-2 text-primary fw-semibold text-sm">
                  <CheckCircle className="w-4 h-4" />
                  <span>Done in minutes</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center pt-5 pt-md-6">
          <motion.a
            href="/documents"
            className="btn btn-lg btn-primary text-white icon-link icon-link-hover text-sm leading-6 fw-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Start Your First Document
            <CheckCircle className="w-4 h-4 ms-2" aria-hidden="true" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}