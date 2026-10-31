import { useRef, type KeyboardEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ButtonLink } from '../components/Button'
import {
  IconAlert,
  IconArrowLeft,
  IconBook,
  IconInfo,
  IconRoute,
  IconSpark,
  IconTarget,
  IconUsers,
} from '../components/Icons'
import { SiteLayout } from '../components/Layout'
import { getPersonalizedAssessmentResult } from '../data/assessmentResults'
import { pathways, type PathwayId } from '../data/pathways'
import { useExploration } from '../state/ExplorationContext'

const tabOrder: PathwayId[] = ['sma', 'smk']

export function PathwaysPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { completed, answers } = useExploration()
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({})

  const requested = searchParams.get('jalur')
  const activeId: PathwayId = requested === 'smk' ? 'smk' : 'sma'
  const active = pathways[activeId]

  const selectTab = (id: PathwayId) => {
    setSearchParams({ jalur: id }, { replace: true })
  }

  const onTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    current: PathwayId,
  ) => {
    const currentIndex = tabOrder.indexOf(current)
    let nextIndex = currentIndex

    if (event.key === 'ArrowRight') nextIndex = (currentIndex + 1) % tabOrder.length
    else if (event.key === 'ArrowLeft')
      nextIndex = (currentIndex - 1 + tabOrder.length) % tabOrder.length
    else if (event.key === 'Home') nextIndex = 0
    else if (event.key === 'End') nextIndex = tabOrder.length - 1
    else return

    event.preventDefault()
    const nextId = tabOrder[nextIndex]
    selectTab(nextId)
    tabRefs.current[nextId]?.focus()
  }

  const personalizedResult = getPersonalizedAssessmentResult(answers)
  const matchedFieldKeys = completed
    ? [
        ...personalizedResult.primaryFields,
        ...personalizedResult.alternativeFields,
      ].flatMap((field) => field.matchKeys)
    : []

  return (
    <SiteLayout>
      <div className="page-shell">
        <div className="container shell-mid">
          <Link to={completed ? '/hasil' : '/'} className="back-link">
            <IconArrowLeft className="inline-icon" />
            {completed ? 'Hasil eksplorasi' : 'Beranda'}
          </Link>

          <div className="page-head mt-6">
            <span className="eyebrow">Jalur pendidikan</span>
            <h1 className="page-head__title">Jalur Mana yang Ingin Kamu Kenali?</h1>
            <p className="page-head__copy">
              Kenali cara belajar, kegiatan, dan kemungkinan setelah lulus dari
              masing-masing jalur. Tidak ada jalur yang otomatis lebih baik.
            </p>
          </div>

          <div className="pathway-page__toolbar">
            <div
              className="tabs"
              role="tablist"
              aria-label="Pilih jalur pendidikan"
            >
              {tabOrder.map((id) => (
                <button
                  key={id}
                  ref={(node) => {
                    tabRefs.current[id] = node
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${id}`}
                  className="tabs__tab"
                  aria-selected={activeId === id}
                  aria-controls={`panel-${id}`}
                  tabIndex={activeId === id ? 0 : -1}
                  onClick={() => selectTab(id)}
                  onKeyDown={(event) => onTabKeyDown(event, id)}
                >
                  {pathways[id].shortName}
                </button>
              ))}
            </div>
            <p className="pathway-switch__hint">
              Ketersediaan jurusan, fasilitas, dan biaya berbeda di setiap
              sekolah — selalu periksa langsung.
            </p>
          </div>

          <div
            className="pathway-page__body page-enter"
            role="tabpanel"
            id={`panel-${activeId}`}
            aria-labelledby={`tab-${activeId}`}
            key={activeId}
          >
            <article className="detail">
              <div className="detail__head">
                <div>
                  <h2 className="detail__title">{active.name}</h2>
                  <p className="detail__tagline">{active.tagline}</p>
                </div>
                <span className="pill pill--brand">{active.shortName}</span>
              </div>

              <p className="detail__overview">{active.overview}</p>

              <div className="detail-grid">
                <div className="detail-block">
                  <h3 className="detail-block__title">
                    <IconBook />
                    Pengalaman belajar
                  </h3>
                  <ul className="bullet-list">
                    {active.learningExperience.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-block">
                  <h3 className="detail-block__title">
                    <IconSpark />
                    Contoh kegiatan
                  </h3>
                  <ul className="bullet-list">
                    {active.typicalActivities.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-block">
                  <h3 className="detail-block__title">
                    <IconTarget />
                    Keterampilan yang bisa tumbuh
                  </h3>
                  <ul className="bullet-list">
                    {active.skills.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-block">
                  <h3 className="detail-block__title">
                    <IconRoute />
                    Setelah lulus, kamu bisa
                  </h3>
                  <ul className="bullet-list">
                    {active.nextSteps.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-block">
                  <h3 className="detail-block__title">
                    <IconAlert />
                    Yang perlu dipertimbangkan
                  </h3>
                  <ul className="bullet-list">
                    {active.considerations.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="detail-block">
                  <h3 className="detail-block__title">
                    <IconUsers />
                    Pertanyaan untuk sekolah
                  </h3>
                  <ul className="bullet-list">
                    {active.questionsToAsk.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                {active.fields ? (
                  <div className="detail-block detail-block--wide">
                    <h3 className="detail-block__title">
                      <IconInfo />
                      Contoh konsentrasi keahlian
                    </h3>
                    <div className="field-list">
                      {active.fields.map((field) => {
                        const isMatch = matchedFieldKeys.includes(field.key)
                        return (
                          <div className="field-row" key={field.key}>
                            <div>
                              <p className="field-row__name">{field.name}</p>
                              <p className="field-row__desc">{field.description}</p>
                            </div>
                            {isMatch ? (
                              <span className="pill pill--teal field-row__badge">
                                Sejalan denganmu
                              </span>
                            ) : (
                              <span className="pill field-row__badge">
                                {field.shortName}
                              </span>
                            )}
                          </div>
                        )
                      })}
                    </div>
                    {active.fieldsNote ? (
                      <p className="field-hint mt-3">{active.fieldsNote}</p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </article>

            <div className="next-step pathway-page__next">
              <div>
                <span className="next-step__eyebrow">Langkah berikutnya</span>
                <h2 className="next-step__title">
                  Bandingkan {active.shortName} dengan jalur lainnya
                </h2>
                <p className="next-step__copy">
                  Lihat perbedaannya berdampingan, lalu catat pertanyaan yang ingin
                  kamu tanyakan saat mengunjungi sekolah.
                </p>
              </div>
              <div className="next-step__actions">
                <ButtonLink to="/jalur/bandingkan" withArrow>
                  Bandingkan SMA &amp; SMK
                </ButtonLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
