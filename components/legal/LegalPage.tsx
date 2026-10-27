import type { ReactNode } from 'react'

interface LegalPageProps {
  title: string
  lastUpdated: string
  children: ReactNode
}

export function LegalPage({ title, lastUpdated, children }: LegalPageProps) {
  return (
    <div className="bg-surface">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <article className="max-w-3xl mx-auto">
          <h1 className="font-heading text-3xl sm:text-4xl text-text-primary">
            {title}
          </h1>
          <p className="font-body text-sm text-text-muted mt-3">
            Last updated: {lastUpdated}
          </p>
          <div className="font-body text-base text-text-primary leading-relaxed mt-8 space-y-6 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:sm:text-2xl [&_h2]:text-text-primary [&_h2]:mt-10 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:text-text-primary [&_h3]:mt-8 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-2">
            {children}
          </div>
        </article>
      </div>
    </div>
  )
}
