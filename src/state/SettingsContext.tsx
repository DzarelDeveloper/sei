import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type SeiMode = 'default' | 'ai'

const STORAGE_KEY = 'sei.settings.v1'

interface StoredSettings {
  mode: SeiMode
  apiKey: string
}

interface SettingsContextValue extends StoredSettings {
  setMode: (mode: SeiMode) => void
  setApiKey: (apiKey: string) => void
}

const SettingsContext = createContext<SettingsContextValue | null>(null)

function readStoredSettings(): StoredSettings {
  const fallback: StoredSettings = { mode: 'default', apiKey: '' }
  if (typeof window === 'undefined') return fallback

  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? '',
    ) as Partial<StoredSettings> | null
    if (!parsed) return fallback
    return {
      mode: parsed.mode === 'ai' ? 'ai' : 'default',
      apiKey: typeof parsed.apiKey === 'string' ? parsed.apiKey : '',
    }
  } catch {
    return fallback
  }
}

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<StoredSettings>(readStoredSettings)

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(settings))
    } catch {
      
    }
  }, [settings])

  const setMode = useCallback(
    (mode: SeiMode) => setSettings((prev) => ({ ...prev, mode })),
    [],
  )
  const setApiKey = useCallback(
    (apiKey: string) => setSettings((prev) => ({ ...prev, apiKey })),
    [],
  )

  const value = useMemo<SettingsContextValue>(
    () => ({ ...settings, setMode, setApiKey }),
    [settings, setMode, setApiKey],
  )

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  )
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext)
  if (!context) {
    throw new Error('useSettings harus dipakai di dalam SettingsProvider')
  }
  return context
}
