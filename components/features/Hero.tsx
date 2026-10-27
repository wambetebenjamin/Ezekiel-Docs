'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'

function DocumentSheet({
  className,
  accent,
}: {
  className: string
  accent?: boolean
}) {
  return (
    <div
      className={`absolute bg-surface border border-border rounded-lg shadow-card p-5 ${className}`}
    >
      <div
        className={`h-3 w-24 rounded-sm ${
          accent ? 'bg-primary' : 'bg-accent'
        }`}
      />
      <div className="mt-4 space-y-2.5">
        <div className="h-2 w-full rounded-sm bg-border" />
        <div className="h-2 w-11/12 rounded-sm bg-border" />
        <div className="h-2 w-4/5 rounded-sm bg-border" />
      </div>
      <div className="mt-5 space-y-2.5">
        <div className="h-2 w-full rounded-sm bg-border" />
        <div className="h-2 w-10/12 rounded-sm bg-border" />
        <div className="h-2 w-3/4 rounded-sm bg-border" />
      </div>
      <div className="mt-5 flex items-center justify-between">
        <div className="h-2 w-16 rounded-sm bg-accent" />
        <div className="h-7 w-20 rounded-md bg-accent-light" />
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section className="bg-surface-alt">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="text-center lg:text-left"
          >
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl text-text-primary leading-[1.15]">
              Generate legal documents in minutes
            </h1>
            <p className="font-body text-base sm:text-lg text-text-secondary max-w-xl mt-5 mx-auto lg:mx-0">
              Create Kenyan-law-compliant contracts, agreements, and letters
              without hiring a lawyer first. Answer simple questions, review
              the details, and download a ready-to-sign PDF.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto mt-8 justify-center lg:justify-start">
              <Button href="/documents" size="lg">
                Start a Document
              </Button>
              <Button href="/documents" variant="secondary" size="lg">
                See Document Types
              </Button>
            </div>
          </motion.div>

          <div
            className="hidden lg:block relative h-[400px]"
            aria-hidden="true"
          >
            <DocumentSheet
              className="w-72 h-96 rotate-[-5deg] left-2 top-8"
              accent
            />
            <DocumentSheet className="w-72 h-96 rotate-[3deg] left-40 top-2" />
            <DocumentSheet
              className="w-72 h-96 rotate-[8deg] left-64 top-10"
              accent
            />
          </div>
        </div>
      </div>
    </section>
  )
}
