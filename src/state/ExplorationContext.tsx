import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react'
import { getQuestions, type AssessmentMode, type Question } from '../data/questions'
import type { AiAssessmentResult } from '../data/assessmentResultsAi'

export type EducationLevel = 'smp' | 'sma-smk'

export type SchoolTrack = 'sma' | 'smk'

export interface ExplorationState {
  level: EducationLevel | null
  track: SchoolTrack | null
  answers: Record<string, string[]>
  notes: Record<string, string>
  index: number
  completed: boolean
  completedAt: string | null
  
  modeUsed: AssessmentMode | null
  
  aiQuestions: Question[] | null
  
  aiResult: AiAssessmentResult | null
}

type Action =
  | { type: 'level'; level: EducationLevel; track: SchoolTrack | null }
  | { type: 'answer'; questionId: string; selected: string[] }
  | { type: 'note'; questionId: string; note: string }
  | { type: 'index'; index: number }
  | { type: 'complete'; mode: AssessmentMode }
  | { type: 'ai-questions'; questions: Question[] | null }
  | { type: 'ai-result'; result: AiAssessmentResult | null }
  | { type: 'reset' }

const STORAGE_KEY = 'sei.exploration.v1'

export const initialState: ExplorationState = {
  level: null,
  track: null,
  answers: {},
  notes: {},
  index: 0,
  completed: false,
  completedAt: null,
  modeUsed: null,
  aiQuestions: null,
  aiResult: null,
}

function reducer(state: ExplorationState, action: Action): ExplorationState {
  switch (action.type) {
    case 'level':

      return { ...state, level: action.level, track: action.track }
    case 'answer':
      return {
        ...state,
        answers: { ...state.answers, [action.questionId]: action.selected },
      }
    case 'note':
      return {
        ...state,
        notes: { ...state.notes, [action.questionId]: action.note },
      }
    case 'index':
      return { ...state, index: action.index }
    case 'ai-questions':
      return { ...state, aiQuestions: action.questions }
    case 'ai-result':
      return { ...state, aiResult: action.result }
    case 'complete':
      return {
        ...state,
        completed: true,
        modeUsed: action.mode,
        completedAt: state.completedAt ?? new Date().toISOString(),
      }
    case 'reset':
      return initialState
    default:
      return state
  }
}

function readStoredState(): ExplorationState {
  if (typeof window === 'undefined') return initialState

  let raw: string | null = null
  try {
    raw = window.localStorage.getItem(STORAGE_KEY)
  } catch {

  }

  if (!raw) {
    try {
      raw = window.sessionStorage.getItem(STORAGE_KEY)
    } catch {
      return initialState
    }
  }

  if (!raw) return initialState

  try {
    const parsed = JSON.parse(raw) as Partial<ExplorationState>

    const level =
      parsed.level === 'smp' || parsed.level === 'sma-smk' ? parsed.level : null

    const track =
      level === 'sma-smk' && (parsed.track === 'sma' || parsed.track === 'smk')
        ? parsed.track
        : null

    return {
      level,
      track,
      answers: parsed.answers ?? {},
      notes: parsed.notes ?? {},
      index: clampIndex(parsed.index, level, track),
      completed: Boolean(parsed.completed),
      completedAt:
        typeof parsed.completedAt === 'string' ? parsed.completedAt : null,
      modeUsed:
        parsed.modeUsed === 'ai' || parsed.modeUsed === 'default'
          ? parsed.modeUsed
          : null,
      aiQuestions: Array.isArray(parsed.aiQuestions)
        ? (parsed.aiQuestions as Question[])
        : null,
      aiResult:
        parsed.aiResult && typeof parsed.aiResult === 'object'
          ? (parsed.aiResult as AiAssessmentResult)
          : null,
    }
  } catch {
    return initialState
  }
}

function clampIndex(index: unknown, level: EducationLevel | null, track: SchoolTrack | null): number {
  if (typeof index !== 'number' || index < 0) return 0
  const questions = getQuestions(level, track)
  return Math.min(index, questions.length - 1)
}

interface ExplorationContextValue extends ExplorationState {
  answeredCount: number
  setLevel: (level: EducationLevel, track?: SchoolTrack | null) => void
  setAnswer: (questionId: string, selected: string[]) => void
  setNote: (questionId: string, note: string) => void
  setIndex: (index: number) => void
  completeAssessment: (mode: AssessmentMode) => void
  setAiQuestions: (questions: Question[] | null) => void
  setAiResult: (result: AiAssessmentResult | null) => void
  reset: () => void
}

const ExplorationContext = createContext<ExplorationContextValue | null>(null)

export function ExplorationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, readStoredState)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      window.sessionStorage.removeItem(STORAGE_KEY)
    } catch {
      try {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(state))
      } catch {

      }
    }
  }, [state])

  const setLevel = useCallback(
    (level: EducationLevel, track: SchoolTrack | null = null) => {
      dispatch({ type: 'level', level, track })
    },
    [],
  )

  const setAnswer = useCallback((questionId: string, selected: string[]) => {
    dispatch({ type: 'answer', questionId, selected })
  }, [])

  const setNote = useCallback((questionId: string, note: string) => {
    dispatch({ type: 'note', questionId, note })
  }, [])

  const setIndex = useCallback((index: number) => {
    dispatch({ type: 'index', index })
  }, [])

  const completeAssessment = useCallback((mode: AssessmentMode) => {
    dispatch({ type: 'complete', mode })
  }, [])

  const setAiQuestions = useCallback((questions: Question[] | null) => {
    dispatch({ type: 'ai-questions', questions })
  }, [])

  const setAiResult = useCallback((result: AiAssessmentResult | null) => {
    dispatch({ type: 'ai-result', result })
  }, [])

  const reset = useCallback(() => {
    dispatch({ type: 'reset' })
  }, [])

  const answeredCount = useMemo(() => {
    const answered = new Set<string>()
    for (const [id, selected] of Object.entries(state.answers)) {
      if (selected.length > 0) answered.add(id)
    }
    for (const [id, note] of Object.entries(state.notes)) {
      if (id.startsWith('tq') && note.trim().length > 0) answered.add(id)
    }
    return answered.size
  }, [state.answers, state.notes])

  const value = useMemo<ExplorationContextValue>(
    () => ({
      ...state,
      answeredCount,
      setLevel,
      setAnswer,
      setNote,
      setIndex,
      completeAssessment,
      setAiQuestions,
      setAiResult,
      reset,
    }),
    [
      state,
      answeredCount,
      setLevel,
      setAnswer,
      setNote,
      setIndex,
      completeAssessment,
      setAiQuestions,
      setAiResult,
      reset,
    ],
  )

  return (
    <ExplorationContext.Provider value={value}>
      {children}
    </ExplorationContext.Provider>
  )
}

export function useExploration(): ExplorationContextValue {
  const context = useContext(ExplorationContext)
  if (!context) {
    throw new Error('useExploration must be used inside <ExplorationProvider>')
  }
  return context
}
