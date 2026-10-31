
import type { SchoolTrack } from '../state/ExplorationContext'

export interface TrackProfile {
  id: SchoolTrack
  name: string
  shortName: string
  
  focus: string
  
  introCopy: string
  
  dailyLife: string
}

export const trackProfiles: Record<SchoolTrack, TrackProfile> = {
  sma: {
    id: 'sma',
    name: 'SMA',
    shortName: 'SMA',
    focus: 'Lebih banyak materi dan teori akademik.',
    introCopy:
      'Kamu di SMA, jadi pertanyaan akan dikaitkan dengan pelajaran yang lebih luas dan persiapan ke jenjang berikutnya. Tidak ada jawaban benar atau salah.',
    dailyLife:
      'Sehari-harimu lebih banyak materi, teori, dan diskusi di kelas dibanding praktik kejuruan.',
  },
  smk: {
    id: 'smk',
    name: 'SMK',
    shortName: 'SMK',
    focus: 'Lebih banyak praktik dan keterampilan kerja.',
    introCopy:
      'Kamu di SMK, jadi pertanyaan akan dikaitkan dengan bidang keahlian dan praktik yang kamu jalani. Tetap ada pilihan untuk kuliah atau bekerja. Tidak ada jawaban benar atau salah.',
    dailyLife:
      'Sehari-harimu lebih banyak praktik, proyek, dan keterampilan yang langsung dipakai di dunia kerja.',
  },
}

export function getTrackProfile(track: SchoolTrack | null | undefined): TrackProfile | null {
  return track ? trackProfiles[track] ?? null : null
}
