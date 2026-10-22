'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FileText, Users, Shield, Briefcase, Home, Search, Filter, ChevronDown, Check, ChevronRight, MessageCircle } from 'lucide-react';

const ALL_DOCUMENTS = [
  { slug: 'nda', name: 'Non-Disclosure Agreement (NDA)', description: 'Protect confidential information shared between parties.', icon: FileText, time: '5 min', category: 'Business', tags: ['confidentiality', 'trade secrets', 'business'] },
  { slug: 'service-agreement', name: 'Service Agreement', description: 'Define terms for professional services between provider and client.', icon: FileText, time: '7 min', category: 'Business', tags: ['services', 'consulting', 'deliverables'] },
  { slug: 'employment-contract', name: 'Employment Contract', description: 'Formalize employer-employee relationship with clear terms.', icon: Users, time: '10 min', category: 'Employment', tags: ['hiring', 'salary', 'benefits', 'termination'] },
  { slug: 'freelancer-contract', name: 'Freelancer Contract', description: 'Establish terms for independent contractor engagements.', icon: Briefcase, time: '7 min', category: 'Freelance', tags: ['independent contractor', 'scope', 'payment'] },
  { slug: 'sale-agreement', name: 'Sale Agreement', description: 'Document terms for sale of goods or property.', icon: Shield, time: '8 min', category: 'Property', tags: ['goods', 'property', 'transfer'] },
  { slug: 'tenancy-agreement', name: 'Tenancy Agreement', description: 'Create rental agreements for residential or commercial property.', icon: Home, time: '8 min', category: 'Property', tags: ['rental', 'lease', 'landlord', 'tenant'] },
  { slug: 'partnership-agreement', name: 'Partnership Agreement', description: 'Define terms for business partnerships.', icon: Users, time: '12 min', category: 'Business', tags: ['partners', 'profit sharing', 'dissolution'] },
  { slug: 'loan-agreement', name: 'Loan Agreement', description: 'Document lending terms between parties.', icon: Shield, time: '8 min', category: 'Business', tags: ['lending', 'interest', 'repayment'] },
  { slug: 'consulting-agreement', name: 'Consulting Agreement', description: 'Terms for professional consulting engagements.', icon: Briefcase, time: '7 min', category: 'Freelance', tags: ['consulting', 'advisory', 'deliverables'] },
  { slug: 'distribution-agreement', name: 'Distribution Agreement', description: 'Terms for product distribution relationships.', icon: FileText, time: '10 min', category: 'Business', tags: ['distribution', 'territory', 'exclusivity'] },
  { slug: 'shareholders-agreement', name: 'Shareholders Agreement', description: 'Govern relationships between company shareholders.', icon: Users, time: '15 min', category: 'Business', tags: ['shares', 'voting', 'exit'] },
  { slug: 'license-agreement', name: 'License Agreement', description: 'Grant rights to use intellectual property.', icon: Shield, time: '10 min', category: 'Business', tags: ['IP', 'licensing', 'royalties'] },
];

const categories = ['All', 'Business', 'Employment', 'Property', 'Freelance'];

export default function DocumentsPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [showFilter, setShowFilter] = useState(false);

  const filteredDocs = ALL_DOCUMENTS.filter(doc => {
    const matchesCategory = filter === 'All' || doc.category === filter;
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.description.toLowerCase().includes(search.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-vh-100">
      {/* Page Header */}
      <section className="overflow-hidden py-9 py-xl-10 position-relative">
        <div className="position-absolute inset-0 z-n1">
          <div className="overlay position-absolute inset-0 bg-primary" style={{ opacity: 0.95 }} />
        </div>
        <div className="container position-relative z-1">
          <div className="row align-items-center">
            <div className="col-12 col-xl-8">
              <div className="text-center text-xl-start">
                <h1 className="m-0 text-white tracking-tight text-4xl sm:text-5xl md:text-6xl fw-bold">
                  Document Library
                </h1>
                <p className="m-0 mt-4 text-white/90 text-lg sm:text-xl leading-8">
                  Browse our complete collection of {ALL_DOCUMENTS.length} legal document types.
                  All compliant with Kenyan law and reviewed by qualified advocates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Search */}
      <section className="overflow-hidden py-6 bg-body-tertiary">
        <div className="container">
          <div className="row gy-4 gx-4 align-items-center">
            <div className="col-12 col-xl-8">
              <div className="position-relative">
                <Search className="position-absolute start-3 top-50 translate-middle-y text-body-secondary w-5 h-5" aria-hidden="true" />
                <input
                  type="search"
                  placeholder="Search documents by name, description, or tags..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="form-control form-control-sm ps-10 w-full"
                  aria-label="Search documents"
                />
              </div>
            </div>
            <div className="col-12 col-xl-4">
              <div className="d-flex flex-wrap gap-2 justify-content-xl-end">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => { setFilter(cat); setShowFilter(false); }}
                    className={`btn btn-sm fw-semibold rounded-pill px-4 transition-all ${
                      filter === cat ? 'btn-primary' : 'btn-outline-secondary'
                    }`}
                    aria-pressed={filter === cat}
                  >
                    {cat}
                  </button>
                ))}
                <button
                  onClick={() => setShowFilter(!showFilter)}
                  className="btn btn-outline-secondary btn-sm fw-semibold rounded-pill px-4 d-xl-none"
                  aria-expanded={showFilter}
                  aria-controls="filter-panel"
                >
                  <Filter className="w-4 h-4 me-1" /> Filter
                </button>
              </div>
            </div>
          </div>

          {showFilter && (
            <div id="filter-panel" className="mt-4 p-4 bg-body-bg rounded-3 border animate-slide-down">
              <div className="row gy-3">
                <div className="col-12">
                  <label className="form-label text-sm fw-medium mb-2">Categories</label>
                  <div className="d-flex flex-wrap gap-2">
                    {categories.map(cat => (
                      <button
                        key={cat}
                        onClick={() => { setFilter(cat); setShowFilter(false); }}
                        className={`btn btn-sm fw-semibold rounded-pill px-4 ${
                          filter === cat ? 'btn-primary' : 'btn-outline-secondary'
                        }`}
                        aria-pressed={filter === cat}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Document Grid */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9">
        <div className="container">
          <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3 mb-6">
            <div>
              <p className="m-0 text-body-secondary text-sm">
                Showing <strong>{filteredDocs.length}</strong> of <strong>{ALL_DOCUMENTS.length}</strong> documents
              </p>
            </div>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 gy-5 gx-4" id="documents-grid">
            {filteredDocs.map((doc, index) => (
              <motion.div
                key={doc.slug}
                className="col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link
                  href={`/generate/${doc.slug}`}
                  className="card h-100 border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-body-bg doc-card-hover"
                >
                  <div className="card-body d-flex flex-column h-100 p-4 p-md-5">
                    <div className="w-12 h-12 rounded-3 bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <doc.icon className="w-6 h-6" aria-hidden="true" />
                    </div>
                    <div className="mb-2">
                      <span className="badge bg-primary/10 text-primary px-2 py-1 rounded-pill text-xs">
                        {doc.category}
                      </span>
                    </div>
                    <h3 className="m-0 text-body-emphasis text-lg fw-semibold leading-6">
                      {doc.name}
                    </h3>
                    <p className="m-0 mt-2 text-body-secondary text-sm leading-6 line-clamp-3 flex-1">
                      {doc.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {doc.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="badge bg-body-tertiary text-body-secondary px-2 py-1 rounded-pill text-xs">
                          {tag}
                        </span>
                      ))}
                      {doc.tags.length > 3 && (
                        <span className="badge bg-body-tertiary text-body-secondary px-2 py-1 rounded-pill text-xs">
                          +{doc.tags.length - 3} more
                        </span>
                      )}
                    </div>
                    <div className="mt-4 pt-3 border-t border-border flex items-center justify-between">
                      <span className="d-flex align-items-center gap-1 text-sm text-body-secondary">
                        <Check className="w-3 h-3 text-success" aria-hidden="true" />
                        ~{doc.time}
                      </span>
                      <button className="btn btn-primary btn-sm fw-semibold">
                        Generate
                      </button>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}

            {filteredDocs.length === 0 && (
              <div className="col-12 text-center py-12">
                <FileText className="w-16 h-16 mx-auto text-body-tertiary mb-4" />
                <h3 className="text-body-emphasis fw-semibold">No documents found</h3>
                <p className="text-body-secondary text-sm mt-2">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>

          {/* Pagination */}
          <nav className="mt-8 mt-xl-10" aria-label="Pagination">
            <ul className="pagination justify-content-center gap-2">
              <li className="page-item disabled">
                <span className="page-link">Previous</span>
              </li>
              <li className="page-item active"><span className="page-link">1</span></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item">
                <a className="page-link" href="#" aria-label="Next">
                  <ChevronRight className="w-4 h-4" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </section>

      {/* CTA */}
      <section className="overflow-hidden py-7 py-sm-8 py-xl-9 bg-primary text-white">
        <div className="container text-center">
          <h2 className="m-0 text-white tracking-tight text-3xl sm:text-4xl fw-bold">
            Can't Find What You Need?
          </h2>
          <p className="m-0 mt-3 text-white/90 text-lg leading-8 max-w-2xl mx-auto">
            We're always adding new templates. Request a document type or contact us for custom templates.
          </p>
          <div className="mt-6 d-flex flex-col sm:flex-row gap-3 justify-content-center">
            <a
              href="https://wa.me/254112272061?text=Hi%20Ezekiel%20Docs%2C%20I%20need%20a%20custom%20document%20template"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-lg btn-light fw-semibold"
            >
              <MessageCircle className="w-4 h-4 me-2" /> Request Template
            </a>
            <Link href="/contact" className="btn btn-lg btn-outline-light fw-semibold">
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-down { animation: slide-down 0.2s ease-out; }
        .doc-card-hover:hover { transform: translateY(-4px); }
      `}</style>
    </div>
  );
}