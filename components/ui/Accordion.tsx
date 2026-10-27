'use client'

import { useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'

export interface AccordionItem {
  question: string
  answer: string
}

interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const answerRefs = useRef<Array<HTMLDivElement | null>>([])

  const toggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <div className="w-full">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div key={item.question} className="border-b border-border">
            <button
              type="button"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${index}`}
              className="w-full flex justify-between items-center gap-4 py-4 text-left min-h-[44px]"
            >
              <span className="font-body text-base font-semibold text-text-primary">
                {item.question}
              </span>
              <ChevronDown
                className={`faq-chevron flex-none text-primary-lighter ${
                  isOpen ? 'is-open' : ''
                }`}
                size={20}
                aria-hidden="true"
              />
            </button>
            <div
              id={`faq-panel-${index}`}
              ref={(element) => {
                answerRefs.current[index] = element
              }}
              className={`faq-answer ${isOpen ? 'is-open' : ''}`}
              style={
                isOpen
                  ? {
                      maxHeight:
                        (answerRefs.current[index]?.scrollHeight ?? 0) + 24,
                    }
                  : { maxHeight: 0 }
              }
            >
              <p className="font-body text-sm text-text-secondary leading-relaxed pb-4">
                {item.answer}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
