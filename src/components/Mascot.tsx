import { useState } from 'react'
import type { CharacterId } from '../data/characters'
import { useCharacter } from '../state/CharacterContext'

export type MascotPose =
  | 'main'
  | 'welcome'
  | 'thinking'
  | 'encouraging'
  | 'celebrating'
  | 'curious'

interface MascotAsset {
  src: string
  width: number
  height: number
  alt: string
}

export const MASCOT_ASSETS: Record<
  CharacterId,
  Record<MascotPose, MascotAsset>
> = {
  boy: {
    main: {
      src: '/images/sei/boy-main.png',
      width: 768,
      height: 768,
      alt: 'Maskot SEI cowok berjaket biru dan hoodie putih, menyapa dengan satu tangan terbuka.',
    },
    welcome: {
      src: '/images/sei/boy-welcome.png',
      width: 768,
      height: 768,
      alt: 'Maskot SEI cowok berjaket biru dan hoodie putih menyambut dengan tangan terulur.',
    },
    thinking: {
      src: '/images/sei/boy-thinking.png',
      width: 1024,
      height: 1024,
      alt: 'Maskot SEI cowok berjaket biru dan hoodie putih menopang dagu dengan pandangan ke samping, sedang berpikir.',
    },
    encouraging: {
      src: '/images/sei/boy-encouraging.png',
      width: 1024,
      height: 1024,
      alt: 'Maskot SEI cowok berjaket biru dan hoodie putih mengangkat kepalan tangan sambil mengedip, memberi semangat.',
    },
    celebrating: {
      src: '/images/sei/boy-celebrating.png',
      width: 1024,
      height: 1024,
      alt: 'Maskot SEI cowok berjaket biru dan hoodie putih mengangkat kepalan tangan sambil memegang kartu hasil dengan mata terpejam bahagia.',
    },
    curious: {
      src: '/images/sei/boy-curious.png',
      width: 768,
      height: 1024,
      alt: 'Maskot SEI cowok berseragam polo putih menunjuk pipi dengan alis terangkat dan mulut terbuka.',
    },
  },
  girl: {
    main: {
      src: '/images/sei/girl-main.png',
      width: 768,
      height: 1024,
      alt: 'Maskot SEI cewek berhoodie pink dengan ransel, satu tangan terbuka dan satu tangan memegang tablet.',
    },
    welcome: {
      src: '/images/sei/girl-welcome.png',
      width: 768,
      height: 1024,
      alt: 'Maskot SEI cewek berhoodie pink melambaikan tangan sambil tersenyum.',
    },
    thinking: {
      src: '/images/sei/girl-thinking.png',
      width: 768,
      height: 1024,
      alt: 'Maskot SEI cewek berhoodie pink menopang dagu sambil berpikir.',
    },
    encouraging: {
      src: '/images/sei/girl-encouraging.png',
      width: 768,
      height: 1024,
      alt: 'Maskot SEI cewek berhoodie pink mengacungkan jempol sebagai tanda dukungan.',
    },
    celebrating: {
      src: '/images/sei/girl-celebrating.png',
      width: 768,
      height: 1024,
      alt: 'Maskot SEI cewek berhoodie pink mengangkat kedua tangan dengan mata terpejam dan tawa lebar.',
    },
    curious: {
      src: '/images/sei/girl-curious.png',
      width: 768,
      height: 1024,
      alt: 'Maskot SEI cewek berhoodie pink menunjuk dagu dengan alis terangkat dan mulut sedikit terbuka.',
    },
  },
}

interface MascotProps {
  
  character?: CharacterId
  pose?: MascotPose
  className?: string
  
  priority?: boolean
  
  decorative?: boolean
}

export function Mascot({
  character,
  pose = 'main',
  className,
  priority = false,
  decorative = false,
}: MascotProps) {
  const { character: selected } = useCharacter()
  const activeCharacter = character ?? selected

  const poses = MASCOT_ASSETS[activeCharacter]
  const asset = poses[pose] ?? poses.main

  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const resolved = failedSrc === asset.src ? poses.main : asset

  return (
    <img
      className={className ? `mascot ${className}` : 'mascot'}
      src={resolved.src}
      alt={decorative ? '' : asset.alt}
      aria-hidden={decorative || undefined}
      width={resolved.width}
      height={resolved.height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailedSrc(asset.src)}
    />
  )
}
