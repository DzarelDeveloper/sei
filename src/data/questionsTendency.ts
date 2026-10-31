import type { Question } from './questions'

export const tendencyQuestions: Question[] = [
  {
    id: 'tq1',
    type: 'essay',
    options: [],
    prompt: 'Apakah kamu sudah punya rencana atau pilihan untuk langkah setelah ini?',
    placeholder:
      'Contoh: mau lanjut SMA jurusan IPA, SMK jurusan Teknik, kerja dulu, atau belum tahu.',
  },
  {
    id: 'tq2',
    type: 'essay',
    options: [],
    prompt: 'Mengapa kamu memilih rencana itu? Apa yang membuatnya menarik buatmu?',
    placeholder: 'Ceritakan alasannya dengan kata-katamu sendiri.',
  },
  {
    id: 'tq3',
    type: 'essay',
    options: [],
    prompt: 'Apakah ini benar-benar keinginanmu sendiri? Bagaimana pendapat orang tuamu?',
    placeholder:
      'Contoh: ini maunku dan orang tua mendukung, atau orang tua ingin berbeda.',
  },
  {
    id: 'tq4',
    type: 'essay',
    options: [],
    prompt: 'Kalau rencana itu ternyata tidak cocok, apa cadangan atau hal lain yang ingin kamu coba?',
    placeholder: 'Boleh lebih dari satu, atau tulis kalau kamu belum punya bayangan.',
    optional: true,
  },
  {
    id: 'tq5',
    type: 'essay',
    options: [],
    prompt: 'Apa yang paling kamu harapkan — atau paling kamu khawatirkan — dari langkah setelah ini?',
    placeholder: 'Tulis perasaan atau pikiranmu saat membayangkan langkah berikutnya.',
  },
]

export const TENDENCY_IDS = tendencyQuestions.map((question) => question.id)

export function isTendencyId(id: string): boolean {
  return id.startsWith('tq')
}
