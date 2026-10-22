'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { FAQ_ITEMS } from '@/lib/constants';

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary" aria-labelledby="faq-heading">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-5 mb-md-6">
          <motion.h2
            id="faq-heading"
            className="m-0 text-primary-emphasis text-base leading-7 fw-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            className="m-0 mt-2 text-body-emphasis text-4xl tracking-tight fw-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Everything You Need to Know
          </motion.p>
        </div>

        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="accordion" id="faqAccordion">
              {FAQ_ITEMS.map((item, index) => (
                <motion.div
                  key={item.question}
                  className="accordion-item border-border"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <h3 className="accordion-header" id={`faqHeading${index}`}>
                    <button
                      className={`accordion-button ${openIndex !== index ? 'collapsed' : ''} fw-medium text-body-emphasis`}
                      type="button"
                      onClick={() => toggle(index)}
                      aria-expanded={openIndex === index}
                      aria-controls={`faqCollapse${index}`}
                    >
                      {item.question}
                    </button>
                  </h3>
                  <div
                    id={`faqCollapse${index}`}
                    className={`accordion-collapse ${openIndex === index ? 'show' : ''}`}
                    aria-labelledby={`faqHeading${index}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body">
                      <AnimatePresence mode="wait">
                        {openIndex === index && (
                          <motion.div
                            className="faq-content"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                            <p className="m-0 text-body-secondary text-sm leading-7">{item.answer}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center pt-5 pt-md-6">
          <motion.p
            className="m-0 text-body-secondary text-base"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Still have questions?{' '}
            <a href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20have%20a%20question" target="_blank" rel="noopener noreferrer" className="text-primary fw-semibold">
              Chat with us on WhatsApp
            </a>
          </motion.p>
        </div>
      </div>
    </section>
  );
}