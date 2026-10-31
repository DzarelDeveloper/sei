import { useState, type ReactNode } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button, ButtonLink } from '../components/Button'
import {
  IconArrowLeft,
  IconBook,
  IconInfo,
  IconShieldCheck,
  IconWrench,
} from '../components/Icons'
import { SiteLayout } from '../components/Layout'
import { resultsPathFor } from '../data/questions'
import { trackProfiles } from '../data/tracks'
import { useExploration, type SchoolTrack } from '../state/ExplorationContext'

const trackOrder: SchoolTrack[] = ['sma', 'smk']
const trackIcons: Record<SchoolTrack, ReactNode> = {
  sma: <IconBook />,
  smk: <IconWrench />,
}

export function TrackSelectPage() {
  const navigate = useNavigate()
  const {
    level,
    track,
    setLevel,
    setIndex,
    answeredCount,
    completed,
    modeUsed,
    reset,
  } = useExploration()
  const [selected, setSelected] = useState<SchoolTrack | null>(track)

  if (level !== 'sma-smk') {
    return <Navigate to="/mulai" replace />
  }

  const resumes = answeredCount > 0 && !completed && track !== null
  const completedName = track ? trackProfiles[track].name : null
  const resultsPath = resultsPathFor('sma-smk', modeUsed)

  const handleContinue = () => {
    if (selected === null) return

    if (completed) {
      reset()
      setLevel('sma-smk', selected)
      setIndex(0)
      navigate('/asesmen/pengantar')
      return
    }

    setLevel('sma-smk', selected)
    if (selected !== track) setIndex(0)
    navigate(resumes && selected === track ? '/asesmen' : '/asesmen/pengantar')
  }

  return (
    <SiteLayout>
      <div className="page-shell">
        <div className="container shell-narrow">
          <Link to="/mulai" className="back-link">
            <IconArrowLeft className="inline-icon" />
            Kembali
          </Link>

          <div className="page-head mt-6">
            <span className="eyebrow">Langkah 2 dari 4</span>
            <h1 className="page-head__title">Jenjang Sekolahmu Saat Ini</h1>
            <p className="page-head__copy">
              SMA dan SMK memiliki fokus yang berbeda — SMA lebih menekankan
              kedalaman materi akademik, sedangkan SMK lebih menekankan praktik
              dan keterampilan siap kerja. Kami menyesuaikan pertanyaan dengan
              kondisimu, sementara arah akhirnya tetap sama: membantu kamu
              mengenali kecocokan antara melanjutkan kuliah atau langsung bekerja.
            </p>
          </div>

          <div
            className="level-grid level-page__grid"
            role="radiogroup"
            aria-label="Pilih sekolah saat ini"
          >
            {trackOrder.map((id) => {
              const profile = trackProfiles[id]
              return (
                <label className="level-card" key={id}>
                  <input
                    className="choice__input"
                    type="radio"
                    name="school-track"
                    value={id}
                    checked={selected === id}
                    onChange={() => setSelected(id)}
                  />
                  <div className="level-card__top">
                    <span className="level-card__icon" aria-hidden="true">
                      {trackIcons[id]}
                    </span>
                    <span className="level-card__radio" aria-hidden="true" />
                  </div>
                  <div>
                    <span className="level-card__title">{profile.name}</span>
                    <span className="level-card__desc">{profile.focus}</span>
                  </div>
                  <div className="level-card__footer">
                    <span className="level-card__detail">{profile.dailyLife}</span>
                  </div>
                </label>
              )
            })}
          </div>

          {completed && completedName ? (
            <div className="callout mt-4">
              <IconInfo />
              <div>
                <span className="callout__title">
                  Kamu sudah menyelesaikan asesmen untuk {completedName}
                </span>
                <p>
                  Hasil {completedName} tersimpan dan bisa kamu lihat kapan saja.
                  {selected && selected !== track
                    ? ` Melanjutkan akan memulai asesmen baru untuk ${trackProfiles[selected].name}.`
                    : ' Melanjutkan akan memulai asesmen baru dari awal.'}
                </p>
                <div className="mt-3">
                  <ButtonLink to={resultsPath} variant="secondary" size="sm">
                    Lihat hasil {completedName}
                  </ButtonLink>
                </div>
              </div>
            </div>
          ) : null}

          <div className="level-page__actions">
            <p className="level-page__hint">
              <IconShieldCheck className="inline-icon" />
              Pilihan ini hanya menyesuaikan pertanyaan, tidak menilai kemampuanmu.
            </p>
            <Button
              size="lg"
              withArrow
              onClick={handleContinue}
              disabled={selected === null}
            >
              {completed ? 'Mulai Asesmen Baru' : 'Lanjutkan'}
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
