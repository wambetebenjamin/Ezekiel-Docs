'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Mail, MapPin, Phone, MessageCircle, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import Image from 'next/image';

const faqs = [
  {
    q: 'How long does it take to generate a document?',
    a: 'Most documents are generated in under 2 minutes. Complex documents with multiple parties may take 3-5 minutes.'
  },
  {
    q: 'Are your documents legally binding in Kenya?',
    a: 'Our templates are based on Kenyan law and standard legal forms. However, we recommend having any document reviewed by a licensed advocate before signing to ensure it meets your specific needs.'
  },
  {
    q: 'Can I edit a document after generating it?',
    a: 'Yes, you receive a PDF that you can edit. Professional and Enterprise users can also edit the questionnaire and regenerate.'
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept M-Pesa, credit/debit cards (Visa, Mastercard), and bank transfers for Enterprise plans.'
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We use AES-256 encryption at rest, TLS 1.3 in transit, and comply with Kenya Data Protection Act 2019. We never sell your data.'
  },
  {
    q: 'Do you offer refunds?',
    a: 'We do not offer refunds for partial months on subscriptions. You can cancel anytime and continue using the service until the end of your billing period.'
  },
];

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'form' | 'faq'>('form');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Failed to send message. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Network error. Please check your connection and try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen bg-body-bg">
      {/* Hero */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <motion.h1 className="m-0 text-body-emphasis text-4xl sm:text-5xl tracking-tight fw-bold">
              Contact Us
            </motion.h1>
            <motion.p className="m-0 mt-4 text-body-secondary text-lg leading-8">
              Have questions? We'd love to hear from you. Reach out and we'll respond within 24 hours.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-7 py-sm-8 py-xl-9">
        <div className="container">
          <div className="row gy-5 gy-xl-6 align-items-start">
            {/* Contact Info */}
            <div className="col-12 col-xl-4">
              <div className="sticky-top" style={{ top: '100px' }}>
                <div className="card border-border overflow-hidden h-100">
                  <div className="card-body p-4 p-xl-5">
                    <h2 className="text-body-emphasis text-2xl fw-bold mb-4">Get in Touch</h2>

                    <div className="mb-5">
                      <div className="d-flex align-items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 d-flex align-items-center justify-content-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="fw-semibold text-body-emphasis text-sm mb-1">Visit Us</h3>
                          <p className="text-body-secondary text-sm mb-0">Westlands, Nairobi, Kenya</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 d-flex align-items-center justify-content-center flex-shrink-0">
                          <Phone className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="fw-semibold text-body-emphasis text-sm mb-1">Call Us</h3>
                          <a href="tel:+254112272061" className="text-body-secondary text-sm hover:text-primary transition-colors">+254 112 272 061</a>
                          <p className="text-body-tertiary text-xs mt-1">Mon-Fri: 8am-6pm EAT</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-start gap-3 mb-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 d-flex align-items-center justify-content-center flex-shrink-0">
                          <Mail className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="fw-semibold text-body-emphasis text-sm mb-1">Email Us</h3>
                          <a href="mailto:support@ezekieldocs.com" className="text-body-secondary text-sm hover:text-primary transition-colors">support@ezekieldocs.com</a>
                          <p className="text-body-tertiary text-xs mt-1">Replies within 24 hours</p>
                        </div>
                      </div>
                      <div className="d-flex align-items-start gap-3">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 d-flex align-items-center justify-content-center flex-shrink-0">
                          <MessageCircle className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="fw-semibold text-body-emphasis text-sm mb-1">WhatsApp</h3>
                          <a
                            href="https://wa.me/254112272061"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-body-secondary text-sm hover:text-primary transition-colors"
                          >
                            Chat with us
                          </a>
                          <p className="text-body-tertiary text-xs mt-1">Fastest response</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-body-tertiary rounded-xl">
                      <h3 className="fw-semibold text-body-emphasis text-sm mb-3">Business Hours</h3>
                      <div className="d-flex justify-content-between text-sm mb-2">
                        <span className="text-body-secondary">Monday - Friday</span>
                        <span className="text-body-emphasis fw-medium">8:00 AM - 6:00 PM</span>
                      </div>
                      <div className="d-flex justify-content-between text-sm mb-2">
                        <span className="text-body-secondary">Saturday</span>
                        <span className="text-body-emphasis fw-medium">9:00 AM - 2:00 PM</span>
                      </div>
                      <div className="d-flex justify-content-between text-sm">
                        <span className="text-body-secondary">Sunday</span>
                        <span className="text-body-emphasis fw-medium">Closed</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form & FAQ */}
            <div className="col-12 col-xl-8">
              <div className="card border-border overflow-hidden">
                <div className="card-header bg-body-bg border-border px-4 py-3">
                  <div className="nav nav-tabs border-0" role="tablist">
                    <button
                      role="tab"
                      className={`nav-link fw-medium text-sm py-3 px-0 px-md-4 ${activeTab === 'form' ? 'text-primary border-b border-3 border-primary' : 'text-body-secondary hover:text-body-emphasis'}`}
                      onClick={() => setActiveTab('form')}
                    >
                      Send Message
                    </button>
                    <button
                      role="tab"
                      className={`nav-link fw-medium text-sm py-3 px-0 px-md-4 ${activeTab === 'faq' ? 'text-primary border-b border-3 border-primary' : 'text-body-secondary hover:text-body-emphasis'}`}
                      onClick={() => setActiveTab('faq')}
                    >
                      FAQ
                    </button>
                  </div>
                </div>
                <div className="card-body p-4 p-xl-5">
                  {activeTab === 'form' && (
                    <form onSubmit={handleSubmit} noValidate>
                      {status === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="alert alert-success d-flex align-items-center gap-3 mb-4"
                          role="alert"
                        >
                          <CheckCircle className="w-5 h-5 flex-shrink-0" />
                          <div>
                            <strong>Message sent!</strong>
                            <p className="m-0 mt-1 text-sm">We'll get back to you within 24 hours.</p>
                          </div>
                        </motion.div>
                      )}

                      {status === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="alert alert-danger d-flex align-items-center gap-3 mb-4"
                          role="alert"
                        >
                          <AlertCircle className="w-5 h-5 flex-shrink-0" />
                          <div>
                            <strong>Failed to send</strong>
                            <p className="m-0 mt-1 text-sm">{errorMessage}</p>
                          </div>
                        </motion.div>
                      )}

                      <div className="row gy-4">
                        <div className="col-12 col-md-6">
                          <label htmlFor="name" className="form-label fw-medium text-sm">Full Name *</label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="form-control"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            disabled={status === 'submitting'}
                          />
                        </div>
                        <div className="col-12 col-md-6">
                          <label htmlFor="email" className="form-label fw-medium text-sm">Email Address *</label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="form-control"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            disabled={status === 'submitting'}
                          />
                        </div>
                        <div className="col-12 col-md-6">
                          <label htmlFor="phone" className="form-label fw-medium text-sm">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            className="form-control"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+254 7XX XXX XXX"
                            disabled={status === 'submitting'}
                          />
                        </div>
                        <div className="col-12 col-md-6">
                          <label htmlFor="subject" className="form-label fw-medium text-sm">Subject *</label>
                          <select
                            id="subject"
                            name="subject"
                            className="form-select"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            disabled={status === 'submitting'}
                          >
                            <option value="">Select a subject</option>
                            <option value="general">General Inquiry</option>
                            <option value="billing">Billing & Subscriptions</option>
                            <option value="technical">Technical Support</option>
                            <option value="legal">Legal Question</option>
                            <option value="partnership">Partnership</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div className="col-12">
                          <label htmlFor="message" className="form-label fw-medium text-sm">Message *</label>
                          <textarea
                            id="message"
                            name="message"
                            className="form-control"
                            rows={5}
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Tell us how we can help..."
                            disabled={status === 'submitting'}
                          />
                        </div>
                      </div>

                      <div className="mt-5">
                        <button
                          type="submit"
                          className="btn btn-primary text-white fw-semibold px-6 py-3 w-100 w-md-auto"
                          disabled={status === 'submitting'}
                        >
                          {status === 'submitting' ? (
                            <>
                              <Loader2 className="w-4 h-4 me-2 animate-spin" />
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 me-2" />
                              Send Message
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  )}

                  {activeTab === 'faq' && (
                    <div className="accordion" id="faqAccordion">
                      {faqs.map((faq, index) => (
                        <motion.div
                          key={faq.q}
                          className="accordion-item border-border"
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <h3 className="accordion-header">
                            <button
                              className={`accordion-button collapsed fw-medium text-sm ${index === 0 ? '' : 'collapsed'}`}
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target={`#faq-${index}`}
                              aria-expanded={index === 0}
                              aria-controls={`faq-${index}`}
                            >
                              {faq.q}
                            </button>
                          </h3>
                          <div
                            id={`faq-${index}`}
                            className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                            data-bs-parent="#faqAccordion"
                          >
                            <div className="accordion-body text-body-secondary text-sm leading-7">
                              {faq.a}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-7 py-sm-8 py-xl-9 bg-body-tertiary">
        <div className="container">
          <div className="card bg-primary border-0 rounded-3 overflow-hidden p-5 p-xl-7 mx-auto max-w-3xl text-center">
            <h2 className="text-white text-3xl fw-bold mb-3">Prefer to chat directly?</h2>
            <p className="text-white/90 text-lg mb-5">
              Our team is ready to help you find the right document or answer any questions.
            </p>
            <a
              href="https://wa.me/254112272061"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-light text-primary fw-semibold px-6 py-3 d-inline-flex align-items-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}