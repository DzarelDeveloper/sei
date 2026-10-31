import { Link } from 'react-router-dom'
import { ButtonLink } from '../components/Button'
import { ComparisonTable } from '../components/ComparisonTable'
import { IconArrowLeft, IconUsers } from '../components/Icons'
import { SiteLayout } from '../components/Layout'
import { pathways } from '../data/pathways'

const selfQuestions = [
  'Apakah aku lebih nyaman belajar banyak bidang dulu, atau langsung mendalami satu bidang?',
  'Apakah aku punya satu atau dua bidang yang benar-benar ingin dicoba sekarang?',
  'Seberapa besar ruang yang aku punya untuk berpindah arah jika ternyata kurang cocok?',
  'Bagaimana caraku belajar paling efektif: teori, praktik, atau campuran keduanya?',
]

const schoolQuestions = [
  'Jurusan atau mata pelajaran pilihan apa yang benar-benar dibuka tahun ini?',
  'Bagaimana kondisi laboratorium, bengkel, dan peralatan belajarnya?',
  'Apakah sekolah punya mitra industri atau program praktik kerja?',
  'Bagaimana dukungan sekolah untuk siswa yang masih ragu memilih arah?',
]

export function ComparePage() {
  return (
    <SiteLayout>
      <div className="page-shell">
        <div className="container shell-mid">
          <Link to="/jalur" className="back-link">
            <IconArrowLeft className="inline-icon" />
            Jalur pendidikan
          </Link>

          <div className="page-head mt-6">
            <span className="eyebrow">Perbandingan jalur</span>
            <h1 className="page-head__title">Bandingkan SMA dan SMK</h1>
            <p className="page-head__copy">
              Dua jalur ini menekankan hal yang berbeda. Membandingkannya membantu
              kamu melihat mana yang lebih cocok dengan cara belajarmu — bukan mana
              yang lebih bergengsi.
            </p>
          </div>

          <div className="compare-head">
            <div className="compare-head__col">
              <span className="compare-head__label">Jalur 1</span>
              <h2 className="compare-head__name">{pathways.sma.name}</h2>
              <p className="compare-head__copy">
                Belajar luas dan akademik, dengan banyak pilihan arah setelah lulus.
              </p>
            </div>
            <div className="compare-head__col">
              <span className="compare-head__label">Jalur 2</span>
              <h2 className="compare-head__name">{pathways.smk.name}</h2>
              <p className="compare-head__copy">
                Belajar lebih spesifik lewat praktik dan bidang keahlian.
              </p>
            </div>
          </div>

          <ComparisonTable />

          <section className="compare-questions" aria-labelledby="sebelum-memilih">
            <h2 id="sebelum-memilih">Pertanyaan sebelum memilih</h2>
            <div className="compare-questions__grid">
              <div>
                <h3 className="detail-block__title">Untuk dirimu</h3>
                <ul className="bullet-list">
                  {selfQuestions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="detail-block__title">
                  <IconUsers />
                  Untuk ditanyakan ke sekolah
                </h3>
                <ul className="bullet-list">
                  {schoolQuestions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <div className="next-step mt-6">
            <div>
              <span className="next-step__eyebrow">Lanjutkan eksplorasi</span>
              <h2 className="next-step__title">Kenali salah satu jalur lebih dekat</h2>
              <p className="next-step__copy">
                Lihat lebih dekat cara belajar dan pilihan bidang pada jalur yang
                paling ingin kamu kenali.
              </p>
            </div>
            <div className="next-step__actions">
              <ButtonLink to="/jalur?jalur=smk" withArrow>
                Kenali SMK
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
