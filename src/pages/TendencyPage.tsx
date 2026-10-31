import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { CharacterSwitcher } from '../components/CharacterSwitcher'
import { IconArrowLeft, IconArrowRight } from '../components/Icons'
import { FocusLayout } from '../components/Layout'
import { Mascot } from '../components/Mascot'
import { ProgressBar } from '../components/ProgressBar'
import { tendencyQuestions } from '../data/questionsTendency'
import { useExploration } from '../state/ExplorationContext'
import { useSettings } from '../state/SettingsContext'

export function TendencyPage() {
  const navigate = useNavigate()
  const { level, track, notes, setNote, setIndex } = useExploration()
  const { mode, apiKey } = useSettings()
  const [error, setError] = useState<string | null>(null)

  if (level === null || (level === 'sma-smk' && track === null)) {
    return <Navigate to="/mulai" replace />
  }

  if (!(mode === 'ai' && apiKey.trim().length > 0)) {
    return <Navigate to="/asesmen" replace />
  }

  const filledCount = tendencyQuestions.filter(
    (question) => (notes[question.id] ?? '').trim().length > 0,
  ).length

  const required = tendencyQuestions.filter((question) => !question.optional)
  const missing = required.filter(
    (question) => (notes[question.id] ?? '').trim().length === 0,
  )

  const goNext = () => {
    if (missing.length > 0) {
      setError('Isi dulu pertanyaan yang wajib sebelum melanjutkan.')
      return
    }
    setError(null)
    setIndex(0)
    navigate('/asesmen')
  }

  return (
    <FocusLayout
      headerRight={
        <div className="focus__actions">
          <CharacterSwitcher variant="focus" />
          <button
            type="button"
            className="focus__exit"
            onClick={() => navigate('/asesmen/pengantar')}
          >
            <IconArrowLeft className="btn__icon" />
            Keluar
          </button>
        </div>
      }
    >
      <div className="tendency">
        <div className="tendency__progress">
          <ProgressBar
            value={filledCount}
            max={tendencyQuestions.length}
            label="Progres pertanyaan kecenderungan"
            valueLabel={`${filledCount} dari ${tendencyQuestions.length}`}
          />
        </div>

        <aside className="tendency__intro">
          <Mascot pose="curious" className="tendency__mascot" />
          <div>
            <span className="eyebrow">Langkah pertama</span>
            <h1 className="tendency__title">Ceritakan dulu, sesuai hatimu.</h1>
            <p className="tendency__copy">
              Lima pertanyaan ringan tentang rencanamu dan apa yang kamu
              rasakan. Tidak ada jawaban benar atau salah, dan semua hanya
              tersimpan di perangkat ini.
            </p>
          </div>
        </aside>

        <div className="tendency__list">
          {tendencyQuestions.map((question, index) => {
            const value = notes[question.id] ?? ''
            const fieldId = `${question.id}-field`
            return (
              <div className="tendency__item" key={question.id}>
                <label className="tendency__prompt" htmlFor={fieldId}>
                  <span className="tendency__num">{index + 1}</span>
                  {question.prompt}
                  {question.optional ? (
                    <span className="tendency__optional">Opsional</span>
                  ) : null}
                </label>
                <textarea
                  id={fieldId}
                  className="text-input"
                  rows={3}
                  placeholder={question.placeholder}
                  value={value}
                  maxLength={500}
                  onChange={(event) => setNote(question.id, event.target.value)}
                />
              </div>
            )
          })}
        </div>

        {error ? (
          <p className="assessment__error" role="alert">
            {error}
          </p>
        ) : null}

        <div className="tendency__footer">
          <Button variant="secondary" onClick={() => navigate('/asesmen/pengantar')}>
            <IconArrowLeft className="btn__icon" />
            Kembali
          </Button>
          <Button onClick={goNext} withArrow>
            Lanjut ke Pertanyaan
            <IconArrowRight className="btn__icon" />
          </Button>
        </div>
      </div>
    </FocusLayout>
  )
}
