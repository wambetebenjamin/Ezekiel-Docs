'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Testimonial } from '@/lib/content'

interface TestimonialCardProps {
  testimonial: Testimonial
  index: number
}

export function TestimonialCard({
  testimonial,
  index,
}: TestimonialCardProps) {
  const isEven = index % 2 === 0

  return (
    <motion.figure
      initial={{ opacity: 0, x: isEven ? -24 : 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="bg-surface border border-border rounded-lg p-5 shadow-card flex flex-col"
    >
      <blockquote className="font-body text-sm text-text-secondary leading-relaxed italic flex-1">
        {testimonial.quote}
      </blockquote>
      <figcaption className="flex items-center gap-3 mt-5 pt-4 border-t border-border">
        <Image
          src={testimonial.image}
          alt={`Portrait of ${testimonial.name}`}
          width={48}
          height={48}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <p className="font-body text-sm font-semibold text-text-primary">
            {testimonial.name}
          </p>
          <p className="font-body text-xs text-text-muted">{testimonial.role}</p>
        </div>
      </figcaption>
    </motion.figure>
  )
}
