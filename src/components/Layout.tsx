import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Wordmark } from './Logo'
import { smaSmkFieldDefinitions } from '../data/planningSmaSmk'

/*
 * Tab titles for the routes a crawler is not meant to index. Everything that
 * is indexable carries its own title in indexableHeads below.
 */
const titles: Record<string, string> = {
  '/pengaturan': 'Pengaturan — SEI',
  '/asesmen': 'Asesmen — SEI',
  '/asesmen/pengantar': 'Pengantar Asesmen — SEI',
  '/asesmen/kecenderungan': 'Pertanyaan Kecenderungan — SEI',
  '/asesmen/selesai': 'Asesmen Selesai — SEI',
  '/hasil': 'Hasil Eksplorasi — SEI',
  '/hasil/sma-smk': 'Hasil Eksplorasi Jurusan & Profesi — SEI',
  '/hasil/ai': 'Hasil AI — SEI',
}

const ORIGIN = 'https://sei-explore.netlify.app'

interface RouteHead {
  title: string
  description: string
}

/*
 * The static shell in index.html can only describe the landing page, so this
 * rewrites the head on every navigation. Listed here are the routes that render
 * useful content with nothing saved in localStorage; everything else is marked
 * noindex, because a crawler hitting /hasil or /asesmen only sees an empty
 * shell. Keep in sync with public/sitemap.xml.
 */
const indexableHeads: Record<string, RouteHead> = {
  '/': {
    title: 'SEI — Kenali Minatmu, Jelajahi Jalur Pendidikan SMP/SMA/SMK',
    description:
      'Alat refleksi minat gratis untuk siswa SMP, SMA, dan SMK: asesmen 15 soal, jelajahi tujuh bidang studi, bandingkan jalur SMA dan SMK serta peluang kuliah dan kerja. Tanpa akun, data tetap di perangkat.',
  },
  '/mulai': {
    title: 'Pilih Jenjang — Mulai Eksplorasi — SEI',
    description:
      'Mulai dari jenjangmu. Siswa SMP dan SMA/SMK mendapat set pertanyaan yang berbeda, lalu diarahkan ke hasil yang sesuai dengan tahapannya.',
  },
  '/mulai/sekolah': {
    title: 'Pilih SMA atau SMK — SEI',
    description:
      'Jalur SMA dan SMK punya pertanyaan eksplorasi yang berbeda. Pilih sekolahmu supaya rekomendasi jurusan dan profesi lebih relevan.',
  },
  '/jalur': {
    title: 'Jalur Pendidikan SMA dan SMK — SEI',
    description:
      'Kenali jalur SMA dan SMK lebih dekat: fokus belajar, kegiatan di sekolah, keterampilan yang dilatih, peluang kerja dan kuliah setelah lulus, serta pertanyaan yang perlu dipikirkan sebelum memilih.',
  },
  '/jalur/bandingkan': {
    title: 'Bandingkan SMA dan SMK — SEI',
    description:
      'Perbandingan SMA dan SMK berdampingan, lengkap dengan daftar pertanyaan yang membantu siswa dan orang tua memutuskan sebelum memilih jalur.',
  },
}

function fieldHead(fieldId: string): RouteHead | null {
  const field = smaSmkFieldDefinitions.find((f) => f.id === fieldId)
  if (!field) return null
  return {
    title: `Jelajahi Bidang ${field.name} — SEI`,
    description: `${field.copy} Pelajari kurikulum mini, jurusan, dan profesi yang berkaitan dengan bidang ${field.name} di SEI.`,
  }
}

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  )
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function setCanonical(pathname: string) {
  let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'canonical'
    document.head.appendChild(link)
  }
  link.href = ORIGIN + pathname
}

export function RouteMeta() {
  const { pathname } = useLocation()

  useEffect(() => {
    const fieldId = pathname.startsWith('/jelajah/bidang/')
      ? decodeURIComponent(pathname.slice('/jelajah/bidang/'.length))
      : null
    const head =
      indexableHeads[pathname] ?? (fieldId ? fieldHead(fieldId) : null)

    document.title =
      head?.title ?? titles[pathname] ?? 'Halaman Tidak Ditemukan — SEI'
    setCanonical(pathname)
    setMeta('property', 'og:url', ORIGIN + pathname)

    if (head) {
      setMeta('name', 'description', head.description)
      setMeta('property', 'og:title', head.title)
      setMeta('property', 'og:description', head.description)
      setMeta('name', 'twitter:title', head.title)
      setMeta('name', 'twitter:description', head.description)
      setMeta('name', 'robots', 'index, follow, max-image-preview:large')
      setMeta(
        'name',
        'googlebot',
        'index, follow, max-snippet:-1, max-image-preview:large',
      )
    } else {
      setMeta('name', 'robots', 'noindex, follow')
      setMeta('name', 'googlebot', 'noindex, follow')
    }
  }, [pathname])

  return null
}

export function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    ).matches
    const behavior: ScrollBehavior = prefersReduced ? 'auto' : 'smooth'

    const scrollToHash = () => {
      const id = hash.slice(1)
      if (!id) return false

      const target = document.getElementById(id)
      if (!target) return false

      target.scrollIntoView({ behavior, block: 'start' })
      return true
    }

    if (scrollToHash()) {

      const startY = window.scrollY
      const timer = window.setTimeout(() => {
        if (window.scrollY === startY) {
          document
            .getElementById(hash.slice(1))
            ?.scrollIntoView({ behavior: 'instant', block: 'start' })
        }
      }, 600)

      return () => window.clearTimeout(timer)
    }

    const frame = window.requestAnimationFrame(() => {
      if (!scrollToHash()) {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
      }
    })

    return () => window.cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="page">
      <a className="skip-link" href="#konten-utama">
        Langsung ke konten
      </a>
      <Navbar />
      <main id="konten-utama" className="page__main page-enter" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  )
}

interface FocusLayoutProps {
  children: ReactNode
  
  headerRight?: ReactNode
}

export function FocusLayout({ children, headerRight }: FocusLayoutProps) {
  return (
    <div className="focus">
      <a className="skip-link" href="#konten-utama">
        Langsung ke konten
      </a>
      <header className="focus__bar">
        <div className="container focus__bar-inner">
          <Wordmark small />
          {headerRight}
        </div>
      </header>
      <main id="konten-utama" className="focus__main page-enter" tabIndex={-1}>
        {children}
      </main>
    </div>
  )
}
