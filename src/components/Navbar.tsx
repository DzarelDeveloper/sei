import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { resultsPathFor } from '../data/questions'
import { useExploration } from '../state/ExplorationContext'
import { Button, ButtonLink } from './Button'
import { IconClose, IconMenu } from './Icons'
import { Wordmark } from './Logo'
import { Settings } from './Settings'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const { level, completed, answeredCount, modeUsed } = useExploration()

  const hasProgress = level !== null && answeredCount > 0 && !completed
  const resultsPath = resultsPathFor(level, modeUsed)
  const ctaLabel = completed
    ? 'Lihat Hasil'
    : hasProgress
      ? 'Lanjutkan Eksplorasi'
      : 'Mulai'
  const ctaTo = completed ? resultsPath : hasProgress ? '/asesmen' : '/mulai'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.hash])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const navLinks = [
    { label: 'Beranda', to: '/' },
    { label: 'Tentang SEI', to: '/#tentang' },
    { label: 'Cara Kerja', to: '/#cara-kerja' },
  ]

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="container navbar__inner">
        <Wordmark />

        <nav className="navbar__nav" aria-label="Navigasi utama">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="navbar__link"
              aria-current={location.pathname === link.to ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          {completed ? (
            <Link to={resultsPath} className="navbar__link">
              Hasil Eksplorasi
            </Link>
          ) : null}
        </nav>

        <div className="navbar__actions">
          <Settings variant="navbar" />
          <ButtonLink to={ctaTo} size="sm" withArrow>
            {ctaLabel}
          </ButtonLink>
          <button
            type="button"
            className="navbar__toggle"
            aria-expanded={menuOpen}
            aria-controls="navbar-panel"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <IconClose /> : <IconMenu />}
          </button>
        </div>
      </div>

      <div
        id="navbar-panel"
        className={`navbar__panel${menuOpen ? ' navbar__panel--open' : ''}`}
        hidden={!menuOpen}
      >
        <div className="navbar__panel-list">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="navbar__link"
              aria-current={location.pathname === link.to ? 'page' : undefined}
            >
              {link.label}
            </Link>
          ))}
          {completed ? (
            <Link to={resultsPath} className="navbar__link">
              Hasil Eksplorasi
            </Link>
          ) : null}
          <Link to="/jalur" className="navbar__link">
            Jelajahi Jalur
          </Link>
        </div>
        <div className="navbar__panel-character">
          <Settings variant="panel" />
        </div>
        <ButtonLink to={ctaTo} block withArrow>
          {ctaLabel}
        </ButtonLink>
        <div className="mt-3">
          <Button
            variant="ghost"
            block
            onClick={() => {
              setMenuOpen(false)
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            Kembali ke atas
          </Button>
        </div>
      </div>
    </header>
  )
}
