import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { IconCheck } from '../components/Icons'
import { FocusLayout } from '../components/Layout'
import { Mascot } from '../components/Mascot'
import { resultsPathFor } from '../data/questions'
import { useExploration } from '../state/ExplorationContext'

const stages = [
  'Merangkum jawaban yang kamu pilih…',
  'Menyusun gambaran awal untuk dijelajahi…',
]

const aiStages = [
  'AI sedang membaca jawaban dan kecenderunganmu…',
  'Menyusun rekomendasi, alasan, dan langkah untukmu…',
]

export function CompletionPage() {
  const navigate = useNavigate()
  const { completed, level, modeUsed } = useExploration()
  const [stage, setStage] = useState(0)
  const resultsPath = resultsPathFor(level, modeUsed)
  const stageList = modeUsed === 'ai' ? aiStages : stages

  useEffect(() => {
    if (!completed) return

    const stageTimer = window.setTimeout(() => setStage(1), 850)
    const redirectTimer = window.setTimeout(() => navigate(resultsPath), 1750)

    return () => {
      window.clearTimeout(stageTimer)
      window.clearTimeout(redirectTimer)
    }
  }, [completed, navigate, resultsPath])

  if (!completed) {
    return <Navigate to={level === null ? '/mulai' : '/asesmen'} replace />
  }

  return (
    <FocusLayout>
      <div className="complete" aria-live="polite">
        <div className="complete__hero">
          <div className="complete__visual" aria-hidden="true">
            <span className="complete__ring complete__ring--pulse" />
            <span className="complete__ring complete__ring--mid" />
            <span className="complete__core">
              <IconCheck />
            </span>
          </div>
          <Mascot pose="encouraging" priority decorative className="complete__mascot" />
        </div>

        <h1 className="complete__title">Kamu Sudah Menyelesaikan Asesmen!</h1>
        <p className="complete__copy">
          Jawabanmu akan membantu menyusun gambaran awal tentang hal-hal yang
          menarik buatmu.
        </p>

        <p className="complete__status">
          {stageList[stage]}
          <span className="complete__dots" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </p>

        <div className="mt-6">
          <Button variant="secondary" onClick={() => navigate(resultsPath)}>
            Lihat hasil sekarang
          </Button>
        </div>

        <p className="complete__note">
          Hasil disusun dari jawabanmu di perangkat ini. Pada fase prototipe,
          gambaran yang ditampilkan masih berupa contoh.
        </p>
      </div>
    </FocusLayout>
  )
}
