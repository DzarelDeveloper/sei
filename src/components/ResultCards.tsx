import { Link } from 'react-router-dom'
import type {
  SmaSmkAssessmentResult,
  SmaSmkPersonalizedField,
} from '../data/assessmentResultsSmaSmk'
import type { Pathway } from '../data/pathways'
import type { ResultField } from '../data/results'
import { IconArrowRight, IconCheck, IconRoute } from './Icons'

export function FieldCard({
  field,
}: {
  field: ResultField
}) {
  return (
    <article className="field-card">
      <div>
        <h3 className="field-card__title">{field.name}</h3>
        <p className="field-card__copy">{field.copy}</p>
      </div>

      <div className="field-card__block">
        <span className="field-card__label">Mengapa ini muncul</span>
        <p className="field-card__text">{field.why}</p>
      </div>

      {field.evidence?.length ? (
        <div className="field-card__block">
          <span className="field-card__label">Jawaban yang mendukung</span>
          <ul className="bullet-list">
            {field.evidence.map((item) => (
              <li key={`${item.question}:${item.answer}`}>
                <strong>{item.answer}</strong>
                <span className="field-card__text">{item.question}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {field.pathways?.length ? (
        <div className="field-card__block">
          <span className="field-card__label">Contoh jalur untuk ditelusuri</span>
          <ul className="bullet-list">
            {field.pathways.map((pathway) => (
              <li key={pathway}>{pathway}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="field-card__block">
        <span className="field-card__label">Coba selanjutnya</span>
        <p className="field-card__text">{field.nextStep}</p>
      </div>
    </article>
  )
}

interface PathwayCardProps {
  pathway: Pathway
  
  recommended?: boolean
  compareTo: string
}

export function PathwayCard({ pathway, recommended, compareTo }: PathwayCardProps) {
  return (
    <article className="pathway-card">
      <div className="pathway-card__head">
        <div>
          <h3 className="pathway-card__name">{pathway.name}</h3>
          <p className="pathway-card__tag">{pathway.tagline}</p>
        </div>
        <span className="icon-badge" aria-hidden="true">
          <IconRoute />
        </span>
      </div>

      <ul className="bullet-list">
        {pathway.learningExperience.slice(0, 3).map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      {recommended ? (
        <span className="pill pill--teal pathway-card__pill">
          <IconCheck className="pill__icon" />
          Sejalan dengan gambaranmu
        </span>
      ) : null}

      <div className="pathway-card__actions">
        <Link
          className="btn btn--secondary btn--sm"
          to={`/jalur?jalur=${pathway.id}`}
        >
          <span>Kenali jalur ini</span>
          <IconArrowRight className="btn__arrow" />
        </Link>
        <Link className="btn btn--ghost btn--sm" to={compareTo}>
          <span>Bandingkan</span>
        </Link>
      </div>
    </article>
  )
}

export function SmaSmkFieldCard({ field }: { field: SmaSmkPersonalizedField }) {
  return (
    <article className="field-card">
      <div>
        <h3 className="field-card__title">{field.name}</h3>
        <p className="field-card__copy">{field.copy}</p>
      </div>

      <div className="field-card__block">
        <span className="field-card__label">Mengapa ini muncul</span>
        <p className="field-card__text">{field.why}</p>
      </div>

      <div className="field-card__block">
        <span className="field-card__label">Contoh jurusan untuk ditelusuri</span>
        <ul className="bullet-list">
          {field.programmes.map((programme) => (
            <li key={programme.name}>
              <strong>{programme.name}</strong>
              <span className="field-card__text">{programme.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="field-card__block">
        <span className="field-card__label">Contoh pekerjaan yang bisa diinginkan</span>
        <ul className="bullet-list">
          {field.professions.map((profession) => (
            <li key={profession.name}>
              <strong>{profession.name}</strong>
              <span className="field-card__text">{profession.note}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="field-card__block">
        <span className="field-card__label">Coba selanjutnya</span>
        <p className="field-card__text">{field.nextStep}</p>
      </div>
    </article>
  )
}

interface DirectionCardProps {
  direction: SmaSmkAssessmentResult['directions'][number]
  leading: boolean
}

export function DirectionCard({ direction, leading }: DirectionCardProps) {
  return (
    <article className="pathway-card">
      <div className="pathway-card__head">
        <div>
          <h3 className="pathway-card__name">{direction.name}</h3>
          <p className="pathway-card__tag">
            {direction.score > 0
              ? `Didukung ${direction.evidence.length} jawaban pilihan.`
              : 'Belum ada jawaban yang mengarah ke sini.'}
          </p>
        </div>
        <span className="icon-badge" aria-hidden="true">
          <IconRoute />
        </span>
      </div>

      {direction.evidence.length ? (
        <ul className="bullet-list">
          {direction.evidence.slice(0, 3).map((item) => (
            <li key={`${item.question}:${item.answer}`}>
              <strong>{item.answer}</strong>
            </li>
          ))}
        </ul>
      ) : null}

      {leading ? (
        <span className="pill pill--teal pathway-card__pill">
          <IconCheck className="pill__icon" />
          Paling condong saat ini
        </span>
      ) : null}
    </article>
  )
}
