
import { smaQuestions } from './questionsSma'
import { smkQuestions } from './questionsSmk'

export type QuestionType = 'single' | 'multi' | 'scale' | 'essay' | 'linear'

export interface QuestionOption {
  id: string
  label: string
  description?: string
}

export interface QuestionNote {
  label: string
  placeholder: string
}

export interface Question {
  id: string
  type: QuestionType
  prompt: string
  helper?: string
  options: QuestionOption[]
  
  maxSelect?: number
  
  optional?: boolean
  
  note?: QuestionNote
  
  left?: string
  right?: string
  
  allowNeutral?: boolean
  
  placeholder?: string
}

export const ASSESSMENT_QUESTION_COUNT = 15

export const questions: Question[] = [
  {
    id: 'q1',
    type: 'single',
    prompt: 'Kalau punya waktu luang, aktivitas mana yang paling menarik buatmu?',
    options: [
      {
        id: 'a',
        label: 'Mencoba hal baru di komputer',
        description: 'Mengatur aplikasi, mencoba tools, atau membuat sesuatu di layar.',
      },
      {
        id: 'b',
        label: 'Menggambar, mendesain, atau membuat konten visual',
        description: 'Poster, ilustrasi, video pendek, atau tampilan yang menarik.',
      },
      {
        id: 'c',
        label: 'Membaca atau menonton tentang suatu topik',
        description: 'Mencari tahu cara kerja sesuatu karena penasaran.',
      },
      {
        id: 'd',
        label: 'Membuat atau memperbaiki sesuatu dengan tangan',
        description: 'Merakit, membongkar, atau merapikan benda di sekitarmu.',
      },
      {
        id: 'e',
        label: 'Mengobrol dan mengerjakan sesuatu bersama teman',
        description: 'Berdiskusi, berbagi ide, dan mengerjakan proyek bareng.',
      },
    ],
  },
  {
    id: 'q2',
    type: 'single',
    prompt: 'Kalau menemukan masalah yang membuat penasaran, apa yang biasanya kamu lakukan?',
    options: [
      { id: 'a', label: 'Mencoba mencari solusinya sendiri dulu' },
      { id: 'b', label: 'Mencari penjelasan atau tutorial, lalu mencobanya' },
      { id: 'c', label: 'Bertanya ke orang yang lebih tahu' },
      { id: 'd', label: 'Membandingkan beberapa cara, lalu memilih yang paling masuk akal' },
    ],
  },
  {
    id: 'q3',
    type: 'single',
    prompt: 'Kamu paling mudah memahami sesuatu ketika...',
    options: [
      { id: 'a', label: 'Melihat contoh atau gambar' },
      { id: 'b', label: 'Mencoba langsung dan belajar dari kesalahan' },
      { id: 'c', label: 'Mendengar penjelasan langkah demi langkah' },
      { id: 'd', label: 'Membaca dan mencatat dengan caraku sendiri' },
      { id: 'e', label: 'Mendiskusikannya dengan teman' },
    ],
  },
  {
    id: 'q4',
    type: 'multi',
    maxSelect: 2,
    prompt: 'Tugas seperti apa yang paling ingin kamu kerjakan?',
    helper: 'Pilih maksimal 2.',
    options: [
      { id: 'a', label: 'Membuat aplikasi atau situs sederhana' },
      { id: 'b', label: 'Merapikan dan mengatur data atau informasi' },
      { id: 'c', label: 'Mendesain tampilan atau poster' },
      { id: 'd', label: 'Mengatur jaringan atau perangkat' },
      { id: 'e', label: 'Melakukan percobaan dan mencatat hasilnya' },
    ],
  },
  {
    id: 'q5',
    type: 'single',
    prompt: 'Dalam tugas kelompok, peran apa yang paling nyaman buatmu?',
    options: [
      { id: 'a', label: 'Menyusun ide dan rencana' },
      { id: 'b', label: 'Mengerjakan bagian teknis' },
      { id: 'c', label: 'Membuat hasilnya jadi lebih menarik secara visual' },
      { id: 'd', label: 'Mencari informasi dan bahan' },
      { id: 'e', label: 'Memastikan semuanya selesai tepat waktu' },
    ],
  },
  {
    id: 'q6',
    type: 'multi',
    maxSelect: 3,
    optional: true,
    prompt: 'Kegiatan apa yang pernah kamu coba dan ingin kamu lakukan lagi?',
    helper: 'Pilih maksimal 3. Kamu boleh melewati pertanyaan ini.',
    options: [
      { id: 'a', label: 'Membuat presentasi atau video' },
      { id: 'b', label: 'Mengutak-atik komputer atau ponsel' },
      { id: 'c', label: 'Menggambar, mewarnai, atau mendesain' },
      { id: 'd', label: 'Ikut eksperimen sains' },
      { id: 'e', label: 'Membuat kerajinan atau proyek tangan' },
      { id: 'f', label: 'Mengatur acara atau kegiatan kelas' },
    ],
    note: {
      label: 'Ceritakan singkat pengalamanmu (opsional)',
      placeholder: 'Contoh: ikut lomba desain poster saat akhir semester.',
    },
  },
  {
    id: 'q7',
    type: 'single',
    prompt: 'Kalau boleh memilih proyek untuk dikerjakan selama seminggu, kamu memilih apa?',
    options: [
      { id: 'a', label: 'Membuat situs web atau permainan sederhana' },
      { id: 'b', label: 'Membuat desain untuk acara sekolah' },
      { id: 'c', label: 'Meneliti cara kerja internet di sekolah' },
      { id: 'd', label: 'Membuat alat sederhana yang bisa bergerak' },
      { id: 'e', label: 'Membuat video atau podcast tentang topik favorit' },
    ],
  },
  {
    id: 'q8',
    type: 'multi',
    maxSelect: 2,
    prompt: 'Hal apa yang ingin kamu pelajari lebih dalam?',
    helper: 'Pilih maksimal 2.',
    options: [
      { id: 'a', label: 'Cara membuat program atau aplikasi' },
      { id: 'b', label: 'Cara kerja jaringan dan internet' },
      { id: 'c', label: 'Desain, warna, dan tampilan' },
      { id: 'd', label: 'Sains dan cara kerja alam' },
      { id: 'e', label: 'Elektronika dan perangkat keras' },
    ],
  },
  {
    id: 'q9',
    type: 'single',
    prompt: 'Kamu lebih tertarik pada pelajaran yang...',
    options: [
      { id: 'a', label: 'Banyak praktik dan mencoba langsung' },
      { id: 'b', label: 'Banyak teori dan penjelasan' },
      { id: 'c', label: 'Banyak diskusi dan presentasi' },
      { id: 'd', label: 'Banyak berkarya dan berkreasi' },
      { id: 'e', label: 'Banyak hitungan dan logika' },
    ],
  },
  {
    id: 'q10',
    type: 'single',
    prompt: 'Saat menghadapi materi yang sulit, biasanya kamu...',
    options: [
      { id: 'a', label: 'Mencoba berbagai cara sampai paham' },
      { id: 'b', label: 'Mencari video atau penjelasan lain' },
      { id: 'c', label: 'Bertanya langsung ke guru atau teman' },
      { id: 'd', label: 'Mengerjakan latihan sebanyak mungkin' },
      { id: 'e', label: 'Mencatat ulang dengan bahasaku sendiri' },
    ],
  },
  {
    id: 'q11',
    type: 'scale',
    prompt: 'Seberapa tertarik kamu belajar melalui proyek atau praktik?',
    helper: 'Pilih satu yang paling mendekati.',
    options: [
      { id: 'a', label: 'Sangat tertarik' },
      { id: 'b', label: 'Cukup tertarik' },
      { id: 'c', label: 'Belum tahu' },
      { id: 'd', label: 'Kurang tertarik' },
    ],
  },
  {
    id: 'q12',
    type: 'single',
    prompt: 'Apa yang paling kamu harapkan dari pendidikan setelah SMP?',
    options: [
      { id: 'a', label: 'Bisa langsung mencoba bidang yang aku minati' },
      { id: 'b', label: 'Punya banyak pilihan sebelum menentukan jurusan' },
      { id: 'c', label: 'Mendapat keterampilan yang bisa langsung dipakai' },
      { id: 'd', label: 'Menyiapkan diri untuk kuliah' },
      { id: 'e', label: 'Belum tahu, aku ingin mencari tahu dulu' },
    ],
  },
  {
    id: 'q13',
    type: 'multi',
    maxSelect: 2,
    prompt: 'Hal apa yang paling kamu pertimbangkan ketika memilih sekolah?',
    helper: 'Pilih maksimal 2.',
    options: [
      { id: 'a', label: 'Mata pelajaran dan jurusan yang tersedia' },
      { id: 'b', label: 'Jarak dari rumah' },
      { id: 'c', label: 'Biaya sekolah' },
      { id: 'd', label: 'Fasilitas praktik dan laboratorium' },
      { id: 'e', label: 'Suasana dan kegiatan di sekolah' },
      { id: 'f', label: 'Peluang setelah lulus' },
    ],
  },
  {
    id: 'q14',
    type: 'multi',
    maxSelect: 2,
    optional: true,
    prompt: 'Bidang mana yang ingin kamu coba meskipun belum tahu apakah kamu cocok?',
    helper: 'Pilih maksimal 2, atau lewati jika belum ada bayangan.',
    options: [
      { id: 'a', label: 'Pemrograman dan aplikasi' },
      { id: 'b', label: 'Jaringan dan komputer' },
      { id: 'c', label: 'Desain dan visual' },
      { id: 'd', label: 'Sains dan penelitian' },
      { id: 'e', label: 'Elektronika' },
    ],
    note: {
      label: 'Bidang lain yang ingin kamu coba (opsional)',
      placeholder: 'Contoh: animasi, fotografi, atau music production.',
    },
  },
  {
    id: 'q15',
    type: 'single',
    prompt: 'Seberapa yakin kamu dengan pilihan sekolah setelah SMP?',
    options: [
      { id: 'a', label: 'Sudah cukup yakin' },
      { id: 'b', label: 'Masih ragu antara beberapa pilihan' },
      { id: 'c', label: 'Belum tahu sama sekali' },
      { id: 'd', label: 'Ingin membandingkan lebih banyak dulu' },
    ],
  },
]

export type EducationLevelId = 'smp' | 'sma-smk'
export type SmaSmkTrackId = 'sma' | 'smk'

export const questionsByLevel: Record<EducationLevelId, Question[]> = {
  smp: questions,

  'sma-smk': smaQuestions,
}

export function getQuestions(
  level: EducationLevelId | null | undefined,
  track?: SmaSmkTrackId | null,
): Question[] {
  if (level === 'sma-smk') {
    return track === 'smk' ? smkQuestions : smaQuestions
  }
  return questions
}

export const stepsByLevel: Record<EducationLevelId, number> = {
  smp: 3,
  'sma-smk': 4,
}

export type AssessmentMode = 'default' | 'ai'

export const AI_RESULTS_PATH = '/hasil/ai'

export const resultsPathByLevel: Record<EducationLevelId, string> = {
  smp: '/hasil',
  'sma-smk': '/hasil/sma-smk',
}

export function resultsPathFor(
  level: EducationLevelId | null | undefined,
  mode?: AssessmentMode | null,
): string {
  if (mode === 'ai') return AI_RESULTS_PATH
  return resultsPathByLevel[level ?? 'smp']
}
