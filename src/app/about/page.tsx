'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Shield, Users, Globe, Lock, Sparkles, Check } from 'lucide-react';

const team = [
  {
    name: 'James Mwangi',
    role: 'Founder & CEO',
    bio: 'Former corporate lawyer with 10+ years experience in commercial law. Passionate about making legal services accessible.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'Grace Wanjiku',
    role: 'Head of Legal',
    bio: 'Advocate of the High Court of Kenya. Specializes in contract law, employment law, and SME compliance.',
    image: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
  {
    name: 'David Ochieng',
    role: 'CTO',
    bio: 'Full-stack engineer with experience building legal tech platforms. Previously at a Nairobi fintech startup.',
    image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300',
  },
];

const values = [
  {
    icon: Target,
    title: 'Transparency',
    description: 'Clear pricing, no hidden fees, and honest communication about what our templates can and cannot do.',
  },
  {
    icon: Shield,
    title: 'Accuracy',
    description: 'Every template is reviewed by qualified Kenyan advocates and updated when laws change.',
  },
  {
    icon: Globe,
    title: 'Accessibility',
    description: 'Legal documents in plain English/Swahili, designed for first-time business owners without legal training.',
  },
  {
    icon: Lock,
    title: 'Privacy',
    description: 'Your data is encrypted, never sold, and compliant with the Kenya Data Protection Act 2019.',
  },
];

const partners = [
  { name: 'Law Society of Kenya', logo: 'LSK' },
  { name: 'Kenya National Chamber of Commerce', logo: 'KNCCI' },
  { name: 'Nairobi Innovation Hub', logo: 'NIH' },
  { name: 'Safaricom Spark Fund', logo: 'SSF' },
  { name: 'Kenya ICT Authority', logo: 'ICT' },
  { name: 'iHub Nairobi', logo: 'iHub' },
];

const stats = [
  { value: '12+', label: 'Document Types' },
  { value: '5,000+', label: 'Documents Generated' },
  { value: '2,000+', label: 'Happy Customers' },
  { value: '99%', label: 'Customer Satisfaction' },
];

export default function AboutPage() {
  return (
    <div className="min-vh-100">
      {/* Hero */}
      <section className="overflow-hidden py-9 py-xl-10 position-relative">
        <div className="position-absolute inset-0 z-n1">
          <Image
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt=""
            fill
            priority
            className="object-fit-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1280px"
          />
          <div className="overlay position-absolute inset-0 bg-dark" style={{ opacity: 0.8, mixBlendMode: 'multiply' }} />
        </div>
        <div className="container position-relative z-1">
          <div className="row align-items-center min-vh-100">
            <div className="col-12 col-xl-8">
              <div className="text-center text-xl-start">
                <motion.h1
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="m-0 text-white tracking-tight text-4xl sm:text-5xl md:text-6xl fw-bold"
                >
                  Making Legal Protection Accessible to Every Kenyan Business
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="m-0 mt-4 text-white/90 text-lg sm:text-xl leading-8"
                >
                  Ezekiel Docs was founded on a simple belief: every entrepreneur deserves quality legal protection without the complexity and cost of traditional law firms.
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9">
        <div className="container">
          <div className="row gy-5 align-items-center">
            <div className="col-12 col-xl-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="m-0 text-primary-emphasis text-base leading-7 fw-semibold">Our Mission</h2>
                <p className="m-0 mt-2 text-body-emphasis text-3xl tracking-tight fw-bold">
                  Democratizing Legal Services in Kenya
                </p>
                <div className="mt-4 space-y-4">
                  <p className="m-0 text-body-secondary text-lg leading-8">
                    Small businesses, freelancers, and startups form the backbone of Kenya's economy — yet most cannot afford quality legal services. We're changing that.
                  </p>
                  <p className="m-0 text-body-secondary text-lg leading-8">
                    By combining lawyer-reviewed templates with intuitive technology, we enable anyone to create legally compliant documents in minutes, not weeks.
                  </p>
                  <p className="m-0 text-body-secondary text-lg leading-8">
                    Our documents comply with Kenyan law including the Law of Contract Act, Employment Act, Land Act, and Data Protection Act 2019.
                  </p>
                </div>
              </motion.div>
            </div>
            <div className="col-12 col-xl-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="ratio ratio-4x3">
                  <Image
                    src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Ezekiel Docs team working"
                    fill
                    className="object-fit-cover rounded-3"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary">
        <div className="container">
          <div className="row gy-4 gx-4 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="col-6 col-md-3"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="p-3">
                  <div className="text-primary-emphasis fw-bold text-4xl sm:text-5xl">{stat.value}</div>
                  <div className="text-body-secondary text-sm mt-1">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-8 mb-xl-10">
            <h2 className="m-0 text-primary-emphasis text-base leading-7 fw-semibold">Our Values</h2>
            <p className="m-0 mt-2 text-body-emphasis text-3xl tracking-tight fw-bold">
              What We Stand For
            </p>
          </div>

          <div className="row row-cols-1 row-cols-md-2 row-cols-xl-4 gy-5 gx-4">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                className="col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="card h-100 border-0 shadow-sm bg-body-bg p-4 p-md-5 text-center">
                  <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="m-0 text-body-emphasis text-lg fw-semibold leading-6">{value.title}</h3>
                  <p className="m-0 mt-2 text-body-secondary text-sm leading-6">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-body-tertiary">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-8 mb-xl-10">
            <h2 className="m-0 text-primary-emphasis text-base leading-7 fw-semibold">Meet the Team</h2>
            <p className="m-0 mt-2 text-body-emphasis text-3xl tracking-tight fw-bold">
              The People Behind Ezekiel Docs
            </p>
          </div>

          <div className="row row-cols-1 row-cols-md-3 gy-5 gx-4">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                className="col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="card h-100 border-0 shadow-sm bg-body-bg text-center p-4 p-md-5">
                  <div className="ratio ratio-1x1 mx-auto mb-4" style={{ maxWidth: '180px' }}>
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-fit-cover rounded-circle"
                      sizes="180px"
                    />
                  </div>
                  <h3 className="m-0 text-body-emphasis text-lg fw-semibold leading-6">{member.name}</h3>
                  <p className="m-0 mt-1 text-primary fw-medium text-sm">{member.role}</p>
                  <p className="m-0 mt-3 text-body-secondary text-sm leading-6">{member.bio}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="overflow-hidden py-6 py-sm-7 py-xl-8">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center mb-6 mb-xl-8">
            <h2 className="m-0 text-primary-emphasis text-base leading-7 fw-semibold">Trusted By</h2>
            <p className="m-0 mt-2 text-body-emphasis text-3xl tracking-tight fw-bold">
              Our Partners & Affiliations
            </p>
          </div>

          <div className="row row-cols-2 row-cols-md-3 row-cols-xl-6 gy-4 gx-4">
            {partners.map((partner, index) => (
              <div key={partner.name} className="col d-flex align-items-center justify-content-center">
                <div className="w-full aspect-square max-w-xs bg-body-tertiary border rounded-3 d-flex align-items-center justify-content-center text-body-tertiary fw-bold text-lg">
                  {partner.logo}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-primary text-white">
        <div className="container text-center">
          <h2 className="m-0 text-white tracking-tight text-3xl sm:text-4xl fw-bold">
            Join Us in Making Legal Accessible
          </h2>
          <p className="m-0 mt-3 text-white/90 text-lg leading-8 max-w-2xl mx-auto">
            Whether you need a document today or want to partner with us, we'd love to hear from you.
          </p>
          <div className="mt-6 d-flex flex-col sm:flex-row gap-3 justify-content-center">
            <Link
              href="/documents"
              className="btn btn-lg btn-light fw-semibold"
            >
              Create Your First Document
            </Link>
            <a
              href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%27d%20like%20to%20partner%20with%20you"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-outline-light fw-semibold whatsapp-btn"
            >
              <Users className="w-4 h-4 me-2" />
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}