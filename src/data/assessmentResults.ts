import { getActivity } from './activities'
import { pathways } from './pathways'
import { questions } from './questions'
import type { ResultField } from './results'

type FieldId = 'software' | 'network' | 'design' | 'science' | 'electronics'
type PathwayId = 'sma' | 'smk'

interface FieldSignal {
  field: FieldId
  points: number
}

interface AnswerSignal {
  questionId: string
  optionId: string
  fields: FieldSignal[]
}

interface FieldDefinition {
  id: FieldId
  name: string
  copy: string
  activityId: string
  smkFieldKey?: string
  smaPathway: string
}

export interface FieldEvidence {
  question: string
  answer: string
}

export interface PersonalizedField extends ResultField {
  score: number
  evidence: FieldEvidence[]
  pathways: string[]
}

export interface PathwaySignal {
  id: PathwayId
  score: number
  evidence: FieldEvidence[]
}

export interface PersonalizedAssessmentResult {
  answeredSignalQuestionCount: number
  hasEnoughSignals: boolean
  summary: string
  primaryFields: PersonalizedField[]
  alternativeFields: PersonalizedField[]
  unexploredFields: string[]
  unansweredPrompts: string[]
  pathways: PathwaySignal[]
  confidenceCopy: string
}

const fieldDefinitions: FieldDefinition[] = [
  {
    id: 'software',
    name: 'Pengembangan Perangkat Lunak',
    copy: 'Membuat aplikasi, situs web, dan program kecil untuk menyelesaikan masalah.',
    activityId: 'webpage',
    smkFieldKey: 'pplg',
    smaPathway: 'Informatika atau kegiatan teknologi di SMA',
  },
  {
    id: 'network',
    name: 'Jaringan dan Sistem Komputer',
    copy: 'Mempelajari cara perangkat terhubung dan bertukar informasi.',
    activityId: 'network',
    smkFieldKey: 'tjkt',
    smaPathway: 'Informatika atau klub teknologi di SMA',
  },
  {
    id: 'design',
    name: 'Desain dan Kreativitas Digital',
    copy: 'Menyusun tampilan dan pesan visual agar mudah dipahami.',
    activityId: 'design',
    smkFieldKey: 'dkv',
    smaPathway: 'Seni, desain, atau media sekolah di SMA',
  },
  {
    id: 'science',
    name: 'Sains dan Penelitian',
    copy: 'Menyusun pertanyaan, mencoba, lalu memahami hasil pengamatan.',
    activityId: 'science',
    smaPathway: 'Mata pelajaran dan kegiatan sains di SMA',
  },
  {
    id: 'electronics',
    name: 'Elektronika dan Perangkat Keras',
    copy: 'Mengenal komponen dan cara kerja perangkat melalui rangkaian sederhana.',
    activityId: 'electronics',
    smkFieldKey: 'elektronika',
    smaPathway: 'Fisika, klub sains, atau proyek teknologi di SMA',
  },
]

const fieldSignals: AnswerSignal[] = [
  { questionId: 'q1', optionId: 'a', fields: [{ field: 'software', points: 3 }] },
  { questionId: 'q1', optionId: 'b', fields: [{ field: 'design', points: 3 }] },
  { questionId: 'q1', optionId: 'c', fields: [{ field: 'science', points: 2 }] },
  { questionId: 'q1', optionId: 'd', fields: [{ field: 'electronics', points: 3 }] },
  { questionId: 'q4', optionId: 'a', fields: [{ field: 'software', points: 3 }] },
  { questionId: 'q4', optionId: 'b', fields: [{ field: 'software', points: 2 }] },
  { questionId: 'q4', optionId: 'c', fields: [{ field: 'design', points: 3 }] },
  { questionId: 'q4', optionId: 'd', fields: [{ field: 'network', points: 3 }] },
  { questionId: 'q4', optionId: 'e', fields: [{ field: 'science', points: 3 }] },
  { questionId: 'q5', optionId: 'b', fields: [{ field: 'software', points: 1 }, { field: 'network', points: 1 }, { field: 'electronics', points: 1 }] },
  { questionId: 'q5', optionId: 'c', fields: [{ field: 'design', points: 1 }] },
  { questionId: 'q5', optionId: 'd', fields: [{ field: 'science', points: 1 }] },
  { questionId: 'q6', optionId: 'a', fields: [{ field: 'design', points: 2 }] },
  { questionId: 'q6', optionId: 'b', fields: [{ field: 'software', points: 2 }] },
  { questionId: 'q6', optionId: 'c', fields: [{ field: 'design', points: 2 }] },
  { questionId: 'q6', optionId: 'd', fields: [{ field: 'science', points: 2 }] },
  { questionId: 'q6', optionId: 'e', fields: [{ field: 'electronics', points: 2 }] },
  { questionId: 'q7', optionId: 'a', fields: [{ field: 'software', points: 3 }] },
  { questionId: 'q7', optionId: 'b', fields: [{ field: 'design', points: 3 }] },
  { questionId: 'q7', optionId: 'c', fields: [{ field: 'network', points: 3 }] },
  { questionId: 'q7', optionId: 'd', fields: [{ field: 'electronics', points: 3 }] },
  { questionId: 'q7', optionId: 'e', fields: [{ field: 'design', points: 2 }] },
  { questionId: 'q8', optionId: 'a', fields: [{ field: 'software', points: 4 }] },
  { questionId: 'q8', optionId: 'b', fields: [{ field: 'network', points: 4 }] },
  { questionId: 'q8', optionId: 'c', fields: [{ field: 'design', points: 4 }] },
  { questionId: 'q8', optionId: 'd', fields: [{ field: 'science', points: 4 }] },
  { questionId: 'q8', optionId: 'e', fields: [{ field: 'electronics', points: 4 }] },
  { questionId: 'q9', optionId: 'd', fields: [{ field: 'design', points: 1 }] },
  { questionId: 'q9', optionId: 'e', fields: [{ field: 'software', points: 1 }, { field: 'network', points: 1 }] },
  { questionId: 'q9', optionId: 'a', fields: [{ field: 'electronics', points: 1 }] },
  { questionId: 'q14', optionId: 'a', fields: [{ field: 'software', points: 4 }] },
  { questionId: 'q14', optionId: 'b', fields: [{ field: 'network', points: 4 }] },
  { questionId: 'q14', optionId: 'c', fields: [{ field: 'design', points: 4 }] },
  { questionId: 'q14', optionId: 'd', fields: [{ field: 'science', points: 4 }] },
  { questionId: 'q14', optionId: 'e', fields: [{ field: 'electronics', points: 4 }] },
]

const pathwaySignals: Array<{
  questionId: string
  optionId: string
  pathway: PathwayId
  points: number
}> = [
  { questionId: 'q11', optionId: 'a', pathway: 'smk', points: 2 },
  { questionId: 'q11', optionId: 'b', pathway: 'smk', points: 1 },
  { questionId: 'q11', optionId: 'd', pathway: 'sma', points: 1 },
  { questionId: 'q12', optionId: 'a', pathway: 'smk', points: 2 },
  { questionId: 'q12', optionId: 'b', pathway: 'sma', points: 2 },
  { questionId: 'q12', optionId: 'c', pathway: 'smk', points: 2 },
  { questionId: 'q12', optionId: 'd', pathway: 'sma', points: 2 },
  { questionId: 'q13', optionId: 'a', pathway: 'sma', points: 1 },
  { questionId: 'q13', optionId: 'a', pathway: 'smk', points: 1 },
  { questionId: 'q13', optionId: 'd', pathway: 'smk', points: 2 },
]

const promptsForMoreSignals = ['q1', 'q4', 'q7', 'q8', 'q14']

function getAnswerEvidence(
  questionId: string,
  optionId: string,
): FieldEvidence | undefined {
  const question = questions.find((item) => item.id === questionId)
  const option = question?.options.find((item) => item.id === optionId)
  if (!question || !option) return undefined

  return { question: question.prompt, answer: option.label }
}

function getFieldRecommendation(
  definition: FieldDefinition,
  score: number,
  evidence: FieldEvidence[],
): PersonalizedField {
  const smkField = pathways.smk.fields?.find(
    (field) => field.key === definition.smkFieldKey,
  )
  const activity = getActivity(definition.activityId)
  const why = evidence
    .slice(0, 3)
    .map(
      ({ answer }) =>
        `Pilihan “${answer}” menambah sinyal untuk mengeksplorasi bidang ini.`,
    )
    .join(' ')

  return {
    id: definition.id,
    name: definition.name,
    copy: definition.copy,
    why,
    nextStep: activity?.summary ?? 'Cari kegiatan pemula untuk mencoba bidang ini.',
    activityId: definition.activityId,
    matchKeys: smkField ? [smkField.key] : [],
    score,
    evidence,
    pathways: [
      ...(smkField ? [`SMK: ${smkField.name}`] : []),
      `SMA: ${definition.smaPathway}`,
    ],
  }
}

export function getPersonalizedAssessmentResult(
  answers: Record<string, string[]>,
): PersonalizedAssessmentResult {
  const scores = new Map<FieldId, number>()
  const evidence = new Map<FieldId, FieldEvidence[]>()
  const answeredSignalQuestions = new Set<string>()
  const selectedOptions = (questionId: string): string[] => {
    const selected = answers?.[questionId]
    return Array.isArray(selected)
      ? selected.filter((optionId): optionId is string => typeof optionId === 'string')
      : []
  }

  for (const signal of fieldSignals) {
    if (!selectedOptions(signal.questionId).includes(signal.optionId)) continue
    const answerEvidence = getAnswerEvidence(signal.questionId, signal.optionId)
    if (!answerEvidence) continue

    answeredSignalQuestions.add(signal.questionId)
    for (const { field, points } of signal.fields) {
      scores.set(field, (scores.get(field) ?? 0) + points)
      const fieldEvidence = evidence.get(field) ?? []
      if (
        !fieldEvidence.some(
          (item) =>
            item.question === answerEvidence.question &&
            item.answer === answerEvidence.answer,
        )
      ) {
        fieldEvidence.push(answerEvidence)
      }
      evidence.set(field, fieldEvidence)
    }
  }

  const rankedFields = fieldDefinitions
    .map((definition, order) => ({
      definition,
      order,
      score: scores.get(definition.id) ?? 0,
      evidence: evidence.get(definition.id) ?? [],
    }))
    .filter((field) => field.score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .map(({ definition, score, evidence: fieldEvidence }) =>
      getFieldRecommendation(definition, score, fieldEvidence),
    )

  const topScore = rankedFields[0]?.score ?? 0
  const leadingFields = rankedFields.filter((field) => field.score === topScore)
  const summary =
    leadingFields.length === 0
      ? 'Belum ada cukup jawaban pilihan bidang untuk merangkum pola minat. Kamu bisa melanjutkan atau mengulang asesmen kapan saja.'
      : `Dari jawaban yang kamu isi, sinyal eksplorasi paling kuat saat ini mengarah ke ${leadingFields.map((field) => field.name).join(' dan ')}. Ini hanya ringkasan pilihanmu, bukan penilaian bakat atau keputusan tentang masa depan.`

  const pathwayScores: Record<PathwayId, number> = { sma: 0, smk: 0 }
  const pathwayEvidence: Record<PathwayId, FieldEvidence[]> = { sma: [], smk: [] }
  for (const signal of pathwaySignals) {
    if (!selectedOptions(signal.questionId).includes(signal.optionId)) continue
    const answerEvidence = getAnswerEvidence(signal.questionId, signal.optionId)
    if (!answerEvidence) continue
    pathwayScores[signal.pathway] += signal.points
    pathwayEvidence[signal.pathway].push(answerEvidence)
  }

  const answered = (questionId: string) =>
    selectedOptions(questionId).some((optionId) =>
      questions
        .find((question) => question.id === questionId)
        ?.options.some((option) => option.id === optionId),
    )

  const unansweredPrompts = promptsForMoreSignals
    .filter((questionId) => !answered(questionId))
    .map((questionId) => questions.find((question) => question.id === questionId)?.prompt)
    .filter((prompt): prompt is string => Boolean(prompt))

  const unexploredFields = fieldDefinitions
    .filter((field) => (scores.get(field.id) ?? 0) === 0)
    .map((field) => field.name)

  const answeredSignalQuestionCount = answeredSignalQuestions.size
  const hasEnoughSignals = answeredSignalQuestionCount >= 3

  return {
    answeredSignalQuestionCount,
    hasEnoughSignals,
    summary,
    primaryFields: rankedFields.slice(0, 3),
    alternativeFields: rankedFields.slice(3, 5),
    unexploredFields,
    unansweredPrompts,
    pathways: (['sma', 'smk'] as const).map((id) => ({
      id,
      score: pathwayScores[id],
      evidence: pathwayEvidence[id],
    })),
    confidenceCopy: hasEnoughSignals
      ? 'Beberapa jawaban pilihan bidang sudah memberi sinyal untuk mulai dijelajahi. Jumlah ini bukan ukuran minat, bakat, atau kecocokan yang tervalidasi.'
      : 'Sinyal pilihan bidang masih terbatas. Rekomendasi yang muncul bersifat awal; jawab lebih banyak pertanyaan pilihan bidang untuk mendapat gambaran yang lebih beragam.',
  }
}

export function getPathwayPreferenceCopy(
  pathwaySignalsForUser: PathwaySignal[],
): string {
  const [sma, smk] = pathwaySignalsForUser
  if (!sma || !smk || (sma.score === 0 && smk.score === 0)) {
    return 'Belum ada cukup jawaban tentang preferensi pendidikan untuk membandingkan kedua jalur. Kamu tetap bisa membaca dan membandingkannya.'
  }
  if (sma.score === smk.score) {
    return 'Jawabanmu belum mengarah jelas ke salah satu jalur. Membandingkan SMA dan SMK bisa menjadi langkah eksplorasi berikutnya.'
  }

  const leading = sma.score > smk.score ? sma : smk
  const name = leading.id === 'sma' ? 'SMA' : 'SMK'
  return `Jawaban tentang cara belajar dan harapan setelah SMP saat ini lebih banyak mengarah ke ${name}. Ini bahan untuk dibandingkan, bukan keputusan final.`
}
