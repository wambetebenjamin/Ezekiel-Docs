import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'white'
type Size = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?: Variant
  size?: Size
  fullWidth?: boolean
  className?: string
  children: ReactNode
}

interface ButtonAsButton
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    BaseProps {
  href?: never
}

interface ButtonAsLink extends BaseProps {
  href: string
  external?: boolean
  type?: never
  disabled?: never
  onClick?: () => void
}

type ButtonProps = ButtonAsButton | ButtonAsLink

const baseClass =
  'inline-flex items-center justify-center gap-2 rounded-md font-body font-medium transition-colors duration-200 min-h-[44px] focus-visible:outline-none disabled:opacity-60 disabled:cursor-not-allowed'

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-primary text-white hover:bg-primary-light active:bg-primary',
  secondary:
    'border-[1.5px] border-primary bg-transparent text-primary hover:bg-accent-light',
  outline:
    'border border-border bg-surface text-text-secondary hover:border-primary hover:text-primary',
  ghost: 'bg-transparent text-text-secondary hover:bg-surface-alt',
  white: 'bg-white text-primary hover:bg-accent-light',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm min-h-[44px]',
  md: 'px-5 py-2.5 text-sm min-h-[44px]',
  lg: 'px-6 py-3 text-base min-h-[48px]',
}

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    fullWidth = false,
    className = '',
    children,
  } = props

  const combinedClass = [
    baseClass,
    variantClasses[variant],
    sizeClasses[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if ('href' in props && props.href) {
    const classNames = combinedClass
    if (props.external) {
      return (
        <a
          href={props.href}
          target="_blank"
          rel="noopener noreferrer"
          className={classNames}
          onClick={props.onClick}
        >
          {children}
        </a>
      )
    }
    return (
      <Link href={props.href} className={classNames} onClick={props.onClick}>
        {children}
      </Link>
    )
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton
  return (
    <button className={combinedClass} {...buttonProps}>
      {children}
    </button>
  )
}
