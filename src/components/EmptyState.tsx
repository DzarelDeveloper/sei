import type { ReactNode } from 'react'
import { IconCompass } from './Icons'

interface EmptyStateProps {
  title: string
  copy: string
  children?: ReactNode
}

export function EmptyState({ title, copy, children }: EmptyStateProps) {
  return (
    <div className="empty">
      <span className="empty__icon" aria-hidden="true">
        <IconCompass />
      </span>
      <h2 className="empty__title">{title}</h2>
      <p className="empty__copy">{copy}</p>
      {children ? <div className="empty__actions">{children}</div> : null}
    </div>
  )
}
