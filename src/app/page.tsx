'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { FileText, Shield, Download, Lock, Check, ChevronRight, Users, Star, MessageCircle, Mail, MapPin, Phone } from 'lucide-react';
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const documentTypes = [
  {
    slug: 'nda',
    name: 'Non-Disclosure Agreement (NDA)',
    description: 'Protect confidential information shared between parties.',
    icon: FileText,
    time: '5 min',
    category: 'Business',
  },
  {
    slug: 'service-agreement',
    name: 'Service Agreement',
    description: 'Define terms for professional services between provider and client.',
    icon: FileText,
    time: '7 min',
    category: 'Business',
  },
  {
    slug: 'employment-contract',
    name: 'Employment Contract',
    description: 'Formalize employer-employee relationship with clear terms.',
    icon: Users,
    time: '10 min',
    category: 'Employment',
  },
  {
    slug: 'freelancer-contract',
    name: 'Freelancer Contract',
    description: 'Establish terms for independent contractor engagements.',
    icon: MessageCircle,
    time: '7 min',
    category: 'Freelance',
  },
  {
    slug: 'sale-agreement',
    name: 'Sale Agreement',
    description: 'Document terms for sale of goods or property.',
    icon: Shield,
    time: '8 min',
    category: 'Property',
  },
  {
    slug: 'tenancy-agreement',
    name: 'Tenancy Agreement',
    description: 'Create rental agreements for residential or commercial property.',
    icon: FileText,
    time: '8 min',
    category: 'Property',
  },
];

const trustItems = [
  { icon: Shield, label: 'Kenyan Law Compliant', description: 'All documents comply with Kenyan legislation' },
  { icon: Users, label: 'Lawyer Reviewed', description: 'Templates reviewed by qualified Kenyan advocates' },
  { icon: Download, label: 'Instant PDF Download', description: 'Get your document immediately after completion' },
  { icon: Lock, label: 'Secure & Private', description: 'Your data is encrypted and never shared' },
];

const steps = [
  { number: '01', title: 'Choose Document', description: 'Select from our library of 12+ legal document types tailored for Kenyan businesses.' },
  { number: '02', title: 'Fill in Details', description: 'Answer simple questions in our guided form. No legal knowledge required.' },
  { number: '03', title: 'Download PDF', description: 'Instantly download your ready-to-sign, legally compliant document.' },
];

const testimonials = [
  {
    name: 'Grace Wanjiku',
    role: 'Founder, TechStart Kenya',
    quote: 'Ezekiel Docs saved me thousands in legal fees. I generated an NDA and service agreement in minutes, and both were accepted by my clients without changes.',
    image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'David Ochieng',
    role: 'Freelance Developer',
    quote: 'As a freelancer, I need contracts fast. The freelancer contract template is comprehensive and professional. My clients are impressed every time.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
  {
    name: 'Mary Achieng',
    role: 'HR Manager, AgriBiz Ltd',
    quote: 'We use Ezekiel Docs for all our employment contracts. It is compliant with the Employment Act, easy to customize, and the team feature helps us manage everything.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=200',
  },
];

const faqs = [
  {
    question: 'Are these documents legally binding in Kenya?',
    answer: 'Yes. All our templates are drafted to comply with Kenyan law, including the Law of Contract Act, Employment Act, Land Act, and other relevant statutes. When properly executed (signed by all parties), they are legally binding.',
  },
  {
    question: 'Do I need a lawyer to use these documents?',
    answer: 'Not necessarily. Our templates are designed for self-service use. However, for complex or high-value transactions, we recommend having a qualified advocate review the final document.',
  },
  {
    question: 'Can I edit the document after downloading?',
    answer: 'Yes. You download a PDF that you can edit with any PDF editor. We also offer an in-browser editor for Pro users to make changes before downloading.',
  },
  {
    question: 'How much does it cost?',
    answer: 'Basic documents like NDAs and one-page agreements are free. Our Professional plan at KSh 999/month gives unlimited access to all documents. Enterprise plans with custom templates are available.',
  },
  {
    question: 'Is my data secure?',
    answer: 'Absolutely. We use bank-grade encryption, never share your data with third parties, and comply with the Kenya Data Protection Act 2019. Your information stays private.',
  },
  {
    question: 'What if I need a document type not listed?',
    answer: 'Contact us via WhatsApp or email. We regularly add new templates based on user demand, and Enterprise customers can request custom templates.',
  },
];

export default function HomePage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animations
    gsap.from('.hero-headline', { y: 30, opacity: 0, duration: 0.8, ease: 'power3.out' });
    gsap.from('.hero-subtext', { y: 30, opacity: 0, duration: 0.8, delay: 0.2, ease: 'power3.out' });
    gsap.from('.hero-cta', { y: 30, opacity: 0, duration: 0.8, delay: 0.4, ease: 'power3.out', stagger: 0.1 });

    // Trust bar icons bounce in
    gsap.from('.trust-icon', {
      scrollTrigger: { trigger: trustRef.current, start: 'top 80%' },
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.7)',
    });

    // Document cards staggered scale-in
    gsap.from('.doc-card', {
      scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
      scale: 0.9,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
    });

    // How it works steps draw-in
    gsap.from('.step-card', {
      scrollTrigger: { trigger: stepsRef.current, start: 'top 80%' },
      x: -50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });

    // Testimonials fade-slide from alternating sides
    gsap.from('.testimonial-card', {
      scrollTrigger: { trigger: testimonialsRef.current, start: 'top 80%' },
      x: (i) => (i % 2 === 0 ? -50 : 50),
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out',
    });

    // FAQ accordion animation handled by Framer Motion

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="overflow-hidden position-relative min-vh-100" ref={heroRef}>
        <div className="position-absolute inset-0 z-n1">
          <Image
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            fill
            priority
            className="object-fit-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1280px"
          />
          <div className="overlay position-absolute inset-0 bg-dark" style={{ opacity: 0.75, mixBlendMode: 'multiply', filter: 'contrast(1.15) brightness(0.85)' }} />
        </div>

        <div className="container position-relative z-1">
          <div className="min-vh-100 row align-items-center">
            <div className="col-12 col-xl-8">
              <div className="pt-9 pt-md-10 pt-xl-11 pb-7 pb-md-8 pb-xl-9 max-w-3xl mx-auto mx-xl-0">
                <div className="text-center text-xl-start">
                  <h1 className="m-0 text-white tracking-tight text-5xl sm:text-6xl md:text-7xl fw-bold hero-headline">
                    Generate Legal Documents in Minutes
                  </h1>
                  <p className="m-0 mt-4 text-white text-lg sm:text-xl leading-8 hero-subtext">
                    Kenyan-law-compliant contracts for SMEs, freelancers, and startups.
                    Lawyer-reviewed templates. Instant PDF download. Secure and private.
                  </p>
                  <div className="mt-6 pt-3 d-flex flex-col sm:flex-row align-items-center justify-content-center justify-content-xl-start gap-3 hero-cta">
                    <Link
                      href="/documents"
                      className="btn btn-lg btn-primary text-white fw-semibold w-full sm:w-auto"
                    >
                      Start a Document
                    </Link>
                    <Link
                      href="/documents"
                      className="btn btn-lg text-white icon-link icon-link-hover bg-white/10 hover:bg-white/20 border border-white/20 fw-semibold w-full sm:w-auto"
                    >
                      See Document Types
                      <ChevronRight className="w-4 h-4 ms-2" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="overflow-hidden py-6 py-xl-7 bg-body-tertiary" ref={trustRef}>
        <div className="container">
          <div className="row gx-4 gy-4">
            {trustItems.map((item, index) => (
              <div key={item.label} className="col-6 col-md-3" style={{ '--index': index } as React.CSSProperties}>
                <div className="d-flex flex-column align-items-center text-center p-3 p-md-4 h-100">
                  <div className="trust-icon w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
                    <item.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h4 className="m-0 text-body-emphasis fw-semibold text-base leading-6">{item.label}</h4>
                  <p className="m-0 mt-1 text-body-secondary text-sm leading-6">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Document Types */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9" ref={cardsRef}>
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-8 mb-xl-10">
            <h2 className="m-0 text-primary-emphasis text-base leading-7 fw-semibold">Popular Documents</h2>
            <p className="m-0 mt-2 text-body-emphasis text-4xl tracking-tight fw-bold">
              Most Used Document Types
            </p>
            <p className="m-0 mt-4 text-body-secondary text-lg leading-8">
              Start with our most popular templates — all compliant with Kenyan law.
            </p>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 gy-5 gx-4 justify-content-center">
            {documentTypes.map((doc, index) => (
              <motion.div
                key={doc.slug}
                className="col doc-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  href={`/generate/${doc.slug}`}
                  className="card h-100 border-0 shadow-sm hover:shadow-md transition-shadow bg-body-bg"
                >
                  <div className="card-body d-flex flex-column h-100 p-4 p-md-5">
                    <div className="w-12 h-12 rounded-3 bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <doc.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <h3 className="m-0 text-body-emphasis text-lg fw-semibold leading-6">
                      {doc.name}
                    </h3>
                    <p className="m-0 mt-2 text-body-secondary text-sm leading-6 line-clamp-2 flex-1">
                      {doc.description}
                    </p>
                    <div className="mt-4 flex items-center justify-between text-xs text-body-secondary">
                      <span className="d-flex align-items-center gap-1">
                        <span className="badge bg-primary/10 text-primary px-2 py-1 rounded-pill">
                          {doc.category}
                        </span>
                      </span>
                      <span>{doc.time}</span>
                    </div>
                    <div className="mt-4">
                      <button
                        className="btn btn-primary w-full fw-semibold"
                        onClick={(e) => {
                          e.preventDefault();
                          window.location.href = `/generate/${doc.slug}`;
                        }}
                      >
                        Generate
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8 mt-xl-10">
            <Link href="/documents" className="btn btn-lg btn-outline-primary fw-semibold icon-link icon-link-hover">
              View All Documents
              <ChevronRight className="w-4 h-4 ms-2" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-secondary" ref={stepsRef}>
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-8 mb-xl-10">
            <h2 className="m-0 text-primary-emphasis text-base leading-7 fw-semibold">How It Works</h2>
            <p className="m-0 mt-2 text-body-emphasis text-4xl tracking-tight fw-bold">
              Three Simple Steps
            </p>
            <p className="m-0 mt-4 text-body-secondary text-lg leading-8">
              From selection to signed document in minutes.
            </p>
          </div>

          <div className="row row-cols-1 row-cols-md-3 gy-5 gx-4">
            {steps.map((step, index) => (
              <div key={step.number} className="col step-card">
                <div className="card h-100 border-0 shadow-sm bg-body-bg p-4 p-md-5 text-center">
                  <div className="mb-4">
                    <span className="text-primary-emphasis fw-bold text-3xl md:text-4xl font-mono">
                      {step.number}
                    </span>
                  </div>
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    {index === 0 && <FileText className="w-7 h-7" />}
                    {index === 1 && <Shield className="w-7 h-7" />}
                    {index === 2 && <Download className="w-7 h-7" />}
                  </div>
                  <h3 className="m-0 text-body-emphasis text-lg fw-semibold leading-6">
                    {step.title}
                  </h3>
                  <p className="m-0 mt-2 text-body-secondary text-sm leading-6">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9" ref={testimonialsRef}>
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-8 mb-xl-10">
            <h2 className="m-0 text-primary-emphasis text-base leading-7 fw-semibold">Testimonials</h2>
            <p className="m-0 mt-2 text-body-emphasis text-4xl tracking-tight fw-bold">
              Trusted by Kenyan Businesses
            </p>
          </div>

          <div className="row row-cols-1 row-cols-md-3 gy-5 gx-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="col testimonial-card"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="card h-100 border-0 shadow-sm bg-body-bg p-4 p-md-5">
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-body-emphasis text-base leading-7 mb-4">
                    &ldquo;{testimonial.quote}&rdquo;
                  </blockquote>
                  <div className="d-flex align-items-center gap-3 pt-3 border-t border-border">
                    <img
                      src={testimonial.image}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                      loading="lazy"
                    />
                    <div>
                      <p className="m-0 text-body-emphasis fw-semibold text-sm">{testimonial.name}</p>
                      <p className="m-0 text-body-secondary text-xs">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary" ref={faqRef}>
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-8 mb-xl-10">
            <h2 className="m-0 text-primary-emphasis text-base leading-7 fw-semibold">FAQ</h2>
            <p className="m-0 mt-2 text-body-emphasis text-4xl tracking-tight fw-bold">
              Frequently Asked Questions
            </p>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="accordion accordion-flush" id="faqAccordion">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  className="accordion-item"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <h3 className="accordion-header">
                    <button
                      className={`accordion-button ${index !== 0 ? 'collapsed' : ''}`}
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target={`#faq${index}`}
                      aria-expanded={index === 0}
                      aria-controls={`faq${index}`}
                    >
                      {faq.question}
                    </button>
                  </h3>
                  <div
                    id={`faq${index}`}
                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                    data-bs-parent="#faqAccordion"
                  >
                    <div className="accordion-body text-body-secondary text-sm leading-6">
                      {faq.answer}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-primary text-white">
        <div className="container">
          <div className="row align-items-center justify-content-between gy-4">
            <div className="col-12 col-xl-8 text-center text-xl-start">
              <h2 className="m-0 text-white tracking-tight text-3xl sm:text-4xl fw-bold">
                Ready to Create Your First Document?
              </h2>
              <p className="m-0 mt-3 text-white/90 text-lg leading-8">
                Join thousands of Kenyan businesses using Ezekiel Docs for their legal needs.
              </p>
            </div>
            <div className="col-12 col-xl-4 text-center text-xl-end">
              <Link
                href="/documents"
                className="btn btn-lg btn-light fw-semibold w-full sm:w-auto icon-link icon-link-hover"
              >
                Get Started Free
                <ChevronRight className="w-4 h-4 ms-2" aria-hidden="true" />
              </Link>
              <p className="m-0 mt-3 text-white/70 text-sm">
                No credit card required · Cancel anytime
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}