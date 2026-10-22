'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '@/lib/constants';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setCurrentIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="overflow-hidden py-7 py-sm-8 py-xl-9" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="mx-auto max-w-2xl text-center mb-5 mb-md-6">
          <motion.h2
            id="testimonials-heading"
            className="m-0 text-primary-emphasis text-base leading-7 fw-semibold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Trusted by Kenyan SMEs
          </motion.h2>
          <motion.p
            className="m-0 mt-2 text-body-emphasis text-4xl tracking-tight fw-bold"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            What Our Customers Say
          </motion.p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {TESTIMONIALS.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  className="w-full flex-shrink-0 px-4 testimonial-card"
                  style={{ animationDelay: `${index * 100}ms` }}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="card h-100 border-border overflow-hidden p-4 p-xl-6">
                    <div className="d-flex justify-content-center mb-4">
                      <div className="d-flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-warning fill-current" />
                        ))}
                      </div>
                    </div>
                    <figure className="m-0 text-center">
                      <motion.blockquote
                        className="fw-semibold text-body-emphasis text-2xl leading-9"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Quote className="w-8 h-8 text-primary/30 mx-auto mb-3" />
                        <p className="m-0">"{testimonial.content}"</p>
                      </motion.blockquote>
                      <motion.figcaption
                        className="m-0 mt-5"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="d-flex align-items-center justify-content-center gap-3">
                          <Image
                            src={testimonial.image}
                            alt={testimonial.name}
                            width={56}
                            height={56}
                            className="rounded-circle"
                            sizes="56px"
                          />
                          <div className="text-start">
                            <div className="fw-semibold text-body-emphasis">{testimonial.name}</div>
                            <div className="text-body-secondary text-sm">{testimonial.role}</div>
                          </div>
                        </div>
                      </motion.figcaption>
                    </figure>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="d-flex justify-content-center gap-3 mt-5">
            <button
              className="btn btn-ghost btn-sm rounded-circle p-2"
              onClick={prev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="d-flex align-items-center gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  key={index}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentIndex ? 'bg-primary w-8' : 'bg-body-tertiary'}`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : 'false'}
                />
              ))}
            </div>
            <button
              className="btn btn-ghost btn-sm rounded-circle p-2"
              onClick={next}
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}