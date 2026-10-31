import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { CharacterSwitcher } from '../components/CharacterSwitcher'
import { ChoiceList } from '../components/ChoiceList'
import {
  IconAlert,
  IconArrowLeft,
  IconArrowRight,
  IconClose,
} from '../components/Icons'
import { FocusLayout } from '../components/Layout'
import { Mascot } from '../components/Mascot'
import { Modal } from '../components/Modal'
import { ProgressBar } from '../components/ProgressBar'
import { getQuestions, resultsPathFor } from '../data/questions'
import { buildAiQuestions } from '../data/questionsAi'
import { aiGenerateQuestions } from '../services/aiFlow'
import { useExploration } from '../state/ExplorationContext'
import { useSettings } from '../state/SettingsContext'

export function AssessmentPage() {
  const navigate = useNavigate()
  const {
    level,
    track,
    completed,
    answers,
    notes,
    index,
    setIndex,
    setAnswer,
    setNote,
    completeAssessment,
    aiQuestions,
    setAiQuestions,
  } = useExploration()
  const { mode, apiKey } = useSettings()

  const [error, setError] = useState<string | null>(null)
  const [exitOpen, setExitOpen] = useState(false)
  const [direction, setDirection] = useState<'next' | 'prev'>('next')
  const headingRef = useRef<HTMLHeadingElement>(null)

  const aiActive = mode === 'ai' && apiKey.trim().length > 0
  const questions = aiActive
    ? aiQuestions ?? buildAiQuestions(level, track)
    : getQuestions(level, track)
  const total = questions.length
  const safeIndex = Math.min(Math.max(index, 0), total - 1)
  const question = questions[safeIndex]
  const selected = answers[question.id] ?? []
  const note = notes[question.id] ?? ''
  const hasAnswer = selected.length > 0 || note.trim().length > 0

  const isLast = safeIndex === total - 1

  const [preparing, setPreparing] = useState<boolean>(
    () => aiActive && aiQuestions === null,
  )
  const [prepError, setPrepError] = useState<string | null>(null)

  const genRef = useRef<Promise<Awaited<ReturnType<typeof aiGenerateQuestions>>> | null>(
    null,
  )

  useEffect(() => {
    if (!aiActive || aiQuestions) return
    if (!genRef.current) {
      genRef.current = aiGenerateQuestions(apiKey, {
        level,
        track,
        essays: notes,
      })
    }
    let active = true
    genRef.current
      .then((generated) => {
        if (!active) return
        setAiQuestions(generated)
        setPreparing(false)
      })
      .catch((err: unknown) => {
        if (!active) return
        setPrepError(
          err instanceof Error ? err.message : 'Gagal menyusun soal AI.',
        )
        setPreparing(false)
      })
    return () => {
      active = false
    }
  }, [aiActive, aiQuestions, apiKey, level, track, notes, setAiQuestions])

  const helper = useMemo(() => {
    if (question.type === 'multi') {
      return question.helper ?? `Pilih maksimal ${question.maxSelect ?? 1}.`
    }
    if (question.type === 'linear') {
      return question.helper ?? 'Pilih sisi yang paling mewakili dirimu.'
    }
    if (question.type === 'scale' || question.type === 'essay') {
      return question.helper
    }
    return undefined
  }, [question])

  useEffect(() => {

    headingRef.current?.focus()
    setError(null)
  }, [safeIndex])

  if (level === null || (level === 'sma-smk' && track === null)) {
    return <Navigate to="/mulai" replace />
  }

  if (completed) {
    return <Navigate to={resultsPathFor(level, aiActive ? 'ai' : 'default')} replace />
  }

  if (preparing) {
    return (
      <FocusLayout>
        <div className="ai-preparing" aria-live="polite">
          <div className="ai-preparing__visual">
            <span className="ai-preparing__ring" />
            <Mascot pose="thinking" className="ai-preparing__mascot" />
          </div>
          <h1 className="ai-preparing__title">AI sedang menyusun soalmu…</h1>
          <p className="ai-preparing__copy">
            Berdasarkan jawaban kecenderunganmu, AI menyiapkan 15 pertanyaan yang
            paling cocok — campuran pilihan ganda, pilih lebih dari satu, dan
            skala preferensi.
          </p>
          <span className="complete__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </div>
      </FocusLayout>
    )
  }

  const goNext = () => {
    if (!hasAnswer && !question.optional) {
      setError(
        question.type === 'essay'
          ? 'Tulis jawabanmu dulu sebelum melanjutkan.'
          : question.type === 'multi'
            ? 'Pilih minimal satu jawaban sebelum melanjutkan.'
            : 'Pilih satu jawaban sebelum melanjutkan.',
      )
      return
    }

    setError(null)

    if (isLast) {
      completeAssessment(aiActive ? 'ai' : 'default')
      navigate('/asesmen/selesai')
      return
    }

    setDirection('next')
    setIndex(safeIndex + 1)
  }

  const goBack = () => {
    if (safeIndex === 0) {

      navigate(aiActive ? '/asesmen/kecenderungan' : '/asesmen/pengantar')
      return
    }
    setDirection('prev')
    setIndex(safeIndex - 1)
  }

  const skip = () => {
    setError(null)
    setAnswer(question.id, [])
    setNote(question.id, '')
    if (isLast) {
      completeAssessment(aiActive ? 'ai' : 'default')
      navigate('/asesmen/selesai')
      return
    }
    setDirection('next')
    setIndex(safeIndex + 1)
  }

  return (
    <FocusLayout
      headerRight={
        <div className="focus__actions">
          <CharacterSwitcher variant="focus" />
          <button
            type="button"
            className="focus__exit"
            onClick={() => setExitOpen(true)}
          >
            <IconClose />
            Keluar
          </button>
        </div>
      }
    >
      <div className="assessment">
        {prepError ? (
          <p className="assessment__error" role="status">
            <IconAlert />
            AI gagal menyusun soal ({prepError}). Dipakai soal standar dulu —
            cek API key di Pengaturan lalu ulangi.
          </p>
        ) : null}

        <div className="assessment__progress">
          <ProgressBar
            value={safeIndex}
            max={total}
            label="Progres asesmen"
            valueLabel={`${safeIndex + 1} dari ${total}`}
          />
        </div>

        <div className="assessment__body">
          <aside className="assessment__companion">
            <Mascot pose="encouraging" className="assessment__mascot" />
            <p className="assessment__companion-note">
              Tidak ada jawaban benar atau salah. Pilih yang paling mendekati
              dirimu.
            </p>
          </aside>

          <div
            className={`assessment__card assessment__slide--${direction}`}
            key={question.id}
          >
            <span className="assessment__counter">
              Pertanyaan {safeIndex + 1} dari {total}
              {question.optional ? ' · Opsional' : ''}
            </span>

            <h1
              className="assessment__question"
              id="question-prompt"
              tabIndex={-1}
              ref={headingRef}
            >
              {question.prompt}
            </h1>

            {helper ? <p className="assessment__hint">{helper}</p> : null}

            <div className="assessment__choices">
              <ChoiceList
                question={question}
                selected={selected}
                note={note}
                onSelect={(next) => {
                  setAnswer(question.id, next)
                  setError(null)
                }}
                onNote={(value) => setNote(question.id, value)}
                labelledBy="question-prompt"
              />
            </div>

            {error ? (
              <p className="assessment__error" role="alert">
                <IconAlert />
                {error}
              </p>
            ) : null}

            <div className="assessment__footer">
              <Button variant="secondary" onClick={goBack}>
                <IconArrowLeft className="btn__icon" />
                Kembali
              </Button>

              <div className="assessment__footer-right">
                {question.optional ? (
                  <button
                    type="button"
                    className="assessment__skip"
                    onClick={skip}
                  >
                    Lewati pertanyaan ini
                  </button>
                ) : null}
                <Button onClick={goNext} withArrow>
                  {isLast ? 'Selesaikan Asesmen' : 'Lanjut'}
                </Button>
              </div>
            </div>
          </div>
        </div>

        <p className="assessment__progress-note">
          Jawabanmu tersimpan otomatis di sesi ini. Kamu bisa kembali kapan saja.
        </p>
      </div>

      <Modal
        open={exitOpen}
        title="Keluar dari asesmen?"
        onClose={() => setExitOpen(false)}
      >
        <p>
          Jawaban yang sudah kamu pilih tetap tersimpan. Kamu bisa melanjutkan
          dari pertanyaan terakhir saat kembali.
        </p>
        <div className="modal__actions">
          <Button variant="secondary" onClick={() => setExitOpen(false)}>
            Lanjut mengerjakan
          </Button>
          <Button
            onClick={() => {
              setExitOpen(false)
              navigate('/mulai')
            }}
          >
            Keluar sekarang
            <IconArrowRight className="btn__icon" />
          </Button>
        </div>
      </Modal>
    </FocusLayout>
  )
}
