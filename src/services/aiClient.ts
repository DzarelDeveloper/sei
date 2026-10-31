

export type AiProvider =
  | 'openai'
  | 'anthropic'
  | 'gemini'
  | 'groq'
  | 'openrouter'

export interface ProviderSpec {
  provider: AiProvider
  label: string
  
  model: string
}

interface ProviderRule extends ProviderSpec {
  prefix: string
}

const PROVIDER_RULES: ProviderRule[] = [
  {
    prefix: 'sk-ant-',
    provider: 'anthropic',
    label: 'Anthropic Claude',
    model: 'claude-3-5-haiku-latest',
  },
  {
    prefix: 'AIza',
    provider: 'gemini',
    label: 'Google Gemini',
    model: 'gemini-3.8-flash',
  },
  {

    prefix: 'AQ',
    provider: 'gemini',
    label: 'Google Gemini',
    model: 'gemini-3.8-flash',
  },
  {
    prefix: 'gsk_',
    provider: 'groq',
    label: 'Groq (Llama)',
    model: 'llama-3.3-70b-versatile',
  },
  {
    prefix: 'sk-or-',
    provider: 'openrouter',
    label: 'OpenRouter',
    model: 'openai/gpt-4o-mini',
  },
  {
    prefix: 'sk-',
    provider: 'openai',
    label: 'OpenAI GPT',
    model: 'gpt-4o-mini',
  },
]

export function detectProvider(apiKey: string): ProviderSpec | null {
  const key = apiKey.trim()
  if (!key) return null
  const rule = PROVIDER_RULES.find((candidate) => key.startsWith(candidate.prefix))
  if (!rule) return null
  return { provider: rule.provider, label: rule.label, model: rule.model }
}

export interface ChatOptions {
  
  json?: boolean
  temperature?: number
  maxTokens?: number
  signal?: AbortSignal
}

export async function chat(
  apiKey: string,
  system: string,
  user: string,
  options: ChatOptions = {},
): Promise<string> {
  const spec = detectProvider(apiKey)
  if (!spec) {
    throw new Error(
      'API key tidak dikenali. Pakai key dari OpenAI, Anthropic, Google, Groq, atau OpenRouter.',
    )
  }

  const temperature = options.temperature ?? 0.6
  const maxTokens = options.maxTokens ?? 2200

  switch (spec.provider) {
    case 'anthropic':
      return callAnthropic(apiKey.trim(), spec, system, user, temperature, maxTokens, options.signal)
    case 'gemini':
      return callGemini(apiKey.trim(), spec, system, user, temperature, maxTokens, options)
    default:
      return callOpenAiCompatible(apiKey.trim(), spec, system, user, temperature, maxTokens, options.signal)
  }
}

const RETRY_STATUSES = new Set([429, 503])
const MAX_ATTEMPTS = 4
const BASE_DELAY_MS = 1500
const MAX_DELAY_MS = 30000

function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) return reject(new DOMException('Aborted', 'AbortError'))
    const timer = setTimeout(resolve, ms)
    signal?.addEventListener(
      'abort',
      () => {
        clearTimeout(timer)
        reject(new DOMException('Aborted', 'AbortError'))
      },
      { once: true },
    )
  })
}

async function fetchWithRetry(
  url: string,
  init: RequestInit,
  signal?: AbortSignal,
): Promise<Response> {
  let delay = BASE_DELAY_MS
  for (let attempt = 1; ; attempt++) {
    let res: Response
    try {
      res = await fetch(url, { ...init, signal })
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') throw err
      if (attempt >= MAX_ATTEMPTS) {
        throw new Error(
          'Koneksi ke layanan AI gagal. Periksa internetmu lalu coba lagi.',
        )
      }
      await sleep(delay, signal)
      delay = Math.min(delay * 2, MAX_DELAY_MS)
      continue
    }

    if (res.ok || !RETRY_STATUSES.has(res.status) || attempt >= MAX_ATTEMPTS) {
      return res
    }

    const retryAfterSec = Number(res.headers.get('Retry-After'))
    const wait =
      Number.isFinite(retryAfterSec) && retryAfterSec > 0
        ? Math.min(retryAfterSec * 1000, MAX_DELAY_MS)
        : delay

    await res.body?.cancel?.().catch(() => {})
    await sleep(wait, signal)
    delay = Math.min(delay * 2, MAX_DELAY_MS)
  }
}

function openAiEndpoint(provider: AiProvider): string {
  if (provider === 'groq') return 'https://api.groq.com/openai/v1/chat/completions'
  if (provider === 'openrouter') return 'https://openrouter.ai/api/v1/chat/completions'
  return 'https://api.openai.com/v1/chat/completions'
}

async function callOpenAiCompatible(
  key: string,
  spec: ProviderSpec,
  system: string,
  user: string,
  temperature: number,
  maxTokens: number,
  signal?: AbortSignal,
): Promise<string> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${key}`,
  }
  if (spec.provider === 'openrouter') {
    headers['HTTP-Referer'] = window.location.origin
    headers['X-Title'] = 'SEI'
  }

  const body = {
    model: spec.model,
    temperature,
    max_tokens: maxTokens,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  }

  const res = await fetchWithRetry(
    openAiEndpoint(spec.provider),
    {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    },
    signal,
  )

  const data = await safeJson(res)
  if (!res.ok) throw new Error(httpMessage(res.status, data))

  const text = data?.choices?.[0]?.message?.content
  if (typeof text !== 'string' || !text.trim()) {
    throw new Error('AI tidak mengembalikan jawaban. Coba lagi atau ganti model.')
  }
  return text
}

async function callAnthropic(
  key: string,
  spec: ProviderSpec,
  system: string,
  user: string,
  temperature: number,
  maxTokens: number,
  signal?: AbortSignal,
): Promise<string> {
  const body = {
    model: spec.model,
    max_tokens: maxTokens,
    temperature,
    system,
    messages: [{ role: 'user', content: user }],
  }

  const res = await fetchWithRetry(
    'https://api.anthropic.com/v1/messages',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',

        'anthropic-dangerous-direct-browser-access': 'true',
      },
      body: JSON.stringify(body),
    },
    signal,
  )

  const data = await safeJson(res)
  if (!res.ok) throw new Error(httpMessage(res.status, data))

  const parts = Array.isArray(data?.content) ? data.content : []
  const text = parts
    .map((part: { text?: unknown }) => (typeof part.text === 'string' ? part.text : ''))
    .join('')
  if (!text.trim()) {
    throw new Error('AI tidak mengembalikan jawaban. Coba lagi atau ganti model.')
  }
  return text
}

async function callGemini(
  key: string,
  spec: ProviderSpec,
  system: string,
  user: string,
  temperature: number,
  maxTokens: number,
  options: ChatOptions,
): Promise<string> {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${spec.model}:generateContent?key=${encodeURIComponent(key)}`

  const body = {
    systemInstruction: { parts: [{ text: system }] },
    contents: [{ role: 'user', parts: [{ text: user }] }],
    generationConfig: {
      temperature,
      maxOutputTokens: maxTokens,
      ...(options.json ? { responseMimeType: 'application/json' } : {}),
    },
  }

  const res = await fetchWithRetry(
    url,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    },
    options.signal,
  )

  const data = await safeJson(res)
  if (!res.ok) throw new Error(httpMessage(res.status, data))

  const candidateParts = data?.candidates?.[0]?.content?.parts
  const text = Array.isArray(candidateParts)
    ? candidateParts
        .map((part: { text?: unknown }) => (typeof part.text === 'string' ? part.text : ''))
        .join('')
    : ''
  if (!text.trim()) {
    throw new Error('AI tidak mengembalikan jawaban. Coba lagi atau ganti model.')
  }
  return text
}

async function safeJson(res: Response): Promise<any> {
  try {
    return await res.json()
  } catch {
    return {}
  }
}

function httpMessage(status: number, data: any): string {
  const detail =
    (typeof data?.error?.message === 'string' && data.error.message) ||
    (typeof data?.message === 'string' && data.message) ||
    ''
  if (status === 401 || status === 403) {
    return `API key ditolak (tidak sah atau kurang izin).${detail ? ` ${detail}` : ''}`
  }
  if (status === 429) {
    return `Layanan AI sedang ramai (kuota permintaan penuh). Sudah dicoba beberapa kali — tunggu sebentar lalu coba lagi.${detail ? ` ${detail}` : ''}`
  }
  if (status === 503) {
    return `Layanan AI sedang sibuk/overload. Sudah dicoba ulang beberapa kali tapi masih penuh. Coba lagi sebentar ya.`
  }
  if (status >= 500) {
    return `Layanan AI sedang bermasalah (${status}). Coba lagi sebentar.`
  }
  return `Layanan AI menolak permintaan (${status}).${detail ? ` ${detail}` : ''}`
}

export function extractJson<T>(text: string): T {
  if (!text || !text.trim()) {
    throw new Error('Respons AI kosong.')
  }

  let trimmed = text.trim()

  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)
  if (fenced) trimmed = fenced[1].trim()

  const start = trimmed.search(/[[{]/)
  if (start > 0) trimmed = trimmed.slice(start)

  const lastObject = trimmed.lastIndexOf('}')
  const lastArray = trimmed.lastIndexOf(']')
  const end = Math.max(lastObject, lastArray)
  if (end >= 0) trimmed = trimmed.slice(0, end + 1)

  try {
    return JSON.parse(trimmed) as T
  } catch {
    throw new Error('Jawaban AI tidak bisa dibaca (format tidak valid). Coba lagi.')
  }
}
