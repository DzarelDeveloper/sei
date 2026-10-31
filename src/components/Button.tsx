import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { IconArrowRight } from './Icons'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg' | 'sm'

interface BaseProps {
  variant?: Variant
  size?: Size
  block?: boolean
  withArrow?: boolean
  className?: string
  children: ReactNode
}

function buildClass({ variant = 'primary', size = 'md', block, className }: BaseProps) {
  return [
    'btn',
    variant !== 'primary' ? `btn--${variant}` : '',
    size !== 'md' ? `btn--${size}` : '',
    block ? 'btn--block' : '',
    className ?? '',
  ]
    .filter(Boolean)
    .join(' ')
}

function Content({ children, withArrow }: Pick<BaseProps, 'children' | 'withArrow'>) {
  return (
    <>
      <span>{children}</span>
      {withArrow ? <IconArrowRight className="btn__arrow" /> : null}
    </>
  )
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement>

export function Button({
  children,
  withArrow,
  variant,
  size,
  block,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      {...rest}
      type={type}
      className={buildClass({ children, withArrow, variant, size, block, className })}
    >
      <Content withArrow={withArrow}>{children}</Content>
    </button>
  )
}

type ButtonLinkProps = BaseProps & {
  to: string
  state?: unknown
  'aria-label'?: string
  onClick?: () => void
}

export function ButtonLink({
  children,
  to,
  state,
  withArrow,
  variant,
  size,
  block,
  className,
  ...rest
}: ButtonLinkProps) {
  return (
    <Link
      {...rest}
      to={to}
      state={state}
      className={buildClass({ children, withArrow, variant, size, block, className })}
    >
      <Content withArrow={withArrow}>{children}</Content>
    </Link>
  )
}

type ButtonAnchorProps = BaseProps & {
  href: string
  target?: string
  rel?: string
}

export function ButtonAnchor({
  children,
  href,
  withArrow,
  variant,
  size,
  block,
  className,
  ...rest
}: ButtonAnchorProps) {
  return (
    <a
      {...rest}
      href={href}
      className={buildClass({ children, withArrow, variant, size, block, className })}
    >
      <Content withArrow={withArrow}>{children}</Content>
    </a>
  )
}
