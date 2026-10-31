import { useId } from 'react'
import { characters } from '../data/characters'
import { useCharacter } from '../state/CharacterContext'
import { IconCheck } from './Icons'
import { Mascot } from './Mascot'

interface CharacterPickerProps {
  
  variant?: 'default' | 'compact'
  showHeading?: boolean
  onSelect?: () => void
}

export function CharacterPicker({
  variant = 'default',
  showHeading = true,
  onSelect,
}: CharacterPickerProps) {
  const { character, setCharacter } = useCharacter()
  const headingId = useId()
  const descriptionId = useId()

  return (
    <div className={`character-picker character-picker--${variant}`}>
      {showHeading ? (
        <div className="character-picker__head">
          <h2 className="character-picker__title" id={headingId}>
            Pilih teman eksplorasimu
          </h2>
          <p className="character-picker__copy" id={descriptionId}>
            Pilih karakter yang membuatmu nyaman. Kamu bisa mengubahnya kapan
            saja.
          </p>
        </div>
      ) : (
        <p className="character-picker__copy" id={descriptionId}>
          Pilih karakter yang membuatmu nyaman. Kamu bisa mengubahnya kapan
          saja.
        </p>
      )}

      <div
        className="character-grid"
        role="radiogroup"
        aria-labelledby={showHeading ? headingId : undefined}
        aria-describedby={descriptionId}
      >
        {characters.map((option) => {
          const isSelected = option.id === character

          return (
            <label
              key={option.id}
              className={`character-card${isSelected ? ' character-card--selected' : ''}`}
            >
              <input
                className="choice__input"
                type="radio"
                name="sei-character"
                value={option.id}
                checked={isSelected}
                onChange={() => {
                  setCharacter(option.id)
                  onSelect?.()
                }}
              />
              <span className="character-card__preview">
                <Mascot character={option.id} pose="welcome" decorative />
              </span>
              <span className="character-card__body">
                <span className="character-card__name">{option.name}</span>
                <span className="character-card__outfit">
                  <span
                    className="character-card__swatch"
                    style={{ background: option.swatch }}
                    aria-hidden="true"
                  />
                  {option.outfit}
                </span>
              </span>
              <span className="character-card__check" aria-hidden="true">
                <IconCheck />
              </span>
            </label>
          )
        })}
      </div>

      <p className="character-picker__note">
        Pilihan karakter hanya mengubah tampilan. Jawaban, hasil, dan
        rekomendasimu tetap sama.
      </p>
    </div>
  )
}
