import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  interactive?: boolean
}

export function Card({
  children,
  interactive = false,
  className = '',
  ...rest
}: CardProps) {
  return (
    <div
      className={[
        'bg-surface border border-border rounded-lg p-5 sm:p-6 shadow-card',
        interactive
          ? 'transition-shadow duration-200 hover:shadow-card-hover'
          : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}
