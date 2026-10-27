'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const STEPS = [
  {
    number: 1,
    title: 'Choose your document',
    description:
      'Browse the library and pick the agreement, contract, or letter that matches the work you are doing.',
  },
  {
    number: 2,
    title: 'Fill in your details',
    description:
      'Answer plain-language questions about the parties, terms, and dates. Guidance appears beside every field.',
  },
  {
    number: 3,
    title: 'Download your PDF',
    description:
      'Review the summary, submit, and receive a formatted, lawyer-reviewed PDF ready to sign and share.',
  },
]

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches

    const steps = sectionRef.current.querySelectorAll<HTMLElement>('[data-step]')

    if (reducedMotion) {
      gsap.set(steps, { opacity: 1, x: 0 })
      return
    }

    const context = gsap.context(() => {
      gsap.from(steps, {
        opacity: 0,
        x: 40,
        duration: 0.6,
        ease: 'power2.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)

    return () => context.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="bg-surface-alt py-16 sm:py-20"
      aria-labelledby="how-it-works-heading"
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2
          id="how-it-works-heading"
          className="font-heading text-2xl sm:text-3xl text-text-primary text-center"
        >
          How it works
        </h2>
        <p className="font-body text-base text-text-secondary text-center max-w-2xl mx-auto mt-3">
          Three calm, guided steps stand between you and a finished legal
          document.
        </p>

        <div className="relative mt-12 flex flex-col md:flex-row gap-8 md:gap-0">
          <div
            className="hidden md:block absolute top-5 left-[16%] right-[16%] h-px bg-border"
            aria-hidden="true"
          />
          {STEPS.map((step) => (
            <div
              key={step.number}
              data-step
              className="relative flex-1 flex flex-col items-center text-center px-2"
            >
              <div className="h-10 w-10 rounded-full bg-accent text-primary font-heading font-bold flex items-center justify-center text-lg relative z-10">
                {step.number}
              </div>
              <h3 className="font-heading text-lg text-text-primary mt-4">
                {step.title}
              </h3>
              <p className="font-body text-sm text-text-secondary mt-2 leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
