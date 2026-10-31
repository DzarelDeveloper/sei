import { Link } from 'react-router-dom'
import { IconArrowLeft } from '../components/Icons'
import { SiteLayout } from '../components/Layout'
import { SettingsPanel } from '../components/Settings'

export function SettingsPage() {
  return (
    <SiteLayout>
      <div className="page-shell">
        <div className="container shell-mid">
          <Link to="/" className="back-link">
            <IconArrowLeft className="inline-icon" />
            Beranda
          </Link>

          <div className="page-head mt-6">
            <span className="eyebrow">Pengaturan</span>
            <h1 className="page-head__title">Atur Cara SEI Bekerja</h1>
            <p className="page-head__copy">
              Pilih mode rekomendasi dan karakter teman eksplorasimu. Semua
              tersimpan di perangkat ini dan bisa kamu ubah kapan saja.
            </p>
          </div>

          <div className="settings-page">
            <SettingsPanel />
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
