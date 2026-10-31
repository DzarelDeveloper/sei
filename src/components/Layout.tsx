import { useEffect, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { Navbar } from './Navbar'
import { Footer } from './Footer'
import { Wordmark } from './Logo'

const titles: Record<string, string> = {
  '/': 'SEI — Kenali Dirimu, Temukan Arahmu',
  '/pengaturan': 'Pengaturan — SEI',
  '/mulai': 'Pilih Jenjang — SEI',
  '/mulai/sekolah': 'Pilih SMA atau SMK — SEI',
  '/asesmen': 'Asesmen — SEI',
  '/asesmen/pengantar': 'Pengantar Asesmen — SEI',
  '/asesmen/kecenderungan': 'Pertanyaan Kecenderungan — SEI',
  '/asesmen/selesai': 'Asesmen Selesai — SEI',
  '/hasil': 'Hasil Eksplorasi — SEI',
  '/hasil/sma-smk': 'Hasil Eksplorasi Jurusan & Profesi — SEI',
  '/hasil/ai': 'Hasil AI — SEI',
  '/jalur': 'Jalur Pendidikan — SEI',
  '/jalur/bandingkan': 'Bandingkan SMA dan SMK — SEI',
}

export function RouteTitle() {
  const { pathname } = useLocation()

  useEffect(() => {

    const exact = titles[pathname]
    const prefixMatch = pathname.startsWith('/jelajah/bidang/')
      ? 'Jelajahi Bidang — SEI'
      : null
    document.title = exact ?? prefixMatch ?? 'Halaman Tidak Ditemukan — SEI'
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
