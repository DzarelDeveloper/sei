import { useState, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, ButtonLink } from '../components/Button'
import {
  IconArrowLeft,
  IconBook,
  IconCompass,
  IconInfo,
  IconShieldCheck,
} from '../components/Icons'
import { SiteLayout } from '../components/Layout'
import { resultsPathFor, stepsByLevel } from '../data/questions'
import { trackProfiles } from '../data/tracks'
import { useExploration, type EducationLevel } from '../state/ExplorationContext'

const options: Array<{
  id: EducationLevel
  title: string
  description: string
  status: string
  icon: ReactNode
}> = [
  {
    id: 'smp',
    title: 'SMP / Sederajat',
    description: 'Aku ingin mengeksplorasi pilihan SMA atau SMK.',
    status: 'Tersedia sekarang',
    icon: <IconCompass />,
  },
  {
    id: 'sma-smk',
    title: 'SMA / SMK / Sederajat',
    description:
      'Bingung mau kuliah atau kerja? Aku ingin mengenali bidang, jurusan, dan pekerjaan yang diinginkan.',
    status: 'Tersedia sekarang',
    icon: <IconBook />,
  },
]

export function LevelSelectPage() {
  const navigate = useNavigate()
  const {
    level,
    track,
    setLevel,
    answeredCount,
    completed,
    modeUsed,
    reset,
  } = useExploration()
  const [selected, setSelected] = useState<EducationLevel | null>(level)

  const resumesAssessment = level !== null && answeredCount > 0 && !completed
  const totalSteps = stepsByLevel[selected ?? 'smp']
  const completedName =
    level === 'smp'
      ? 'SMP'
      : level === 'sma-smk' && track
        ? trackProfiles[track].name
        : null
  const resultsPath = resultsPathFor(level, modeUsed)

  const handleContinue = () => {
    if (selected === null) return

    if (completed) {
      reset()
      if (selected === 'smp') {
        setLevel('smp', null)
        navigate('/asesmen/pengantar')
      } else {
        setLevel('sma-smk', null)
        navigate('/mulai/sekolah')
      }
      return
    }

    if (selected === 'smp') {
      setLevel('smp', null)
      navigate(resumesAssessment ? '/asesmen' : '/asesmen/pengantar')
      return
    }

    setLevel('sma-smk', track)
    if (track && resumesAssessment) {
      navigate('/asesmen')
    } else {
      navigate('/mulai/sekolah')
    }
  }

  return (
    <SiteLayout>
      <div className="page-shell">
        <div className="container shell-narrow">
          <Link to="/" className="back-link">
            <IconArrowLeft className="inline-icon" />
            Beranda
          </Link>

          <div className="page-head mt-6">
            <span className="eyebrow">Langkah 1 dari {totalSteps}</span>
            <h1 className="page-head__title">Kamu Sekarang di Jenjang Mana?</h1>
            <p className="page-head__copy">
              Kita mulai dari situ supaya eksplorasimu lebih relevan.
            </p>
          </div>

          <div className="level-grid level-page__grid" role="radiogroup" aria-label="Pilih jenjang pendidikan">
            {options.map((option) => (
              <label className="level-card" key={option.id}>
                <input
                  className="choice__input"
                  type="radio"
                  name="education-level"
                  value={option.id}
                  checked={selected === option.id}
                  onChange={() => setSelected(option.id)}
                />
                <div className="level-card__top">
                  <span className="level-card__icon" aria-hidden="true">
                    {option.icon}
                  </span>
                  <span className="level-card__radio" aria-hidden="true" />
                </div>
                <div>
                  <span className="level-card__title">{option.title}</span>
                  <span className="level-card__desc">{option.description}</span>
                </div>
                <div className="level-card__footer">
                  <span className="pill pill--teal">{option.status}</span>
                </div>
              </label>
            ))}
          </div>

          {completed && completedName ? (
            <div className="callout mt-4">
              <IconInfo />
              <div>
                <span className="callout__title">
                  Kamu sudah menyelesaikan asesmen
                </span>
                <p>
                  Hasil untuk {completedName} tersimpan dan bisa kamu lihat kapan
                  saja. Melanjutkan akan memulai asesmen baru.
                </p>
                <div className="mt-3">
                  <ButtonLink to={resultsPath} variant="secondary" size="sm">
                    Lihat hasil
                  </ButtonLink>
                </div>
              </div>
            </div>
          ) : null}

          <div className="level-page__actions">
            <p className="level-page__hint">
              <IconShieldCheck className="inline-icon" />
              Tidak perlu akun. Kamu bisa berhenti dan kembali kapan saja.
            </p>
            <Button
              size="lg"
              withArrow
              onClick={handleContinue}
              disabled={selected === null}
            >
              {completed
                ? 'Mulai Asesmen Baru'
                : resumesAssessment
                  ? 'Lanjutkan Asesmen'
                  : 'Lanjutkan'}
            </Button>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
