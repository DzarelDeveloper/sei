import { Link, Navigate, useParams } from 'react-router-dom'
import { ButtonLink } from '../components/Button'
import { Callout } from '../components/Callout'
import {
  IconArrowLeft,
  IconArrowRight,
  IconBook,
  IconShieldCheck,
  IconTarget,
} from '../components/Icons'
import { SiteLayout } from '../components/Layout'
import { Mascot } from '../components/Mascot'
import { getSmaSmkField, smaSmkFieldDefinitions } from '../data/planningSmaSmk'
import type { SmaSmkFieldId } from '../data/planningSmaSmk'
import { useExploration } from '../state/ExplorationContext'

export function FieldExplorePage() {
  const { fieldId } = useParams<{ fieldId: string }>()
  const { modeUsed } = useExploration()

  const isValid =
    fieldId && smaSmkFieldDefinitions.some((f) => f.id === fieldId)

  if (!isValid) {
    return <Navigate to="/hasil/ai" replace />
  }

  const field = getSmaSmkField(fieldId as SmaSmkFieldId)
  const backPath = modeUsed === 'ai' ? '/hasil/ai' : '/hasil/sma-smk'

  return (
    <SiteLayout>
      <section className="results-hero">
        <div className="container">
          <div className="results-hero__top">
            <div className="results-hero__lead">
              <span className="eyebrow">Jelajahi Bidang</span>
              <h1 className="results-hero__title">{field.name}</h1>
              <p className="results-hero__copy">{field.copy}</p>

              <div className="results-nav">
                <Link to={backPath} className="back-link">
                  <IconArrowLeft className="inline-icon" />
                  Kembali ke hasil
                </Link>
              </div>
            </div>

            <figure className="results-hero__figure">
              <Mascot pose="curious" priority />
              <figcaption className="results-hero__caption">
                Telusuri jurusan dan profesi nyata di bidang ini — cek kampus
                dan perusahaan yang sesuai untukmu.
              </figcaption>
            </figure>
          </div>

          <div className="results-hero__meta">
            <span className="pill pill--brand">{field.name}</span>
            <span className="pill">{field.programmes.length} contoh jurusan</span>
            <span className="pill">{field.professions.length} contoh profesi</span>
          </div>
        </div>
      </section>

      <div className="page-shell">
        <div className="container shell-mid">
          <section className="result-section" aria-labelledby="jurusan-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="jurusan-title">
                <IconBook className="inline-icon" />
                {' '}Jurusan &amp; Kampus yang Bisa Kamu Tuju
              </h2>
              <p className="result-section__note">
                Nama kampus di bawah adalah contoh nyata — ketersediaan program
                studi dan jalur masuk bisa berubah tiap tahun. Selalu cek
                situs resmi kampus dan PDDikti untuk info terkini.
              </p>
            </div>

            <div className="card-grid card-grid--1">
              {field.programmes.map((prog) => (
                <article className="field-card" key={prog.name}>
                  <div>
                    <h3 className="field-card__title">{prog.name}</h3>
                    <p className="field-card__copy">{prog.note}</p>
                    {prog.urls?.length ? (
                      <div className="campus-links mt-2">
                        {prog.urls.map((u) => (
                          <a
                            key={u.url}
                            href={u.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="campus-link"
                          >
                            {u.label} ↗
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="result-section" aria-labelledby="profesi-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="profesi-title">
                <IconTarget className="inline-icon" />
                {' '}Dunia Kerja: Posisi yang Bisa Kamu Kejar
              </h2>
              <p className="result-section__note">
                Ini contoh posisi entry-level atau jalur awal yang realistis —
                bukan jaminan kerja. Langkah awal: cari lowongan serupa di
                JobStreet, LinkedIn, atau Glints untuk melihat syarat sebenarnya.
              </p>
            </div>

            <div className="card-grid card-grid--1">
              {field.professions.map((prof) => (
                <article className="field-card" key={prof.name}>
                  <div>
                    <h3 className="field-card__title">{prof.name}</h3>
                    <p className="field-card__copy">{prof.note}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="result-section" aria-labelledby="langkah-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="langkah-title">
                Langkah kecil yang bisa kamu coba
              </h2>
            </div>
            <Callout title={field.name}>{field.nextStep}</Callout>

            <div className="mt-3 ai-compare">
              <div className="ai-compare__actions">
                <ButtonLink to={backPath} variant="secondary" size="sm">
                  Kembali ke hasil eksplorasi
                  <IconArrowRight className="btn__arrow" />
                </ButtonLink>
              </div>
            </div>
          </section>

          <section className="result-section">
            <div className="disclaimer">
              <strong>Catatan.</strong> Daftar kampus dan profesi di sini adalah
              contoh untuk membantu eksplorasi awal, bukan rekomendasi resmi atau
              jaminan penerimaan. Nama program studi, akreditasi, dan jalur masuk
              dapat berubah. Cek{' '}
              <a
                href="https://pddikti.kemdikbud.go.id"
                target="_blank"
                rel="noopener noreferrer"
              >
                PDDikti
              </a>{' '}
              untuk data resmi perguruan tinggi Indonesia.
            </div>
            <p className="text-xs muted mt-3">
              <IconShieldCheck className="inline-icon" />
              Semua informasi disusun dari data lokal SEI dan pengetahuan umum
              tentang kampus di Indonesia. Tidak ada data yang dikirim ke server.
            </p>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}
