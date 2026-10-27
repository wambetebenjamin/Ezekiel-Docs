'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { DocumentType } from '@/lib/documents'
import { getDocumentIcon } from '@/lib/document-icons'
import { Badge } from '@/components/ui/Badge'

interface DocumentCardProps {
  documentItem: DocumentType
  index?: number
}

export function DocumentCard({ documentItem, index = 0 }: DocumentCardProps) {
  const Icon = getDocumentIcon(documentItem.iconKey)

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45, ease: 'easeOut', delay: index * 0.08 }}
      className="bg-surface border border-border rounded-lg p-5 sm:p-6 shadow-card hover:shadow-card-hover transition-shadow duration-200 flex flex-col"
    >
      <div className="h-12 w-12 rounded-md bg-accent-light p-2 flex items-center justify-center">
        <Icon size={32} className="text-primary-lighter" aria-hidden="true" />
      </div>

      <h3 className="font-heading text-lg text-text-primary mt-3">
        {documentItem.name}
      </h3>
      <p className="font-body text-sm text-text-secondary mt-1 leading-relaxed flex-1">
        {documentItem.description}
      </p>

      <div className="mt-3">
        <Badge>{documentItem.fillTimeMinutes} min to complete</Badge>
      </div>

      <Link
        href={`/generate/${documentItem.slug}`}
        className="mt-4 w-full min-h-[44px] rounded-md bg-primary text-white py-2.5 text-sm font-medium inline-flex items-center justify-center gap-2 hover:bg-primary-light transition-colors"
      >
        Generate
        <ArrowRight size={16} aria-hidden="true" />
      </Link>
    </motion.article>
  )
}
