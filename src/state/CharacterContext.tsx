import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  DEFAULT_CHARACTER,
  isCharacterId,
  type CharacterId,
} from '../data/characters'

const STORAGE_KEY = 'sei.character.v1'

function readStoredCharacter(): CharacterId {
  if (typeof window === 'undefined') return DEFAULT_CHARACTER

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return isCharacterId(raw) ? raw : DEFAULT_CHARACTER
  } catch {

    return DEFAULT_CHARACTER
  }
}

interface CharacterContextValue {
  character: CharacterId
  setCharacter: (character: CharacterId) => void
}

const CharacterContext = createContext<CharacterContextValue | null>(null)

export function CharacterProvider({ children }: { children: ReactNode }) {
  const [character, setCharacterState] = useState<CharacterId>(readStoredCharacter)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, character)
    } catch {

    }
  }, [character])

  const setCharacter = useCallback((next: CharacterId) => {
    setCharacterState(next)
  }, [])

  const value = useMemo<CharacterContextValue>(
    () => ({ character, setCharacter }),
    [character, setCharacter],
  )

  return (
    <CharacterContext.Provider value={value}>
      {children}
    </CharacterContext.Provider>
  )
}

export function useCharacter(): CharacterContextValue {
  const context = useContext(CharacterContext)
  if (!context) {
    throw new Error('useCharacter must be used inside <CharacterProvider>')
  }
  return context
}
