'use client'

import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DocumentCard } from '@/components/features/DocumentCard'
import {
  DOCUMENTS,
  DOCUMENT_CATEGORIES,
  type DocumentCategory,
} from '@/lib/documents'

const PAGE_SIZE = 6

type Filter = 'All' | DocumentCategory

export default function DocumentsPage() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')
  const [page, setPage] = useState(1)

  const filteredDocuments = useMemo(() => {
    if (activeFilter === 'All') return DOCUMENTS
    return DOCUMENTS.filter(
      (documentItem) => documentItem.category === activeFilter,
    )
  }, [activeFilter])

  const pageCount = Math.max(1, Math.ceil(filteredDocuments.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const visibleDocuments = filteredDocuments.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  )

  const handleFilterChange = (filter: Filter) => {
    setActiveFilter(filter)
    setPage(1)
  }

  return (
    <div className="bg-surface">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <header className="max-w-2xl">
          <h1 className="font-heading text-3xl sm:text-4xl text-text-primary">
            Document Library
          </h1>
          <p className="font-body text-base text-text-secondary mt-3">
            Choose a template to begin. Each document guides you through the
            details and produces a formatted PDF aligned with Kenyan law.
          </p>
        </header>

        <div
          className="flex flex-wrap gap-3 mt-8"
          role="group"
          aria-label="Filter documents by category"
        >
          {DOCUMENT_CATEGORIES.map((category) => {
            const isActive = activeFilter === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleFilterChange(category)}
                aria-pressed={isActive}
                className={[
                  'min-h-[44px] px-4 rounded-full font-body text-sm transition-colors',
                  isActive
                    ? 'bg-primary text-white'
                    : 'bg-surface border border-border text-text-secondary hover:border-primary hover:text-primary',
                ].join(' ')}
              >
                {category}
              </button>
            )
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {visibleDocuments.map((documentItem, index) => (
            <DocumentCard
              key={documentItem.slug}
              documentItem={documentItem}
              index={index}
            />
          ))}
        </div>

        {pageCount > 1 && (
          <nav
            className="flex items-center justify-center gap-2 mt-12"
            aria-label="Pagination"
          >
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={safePage === 1}
              aria-label="Previous page"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-md border border-border text-text-secondary disabled:opacity-50 hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).map(
              (pageNumber) => (
                <button
                  key={pageNumber}
                  type="button"
                  onClick={() => setPage(pageNumber)}
                  aria-label={`Page ${pageNumber}`}
                  aria-current={safePage === pageNumber ? 'page' : undefined}
                  className={[
                    'min-h-[44px] min-w-[44px] rounded-md font-body text-sm transition-colors',
                    safePage === pageNumber
                      ? 'bg-primary text-white'
                      : 'border border-border text-text-secondary hover:border-primary hover:text-primary',
                  ].join(' ')}
                >
                  {pageNumber}
                </button>
              ),
            )}
            <button
              type="button"
              onClick={() =>
                setPage((current) => Math.min(pageCount, current + 1))
              }
              disabled={safePage === pageCount}
              aria-label="Next page"
              className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center rounded-md border border-border text-text-secondary disabled:opacity-50 hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </nav>
        )}
      </div>
    </div>
  )
}
