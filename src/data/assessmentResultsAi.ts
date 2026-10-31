
import {
  smaSmkFieldDefinitions,
  type SmaSmkFieldId,
  type StudyProgramme,
  type Profession,
} from './planningSmaSmk'
import { aiQuestions } from './questionsAi'
import type { EducationLevelId, SmaSmkTrackId } from './questions'

type DirectionId = 'kuliah' | 'kerja' | 'hybrid'
type SchoolLean = 'sma' | 'smk' | 'netral'

export interface AiHighlight {
  question: string
  answer: string
}

export interface AiScholarship {
  name: string
  url: string
  note: string
}

export interface AiAssessmentResult {
  hasEnoughSignals: boolean
  answeredCount: number
  summary: string
  direction: { id: DirectionId; name: string; headline: string }
  school: { id: SchoolLean; label: string; note: string }
  field: {
    id: SmaSmkFieldId | null
    name: string
    copy: string
    programmes: StudyProgramme[]
    professions: Profession[]
  }
  reasons: AiHighlight[]
  goals: string[]
  parentNote: string | null
  
  scholarships: AiScholarship[]
}

const directionNames: Record<DirectionId, string> = {
  kuliah: 'Kuliah dulu',
  kerja: 'Kerja / praktik dulu',
  hybrid: 'Kuliah sambil kerja',
}

interface FieldSignal {
  questionId: string
  optionId: string
  field: SmaSmkFieldId
  points: number
}

const fieldSignals: FieldSignal[] = [

  { questionId: 'aq2', optionId: 'a', field: 'tech', points: 4 },
  { questionId: 'aq2', optionId: 'b', field: 'health', points: 4 },
  { questionId: 'aq2', optionId: 'c', field: 'business', points: 4 },
  { questionId: 'aq2', optionId: 'd', field: 'creative', points: 4 },
  { questionId: 'aq2', optionId: 'e', field: 'education-social', points: 4 },
  { questionId: 'aq2', optionId: 'f', field: 'law', points: 4 },
  { questionId: 'aq2', optionId: 'g', field: 'engineering', points: 4 },

  { questionId: 'aq5', optionId: 'a', field: 'tech', points: 2 },
  { questionId: 'aq5', optionId: 'b', field: 'engineering', points: 1 },
  { questionId: 'aq5', optionId: 'c', field: 'education-social', points: 2 },
  { questionId: 'aq5', optionId: 'd', field: 'health', points: 1 },
  { questionId: 'aq5', optionId: 'e', field: 'business', points: 2 },
  { questionId: 'aq5', optionId: 'f', field: 'creative', points: 2 },
  { questionId: 'aq5', optionId: 'g', field: 'engineering', points: 2 },

  { questionId: 'aq8', optionId: 'a', field: 'engineering', points: 1 },
  { questionId: 'aq8', optionId: 'b', field: 'education-social', points: 1 },
  { questionId: 'aq8', optionId: 'c', field: 'health', points: 1 },
  { questionId: 'aq8', optionId: 'd', field: 'tech', points: 2 },
  { questionId: 'aq8', optionId: 'e', field: 'creative', points: 2 },
  { questionId: 'aq8', optionId: 'f', field: 'law', points: 1 },

  { questionId: 'aq10', optionId: 'a', field: 'tech', points: 2 },
  { questionId: 'aq10', optionId: 'b', field: 'education-social', points: 1 },
  { questionId: 'aq10', optionId: 'c', field: 'education-social', points: 2 },
  { questionId: 'aq10', optionId: 'd', field: 'creative', points: 2 },
  { questionId: 'aq10', optionId: 'e', field: 'business', points: 2 },
]

interface DirectionSignal {
  questionId: string
  optionId: string
  direction: DirectionId
  points: number
}

const directionSignals: DirectionSignal[] = [
  { questionId: 'aq1', optionId: 'a', direction: 'kuliah', points: 2 },
  { questionId: 'aq1', optionId: 'b', direction: 'kerja', points: 2 },
  { questionId: 'aq1', optionId: 'c', direction: 'hybrid', points: 3 },
  { questionId: 'aq3', optionId: 'left', direction: 'kuliah', points: 1 },
  { questionId: 'aq3', optionId: 'right', direction: 'kerja', points: 1 },
  { questionId: 'aq4', optionId: 'a', direction: 'kerja', points: 2 },
  { questionId: 'aq4', optionId: 'b', direction: 'kuliah', points: 2 },
  { questionId: 'aq4', optionId: 'c', direction: 'hybrid', points: 3 },
  { questionId: 'aq9', optionId: 'left', direction: 'kerja', points: 1 },
  { questionId: 'aq9', optionId: 'right', direction: 'kuliah', points: 1 },
  { questionId: 'aq11', optionId: 'a', direction: 'kuliah', points: 2 },
  { questionId: 'aq11', optionId: 'b', direction: 'hybrid', points: 1 },
  { questionId: 'aq11', optionId: 'c', direction: 'kerja', points: 1 },
  { questionId: 'aq14', optionId: 'a', direction: 'kuliah', points: 1 },
  { questionId: 'aq14', optionId: 'b', direction: 'kerja', points: 2 },
  { questionId: 'aq14', optionId: 'c', direction: 'hybrid', points: 2 },
]

interface SchoolSignal {
  questionId: string
  optionId: string
  lean: 'sma' | 'smk'
  points: number
}

const schoolSignals: SchoolSignal[] = [
  { questionId: 'aq13', optionId: 'left', lean: 'sma', points: 3 },
  { questionId: 'aq13', optionId: 'right', lean: 'smk', points: 3 },
  { questionId: 'aq3', optionId: 'left', lean: 'sma', points: 1 },
  { questionId: 'aq3', optionId: 'right', lean: 'smk', points: 1 },
  { questionId: 'aq1', optionId: 'a', lean: 'sma', points: 1 },
  { questionId: 'aq1', optionId: 'b', lean: 'smk', points: 1 },
]

const goalFallback = [
  'Cari tahu satu jurusan dan satu pekerjaan nyata di bidang yang kamu minati.',
  'Coba satu proyek atau kegiatan kecil di bidang itu untuk menguji perasaanmu.',
  'Diskusikan hasilnya dengan guru BK atau orang yang sudah lebih dulu menjalani.',
]

function labelFor(questionId: string, optionId: string): AiHighlight | null {
  const question = aiQuestions.find((item) => item.id === questionId)
  const option = question?.options.find((item) => item.id === optionId)
  if (!question || !option) return null
  return { question: question.prompt, answer: option.label }
}

const DISAGREE_WORDS = [
  'beda',
  'tidak setuju',
  'gak setuju',
  'paksa',
  'seharusnya',
  'menentang',
  'tidak mau',
  'gak mau',
  'berdebat',
  'terpaksa',
]
const AGREE_WORDS = ['dukung', 'setuju', 'sejalan', 'merestui', 'idl']

function buildParentNote(tq3: string): string | null {
  const text = tq3.trim().toLowerCase()
  if (!text) return null
  if (DISAGREE_WORDS.some((word) => text.includes(word))) {
    return 'Sepertinya keinginanmu dan harapan orang tuamu belum sepenuhnya sama — dan itu wajar. Beda keinginan bukan berarti kamu salah. Ajak ngobrol pelan-pelan dengan contoh nyata: tunjukkan bidang yang kamu minati, jurusan atau pekerjaannya, dan alasanmu. Ketika orang tua melihat kamu sungguh-sungguh dan punya rencana, mereka biasanya lebih mudah percaya. Kamu pasti bisa menemukan titik temu. Semangat!'
  }
  if (AGREE_WORDS.some((word) => text.includes(word))) {
    return 'Bagus sekali — orang tuamu mendukung jalan yang kamu pilih. Jadikan itu tenaga: tetap siapkan rencanamu matang-matang supaya dukungan itu jadi kenyataan.'
  }
  return 'Sambil menyiapkan rencana, jangan ragu melibatkan orang tuamu dalam percakapan kecil. Cerita tentang bidang yang kamu minati hari ini bisa jadi pemahaman bersama besok.'
}

export function getAiAssessmentResult(input: {
  answers: Record<string, string[]>
  notes: Record<string, string>
  level: EducationLevelId | null
  track?: SmaSmkTrackId | null
}): AiAssessmentResult {
  const { answers, notes, track } = input

  const selected = (questionId: string): string[] => {
    const value = answers?.[questionId]
    return Array.isArray(value) ? value : []
  }

  const fieldScores = new Map<SmaSmkFieldId, number>()
  for (const signal of fieldSignals) {
    if (!selected(signal.questionId).includes(signal.optionId)) continue
    fieldScores.set(
      signal.field,
      (fieldScores.get(signal.field) ?? 0) + signal.points,
    )
  }
  const rankedFields = smaSmkFieldDefinitions
    .filter((field) => (fieldScores.get(field.id) ?? 0) > 0)
    .sort((a, b) => (fieldScores.get(b.id) ?? 0) - (fieldScores.get(a.id) ?? 0))
  const topField = rankedFields[0] ?? null

  const directionScores: Record<DirectionId, number> = {
    kuliah: 0,
    kerja: 0,
    hybrid: 0,
  }
  for (const signal of directionSignals) {
    if (!selected(signal.questionId).includes(signal.optionId)) continue
    directionScores[signal.direction] += signal.points
  }
  const maxDirection = Math.max(
    directionScores.kuliah,
    directionScores.kerja,
    directionScores.hybrid,
  )
  const directionId: DirectionId =
    maxDirection === 0
      ? 'hybrid'
      : directionScores.hybrid === maxDirection
        ? 'hybrid'
        : directionScores.kuliah === maxDirection
          ? 'kuliah'
          : 'kerja'

  const schoolScores: Record<'sma' | 'smk', number> = { sma: 0, smk: 0 }
  for (const signal of schoolSignals) {
    if (!selected(signal.questionId).includes(signal.optionId)) continue
    schoolScores[signal.lean] += signal.points
  }
  const schoolId: SchoolLean =
    schoolScores.sma === schoolScores.smk
      ? 'netral'
      : schoolScores.sma > schoolScores.smk
        ? 'sma'
        : 'smk'

  const reasonQuestions = ['aq2', 'aq4', 'aq13', 'aq14', 'aq11', 'aq1']
  const reasons: AiHighlight[] = []
  for (const questionId of reasonQuestions) {
    for (const optionId of selected(questionId)) {
      const highlight = labelFor(questionId, optionId)
      if (highlight) reasons.push(highlight)
    }
  }

  const goalLabels = selected('aq15')
    .map((optionId) => labelFor('aq15', optionId)?.answer)
    .filter((label): label is string => Boolean(label))
  const goals =
    goalLabels.length >= 3
      ? goalLabels.slice(0, 3)
      : [...goalLabels, ...goalFallback].slice(0, 3)

  const answeredCount = aiQuestions.filter(
    (question) => selected(question.id).length > 0,
  ).length
  const hasEnoughSignals = answeredCount >= 5

  const planText = notes.tq1?.trim() ?? ''
  const fieldName = topField?.name ?? 'beberapa bidang'
  const summary = topField
    ? planText
      ? `Kamu sudah punya bayangan (${truncate(planText)}), dan jawabanmu paling kuat ke bidang ${fieldName} dengan arah ${directionNames[directionId].toLowerCase()}.`
      : `Dari jawabanmu, benang merahnya mengarah ke bidang ${fieldName} dengan langkah awal ${directionNames[directionId].toLowerCase()}.`
    : 'Jawabanmu belum condong ke satu bidang tertentu. Itu tanda eksplorasimu masih terbuka lebar — beberapa pertanyaan lagi akan mempertajam arahnya.'

  const directionHeadline =
    directionId === 'kuliah'
      ? 'Cocok untuk kuliah dulu.'
      : directionId === 'kerja'
        ? 'Cocok untuk mulai kerja atau praktik dulu.'
        : 'Bisa kuliah sambil kerja — tidak harus memilih satu.'

  const schoolCopy: Record<SchoolLean, { label: string; note: string }> = {
    sma: {
      label: 'Cenderung cocok di SMA',
      note: 'Jawabanmu lebih condong ke materi dan persiapan ke jenjang yang lebih tinggi.',
    },
    smk: {
      label: 'Cenderung cocok di SMK',
      note: 'Jawabanmu lebih condong ke praktik dan keterampilan yang langsung terpakai.',
    },
    netral: {
      label: 'SMA dan SMK sama-sama masuk akal',
      note:
        track
          ? 'Belum ada sinyal kuat ke salah satu. Bandingkan keduanya lewat kartu perbandingan di bawah.'
          : 'Sinyalmu seimbang antara teori dan praktik. Bandingkan SMA & SMK sebelum memutuskan.',
    },
  }

  return {
    hasEnoughSignals,
    answeredCount,
    summary,
    direction: { id: directionId, name: directionNames[directionId], headline: directionHeadline },
    school: { id: schoolId, label: schoolCopy[schoolId].label, note: schoolCopy[schoolId].note },
    field: {
      id: topField?.id ?? null,
      name: topField?.name ?? 'Belum ada bidang menonjol',
      copy: topField?.copy ?? 'Isi beberapa pertanyaan tentang bidang untuk melihat arahan yang lebih spesifik.',
      programmes: topField?.programmes ?? [],
      professions: topField?.professions ?? [],
    },
    reasons: reasons.slice(0, 6),
    goals,
    parentNote: buildParentNote(notes.tq3 ?? ''),
    scholarships: [],
  }
}

function truncate(text: string, max = 80): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean
}
