import { SiteLayout } from '../components/Layout'
import { ButtonLink } from '../components/Button'
import { HeroMascot } from '../components/HeroMascot'
import { Mascot } from '../components/Mascot'
import {
  IconBook,
  IconCheck,
  IconCompass,
  IconInfo,
  IconRoute,
  IconShieldCheck,
  IconSpark,
  IconTarget,
  IconWrench,
} from '../components/Icons'

const benefits = [
  {
    icon: <IconCompass />,
    title: 'Kenali Pola Minat',
    copy: 'Pahami aktivitas dan bidang yang menarik perhatianmu, lalu lihat pola yang muncul dari jawabanmu sendiri.',
  },
  {
    icon: <IconRoute />,
    title: 'Jelajahi Pilihan',
    copy: 'Bandingkan jalur pendidikan yang relevan dengan tujuanmu, tanpa tekanan untuk langsung memilih satu.',
  },
  {
    icon: <IconSpark />,
    title: 'Mulai dari Hal Nyata',
    copy: 'Dapatkan ide aktivitas untuk menguji ketertarikanmu sebelum menentukan langkah berikutnya.',
  },
]

const steps = [
  {
    index: '01',
    title: 'Kenali dirimu',
    copy: 'Jawab pertanyaan tentang minat dan preferensimu.',
  },
  {
    index: '02',
    title: 'Pahami polanya',
    copy: 'Pelajari pola jawaban dan pilihan yang bisa dieksplorasi.',
  },
  {
    index: '03',
    title: 'Coba hal nyata',
    copy: 'Coba aktivitas nyata untuk mengenal bidang tersebut lebih jauh.',
  },
]

const reflectionSteps = [
  {
    index: '01',
    title: 'Perhatikan pola minatmu',
    copy: 'Lihat bidang yang muncul dan jawaban yang mendukungnya.',
  },
  {
    index: '02',
    title: 'Kenali pilihan jalurnya',
    copy: 'Pelajari gambaran SMA dan SMK, lalu pikirkan lingkungan belajar yang menarik buatmu.',
  },
  {
    index: '03',
    title: 'Bicarakan langkah berikutnya',
    copy: 'Gunakan hasilnya untuk memulai obrolan dengan orang tua, guru, atau sekolah.',
  },
]

const audiences = [
  {
    icon: <IconBook />,
    title: 'Siswa SMP',
    copy: 'Mengenal pilihan SMA, SMK, dan bidang yang menarik untuk dijelajahi.',
    status: 'Tersedia sekarang',
    pill: 'pill--teal',
  },
  {
    icon: <IconTarget />,
    title: 'Siswa SMA',
    copy: 'Menemukan bidang, jurusan kuliah, dan pekerjaan yang ingin kamu kejar.',
    status: 'Tersedia sekarang',
    pill: 'pill--teal',
  },
  {
    icon: <IconWrench />,
    title: 'Siswa SMK',
    copy: 'Menjelajahi pilihan kuliah, lintas bidang, atau profesi yang diinginkan setelah lulus.',
    status: 'Tersedia sekarang',
    pill: 'pill--teal',
  },
]

export function LandingPage() {
  return (
    <SiteLayout>
      <section className="landing-hero" aria-labelledby="hero-title">
        <div className="container landing-hero__inner">
          <div className="landing-hero__copy">
            <span className="eyebrow">Panduan eksplorasi untuk siswa SMP, SMA, dan SMK</span>
            <h1 className="landing-hero__title" id="hero-title">
              Masa depanmu, mulai dari <em>mengenal dirimu.</em>
            </h1>
            <p className="landing-hero__lead">
              Temukan pola minat, pahami pilihan SMA dan SMK, lalu tentukan hal
              kecil yang ingin kamu coba.
            </p>

            <div className="landing-hero__actions">
              <ButtonLink to="/mulai" size="lg" withArrow>
                Mulai
              </ButtonLink>
              <ButtonLink to="/#tentang" size="lg" variant="secondary">
                Kenali SEI
              </ButtonLink>
            </div>

            <p className="landing-hero__note">
              <IconShieldCheck />
              Gratis · Tanpa perlu membuat akun
            </p>
          </div>

          <HeroMascot />
        </div>
      </section>

      <section className="section" id="tentang" aria-labelledby="tentang-title">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Mengapa SEI?</span>
            <h2 className="h2" id="tentang-title">
              Kenali dirimu sebelum menentukan langkah.
            </h2>
            <p className="section-head__copy">
              SEI bukan tes yang memberi label. SEI membantumu membaca minat dan
              preferensimu, lalu memakai hasilnya sebagai bahan pertimbangan.
            </p>
          </div>

          <div className="benefit-grid">
            {benefits.map((benefit) => (
              <article className="benefit-card" key={benefit.title}>
                <span className="icon-badge" aria-hidden="true">
                  {benefit.icon}
                </span>
                <h3 className="benefit-card__title">{benefit.title}</h3>
                <p className="benefit-card__copy">{benefit.copy}</p>
              </article>
            ))}
          </div>

          <p className="landing-note">
            <IconInfo className="inline-icon" />
            <span>
              SEI tidak menentukan bakat atau masa depanmu secara mutlak.
              Hasilnya adalah panduan eksplorasi, bukan keputusan final.
            </span>
          </p>
        </div>
      </section>

      <section
        className="section section--plain"
        id="cara-kerja"
        aria-labelledby="cara-kerja-title"
      >
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Cara Kerja</span>
            <h2 className="h2" id="cara-kerja-title">
              Tiga langkah sederhana untuk mulai.
            </h2>
            <p className="section-head__copy">
              Tidak perlu langsung yakin. Setiap langkah menambah sedikit
              kejelasan tentang arah yang ingin kamu coba.
            </p>
          </div>

          <ol className="steps">
            {steps.map((step) => (
              <li className="step" key={step.index}>
                <span className="step__index" aria-hidden="true">
                  {step.index}
                </span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__copy">{step.copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="section section--plain preview-section"
        id="preview-asesmen"
        aria-labelledby="preview-title"
      >
        <div className="container preview-section__inner">
          <div className="preview-section__copy">
            <span className="eyebrow">Preview Asesmen</span>
            <h2 className="h2" id="preview-title">
              Terasa seperti mengobrol, bukan mengerjakan ujian.
            </h2>
            <p className="section-head__copy">
              Satu pertanyaan per layar dengan kartu jawaban yang mudah dibaca.
              Progres selalu terlihat, dan kamu bisa kembali ke pertanyaan
              sebelumnya kapan saja.
            </p>

            <ul className="preview-section__points">
              <li>
                <IconCheck />
                Pilih kartu jawaban, atau tulis catatan singkat jika perlu.
              </li>
              <li>
                <IconCheck />
                Tidak ada jawaban benar atau salah di setiap pertanyaan.
              </li>
              <li>
                <IconCheck />
                Jawaban tersimpan di browser ini, tanpa akun.
              </li>
            </ul>

            <ButtonLink to="/mulai" withArrow>
              Coba asesmennya
            </ButtonLink>
          </div>

          <div className="preview-section__stage">
            <div className="preview-card" aria-hidden="true">
              <div className="preview-card__top">
                <span className="preview-card__step">Pertanyaan 3 dari 15</span>
                <span className="preview-card__track">
                  <span className="preview-card__fill" />
                </span>
              </div>
              <p className="preview-card__question">
                Kamu paling mudah memahami sesuatu ketika...
              </p>
              <div className="preview-card__options">
                <span className="preview-card__option">
                  <span className="preview-card__letter">A</span>
                  Melihat contoh atau gambar
                </span>
                <span className="preview-card__option preview-card__option--active">
                  <span className="preview-card__letter">B</span>
                  Mencoba langsung dan belajar dari kesalahan
                </span>
                <span className="preview-card__option">
                  <span className="preview-card__letter">C</span>
                  Mendengar penjelasan langkah demi langkah
                </span>
              </div>
              <div className="preview-card__footer">
                <span className="preview-card__btn">Kembali</span>
                <span className="preview-card__btn preview-card__btn--primary">
                  Lanjut
                </span>
              </div>
            </div>

            <div className="preview-section__mascot">
              <Mascot pose="thinking" />
              <p className="preview-section__mascot-note">
                Maskotmu ikut menemani, tanpa menilai jawabanmu.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section section--tint reflection-section"
        aria-labelledby="reflection-title"
      >
        <div className="container reflection-section__inner">
          <div className="reflection-section__copy">
            <span className="eyebrow">Dari hasil ke langkah berikutnya</span>
            <h2 className="h2" id="reflection-title">
              Hasil yang baik membuka percakapan, bukan menutup pilihan.
            </h2>
            <p className="section-head__copy">
              Gunakan rangkuman SEI sebagai awal untuk bertanya, mencari tahu,
              dan berdiskusi. Kamu tidak harus menentukan semuanya sekarang.
            </p>
            <ButtonLink to="/jalur/bandingkan" variant="secondary" withArrow>
              Lihat perbandingan SMA &amp; SMK
            </ButtonLink>
          </div>

          <ol className="reflection-steps">
            {reflectionSteps.map((step) => (
              <li className="reflection-step" key={step.index}>
                <span className="reflection-step__index" aria-hidden="true">
                  {step.index}
                </span>
                <span className="reflection-step__content">
                  <strong className="reflection-step__title">
                    {step.title}
                  </strong>
                  <span className="reflection-step__copy">{step.copy}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section
        className="section"
        id="untuk-siapa"
        aria-labelledby="untuk-siapa-title"
      >
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Untuk Siapa?</span>
            <h2 className="h2" id="untuk-siapa-title">
              Dibuat untuk siswa yang sedang memilih arah.
            </h2>
            <p className="section-head__copy">
              Fokus tiap jenjang berbeda. Eksplorasi siswa SMP membantu memilih
              SMA atau SMK; eksplorasi siswa SMA dan SMK membantu menentukan
              bidang, jurusan, dan pekerjaan yang diinginkan.
            </p>
          </div>

          <div className="audience-grid">
            {audiences.map((audience) => (
              <article className="audience-card" key={audience.title}>
                <span className="icon-badge" aria-hidden="true">
                  {audience.icon}
                </span>
                <h3 className="audience-card__title">{audience.title}</h3>
                <p className="audience-card__copy">{audience.copy}</p>
                <span className={`pill ${audience.pill}`}>
                  {audience.status}
                </span>
              </article>
            ))}
          </div>

          <p className="landing-note">
            <IconInfo className="inline-icon" />
            <span>
              Kamu tidak harus memilih satu jalur sekarang. SEI membantu melihat
              pilihan, bukan mengunci langkahmu.
            </span>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="cta-title">
        <div className="container">
          <div className="cta-band">
            <div className="cta-band__content">
              <span className="eyebrow cta-band__eyebrow">Langkah pertama</span>
              <h2 className="cta-band__title" id="cta-title">
                Mulai mengenal dirimu, satu langkah kecil.
              </h2>
              <p className="cta-band__copy">
                Kamu tidak harus langsung tahu ingin menjadi apa. Mulailah
                dengan mengenali apa yang ingin kamu pelajari.
              </p>
            </div>
            <div className="cta-band__actions">
              <ButtonLink to="/mulai" size="lg" withArrow>
                Mulai
              </ButtonLink>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  )
}
