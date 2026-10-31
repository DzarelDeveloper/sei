import type { Question } from '../data/questions'
import { IconCheck } from './Icons'

interface ChoiceListProps {
  question: Question
  selected: string[]
  note: string
  onSelect: (optionIds: string[]) => void
  onNote: (value: string) => void
  
  labelledBy: string
}

export function ChoiceList({
  question,
  selected,
  note,
  onSelect,
  onNote,
  labelledBy,
}: ChoiceListProps) {
  const isMulti = question.type === 'multi'
  const isLinear = question.type === 'linear'
  const max = question.maxSelect ?? question.options.length
  const atLimit = isMulti && selected.length >= max

  if (question.type === 'essay') {
    return (
      <div className="note-field">
        <label className="field-label" htmlFor={`${question.id}-essay`}>
          {question.helper ?? 'Tulis jawabanmu'}
        </label>
        <textarea
          id={`${question.id}-essay`}
          className="text-input"
          rows={3}
          placeholder={question.placeholder ?? 'Tulis dengan kata-katamu sendiri.'}
          value={note}
          onChange={(event) => onNote(event.target.value)}
          maxLength={500}
        />
      </div>
    )
  }

  const layoutClass =
    question.type === 'scale'
      ? 'choices--scale'
      : isLinear
        ? 'choices--linear'
        : question.options.some((option) => option.description)
          ? 'choices--cards'
          : question.options.every((option) => option.label.length <= 46)
            ? 'choices--grid'
            : 'choices--list'

  const handleChange = (optionId: string) => {
    if (!isMulti) {
      onSelect([optionId])
      return
    }

    if (selected.includes(optionId)) {
      onSelect(selected.filter((id) => id !== optionId))
      return
    }

    if (atLimit) return
    onSelect([...selected, optionId])
  }

  return (
    <>
      <div
        className={`choices ${layoutClass}`}
        role={isMulti ? 'group' : 'radiogroup'}
        aria-labelledby={labelledBy}
      >
        {question.options.map((option, index) => {
          const isSelected = selected.includes(option.id)
          const isBlocked = isMulti && atLimit && !isSelected

          return (
            <label
              key={option.id}
              className={`choice${isBlocked ? ' choice--blocked' : ''}`}
            >
              <input
                className="choice__input"
                type={isMulti ? 'checkbox' : 'radio'}
                name={question.id}
                value={option.id}
                checked={isSelected}
                disabled={isBlocked}
                onChange={() => handleChange(option.id)}
              />
              <span className="choice__badge" aria-hidden="true">
                {isLinear ? null : String.fromCharCode(65 + index)}
              </span>
              <span className="choice__body">
                <span className="choice__title">{option.label}</span>
                {option.description ? (
                  <span className="choice__desc">{option.description}</span>
                ) : null}
              </span>
              <span
                className={`choice__mark${isMulti ? '' : ' choice__mark--radio'}`}
                aria-hidden="true"
              >
                {isMulti ? <IconCheck /> : null}
              </span>
            </label>
          )
        })}
      </div>

      {isMulti && question.maxSelect ? (
        <p className="field-hint" aria-live="polite">
          {selected.length} dari {question.maxSelect} pilihan dipilih
          {atLimit ? ' — batalkan salah satu untuk memilih yang lain.' : '.'}
        </p>
      ) : null}

      {question.note ? (
        <div className="note-field">
          <label className="field-label" htmlFor={`${question.id}-note`}>
            {question.note.label}
          </label>
          <textarea
            id={`${question.id}-note`}
            className="text-input"
            rows={2}
            placeholder={question.note.placeholder}
            value={note}
            onChange={(event) => onNote(event.target.value)}
            maxLength={280}
          />
        </div>
      ) : null}
    </>
  )
}
