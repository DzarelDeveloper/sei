

export type CharacterId = 'boy' | 'girl'

export interface CharacterProfile {
  id: CharacterId
  
  name: string
  
  shortName: string
  
  outfit: string
  
  swatch: string
}

export const characters: CharacterProfile[] = [
  {
    id: 'boy',
    name: 'Karakter cowok',
    shortName: 'Cowok',
    outfit: 'Jaket biru dan hoodie putih',
    swatch: '#2b5fd0',
  },
  {
    id: 'girl',
    name: 'Karakter cewek',
    shortName: 'Cewek',
    outfit: 'Hoodie pink',
    swatch: '#e08aab',
  },
]

export const DEFAULT_CHARACTER: CharacterId = 'boy'

export function isCharacterId(value: unknown): value is CharacterId {
  return value === 'boy' || value === 'girl'
}

export function getCharacter(id: CharacterId): CharacterProfile {
  return characters.find((character) => character.id === id) ?? characters[0]
}
