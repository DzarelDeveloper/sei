import { Link } from 'react-router-dom'

interface WordmarkProps {
  to?: string
  small?: boolean
  withSub?: boolean
}

export function Wordmark({ to = '/', small = false, withSub = false }: WordmarkProps) {
  return (
    <Link
      to={to}
      className={`wordmark${small ? ' wordmark--sm' : ''}`}
      aria-label="SEI — Self Exploration Intelligence"
    >
      <span className="wordmark__mark" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <g transform="rotate(-6 12 12)">
            <path
              d="M16.13 7.13C15.94 4.69 12.38 3.56 9.75 4.5 6.94 5.51 6.19 8.06 8.06 9.56c1.69 1.39 6 1.17 7.69 2.82 2.06 2.02.38 5.06-3 5.62-2.81.49-5.25-.56-5.81-2.44"
              stroke="currentColor"
              strokeWidth="3.4"
              strokeLinecap="round"
            />
          </g>
        </svg>
      </span>
      <span>
        SEI
        {withSub ? (
          <span className="wordmark__sub">Self Exploration Intelligence</span>
        ) : null}
      </span>
    </Link>
  )
}
