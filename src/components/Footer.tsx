import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useExploration } from '../state/ExplorationContext'
import { Button } from './Button'
import { Modal } from './Modal'
import { Wordmark } from './Logo'
import { IconInfo } from './Icons'

export function Footer() {
  const navigate = useNavigate()
  const { reset, level, answeredCount, completed } = useExploration()
  const [confirmOpen, setConfirmOpen] = useState(false)

  const hasProgress = Boolean(level) || answeredCount > 0 || completed

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__about">
            <Wordmark withSub />
            <p>
              SEI membantu siswa mengenali minat dan kecenderungannya, lalu
              menjelajahi pilihan pendidikan tanpa harus langsung menentukan masa
              depan.
            </p>
            <p className="footer__note">
              <IconInfo className="inline-icon" />
              Hasil SEI adalah panduan eksplorasi, bukan keputusan pendidikan
              final.
            </p>
          </div>

          <div>
            <h2 className="footer__heading">Eksplorasi</h2>
            <div className="footer__links">
              <Link to="/mulai">Mulai eksplorasi</Link>
              <Link to="/hasil">Hasil eksplorasi</Link>
              <Link to="/jalur">Jalur pendidikan</Link>
              <Link to="/jalur/bandingkan">Bandingkan SMA &amp; SMK</Link>
            </div>
          </div>

          <div>
            <h2 className="footer__heading">Tentang</h2>
            <div className="footer__links">
              <Link to="/">Beranda</Link>
              <Link to="/#cara-kerja">Cara kerja</Link>
              <Link to="/#tentang">Tentang SEI</Link>
              {hasProgress ? (
                <button type="button" onClick={() => setConfirmOpen(true)}>
                  Mulai ulang eksplorasi
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <span>
            © {new Date().getFullYear()} SEI — Self Exploration Intelligence.
          </span>
          <span>
            Tidak perlu akun. Jawaban dan hasil hanya tersimpan di sesi browser
            ini.
          </span>
        </div>
      </div>

      <Modal
        open={confirmOpen}
        title="Mulai ulang eksplorasi?"
        onClose={() => setConfirmOpen(false)}
      >
        <p>
          Jawaban dan hasil yang sekarang akan dihapus dari sesi ini. Kamu bisa
          mengerjakan asesmen lagi dari awal.
        </p>
        <div className="modal__actions">
          <Button variant="secondary" onClick={() => setConfirmOpen(false)}>
            Batal
          </Button>
          <Button
            onClick={() => {
              reset()
              setConfirmOpen(false)
              navigate('/mulai')
            }}
          >
            Ya, mulai ulang
          </Button>
        </div>
      </Modal>
    </footer>
  )
}
