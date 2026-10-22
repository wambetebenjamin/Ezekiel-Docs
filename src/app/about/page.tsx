'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Target, Users, Shield, Lock, ChevronRight, Building2, Award, TrendingUp } from 'lucide-react';
import { TEAM_MEMBERS, PARTNERS } from '@/lib/constants';

const stats = [
  { value: '5,000+', label: 'Documents Generated' },
  { value: '2,500+', label: 'Happy Customers' },
  { value: '12+', label: 'Document Types' },
  { value: '99%', label: 'Customer Satisfaction' },
];

const values = [
  { icon: Target, title: 'Transparency', description: 'Clear pricing, no hidden fees. What you see is what you pay.' },
  { icon: Users, title: 'Accessibility', description: 'Legal protection for everyone, not just those who can afford lawyers.' },
  { icon: Shield, title: 'Accuracy', description: 'Every template reviewed by Kenyan advocates for legal compliance.' },
  { icon: Lock, title: 'Privacy', description: 'Your data is encrypted and never shared. Kenya DPA 2019 compliant.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-body-bg">
      {/* Hero */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary">
        <div className="container">
          <div className="row gy-5 align-items-center justify-content-between">
            <div className="col-12 col-xl-6">
              <div className="mx-auto max-w-2xl">
                <motion.h2 className="m-0 text-primary-emphasis text-base leading-7 fw-semibold">
                  About Us
                </motion.h2>
                <motion.p className="m-0 mt-2 text-body-emphasis text-4xl tracking-tight fw-bold">
                  Making legal protection accessible to every Kenyan business
                </motion.p>
                <motion.p className="m-0 mt-4 text-body-secondary text-lg leading-8">
                  We founded Ezekiel Docs after seeing too many Kenyan SMEs and freelancers operate without proper legal protection.
                  Legal fees are expensive, templates online are unreliable, and the process is slow. We changed that.
                </motion.p>
                <motion.div className="mt-4">
                  <Link href="/documents" className="icon-link icon-link-hover text-decoration-none text-sm leading-6 fw-bold">
                    Explore Documents
                    <ChevronRight className="w-4 h-4 ms-2" aria-hidden="true" />
                  </Link>
                </motion.div>
              </div>
            </div>

            <div className="col-12 col-xl-5">
              <div className="mx-auto max-w-2xl">
                <div className="ratio ratio-4x3" data-aos-delay="0" data-aos="fade" data-aos-duration="3000">
                  <Image
                    src="/images/about-hero.jpg"
                    alt="Ezekiel Docs team working"
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                    className="object-fit-cover rounded-3"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-secondary">
        <div className="container">
          <div className="row row-cols-2 row-cols-md-4 gy-4 justify-content-center text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-4">
                  <div className="text-primary fw-bold text-4xl sm:text-5xl mb-1">{stat.value}</div>
                  <div className="text-body-secondary text-sm">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Values */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-5 mb-md-6">
            <motion.h2 className="m-0 text-primary-emphasis text-base leading-7 fw-semibold">
              Our Values
            </motion.h2>
            <motion.p className="m-0 mt-2 text-body-emphasis text-4xl tracking-tight fw-bold">
              What Drives Us
            </motion.p>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 gy-5 gx-xl-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="card h-100 border-border overflow-hidden p-4 p-xl-5 text-center">
                  <div className="p-2 bg-primary/10 rounded-xl d-inline-flex mb-4">
                    <value.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="card-title text-body-emphasis text-lg leading-6 fw-semibold mb-2">
                    {value.title}
                  </h3>
                  <p className="card-text text-body-secondary text-sm leading-6">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-5 mb-md-6">
            <motion.h2 className="m-0 text-primary-emphasis text-base leading-7 fw-semibold">
              Meet the Team
            </motion.h2>
            <motion.p className="m-0 mt-2 text-body-emphasis text-4xl tracking-tight fw-bold">
              Passionate About Legal Access
            </motion.p>
          </div>

          <div className="row row-cols-1 row-cols-md-3 gy-5 gx-xl-4 justify-content-center">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.div
                key={member.name}
                className="col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="card h-100 border-border overflow-hidden text-center p-4 p-xl-5">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="rounded-circle mx-auto mb-4 border-4 border-body-tertiary"
                    sizes="120px"
                  />
                  <h3 className="card-title text-body-emphasis text-lg leading-6 fw-semibold mb-1">
                    {member.name}
                  </h3>
                  <p className="m-0 text-primary text-sm fw-medium mb-3">{member.role}</p>
                  <p className="card-text text-body-secondary text-sm leading-6">
                    {member.bio}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="overflow-hidden py-6 py-sm-7 py-xl-8 bg-body-secondary">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center mb-5">
            <h2 className="m-0 text-primary-emphasis text-base leading-7 fw-semibold">
              Trusted Partners
            </h2>
            <div className="m-0 mt-2 text-body-emphasis text-4xl tracking-tight fw-bold">
              We collaborate with Kenya's leading institutions
            </div>
          </div>

          <div className="glide glidePartnerLinear">
            <div className="glide__track" data-glide-el="track">
              <ul className="glide__slides align-items-center">
                {PARTNERS.map((partner, index) => (
                  <li key={partner.name} className="glide__slide">
                    <div className="p-5 d-flex align-items-center justify-content-center min-h-[100px]">
                      <div className="text-center">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          width={120}
                          height={60}
                          className="mx-auto opacity-70 transition-opacity hover:opacity-100 grayscale"
                          sizes="120px"
                        />
                        <p className="m-0 mt-3 text-body-secondary text-sm fw-medium">{partner.name}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9">
        <div className="container">
          <div className="card bg-primary border-0 rounded-3 overflow-hidden p-5 p-xl-7 mx-auto max-w-3xl text-center">
            <h2 className="text-white text-3xl fw-bold mb-3">Ready to Protect Your Business?</h2>
            <p className="text-white/90 text-lg mb-5">
              Generate your first legal document in minutes. No credit card required.
            </p>
            <div className="d-flex flex-col sm:flex-row gap-3 justify-content-center">
              <a href="/documents" className="btn btn-lg btn-light text-primary fw-semibold px-6 py-3">
                Get Started Free
              </a>
              <a
                href="https://wa.me/254112272061"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-lg btn-outline-light text-white fw-semibold px-6 py-3"
              >
                Talk to Us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}