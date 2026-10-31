import { Link, Navigate } from 'react-router-dom'
import { ButtonLink } from '../components/Button'
import { Callout } from '../components/Callout'
import { EmptyState } from '../components/EmptyState'
import { IconArrowRight, IconEye, IconShieldCheck } from '../components/Icons'
import { SiteLayout } from '../components/Layout'
import { Mascot } from '../components/Mascot'
import { FieldCard, PathwayCard } from '../components/ResultCards'
import {
  getPathwayPreferenceCopy,
  getPersonalizedAssessmentResult,
} from '../data/assessmentResults'
import { pathways } from '../data/pathways'
import { getQuestions, resultsPathFor, AI_RESULTS_PATH } from '../data/questions'
import { useExploration } from '../state/ExplorationContext'

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function ResultsPage() {
  const { completed, completedAt, answers, answeredCount, level, modeUsed } =
    useExploration()
  const questions = getQuestions(level)

  if (modeUsed === 'ai') {
    return <Navigate to={AI_RESULTS_PATH} replace />
  }

  if (level === 'sma-smk') {
    return <Navigate to={resultsPathFor(level, modeUsed)} replace />
  }

  const result = getPersonalizedAssessmentResult(answers)

  if (!completed) {
    return (
      <SiteLayout>
        <div className="page-shell">
          <div className="container shell-narrow">
            <EmptyState
              title="Hasilmu belum siap"
              copy="Selesaikan asesmen singkat dulu supaya SEI bisa merangkum pola jawaban pilihanmu. Jawabanmu tidak dikirim ke mana pun."
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

  const pathwayCopy = getPathwayPreferenceCopy(result.pathways)
  const moreQuestions = result.unansweredPrompts.slice(0, 3)

  return (
    <SiteLayout>
      <section className="results-hero">
        <div className="container">
          <div className="results-hero__top">
            <div className="results-hero__lead">
              <span className="eyebrow">Hasil eksplorasi</span>
              <h1 className="results-hero__title">Pola yang muncul dari jawabanmu</h1>
              <p className="results-hero__copy">{result.summary}</p>

              <div className="results-nav">
                <ButtonLink to="/jalur" variant="secondary" size="sm">
                  Jelajahi jalur
                </ButtonLink>
                <ButtonLink to="/jalur/bandingkan" variant="ghost" size="sm">
                  Bandingkan SMA &amp; SMK
                </ButtonLink>
              </div>
            </div>

            <figure className="results-hero__figure">
              <Mascot pose="celebrating" priority />
              <figcaption className="results-hero__caption">
                Hasil ini adalah awal untuk mencoba, bertanya, dan membandingkan.
              </figcaption>
            </figure>
          </div>

          <div className="results-hero__meta">
            <span className="pill pill--brand">Ringkasan dari jawaban pilihan</span>
            <span className="pill">Jenjang: SMP / Sederajat</span>
            <span className="pill">
              {answeredCount} dari {questions.length} pertanyaan dijawab
            </span>
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
          <section className="result-section" aria-labelledby="tendensi-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="tendensi-title">
                Ringkasan pola minat
              </h2>
              <p className="result-section__note">{result.confidenceCopy}</p>
            </div>

            {result.primaryFields.length ? (
              <div className="evidence-list">
                {result.primaryFields.map((field) => (
                  <article className="evidence" key={field.id}>
                    <span className="evidence__icon" aria-hidden="true">
                      <IconEye />
                    </span>
                    <p className="evidence__text">
                      <strong>
                        {field.score === result.primaryFields[0]?.score
                          ? 'Sinyal utama saat ini: '
                          : 'Juga muncul: '}
                        {field.name}
                      </strong>
                      <span className="evidence__source">
                        Didukung oleh {field.evidence.length} jawaban pilihan.
                        Ini adalah jumlah sinyal dari aturan sederhana, bukan nilai.
                      </span>
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="future-panel" role="status">
                <div>
                  <h3 className="future-panel__title">
                    Belum ada cukup jawaban pilihan bidang
                  </h3>
                  <p className="future-panel__copy">
                    Jawaban kosong atau pertanyaan yang dilewati tidak menambah skor.
                    Kamu bisa kembali ke asesmen untuk melengkapi jawaban sebelum
                    membaca rekomendasi.
                  </p>
                  <ButtonLink to="/asesmen/pengantar" size="sm">
                    Kembali ke asesmen
                  </ButtonLink>
                </div>
              </div>
            )}
          </section>

          <section className="result-section" aria-labelledby="bidang-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="bidang-title">
                Bidang utama untuk kamu jelajahi
              </h2>
              <p className="result-section__note">
                Rekomendasi dipilih dari bidang yang mendapat sinyal pada jawabanmu.
                Jumlahnya bisa kurang dari tiga bila jawaban belum mendukung bidang lain.
              </p>
            </div>

            {result.primaryFields.length ? (
              <div className="card-grid card-grid--3">
                {result.primaryFields.map((field) => (
                  <FieldCard
                    key={field.id}
                    field={field}
                  />
                ))}
              </div>
            ) : (
              <p className="field-hint">
                Belum ada rekomendasi bidang. Lengkapi beberapa pertanyaan minat
                terlebih dahulu agar hasil tidak menebak.
              </p>
            )}
          </section>

          {result.alternativeFields.length ? (
            <section className="result-section" aria-labelledby="alternatif-title">
              <div className="result-section__head">
                <h2 className="result-section__title" id="alternatif-title">
                  Alternatif yang juga muncul
                </h2>
                <p className="result-section__note">
                  Bidang lain yang mendapat dukungan jawaban, untuk dibandingkan
                  dengan minat utamamu.
                </p>
              </div>
              <div className="card-grid card-grid--2">
                {result.alternativeFields.map((field) => (
                  <FieldCard
                    key={field.id}
                    field={field}
                  />
                ))}
              </div>
            </section>
          ) : null}

          <section className="result-section" aria-labelledby="jalur-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="jalur-title">
                Jalur pendidikan untuk dibandingkan
              </h2>
              <p className="result-section__note">{pathwayCopy}</p>
            </div>

            <div className="card-grid card-grid--2">
              <PathwayCard
                pathway={pathways.sma}
                recommended={
                  result.pathways[0].score > result.pathways[1].score
                }
                compareTo="/jalur/bandingkan"
              />
              <PathwayCard
                pathway={pathways.smk}
                recommended={
                  result.pathways[1].score > result.pathways[0].score
                }
                compareTo="/jalur/bandingkan"
              />
            </div>
            <p className="field-hint mt-3">
              Penanda jalur merangkum jawaban tentang cara belajar, harapan setelah
              SMP, dan pertimbangan sekolah. Keduanya tetap layak dibandingkan.
            </p>

            <div className="mt-3">
              <Callout title="Kalau kamu tetap memilih di luar saran ini" variant="warm">
                Silakan — saran ini bahan berpikir, bukan keharusan. Yang penting
                kamu paham alasannya dan menyiapkan langkahnya: cari contoh nyata
                jurusan atau pekerjaan itu, dan ngobrol dengan orang yang sudah
                menjalaninya. Kamu tetap pegang kendali atas pilihanmu.
              </Callout>
            </div>
          </section>

          <section className="result-section" aria-labelledby="eksplorasi-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="eksplorasi-title">
                Hal yang masih bisa kamu eksplorasi
              </h2>
              <p className="result-section__note">
                Tidak muncul di jawaban saat ini bukan berarti kamu tidak tertarik.
                Bisa jadi kamu belum mencoba atau pertanyaannya belum terjawab.
              </p>
            </div>
            {moreQuestions.length || result.unexploredFields.length ? (
              <div className="evidence-list">
                {moreQuestions.length ? (
                  <div className="evidence">
                    <span className="evidence__icon" aria-hidden="true">
                      <IconEye />
                    </span>
                    <p className="evidence__text">
                      Pertanyaan minat yang belum terjawab
                      <span className="evidence__source">
                        {moreQuestions.join(' ')}
                      </span>
                    </p>
                  </div>
                ) : null}
                {result.unexploredFields.length ? (
                  <div className="evidence">
                    <span className="evidence__icon" aria-hidden="true">
                      <IconEye />
                    </span>
                    <p className="evidence__text">
                      Bidang yang belum mendapat sinyal dari pilihanmu
                      <span className="evidence__source">
                        {result.unexploredFields.slice(0, 3).join(' · ')}
                      </span>
                    </p>
                  </div>
                ) : null}
                <p className="text-xs muted">
                  Coba satu langkah praktis sederhana, lalu catat bagian mana
                  yang ingin kamu lanjutkan atau justru kurang menarik.
                </p>
              </div>
            ) : (
              <p className="field-hint">
                Jawabanmu sudah memberi sinyal pada semua bidang yang dipetakan.
                Coba langkah kecil untuk mengetahui mana yang paling ingin kamu lanjutkan.
              </p>
            )}
            {result.unansweredPrompts.length ? (
              <p className="mt-3">
                <Link className="link-arrow" to="/asesmen/pengantar">
                  Lengkapi atau tinjau jawaban asesmen
                  <IconArrowRight />
                </Link>
              </p>
            ) : null}
          </section>

          <section className="result-section" aria-labelledby="cara-skor-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="ai-status-title">
                Status analisis AI
              </h2>
            </div>
            <Callout title="AI belum diaktifkan">
              Hasil yang kamu lihat berasal dari aturan skor lokal, bukan analisis
              AI. Jawaban dan hasil disimpan di browser ini dan tidak dikirim ke
              layanan AI atau server. Jika integrasi AI ditambahkan nanti, tujuan
              dan data yang dikirim akan dijelaskan terlebih dahulu dan memerlukan
              persetujuanmu.
            </Callout>
          </section>

          <section className="result-section" aria-labelledby="cara-skor-title">
            <div className="next-step">
              <div>
                <span className="next-step__eyebrow">Cara membaca hasil</span>
                <h2 className="next-step__title" id="cara-skor-title">
                  Skor adalah petunjuk, bukan penilaian
                </h2>
                <p className="next-step__copy">
                  Pilihan langsung tentang bidang yang ingin dipelajari mendapat
                  bobot 4; aktivitas dan tugas yang dipilih bobot 3; pengalaman yang
                  pernah dicoba bobot 2; dan peran atau preferensi pelajaran bobot 1.
                  Pertanyaan cara belajar umum tidak menambah skor bidang. Tiap
                  jawaban yang cocok menambah sinyal, sedangkan jawaban kosong atau
                  dilewati tidak menambah maupun mengurangi skor.
                </p>
              </div>
              <div className="next-step__actions">
                <ButtonLink to="/jalur/bandingkan" variant="secondary">
                  Bandingkan jalur
                </ButtonLink>
              </div>
            </div>

            <div className="disclaimer">
              <strong>Catatan penting.</strong> Hasil ini adalah ringkasan aturan
              sederhana dari pilihanmu, bukan tes psikologi, diagnosis, atau
              keputusan pendidikan. Aturannya belum tervalidasi secara ilmiah.
              Periksa pilihan sekolah yang tersedia dan diskusikan dengan guru atau
              orang yang kamu percaya.
            </div>

            <p className="text-xs muted mt-4">
              <IconShieldCheck className="inline-icon" />
              Semua perhitungan berjalan di browser. Jawaban tidak dikirim ke server.
            </p>

            <p className="mt-3">
              <ButtonLink to="/#cara-kerja" variant="ghost" size="sm">
                Baca cara kerja SEI
                <IconArrowRight className="btn__arrow" />
              </ButtonLink>
            </p>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}
