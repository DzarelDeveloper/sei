import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { Button, ButtonLink } from '../components/Button'
import {
  IconCheck,
  IconClock,
  IconShieldCheck,
  IconTarget,
} from '../components/Icons'
import { SiteLayout } from '../components/Layout'
import { Modal } from '../components/Modal'
import { getQuestions, stepsByLevel } from '../data/questions'
import { getTrackProfile } from '../data/tracks'
import { useExploration, type EducationLevel } from '../state/ExplorationContext'
import { useSettings } from '../state/SettingsContext'

const exploreItemsByLevel: Record<EducationLevel, string[]> = {
  smp: [
    'Aktivitas yang kamu nikmati.',
    'Cara kamu lebih mudah belajar.',
    'Masalah yang senang kamu selesaikan.',
    'Hal yang ingin kamu coba lebih dalam.',
    'Pertimbanganmu saat memilih sekolah.',
  ],
  'sma-smk': [
    'Bidang yang ingin kamu dalami.',
    'Gambaran kerja dan hidup yang kamu inginkan.',
    'Jurusan kuliah yang cocok dengan bidang itu.',
    'Profesi dan pekerjaan yang layak kamu coba telusuri.',
    'Apakah kamu lebih condong kuliah, kerja, atau keduanya.',
  ],
}

const headCopyByLevel: Record<EducationLevel, string> = {
  smp: 'Asesmen ini berisi pertanyaan ringan tentang hal-hal yang kamu suka dan cara kamu belajar. Tidak ada jawaban benar atau salah.',
  'sma-smk':
    'Asesmen ini berisi pertanyaan ringan tentang minat bidang, gambaran kerja, dan rencana setelah lulus — mau kuliah, kerja, atau keduanya. Tidak ada jawaban benar atau salah.',
}

const footerNoteByLevel: Record<EducationLevel, string> = {
  smp: 'Hasilnya berupa saran untuk eksplorasi, bukan penilaian resmi atau keputusan final tentang dirimu.',
  'sma-smk':
    'Hasilnya berupa saran jurusan, profesi, dan arah untuk dieksplorasi — bukan kepastian diterima kuliah, kerja, atau keputusan final tentang dirimu.',
}

export function AssessmentIntroPage() {
  const navigate = useNavigate()
  const [restartOpen, setRestartOpen] = useState(false)
  const {
    level,
    track,
    setLevel,
    setIndex,
    answeredCount,
    completed,
    reset,
  } = useExploration()
  const { mode, apiKey } = useSettings()

  const aiActive = mode === 'ai' && apiKey.trim().length > 0

  if (level === null) {
    return <Navigate to="/mulai" replace />
  }

  if (level === 'sma-smk' && track === null) {
    return <Navigate to="/mulai" replace />
  }

  const questions = getQuestions(level, track)
  const exploreItems = exploreItemsByLevel[level]
  const trackProfile = getTrackProfile(track)

  const stepNumber = level === 'smp' ? 2 : 3
  const totalSteps = stepsByLevel[level]
  const headCopy =
    level === 'sma-smk' && trackProfile ? trackProfile.introCopy : headCopyByLevel[level]
  const inProgress = answeredCount > 0 && !completed
  const finished = completed

  const start = () => {
    if (finished) {
      reset()
    }
    setLevel(level, track)
    setIndex(0)
    navigate(aiActive ? '/asesmen/kecenderungan' : '/asesmen')
  }

  return (
    <SiteLayout>
      <div className="page-shell">
        <div className="container shell-narrow">
          <div className="page-head">
            <span className="eyebrow">Langkah {stepNumber} dari {totalSteps}</span>
            <h1 className="page-head__title">Yuk, Kenali Kecenderunganmu.</h1>
            <p className="page-head__copy">{headCopy}</p>
          </div>

          <div className="intro-panel">
            <div className="intro-panel__facts">
              {[
                { label: 'Perkiraan waktu', value: '± 3–5 menit' },
                { label: 'Jumlah pertanyaan', value: `${questions.length} pertanyaan` },
                { label: 'Jawaban', value: 'Tidak ada yang salah' },
                {
                  label: 'Hasil',
                  value:
                    level === 'smp'
                      ? 'Saran untuk eksplorasi'
                      : 'Saran jurusan & profesi',
                },
              ].map((fact) => (
                <div className="intro-fact" key={fact.label}>
                  <span className="intro-fact__label">{fact.label}</span>
                  <span className="intro-fact__value">{fact.value}</span>
                </div>
              ))}
            </div>

            <div className="intro-panel__body">
              <h2 className="h3">Yang akan kamu jelajahi</h2>
              <ul className="intro-explore">
                {exploreItems.map((item) => (
                  <li key={item}>
                    <IconCheck />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="intro-panel__footer">
                <p className="intro-panel__footer-note">
                  <IconTarget />
                  {footerNoteByLevel[level]}
                </p>

                <div className="action-bar">
                  <ButtonLink to="/mulai" variant="secondary">
                    Kembali
                  </ButtonLink>
                  {finished ? (
                    <ButtonLink to="/hasil" size="lg" withArrow>
                      Lihat Hasil
                    </ButtonLink>
                  ) : (
                    <Button
                      size="lg"
                      withArrow
                      onClick={inProgress ? () => navigate('/asesmen') : start}
                    >
                      {inProgress ? 'Lanjutkan Asesmen' : 'Mulai Asesmen'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          <p className="intro-panel__footer-note mt-4">
            <IconClock />
            {finished
              ? 'Kamu sudah menyelesaikan asesmen ini. Kamu bisa melihat hasilnya atau mengerjakannya ulang untuk mengganti jawaban.'
              : inProgress
                ? `Kamu sudah menjawab ${answeredCount} dari ${questions.length} pertanyaan. Jawaban tetap tersimpan saat kamu kembali.`
                : 'Kamu bisa berhenti di tengah asesmen dan melanjutkannya nanti di sesi browser yang sama.'}
          </p>

          {finished ? (
            <p className="mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setRestartOpen(true)}
              >
                Kerjakan ulang asesmen
              </Button>
            </p>
          ) : null}

          <p className="text-xs muted mt-4">
            <IconShieldCheck className="inline-icon" />
            Jawaban disimpan hanya di browser ini. Tidak ada akun atau pengiriman
            data ke server pada fase prototipe.
          </p>
        </div>
      </div>

      <Modal
        open={restartOpen}
        title="Kerjakan ulang asesmen?"
        onClose={() => setRestartOpen(false)}
      >
        <p>
          Jawaban dan hasil sebelumnya akan dihapus dari sesi ini, lalu asesmen
          dimulai dari pertanyaan pertama.
        </p>
        <div className="modal__actions">
          <Button variant="secondary" onClick={() => setRestartOpen(false)}>
            Batal
          </Button>
          <Button
            onClick={() => {
              setRestartOpen(false)
              start()
            }}
          >
            Ya, kerjakan ulang
          </Button>
        </div>
      </Modal>
    </SiteLayout>
  )
}
