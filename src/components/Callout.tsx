import type { ReactNode } from 'react'
import { IconInfo } from './Icons'

type CalloutVariant = 'info' | 'warm' | 'quiet'

interface CalloutProps {
  children: ReactNode
  title?: string
  variant?: CalloutVariant
}

const classes: Record<CalloutVariant, string> = {
  info: 'callout',
  warm: 'callout callout--warm',
  quiet: 'callout callout--quiet',
}

export function Callout({ children, title, variant = 'info' }: CalloutProps) {
  return (
    <div className={classes[variant]}>
      <IconInfo />
      <div>
        {title ? <strong className="callout__title">{title}</strong> : null}
        <span>{children}</span>
      </div>
    </div>
  )
}
