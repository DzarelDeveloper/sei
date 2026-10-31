import { ButtonLink } from '../components/Button'
import { SiteLayout } from '../components/Layout'

export function NotFoundPage() {
  return (
    <SiteLayout>
      <div className="page-shell">
        <div className="container shell-narrow">
          <div className="notfound">
            <span className="eyebrow eyebrow--plain">Halaman tidak ditemukan</span>
            <h1 className="page-head__title mt-4">
              Jalur ini belum ada di peta.
            </h1>
            <p className="page-head__copy">
              Mungkin tautannya sudah berubah. Kamu bisa kembali ke beranda atau
              langsung melanjutkan eksplorasi.
            </p>
            <div className="empty__actions mt-6">
              <ButtonLink to="/" withArrow>
                Kembali ke beranda
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
