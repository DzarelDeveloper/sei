import { Navigate } from 'react-router-dom'
import { ButtonLink } from '../components/Button'
import { Callout } from '../components/Callout'
import { EmptyState } from '../components/EmptyState'
import { IconArrowRight, IconEye, IconShieldCheck } from '../components/Icons'
import { SiteLayout } from '../components/Layout'
import { Mascot } from '../components/Mascot'
import { DirectionCard, SmaSmkFieldCard } from '../components/ResultCards'
import { getPersonalizedSmaSmkResult } from '../data/assessmentResultsSmaSmk'
import { getQuestions, resultsPathFor, AI_RESULTS_PATH } from '../data/questions'
import { getTrackProfile } from '../data/tracks'
import { useExploration } from '../state/ExplorationContext'

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export function SmaSmkResultsPage() {
  const { completed, completedAt, answers, answeredCount, level, track, modeUsed } =
    useExploration()
  const questions = getQuestions(level, track)

  if (modeUsed === 'ai') {
    return <Navigate to={AI_RESULTS_PATH} replace />
  }

  if (level === 'smp') {
    return <Navigate to={resultsPathFor(level, modeUsed)} replace />
  }

  if (level === 'sma-smk' && track === null) {
    return <Navigate to="/mulai" replace />
  }

  if (!completed || level === null) {
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

  const result = getPersonalizedSmaSmkResult(answers, track)
  const maxDirection = Math.max(...result.directions.map((item) => item.score))
  const moreQuestions = result.unansweredPrompts.slice(0, 3)
  const trackProfile = getTrackProfile(track)

  return (
    <SiteLayout>
      <section className="results-hero">
        <div className="container">
          <div className="results-hero__top">
            <div className="results-hero__lead">
              <span className="eyebrow">Hasil eksplorasi</span>
              <h1 className="results-hero__title">Arah yang muncul dari jawabanmu</h1>
              <p className="results-hero__copy">{result.summary}</p>
              {trackProfile ? (
                <p className="results-hero__copy">
                  Kamu di {trackProfile.name} — {trackProfile.dailyLife.toLowerCase()}
                </p>
              ) : null}

              <div className="results-nav">
                <ButtonLink to="/mulai" variant="secondary" size="sm">
                  Ulangi eksplorasi
                </ButtonLink>
                <ButtonLink to="/#cara-kerja" variant="ghost" size="sm">
                  Baca cara kerja SEI
                </ButtonLink>
              </div>
            </div>

            <figure className="results-hero__figure">
              <Mascot pose="celebrating" priority />
              <figcaption className="results-hero__caption">
                Hasil ini adalah awal untuk mencari contoh jurusan, wawancara
                profesi, dan membandingkan skenario.
              </figcaption>
            </figure>
          </div>

          <div className="results-hero__meta">
            <span className="pill pill--brand">Ringkasan dari jawaban pilihan</span>
            <span className="pill">
              Jenjang: {trackProfile ? trackProfile.name : 'SMA / SMK / Sederajat'}
            </span>
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
          <section className="result-section" aria-labelledby="arah-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="arah-title">
                Kuliah, kerja, atau keduanya?
              </h2>
              <p className="result-section__note">{result.directionCopy}</p>
            </div>

            <div className="card-grid card-grid--3">
              {result.directions.map((direction) => (
                <DirectionCard
                  key={direction.id}
                  direction={direction}
                  leading={maxDirection > 0 && direction.score === maxDirection}
                />
              ))}
            </div>
            <p className="field-hint mt-3">
              Pilihan condong ini hanya rangkuman jawabanmu hari ini. Rencana
              setelah lulus boleh berubah selama kamu terus mencari contoh
              nyatanya.
            </p>
          </section>

          <section className="result-section" aria-labelledby="bidang-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="bidang-title">
                Bidang untuk kamu dalami
              </h2>
              <p className="result-section__note">
                Bidang dipilih dari jawaban tentang minat, masalah yang ingin
                diselesaikan, dan profesi yang bikin penasaran.
              </p>
            </div>

            {result.primaryFields.length ? (
              <div className="card-grid card-grid--3">
                {result.primaryFields.map((field) => (
                  <SmaSmkFieldCard key={field.id} field={field} />
                ))}
              </div>
            ) : (
              <div className="future-panel" role="status">
                <div>
                  <h3 className="future-panel__title">
                    Belum ada cukup jawaban tentang bidang
                  </h3>
                  <p className="future-panel__copy">
                    Jawaban kosong atau pertanyaan yang dilewati tidak menambah
                    skor. Kamu bisa kembali ke asesmen untuk melengkapi jawaban
                    sebelum membaca saran jurusan dan profesi.
                  </p>
                  <ButtonLink to="/asesmen/pengantar" size="sm">
                    Kembali ke asesmen
                  </ButtonLink>
                </div>
              </div>
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
                  dengan arah utamamu.
                </p>
              </div>
              <div className="card-grid card-grid--2">
                {result.alternativeFields.map((field) => (
                  <SmaSmkFieldCard key={field.id} field={field} />
                ))}
              </div>
            </section>
          ) : null}

          <section className="result-section" aria-labelledby="banding-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="banding-title">
                Bandingkan dulu sebelum memilih
              </h2>
              <p className="result-section__note">
                Arah di atas bukan satu-satunya jalan. Buka perbandingan jalur dan
                lihat mana yang paling cocok dengan cara belajarmu.
              </p>
            </div>
            <div className="ai-compare">
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
                Langkah eksplorasi berikutnya
              </h2>
              <p className="result-section__note">
                Untuk tiap bidang yang menarik, carilah: contoh kurikulum
                jurusannya, profil orang yang bekerja di profesi itu, dan jalur
                masuk yang tersedia di daerahmu.
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
                      Pertanyaan yang belum terjawab
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
              </div>
            ) : (
              <p className="field-hint">
                Jawabanmu sudah memberi sinyal pada semua bidang yang dipetakan.
                Coba satu langkah kecil untuk mengetahui mana yang paling ingin
                kamu lanjutkan.
              </p>
            )}

            <p className="mt-3">
              <ButtonLink to="/asesmen/pengantar" variant="ghost" size="sm">
                Lengkapi atau tinjau jawaban asesmen
                <IconArrowRight className="btn__arrow" />
              </ButtonLink>
            </p>
          </section>

          <section className="result-section" aria-labelledby="ai-status-title">
            <div className="result-section__head">
              <h2 className="result-section__title" id="ai-status-title">
                Status analisis AI
              </h2>
            </div>
            <Callout title="AI belum diaktifkan">
              Hasil yang kamu lihat berasal dari aturan skor lokal, bukan
              analisis AI. Jawaban dan hasil disimpan di browser ini dan tidak
              dikirim ke layanan AI atau server. Jika integrasi AI ditambahkan
              nanti, tujuan dan data yang dikirim akan dijelaskan terlebih
              dahulu dan memerlukan persetujuanmu.
            </Callout>
          </section>

          <section className="result-section" aria-labelledby="penutup-title">
            <h2 className="result-section__title" id="penutup-title">
              Membaca hasil ini
            </h2>
            <div className="disclaimer">
              <strong>Catatan penting.</strong> Hasil ini adalah ringkasan aturan
              sederhana dari pilihanmu, bukan tes psikologi, diagnosis, atau
              jaminan diterima di jurusan dan pekerjaan tertentu. Pilihan
              jurusan dan profesi di sini adalah contoh — ketersediaan dan
              namanya berbeda di tiap kampus dan tempat kerja. Diskusikan dengan
              guru BK, keluarga, atau orang yang sudah menjalani bidangnya.
            </div>

            <p className="text-xs muted mt-4">
              <IconShieldCheck className="inline-icon" />
              Semua perhitungan berjalan di browser. Jawaban tidak dikirim ke server.
            </p>

            <p className="mt-3">
              <ButtonLink to="/mulai" variant="ghost" size="sm">
                Ganti jenjang atau ulangi asesmen
                <IconArrowRight className="btn__arrow" />
              </ButtonLink>
            </p>
          </section>
        </div>
      </div>
    </SiteLayout>
  )
}
