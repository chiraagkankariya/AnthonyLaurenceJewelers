import Link from 'next/link'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  children: React.ReactNode
  target?: string
  rel?: string
}

const base =
  'inline-flex items-center justify-center font-serif tracking-widest uppercase transition-all duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed'

const variants = {
  primary: 'bg-brand-red text-white hover:bg-[#6B0000] active:bg-[#5a0000]',
  secondary:
    'border border-brand-red text-brand-red bg-transparent hover:bg-brand-red hover:text-white',
  ghost: 'text-brand-charcoal hover:text-brand-red underline-offset-4 hover:underline',
}

const sizes = {
  sm: 'text-xs px-4 py-2',
  md: 'text-sm px-6 py-3',
  lg: 'text-sm px-8 py-4',
}

export default function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  children,
  target,
  rel,
}: ButtonProps) {
  const classes = [
    base,
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {children}
    </button>
  )
}
