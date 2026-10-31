import { useEffect, useRef, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { ButtonLink } from '../components/Button'
import { Callout } from '../components/Callout'
import { EmptyState } from '../components/EmptyState'
import {
  IconArrowRight,
  IconCheck,
  IconRoute,
  IconShieldCheck,
} from '../components/Icons'
import { SiteLayout } from '../components/Layout'
import { Mascot } from '../components/Mascot'
import { getAiAssessmentResult } from '../data/assessmentResultsAi'
import { resultsPathFor } from '../data/questions'
import { buildAiQuestions } from '../data/questionsAi'
import type { StudyProgramme } from '../data/planningSmaSmk'
import { getTrackProfile } from '../data/tracks'
import { aiGenerateResult } from '../services/aiFlow'
import { useExploration } from '../state/ExplorationContext'
import { useSettings } from '../state/SettingsContext'

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

function ProgrammeItem({ programme }: { programme: StudyProgramme }) {
  return (
    <li>
      <strong>{programme.name}</strong>
      <span className="field-card__text">{programme.note}</span>
      {programme.urls?.length ? (
        <span className="campus-links">
          {programme.urls.map((u) => (
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
        </span>
      ) : null}
    </li>
  )
}

export function AiResultsPage() {
  const {
    completed,
    completedAt,
    answers,
    notes,
    level,
    track,
    modeUsed,
    aiQuestions,
    aiResult,
    setAiResult,
  } = useExploration()
  const { apiKey } = useSettings()

  const [generating, setGenerating] = useState(false)
  const [genError, setGenError] = useState<string | null>(null)

  const resultRef = useRef<Promise<Awaited<ReturnType<typeof aiGenerateResult>>> | null>(
    null,
  )

  const canCall =
    modeUsed === 'ai' && apiKey.trim().length > 0 && level !== null

  useEffect(() => {
    if (!completed || !canCall || aiResult) return
    setGenerating(true)
    if (!resultRef.current) {
      const questions = aiQuestions ?? buildAiQuestions(level, track)
      resultRef.current = aiGenerateResult(apiKey, {
        level,
        track,
        essays: notes,
        questions,
        answers,
      })
    }
    let active = true
    resultRef.current
      .then((generated) => {
        if (!active) return
        setAiResult(generated)
      })
      .catch((err: unknown) => {
        if (!active) return
        setGenError(
          err instanceof Error ? err.message : 'Gagal menyusun hasil AI.',
        )
      })
      .finally(() => {
        if (active) setGenerating(false)
      })
    return () => {
      active = false
    }
  }, [completed, canCall, aiResult, apiKey, level, track, notes, answers, aiQuestions, setAiResult])

  if (level === null) {
    return <Navigate to="/mulai" replace />
  }

  if (completed && modeUsed !== 'ai') {
    return <Navigate to={resultsPathFor(level, modeUsed)} replace />
  }

  if (!completed) {
    return (
      <SiteLayout>
        <div className="page-shell">
          <div className="container shell-narrow">
            <EmptyState
              title="Hasilmu belum siap"
              copy="Jawab dulu pertanyaan kecenderungan dan 15 soal dari AI supaya SEI bisa merangkum arahmu."
            >
              <ButtonLink to="/mulai" withArrow>
                Mulai asesmen
              </ButtonLink>
            </EmptyState>
          </div>
        </div>
      </SiteLayout>
    )
  }

  if (generating && !aiResult) {
    return (
      <SiteLayout>
        <div className="page-shell">
          <div className="container shell-narrow">
            <div className="ai-preparing" aria-live="polite">
              <div className="ai-preparing__visual">
                <span className="ai-preparing__ring" />
                <Mascot pose="thinking" className="ai-preparing__mascot" />
              </div>
              <h1 className="ai-preparing__title">AI sedang membaca jawabanmu…</h1>
              <p className="ai-preparing__copy">
                Menyusun rangkuman, rekomendasi arah, dan alasannya — ringkas,
                langsung dari pilihanmu.
              </p>
              <span className="complete__dots" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </div>
          </div>
        </div>
      </SiteLayout>
    )
  }

  const result =
    aiResult ?? getAiAssessmentResult({ answers, notes, level, track })
  const activeQuestions = aiQuestions ?? buildAiQuestions(level, track)
  const total = activeQuestions.length

  const answeredCount = activeQuestions.filter((q) => {
    if ((answers[q.id] ?? []).length > 0) return true
    return (notes[q.id] ?? '').trim().length > 0
  }).length
  const trackProfile = getTrackProfile(track)
  const planText = notes.tq1?.trim()

  const isSmp = level !== 'sma-smk'
  const currentSchoolName = trackProfile ? trackProfile.name : 'SMA/SMK'

  return (
    <SiteLayout>
      <section className="results-hero">
        <div className="container">
          <div className="results-hero__top">
            <div className="results-hero__lead">
              <span className="eyebrow">Hasil AI · ringkas</span>
              <h1 className="results-hero__title">Ini pembacaan AI untukmu</h1>
              <p className="results-hero__copy">{result.summary}</p>

              <div className="results-nav">
                <ButtonLink to="/mulai" variant="secondary" size="sm">
                  Ulangi eksplorasi
                </ButtonLink>
                <ButtonLink to="/pengaturan" variant="ghost" size="sm">
                  Pengaturan
                </ButtonLink>
              </div>
            </div>

            <figure className="results-hero__figure">
              <Mascot pose="celebrating" priority />
              <figcaption className="results-hero__caption">
                AI merangkum pilihanmu jadi tiga bagian: apa yang kamu pilih,
                arah yang disarankan, dan alasannya.
              </figcaption>
            </figure>
          </div>

          <div className="results-hero__meta">
            <span className="pill pill--brand">Mode AI</span>
            <span className="pill">
              Jenjang: {trackProfile ? trackProfile.name : 'SMP'}
            </span>
            <span className="pill">{answeredCount} jawaban masuk</span>
            {completedAt ? (
              <span className="pill">
                Disusun {dateFormatter.format(new Date(completedAt))}
              </span>
            ) : null}
          </div>
        </div>
      </section>

      <div className="page-shell">
        <div className="container shell-mid">
          {genError && !aiResult ? (
            <section className="result-section">
              <Callout title="AI belum bisa menyusun hasil" variant="quiet">
                {genError} Yang tampil di bawah adalah pembacaan lokal
                sementara. Cek API key di Pengaturan lalu muat ulang halaman ini.
              </Callout>
            </section>
          ) : null}

          <section className="result-section" aria-labelledby="ringkasan-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="ringkasan-title">
                1. Rangkuman pilihanmu
              </h2>
              <p className="result-section__note">
                Ini yang AI tangkap dari jawabanmu — dari rencana awal sampai
                pilihan di tiap soal.
              </p>
            </div>

            <article className="field-card">
              {planText ? (
                <div className="field-card__block">
                  <span className="field-card__label">Rencana versimu</span>
                  <p className="field-card__text">{planText}</p>
                </div>
              ) : null}
              <div className="field-card__block">
                <span className="field-card__label">Pilihan yang paling menentukan</span>
                {result.reasons.length ? (
                  <ul className="bullet-list">
                    {result.reasons.map((item) => (
                      <li key={`${item.question}:${item.answer}`}>
                        <span className="field-card__text">{item.question}</span>
                        <strong>{item.answer}</strong>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="field-card__text">
                    Belum ada cukup pilihan terisi ({answeredCount} dari {total}).
                  </p>
                )}
              </div>
            </article>
          </section>

          <section className="result-section" aria-labelledby="rekom-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="rekom-title">
                2. Rekomendasi
              </h2>
              <p className="result-section__note">
                {isSmp
                  ? 'Dua hal yang berbeda: sekolah apa yang paling pas sekarang, dan mau ke arah mana setelah sekolah nanti. Tidak harus dipilih hari ini juga.'
                  : `Kamu sudah di ${currentSchoolName}, jadi fokusnya bukan lagi memilih SMA/SMK — tapi ke arah mana setelah lulus dan bidang apa yang paling cocok buatmu.`}
              </p>
            </div>

            {isSmp ? (
              <div className="card-grid card-grid--2">
                <article className="pathway-card">
                  <span className="field-card__label">Langkah sekolah terdekat</span>
                  <div className="pathway-card__head">
                    <div>
                      <h3 className="pathway-card__name">{result.school.label}</h3>
                      <p className="pathway-card__tag">
                        Pilihan SMA atau SMK setelah SMP
                      </p>
                    </div>
                    <span className="icon-badge" aria-hidden="true">
                      <IconRoute />
                    </span>
                  </div>
                  <p className="field-card__text">{result.school.note}</p>
                </article>

                <article className="pathway-card">
                  <span className="field-card__label">Arah setelah sekolah</span>
                  <div className="pathway-card__head">
                    <div>
                      <h3 className="pathway-card__name">{result.direction.name}</h3>
                      <p className="pathway-card__tag">
                        {result.direction.headline}
                      </p>
                    </div>
                    <span className="icon-badge" aria-hidden="true">
                      <IconRoute />
                    </span>
                  </div>
                  <span className="pill pill--teal pathway-card__pill">
                    <IconCheck className="pill__icon" />
                    Gambaran jangka panjang, boleh berubah
                  </span>
                </article>
              </div>
            ) : (
              <article className="pathway-card">
                <span className="field-card__label">
                  Rekomendasi arah (kamu saat ini di {currentSchoolName})
                </span>
                <div className="pathway-card__head">
                  <div>
                    <h3 className="pathway-card__name">{result.direction.name}</h3>
                    <p className="pathway-card__tag">
                      {result.direction.headline}
                    </p>
                  </div>
                  <span className="icon-badge" aria-hidden="true">
                    <IconRoute />
                  </span>
                </div>
                <span className="pill pill--teal pathway-card__pill">
                  <IconCheck className="pill__icon" />
                  Gambaran arah, boleh berubah
                </span>
              </article>
            )}

            <article className="field-card mt-3">
              <div>
                <h3 className="field-card__title">Bidang yang layak kamu jelajahi: {result.field.name}</h3>
                <p className="field-card__copy">{result.field.copy}</p>
              </div>

              {result.direction.id === 'kerja' ? (
                <>
                  {result.field.professions.length ? (
                    <div className="field-card__block">
                      <span className="field-card__label">Pekerjaan yang bisa kamu mulai</span>
                      <ul className="bullet-list">
                        {result.field.professions.slice(0, 3).map((p, i) => (
                          <li key={`${p.name}-${i}`}>
                            <strong>{p.name}</strong>
                            <span className="field-card__text">{p.note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {result.field.programmes.length ? (
                    <div className="field-card__block">
                      <span className="field-card__label">
                        {'Kalau nanti ingin lanjut kuliah — jurusan ini bisa dipertimbangkan:'}
                      </span>
                      <ul className="bullet-list">
                        {result.field.programmes.slice(0, 2).map((p, i) => (
                          <ProgrammeItem key={`${p.name}-${i}`} programme={p} />
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </>
              ) : (
                <>
                  {result.field.programmes.length ? (
                    <div className="field-card__block">
                      <span className="field-card__label">Jurusan &amp; kampus yang bisa kamu tuju</span>
                      <ul className="bullet-list">
                        {result.field.programmes.slice(0, 3).map((p, i) => (
                          <ProgrammeItem key={`${p.name}-${i}`} programme={p} />
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {result.field.professions.length ? (
                    <div className="field-card__block">
                      <span className="field-card__label">
                        {result.direction.id === 'kuliah'
                          ? 'Kalau mau sambil kerja atau magang, posisi ini bisa dicari:'
                          : 'Posisi kerja di bidang ini yang bisa diincar:'}
                      </span>
                      <ul className="bullet-list">
                        {result.field.professions.slice(0, 3).map((p, i) => (
                          <li key={`${p.name}-${i}`}>
                            <strong>{p.name}</strong>
                            <span className="field-card__text">{p.note}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </>
              )}
            </article>

            {isSmp ? (
              <div className="ai-compare mt-3">
                <p className="field-hint">
                  Penasaran mana yang lebih baik untukmu? Bandingkan dulu sebelum
                  memutuskan.
                </p>
                <div className="ai-compare__actions">
                  <ButtonLink to="/jalur/bandingkan" variant="secondary" size="sm">
                    Bandingkan SMA &amp; SMK
                    <IconArrowRight className="btn__arrow" />
                  </ButtonLink>
                  <ButtonLink to="/jalur" variant="ghost" size="sm">
                    Jelajahi jalur
                  </ButtonLink>
                </div>
              </div>
            ) : result.field.id ? (
              <div className="ai-compare mt-3">
                <p className="field-hint">
                  Ingin tahu kampus mana yang punya jurusan ini dan posisi kerja
                  apa yang tersedia? Telusuri bidang {result.field.name} lebih jauh.
                </p>
                <div className="ai-compare__actions">
                  <ButtonLink
                    to={`/jelajah/bidang/${result.field.id}`}
                    variant="secondary"
                    size="sm"
                  >
                    Jelajahi bidang ini
                    <IconArrowRight className="btn__arrow" />
                  </ButtonLink>
                </div>
              </div>
            ) : (
              <div className="ai-compare mt-3">
                <p className="field-hint">
                  Jawabanmu belum cukup condong ke satu bidang. Coba ulangi
                  eksplorasi atau jawab lebih banyak soal untuk saran yang lebih spesifik.
                </p>
                <div className="ai-compare__actions">
                  <ButtonLink to="/mulai" variant="ghost" size="sm">
                    Ulangi eksplorasi
                  </ButtonLink>
                </div>
              </div>
            )}
          </section>

          <section className="result-section" aria-labelledby="alasan-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="alasan-title">
                3. Yang bisa kamu siapkan
              </h2>
              <p className="result-section__note">
                Saran ini disusun dari pola pilihanmu — bukan vonis. Arahmu boleh
                berubah selama kamu terus mencari contoh nyata.
              </p>
            </div>

            <article className="field-card">
              <div className="field-card__block">
                <span className="field-card__label">3 hal yang bisa kamu siapkan</span>
                <ul className="bullet-list">
                  {result.goals.map((goal) => (
                    <li key={goal}>{goal}</li>
                  ))}
                </ul>
              </div>
            </article>

            {result.parentNote ? (
              <div className="mt-3">
                <Callout title="Soal orang tua">{result.parentNote}</Callout>
              </div>
            ) : null}

            {result.scholarships.length ? (
              <article className="field-card mt-3">
                <div className="field-card__block">
                  <span className="field-card__label">Beasiswa yang bisa kamu jelajahi</span>
                  <ul className="bullet-list">
                    {result.scholarships.map((s) => (
                      <li key={s.name}>
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="campus-link campus-link--primary"
                        >
                          <strong>{s.name}</strong> ↗
                        </a>
                        <span className="field-card__text">{s.note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ) : null}

            <div className="mt-3">
              <Callout
                title={
                  result.direction.id === 'kerja'
                    ? 'Kalau nanti kamu berubah pikiran dan ingin coba kuliah\u2026'
                    : result.direction.id === 'kuliah'
                      ? 'Kalau nanti kamu berubah pikiran dan ingin coba kerja dulu\u2026'
                      : 'Kalau kamu tetap ingin mempertimbangkan pilihan lain\u2026'
                }
                variant="warm"
              >
                {result.direction.id === 'kerja'
                  ? 'Tidak ada kata terlambat untuk kuliah — banyak orang bekerja dulu lalu lanjut kuliah sambil kerja atau dengan beasiswa. Cek KIP-Kuliah atau LPDP kalau biaya jadi pertimbangan. Yang penting, kamu punya rencana yang kamu pahami — bukan sekadar ikut arus.'
                  : result.direction.id === 'kuliah'
                    ? 'Kerja dulu juga bukan hal yang tabu. Banyak perusahaan menerima fresh graduate SMA/SMK untuk posisi entry-level. Kamu bisa kumpulkan pengalaman dan tabungan, lalu lanjut kuliah dengan tujuan yang lebih jelas. Yang penting, tetaplah mencari contoh nyata dan ngobrol dengan orang yang sudah menjalani jalannya.'
                    : 'Tidak masalah — rekomendasi ini bahan berpikir, bukan keharusan. Yang penting, kenali alasanmu dan siapkan langkahnya: cari contoh nyata jurusan atau pekerjaan itu, dan ngobrol dengan orang yang sudah menjalaninya. Kamu tetap pegang kendali atas pilihanmu.'}
              </Callout>
            </div>
          </section>

          <section className="result-section" aria-labelledby="ai-catatan-title">
            <div className="disclaimer">
              <strong>Catatan penting.</strong> Hasil ini dibuat oleh layanan AI
              yang kamu hubungkan sendiri (mode BYOK): jawaban &amp; esai singkat
              dikirim ke penyedia AI itu, dan API key hanya tersimpan di browser
              kamu — tidak lewat server SEI. Bila AI gagal, tampilan ini otomatis
              memakai pembacaan lokal. Hasil tetap contoh, bukan keputusan final.
            </div>

            <p className="text-xs muted mt-4">
              <IconShieldCheck className="inline-icon" />
              Jawaban tersimpan di browser ini. Hasil bukan tes psikologi atau
              jaminan diterima di jurusan/pekerjaan tertentu.
            </p>

            <p className="mt-3">
              <ButtonLink to="/mulai" variant="ghost" size="sm">
                Ulangi atau ganti jenjang
                <IconArrowRight className="btn__arrow" />
              </ButtonLink>
            </p>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}
