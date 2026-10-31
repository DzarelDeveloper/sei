
import {
  smaSmkFieldDefinitions,
  type SmaSmkFieldId,
  type StudyProgramme,
  type Profession,
} from './planningSmaSmk'
import { smaQuestions } from './questionsSma'
import { smkQuestions } from './questionsSmk'
import type { Question, SmaSmkTrackId } from './questions'

type DirectionId = 'kuliah' | 'kerja' | 'hybrid'

export interface SmaSmkFieldEvidence {
  question: string
  answer: string
}

export interface SmaSmkPersonalizedField {
  id: SmaSmkFieldId
  name: string
  copy: string
  why: string
  nextStep: string
  score: number
  evidence: SmaSmkFieldEvidence[]
  programmes: StudyProgramme[]
  professions: Profession[]
}

export interface SmaSmkDirectionSignal {
  id: DirectionId
  name: string
  score: number
  evidence: SmaSmkFieldEvidence[]
}

export interface SmaSmkAssessmentResult {
  answeredSignalQuestionCount: number
  hasEnoughSignals: boolean
  summary: string
  primaryFields: SmaSmkPersonalizedField[]
  alternativeFields: SmaSmkPersonalizedField[]
  unexploredFields: string[]
  unansweredPrompts: string[]
  directions: SmaSmkDirectionSignal[]
  directionCopy: string
  confidenceCopy: string
}

interface FieldSignal {
  questionId: string
  optionId: string
  field: SmaSmkFieldId
  points: number
}

const fieldSignals: FieldSignal[] = [

  { questionId: 'sq1', optionId: 'a', field: 'tech', points: 2 },
  { questionId: 'sq1', optionId: 'b', field: 'creative', points: 2 },
  { questionId: 'sq1', optionId: 'c', field: 'health', points: 2 },
  { questionId: 'sq1', optionId: 'd', field: 'business', points: 2 },
  { questionId: 'sq1', optionId: 'e', field: 'education-social', points: 2 },
  { questionId: 'sq1', optionId: 'f', field: 'engineering', points: 2 },

  { questionId: 'sq2', optionId: 'a', field: 'health', points: 1 },
  { questionId: 'sq2', optionId: 'a', field: 'law', points: 1 },
  { questionId: 'sq2', optionId: 'a', field: 'engineering', points: 1 },
  { questionId: 'sq2', optionId: 'b', field: 'business', points: 1 },
  { questionId: 'sq2', optionId: 'c', field: 'tech', points: 1 },
  { questionId: 'sq2', optionId: 'c', field: 'creative', points: 1 },
  { questionId: 'sq2', optionId: 'd', field: 'engineering', points: 1 },

  { questionId: 'sq3', optionId: 'a', field: 'law', points: 1 },
  { questionId: 'sq3', optionId: 'a', field: 'education-social', points: 1 },
  { questionId: 'sq3', optionId: 'b', field: 'tech', points: 1 },
  { questionId: 'sq3', optionId: 'b', field: 'creative', points: 1 },
  { questionId: 'sq3', optionId: 'c', field: 'health', points: 1 },
  { questionId: 'sq3', optionId: 'c', field: 'engineering', points: 1 },
  { questionId: 'sq3', optionId: 'd', field: 'education-social', points: 1 },
  { questionId: 'sq3', optionId: 'e', field: 'business', points: 1 },

  { questionId: 'sq4', optionId: 'a', field: 'tech', points: 4 },
  { questionId: 'sq4', optionId: 'b', field: 'health', points: 4 },
  { questionId: 'sq4', optionId: 'c', field: 'business', points: 4 },
  { questionId: 'sq4', optionId: 'd', field: 'creative', points: 4 },
  { questionId: 'sq4', optionId: 'e', field: 'education-social', points: 4 },
  { questionId: 'sq4', optionId: 'f', field: 'law', points: 4 },
  { questionId: 'sq4', optionId: 'g', field: 'engineering', points: 4 },

  { questionId: 'sq5', optionId: 'a', field: 'tech', points: 2 },
  { questionId: 'sq5', optionId: 'a', field: 'education-social', points: 1 },
  { questionId: 'sq5', optionId: 'b', field: 'health', points: 2 },
  { questionId: 'sq5', optionId: 'c', field: 'business', points: 2 },
  { questionId: 'sq5', optionId: 'd', field: 'creative', points: 2 },
  { questionId: 'sq5', optionId: 'e', field: 'engineering', points: 2 },
  { questionId: 'sq5', optionId: 'f', field: 'law', points: 2 },

  { questionId: 'sq6', optionId: 'a', field: 'law', points: 1 },
  { questionId: 'sq6', optionId: 'a', field: 'education-social', points: 1 },
  { questionId: 'sq6', optionId: 'b', field: 'tech', points: 1 },
  { questionId: 'sq6', optionId: 'b', field: 'creative', points: 1 },
  { questionId: 'sq6', optionId: 'c', field: 'health', points: 1 },
  { questionId: 'sq6', optionId: 'c', field: 'engineering', points: 1 },
  { questionId: 'sq6', optionId: 'd', field: 'business', points: 1 },
  { questionId: 'sq6', optionId: 'e', field: 'tech', points: 1 },

  { questionId: 'sq7', optionId: 'a', field: 'health', points: 1 },
  { questionId: 'sq7', optionId: 'a', field: 'engineering', points: 1 },
  { questionId: 'sq7', optionId: 'a', field: 'law', points: 1 },
  { questionId: 'sq7', optionId: 'b', field: 'business', points: 1 },
  { questionId: 'sq7', optionId: 'c', field: 'education-social', points: 1 },
  { questionId: 'sq7', optionId: 'd', field: 'creative', points: 1 },
  { questionId: 'sq7', optionId: 'd', field: 'tech', points: 1 },

  { questionId: 'sq8', optionId: 'a', field: 'tech', points: 3 },
  { questionId: 'sq8', optionId: 'b', field: 'health', points: 3 },
  { questionId: 'sq8', optionId: 'c', field: 'creative', points: 3 },
  { questionId: 'sq8', optionId: 'd', field: 'business', points: 3 },
  { questionId: 'sq8', optionId: 'e', field: 'education-social', points: 3 },
  { questionId: 'sq8', optionId: 'f', field: 'law', points: 3 },
  { questionId: 'sq8', optionId: 'g', field: 'engineering', points: 3 },

  { questionId: 'sq9', optionId: 'a', field: 'tech', points: 2 },
  { questionId: 'sq9', optionId: 'b', field: 'creative', points: 2 },
  { questionId: 'sq9', optionId: 'c', field: 'education-social', points: 2 },
  { questionId: 'sq9', optionId: 'd', field: 'business', points: 2 },
  { questionId: 'sq9', optionId: 'e', field: 'law', points: 1 },
  { questionId: 'sq9', optionId: 'e', field: 'education-social', points: 1 },
  { questionId: 'sq9', optionId: 'f', field: 'engineering', points: 2 },

  { questionId: 'sq12', optionId: 'a', field: 'business', points: 1 },
  { questionId: 'sq12', optionId: 'a', field: 'law', points: 1 },
  { questionId: 'sq12', optionId: 'b', field: 'health', points: 1 },
  { questionId: 'sq12', optionId: 'b', field: 'engineering', points: 1 },
  { questionId: 'sq12', optionId: 'c', field: 'creative', points: 1 },
  { questionId: 'sq12', optionId: 'd', field: 'tech', points: 1 },
  { questionId: 'sq12', optionId: 'e', field: 'business', points: 1 },

  { questionId: 'sq13', optionId: 'a', field: 'tech', points: 4 },
  { questionId: 'sq13', optionId: 'b', field: 'health', points: 4 },
  { questionId: 'sq13', optionId: 'c', field: 'business', points: 4 },
  { questionId: 'sq13', optionId: 'd', field: 'creative', points: 4 },
  { questionId: 'sq13', optionId: 'e', field: 'education-social', points: 4 },
  { questionId: 'sq13', optionId: 'f', field: 'law', points: 4 },
  { questionId: 'sq13', optionId: 'g', field: 'engineering', points: 4 },
]

interface DirectionSignal {
  questionId: string
  optionId: string
  direction: DirectionId
  points: number
}

const directionSignals: DirectionSignal[] = [

  { questionId: 'sq2', optionId: 'a', direction: 'kuliah', points: 2 },
  { questionId: 'sq2', optionId: 'b', direction: 'kerja', points: 2 },
  { questionId: 'sq2', optionId: 'c', direction: 'hybrid', points: 2 },
  { questionId: 'sq2', optionId: 'd', direction: 'kerja', points: 1 },

  { questionId: 'sq6', optionId: 'a', direction: 'kuliah', points: 1 },
  { questionId: 'sq6', optionId: 'b', direction: 'kerja', points: 1 },
  { questionId: 'sq6', optionId: 'c', direction: 'kerja', points: 1 },
  { questionId: 'sq6', optionId: 'd', direction: 'kerja', points: 1 },
  { questionId: 'sq6', optionId: 'e', direction: 'hybrid', points: 1 },

  { questionId: 'sq10', optionId: 'a', direction: 'kuliah', points: 1 },
  { questionId: 'sq10', optionId: 'b', direction: 'hybrid', points: 1 },
  { questionId: 'sq10', optionId: 'c', direction: 'kerja', points: 1 },
  { questionId: 'sq10', optionId: 'd', direction: 'kuliah', points: 1 },

  { questionId: 'sq11', optionId: 'a', direction: 'kuliah', points: 2 },
  { questionId: 'sq11', optionId: 'b', direction: 'kuliah', points: 1 },
  { questionId: 'sq11', optionId: 'c', direction: 'hybrid', points: 1 },
  { questionId: 'sq11', optionId: 'd', direction: 'kerja', points: 1 },
  { questionId: 'sq11', optionId: 'e', direction: 'kerja', points: 2 },

  { questionId: 'sq14', optionId: 'a', direction: 'kuliah', points: 3 },
  { questionId: 'sq14', optionId: 'b', direction: 'kerja', points: 3 },
  { questionId: 'sq14', optionId: 'c', direction: 'hybrid', points: 3 },
  { questionId: 'sq14', optionId: 'd', direction: 'kerja', points: 2 },
]

const directionNames: Record<DirectionId, string> = {
  kuliah: 'Kuliah dulu',
  kerja: 'Kerja / praktik dulu',
  hybrid: 'Kuliah dan kerja bareng',
}

const promptsForMoreSignals = ['sq4', 'sq5', 'sq8', 'sq13']

function questionsForTrack(track?: SmaSmkTrackId | null): Question[] {
  return track === 'smk' ? smkQuestions : smaQuestions
}

function getAnswerEvidence(
  questionId: string,
  optionId: string,
  questions: Question[],
): SmaSmkFieldEvidence | undefined {
  const question = questions.find((item) => item.id === questionId)
  const option = question?.options.find((item) => item.id === optionId)
  if (!question || !option) return undefined

  return { question: question.prompt, answer: option.label }
}

export function getPersonalizedSmaSmkResult(
  answers: Record<string, string[]>,
  track?: SmaSmkTrackId | null,
): SmaSmkAssessmentResult {
  const questions = questionsForTrack(track)
  const scores = new Map<SmaSmkFieldId, number>()
  const evidence = new Map<SmaSmkFieldId, SmaSmkFieldEvidence[]>()
  const answeredSignalQuestions = new Set<string>()

  const selectedOptions = (questionId: string): string[] => {
    const selected = answers?.[questionId]
    return Array.isArray(selected)
      ? selected.filter((optionId): optionId is string => typeof optionId === 'string')
      : []
  }

  for (const signal of fieldSignals) {
    if (!selectedOptions(signal.questionId).includes(signal.optionId)) continue
    const answerEvidence = getAnswerEvidence(signal.questionId, signal.optionId, questions)
    if (!answerEvidence) continue

    answeredSignalQuestions.add(signal.questionId)
    scores.set(signal.field, (scores.get(signal.field) ?? 0) + signal.points)
    const fieldEvidence = evidence.get(signal.field) ?? []
    if (
      !fieldEvidence.some(
        (item) =>
          item.question === answerEvidence.question &&
          item.answer === answerEvidence.answer,
      )
    ) {
      fieldEvidence.push(answerEvidence)
    }
    evidence.set(signal.field, fieldEvidence)
  }

  const rankedFields = smaSmkFieldDefinitions
    .map((definition, order) => ({
      definition,
      order,
      score: scores.get(definition.id) ?? 0,
      fieldEvidence: evidence.get(definition.id) ?? [],
    }))
    .filter((field) => field.score > 0)
    .sort((a, b) => b.score - a.score || a.order - b.order)
    .map(({ definition, score, fieldEvidence }) => ({
      id: definition.id,
      name: definition.name,
      copy: definition.copy,
      why: fieldEvidence
        .slice(0, 3)
        .map(
          ({ answer }) =>
            `Pilihan “${answer}” menambah sinyal untuk mengeksplorasi bidang ini.`,
        )
        .join(' '),
      nextStep: definition.nextStep,
      score,
      evidence: fieldEvidence,
      programmes: definition.programmes,
      professions: definition.professions,
    }))

  const topScore = rankedFields[0]?.score ?? 0
  const leadingFields = rankedFields.filter((field) => field.score === topScore)
  const summary =
    leadingFields.length === 0
      ? 'Belum ada cukup jawaban tentang bidang dan profesi untuk merangkum arahmu. Lanjutkan atau ulangi asesmen kapan saja.'
      : `Dari jawabanmu, arah eksplorasi paling kuat saat ini mengarah ke ${leadingFields.map((field) => field.name).join(' dan ')}, dengan beberapa jurusan dan profesi di bidang itu yang layak kamu bandingkan. Ini ringkasan pilihanmu, bukan vonis tentang masa depan.`

  const directionScores: Record<DirectionId, number> = { kuliah: 0, kerja: 0, hybrid: 0 }
  const directionEvidence: Record<DirectionId, SmaSmkFieldEvidence[]> = {
    kuliah: [],
    kerja: [],
    hybrid: [],
  }
  for (const signal of directionSignals) {
    if (!selectedOptions(signal.questionId).includes(signal.optionId)) continue
    const answerEvidence = getAnswerEvidence(signal.questionId, signal.optionId, questions)
    if (!answerEvidence) continue
    directionScores[signal.direction] += signal.points
    directionEvidence[signal.direction].push(answerEvidence)
  }

  const directions: SmaSmkDirectionSignal[] = (
    ['kuliah', 'kerja', 'hybrid'] as const
  ).map((id) => ({
    id,
    name: directionNames[id],
    score: directionScores[id],
    evidence: directionEvidence[id],
  }))

  const directionCopy = (() => {
    const maxScore = Math.max(...directions.map((item) => item.score))
    if (maxScore === 0) {
      return 'Belum ada cukup jawaban tentang rencana setelah lulus untuk membandingkan jalur kuliah dan kerja. Keduanya tetap layak kamu jelajahi.'
    }
    const leading = directions.filter((item) => item.score === maxScore)
    if (leading.length > 1 && leading.some((item) => item.id === 'hybrid')) {
      return 'Jawabanmu seimbang antara kuliah dan bekerja — bahkan terbuka pada keduanya sekaligus. Membandingkan skenario nyata di bidang yang kamu minati adalah langkah berikutnya.'
    }
    if (leading.length > 1) {
      return `Jawabanmu seimbang antara ${leading.map((item) => item.name.toLowerCase()).join(' dan ')}. Tidak perlu buru-buru memilih; bandingkan dulu skenario nyatanya.`
    }
    const [top] = leading
    return `Jawabanmu saat ini paling sering condong ke “${top.name.toLowerCase()}”. Gunakan itu sebagai bahan untuk dicari contohnya di bidang yang ingin kamu dalami, bukan sebagai keputusan final.`
  })()

  const answered = (questionId: string) =>
    selectedOptions(questionId).some((optionId) =>
      questions
        .find((question) => question.id === questionId)
        ?.options.some((option) => option.id === optionId),
    )

  const unansweredPrompts = promptsForMoreSignals
    .filter((questionId) => !answered(questionId))
    .map(
      (questionId) =>
        questions.find((question) => question.id === questionId)?.prompt,
    )
    .filter((prompt): prompt is string => Boolean(prompt))

  const unexploredFields = smaSmkFieldDefinitions
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
    directions,
    directionCopy,
    confidenceCopy: hasEnoughSignals
      ? 'Beberapa jawaban tentang bidang dan profesi sudah memberi sinyal arah. Jumlah ini bukan ukuran minat, bakat, atau kecocokan yang tervalidasi.'
      : 'Sinyal bidang masih terbatas. Rekomendasi yang muncul bersifat awal; jawab lebih banyak pertanyaan tentang bidang dan profesi untuk gambaran yang lebih beragam.',
  }
}
