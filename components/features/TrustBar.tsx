'use client'

import { motion } from 'framer-motion'
import {
  Download,
  FileCheck2,
  Scale,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'

interface TrustItem {
  label: string
  icon: LucideIcon
}

const ITEMS: TrustItem[] = [
  { label: 'Kenyan law compliant', icon: Scale },
  { label: 'Lawyer reviewed', icon: FileCheck2 },
  { label: 'Instant PDF download', icon: Download },
  { label: 'Secure and private', icon: ShieldCheck },
]

export function TrustBar() {
  return (
    <section className="bg-surface border-t border-b border-border">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6">
          {ITEMS.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{
                  duration: 0.4,
                  ease: 'easeOut',
                  delay: index * 0.1,
                }}
                className="flex items-center gap-3 justify-center sm:justify-start"
              >
                <Icon
                  size={24}
                  className="text-primary-lighter flex-none"
                  aria-hidden="true"
                />
                <span className="font-body text-sm text-text-secondary">
                  {item.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
