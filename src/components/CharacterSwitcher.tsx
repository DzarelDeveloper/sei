import { useState } from 'react'
import { getCharacter } from '../data/characters'
import { useCharacter } from '../state/CharacterContext'
import { CharacterPicker } from './CharacterPicker'
import { Mascot } from './Mascot'
import { Modal } from './Modal'

type SwitcherVariant = 'navbar' | 'focus' | 'panel'

interface CharacterSwitcherProps {
  variant?: SwitcherVariant
}

export function CharacterSwitcher({ variant = 'navbar' }: CharacterSwitcherProps) {
  const [open, setOpen] = useState(false)
  const { character } = useCharacter()
  const profile = getCharacter(character)

  return (
    <>
      <button
        type="button"
        className={`character-trigger character-trigger--${variant}`}
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`Ganti karakter (sekarang: ${profile.name})`}
      >
        <span className="character-trigger__avatar" aria-hidden="true">
          <Mascot pose="welcome" decorative />
        </span>
        <span className="character-trigger__label">Ganti karakter</span>
      </button>

      <Modal
        open={open}
        title="Ganti karakter"
        onClose={() => setOpen(false)}
      >
        <CharacterPicker
          variant="compact"
          showHeading={false}
          onSelect={() => setOpen(false)}
        />
      </Modal>
    </>
  )
}
