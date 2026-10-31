import { IconCheck, IconRoute } from './Icons'
import { Mascot } from './Mascot'

export function HeroMascot() {
  return (
    <figure className="hero-mascot">
      <div className="hero-mascot__frame">
        <Mascot pose="main" priority className="hero-mascot__image" />
        <div className="hero-mascot__plate">
          <span
            className="hero-mascot__card-icon hero-mascot__card-icon--teal"
            aria-hidden="true"
          >
            <IconCheck />
          </span>
          <span className="hero-mascot__card-text">
            <strong>15 pertanyaan ringan</strong>
            <span className="hero-mascot__card-sub">
              Tanpa jawaban benar atau salah
            </span>
          </span>
        </div>
      </div>
      <div className="hero-mascot__card">
        <span className="hero-mascot__card-icon" aria-hidden="true">
          <IconRoute />
        </span>
        <span className="hero-mascot__card-text">
          <strong>3 langkah awal</strong>
          <span className="hero-mascot__card-sub">Kenali, jelajahi, coba</span>
        </span>
      </div>
    </figure>
  )
}
