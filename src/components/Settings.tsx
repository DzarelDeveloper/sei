import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { characters } from '../data/characters'
import { chat, detectProvider } from '../services/aiClient'
import { useCharacter } from '../state/CharacterContext'
import { useSettings, type SeiMode } from '../state/SettingsContext'
import { Button } from './Button'
import { IconArrowRight, IconCheck, IconClose, IconSettings } from './Icons'
import { Mascot } from './Mascot'

type SettingsVariant = 'navbar' | 'panel'

interface SettingsProps {
  variant?: SettingsVariant
}

type TestStatus = 'idle' | 'testing' | 'ok' | 'error'

const MODES: {
  id: SeiMode
  name: string
  tag: string
  copy: string
  points: string[]
}[] = [
  {
    id: 'default',
    name: 'Default',
    tag: 'Saat ini',
    copy: 'Semua dihitung langsung di perangkatmu, tanpa server.',
    points: [
      'Instan & tetap privat — jawaban tak pernah keluar dari browser',
      'Tanpa koneksi internet dan tanpa API key',
      'Cocok untuk mengenal dirimu dengan cepat',
    ],
  },
  {
    id: 'ai',
    name: 'AI',
    tag: 'Disarankan',
    copy: 'Ubah jawabanmu jadi bacaan yang lebih personal dan naratif.',
    points: [
      'Penjelasan lebih mendalam, seperti punya mentor sendiri',
      'Rekomendasi jurusan & karier yang dirangkai khusus untukmu',
      'Model terdeteksi otomatis — cukup tempel API key milikmu',
    ],
  },
]

export function Settings({ variant = 'navbar' }: SettingsProps) {
  return (
    <Link
      to="/pengaturan"
      className={`settings-trigger settings-trigger--${variant}`}
    >
      <IconSettings className="settings-trigger__icon" />
      <span>Pengaturan</span>
    </Link>
  )
}

export function SettingsPanel() {
  const { mode, apiKey, setMode, setApiKey } = useSettings()
  const detected = detectProvider(apiKey)
  const [status, setStatus] = useState<TestStatus>('idle')
  const [message, setMessage] = useState('')

  useEffect(() => {
    setStatus('idle')
    setMessage('')
  }, [apiKey])

  async function runTest() {
    if (!apiKey.trim()) {
      setStatus('error')
      setMessage('Isi API key terlebih dahulu.')
      return
    }
    if (!detected) {
      setStatus('error')
      setMessage(
        'Key tidak dikenali. Pakai key dari OpenAI, Anthropic, Google, Groq, atau OpenRouter.',
      )
      return
    }
    setStatus('testing')
    setMessage('Menguji koneksi langsung ke layanan AI…')
    try {
      await chat(
        apiKey,
        'Kamu asisten untuk tes koneksi. Balas sependek mungkin.',
        'Balas hanya dengan satu kata: siap.',
        { maxTokens: 16, temperature: 0 },
      )
      setStatus('ok')
      setMessage(`Terhubung. Model: ${detected.label} · ${detected.model}.`)
    } catch (error) {
      setStatus('error')
      setMessage(
        error instanceof Error ? error.message : 'Gagal terhubung ke layanan AI.',
      )
    }
  }

  return (
    <div className="settings">
      <section className="settings__section">
        <h3 className="settings__heading">Mode SEI</h3>
        <p className="settings__lede">
          Dua cara membaca jawabanmu. Default cepat dan privat; AI memberi
          pandangan yang lebih personal. Kamu bisa ganti kapan saja.
        </p>
        <div className="settings__modes" role="radiogroup" aria-label="Mode SEI">
          {MODES.map((option) => {
            const selected = option.id === mode
            return (
              <label
                key={option.id}
                className={`settings__mode${selected ? ' settings__mode--selected' : ''}`}
              >
                <input
                  className="choice__input"
                  type="radio"
                  name="sei-mode"
                  value={option.id}
                  checked={selected}
                  onChange={() => setMode(option.id)}
                />
                <span className="settings__mode-head">
                  <span className="settings__mode-name">{option.name}</span>
                  <span
                    className={`settings__mode-tag settings__mode-tag--${option.id}`}
                  >
                    {option.tag}
                  </span>
                </span>
                <span className="settings__mode-copy">{option.copy}</span>
                <ul className="settings__mode-points">
                  {option.points.map((point) => (
                    <li key={point} className="settings__mode-point">
                      <IconCheck className="settings__mode-point-icon" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </label>
            )
          })}
        </div>
      </section>

      {mode === 'ai' ? (
        <section className="settings__section settings__ai">
          <h3 className="settings__heading">API Key AI</h3>
          <p className="settings__reco">
            <span className="settings__reco-badge">Rekomendasi</span>
            Belum punya API key? Buat gratis di OpenRouter—satu key untuk banyak
            model.{' '}
            <a
              className="settings__reco-link"
              href="https://openrouter.ai/settings/keys"
              target="_blank"
              rel="noopener noreferrer"
            >
              Ambil API key OpenRouter
              <IconArrowRight className="settings__reco-link-icon" />
            </a>
          </p>
          <div className="settings__field">
            <input
              type="text"
              inputMode="text"
              autoComplete="off"
              spellCheck={false}
              className="settings__input"
              placeholder="Tempel API key kamu di sini"
              value={apiKey}
              onChange={(event) => setApiKey(event.target.value)}
              aria-describedby="settings-ai-hint"
            />
            <Button
              variant="secondary"
              onClick={() => {
                void runTest()
              }}
              disabled={status === 'testing'}
            >
              {status === 'testing' ? 'Menguji…' : 'Uji Koneksi'}
            </Button>
          </div>

          <p className="settings__hint" id="settings-ai-hint">
            {detected ? (
              <span className="settings__model">
                <IconCheck className="settings__model-icon" />
                Model terdeteksi otomatis:{' '}
                <strong>
                  {detected.label} · {detected.model}
                </strong>
              </span>
            ) : (
              'Model dikenali otomatis dari awalan key — kamu tidak perlu memilihnya.'
            )}
          </p>

          {status !== 'idle' ? (
            <p
              className={`settings__status settings__status--${status}`}
              role="status"
            >
              {status === 'ok' ? (
                <IconCheck className="settings__status-icon" />
              ) : status === 'error' ? (
                <IconClose className="settings__status-icon" />
              ) : null}
              {message}
            </p>
          ) : null}
        </section>
      ) : null}

      <section className="settings__section">
        <h3 className="settings__heading">Karakter</h3>
        <CharacterToggle />
      </section>
    </div>
  )
}

function CharacterToggle() {
  const { character, setCharacter } = useCharacter()

  return (
    <div className="settings__characters" role="radiogroup" aria-label="Karakter">
      {characters.map((option) => {
        const selected = option.id === character
        return (
          <label
            key={option.id}
            className={`settings__character${
              selected ? ' settings__character--selected' : ''
            }`}
          >
            <input
              className="choice__input"
              type="radio"
              name="sei-character"
              value={option.id}
              checked={selected}
              onChange={() => setCharacter(option.id)}
            />
            <span className="settings__character-avatar">
              <Mascot character={option.id} pose="welcome" decorative />
            </span>
            <span className="settings__character-name">{option.shortName}</span>
            {selected ? (
              <span className="settings__character-check" aria-hidden="true">
                <IconCheck />
              </span>
            ) : null}
          </label>
        )
      })}
    </div>
  )
}
