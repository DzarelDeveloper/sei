interface ProgressBarProps {
  value: number
  max: number
  label: string
  valueLabel: string
}

export function ProgressBar({ value, max, label, valueLabel }: ProgressBarProps) {
  const percent = Math.round((value / max) * 100)

  return (
    <div className="progress">
      <div className="progress__meta">
        <span>{label}</span>
        <span className="progress__value">{valueLabel}</span>
      </div>
      <div
        className="progress__track"
        role="progressbar"
        aria-label={label}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-valuetext={`${value} dari ${max} pertanyaan`}
      >
        <div className="progress__fill" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
