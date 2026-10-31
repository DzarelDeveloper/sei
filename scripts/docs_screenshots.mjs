

import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = process.env.SEI_BASE || 'http://localhost:5173'
const OUT = 'docs/screenshots'
const SUBDIRS = ['landing', 'assessment', 'results', 'pathways', 'mobile']
const PORT = 9334
const VIEWPORT = { width: 1280, height: 720, scale: 2 } // 16:9 desktop frame
const MOBILE = { width: 390, height: 844, scale: 2 }

mkdirSync(OUT, { recursive: true })
for (const dir of SUBDIRS) mkdirSync(`${OUT}/${dir}`, { recursive: true })

try {
  const { rmSync } = await import('node:fs')
  rmSync(`${OUT}/demo`, { recursive: true, force: true })
} catch {
  
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const chrome = spawn('google-chrome-stable', [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  '--remote-debugging-port=' + PORT,
  '--user-data-dir=/tmp/sei-docs-profile',
  `--window-size=${VIEWPORT.width},${VIEWPORT.height}`,
  'about:blank',
])

process.on('exit', () => chrome.kill())

async function waitForDevtools() {
  for (let attempt = 0; attempt < 80; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:${PORT}/json/list`)
      const targets = await response.json()
      const page = targets.find((target) => target.type === 'page')
      if (page?.webSocketDebuggerUrl) return page.webSocketDebuggerUrl
    } catch {
      
    }
    await sleep(250)
  }
  throw new Error('DevTools endpoint never became available')
}

const wsUrl = await waitForDevtools()
const socket = new WebSocket(wsUrl)
await new Promise((resolve, reject) => {
  socket.addEventListener('open', resolve, { once: true })
  socket.addEventListener('error', reject, { once: true })
})

let nextId = 1
const pending = new Map()
const listeners = new Set()

socket.addEventListener('message', (event) => {
  const message = JSON.parse(event.data)
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id)
    pending.delete(message.id)
    if (message.error) reject(new Error(JSON.stringify(message.error)))
    else resolve(message.result)
    return
  }
  for (const listener of listeners) listener(message)
})

function send(method, params = {}) {
  const id = nextId++
  socket.send(JSON.stringify({ id, method, params }))
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject })
    setTimeout(() => {
      if (pending.has(id)) {
        pending.delete(id)
        reject(new Error(`${method} timed out`))
      }
    }, 20000)
  })
}

function once(method) {
  return new Promise((resolve) => {
    const listener = (message) => {
      if (message.method === method) {
        listeners.delete(listener)
        resolve(message.params)
      }
    }
    listeners.add(listener)
  })
}

await send('Page.enable')
await send('Runtime.enable')

async function setViewport({ width, height, scale }) {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: scale,
    mobile: false,
  })
}

async function goto(path) {
  const loaded = once('Page.loadEventFired')
  await send('Page.navigate', { url: BASE + path })
  await loaded
  await sleep(900)
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  })
  if (result.exceptionDetails) {
    throw new Error(`${expression.slice(0, 60)} -> ${result.exceptionDetails.text}`)
  }
  return result.result.value
}

async function settle(extra = 400, maxMs = 5000) {
  const start = Date.now()
  while (Date.now() - start < maxMs) {
    const done = await evaluate(
      '[...document.images].every((img) => img.complete)',
    )
    if (done) break
    await sleep(200)
  }
  await sleep(extra)
}

const results = []
function check(name, pass, detail = '') {
  results.push({ name, pass, detail })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}

async function sectionShot(name, selector, { optional = false, underNav = true } = {}) {
  const ok = await evaluate(
    `(() => {
      const el = document.querySelector(${JSON.stringify(selector)});
      if (!el) return false;
      const top = el.getBoundingClientRect().top + window.scrollY;
      window.scrollTo(0, Math.max(0, top - ${underNav ? 72 : 0}));
      return true;
    })()`,
  )
  if (!ok) {
    if (optional) {
      console.log(`SKIP  ${name} — not present: ${selector}`)
      return null
    }
    check(name, false, `selector not found: ${selector}`)
    return null
  }
  await sleep(160)
  const { data } = await send('Page.captureScreenshot', { format: 'png' })
  const { mkdirSync: mk } = await import('node:fs')
  mk(`${OUT}/${name.split('/')[0]}`, { recursive: true })
  writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, 'base64'))
  check(name, true, `${VIEWPORT.width * VIEWPORT.scale}x${VIEWPORT.height * VIEWPORT.scale}`)
  return `${OUT}/${name}.png`
}

const EXPLORATION_KEY = 'sei.exploration.v1'
const SETTINGS_KEY = 'sei.settings.v1'

async function setCharacter(id) {
  await evaluate(`localStorage.setItem('sei.character.v1', ${JSON.stringify(id)})`)
}

async function setMode(mode, apiKey = '') {
  const settings = {
    mode,
    apiKey,
    model: 'gemini-2.5-flash',
    testResult: mode === 'ai' ? { status: 'success', message: 'Terhubung.', checkedAt: new Date().toISOString() } : null,
  }
  await evaluate(
    `localStorage.setItem(${JSON.stringify(SETTINGS_KEY)}, ${JSON.stringify(JSON.stringify(settings))})`,
  )
}

async function seedExploration(state) {
  await evaluate(
    `localStorage.setItem(${JSON.stringify(EXPLORATION_KEY)}, ${JSON.stringify(JSON.stringify(state))})`,
  )
}

const SMP_SCALE = new Set([11])

function smpAnswers(upto) {
  const answers = {}
  for (let i = 1; i <= upto; i += 1) {
    answers['q' + i] = SMP_SCALE.has(i) ? ['3'] : ['a']
  }
  return answers
}

function smpResultsAnswers() {
  return {
    q1: ['a'],
    q4: ['d'],
    q6: ['a'],
    q7: ['b'],
    q8: ['d'],
    q9: ['d'],
    q11: ['3'],
  }
}

const AI_QUESTIONS = [
  { id: 'aq1', type: 'single', prompt: 'Kalau boleh memilih, belajar model mana yang paling pas buatmu?', options: [
    { id: 'a', label: 'Banyak teori & konsep dulu, praktik belakangan' },
    { id: 'b', label: 'Langsung praktik, teorinya sambil jalan' },
    { id: 'c', label: 'Campuran keduanya seimbang' },
    { id: 'd', label: 'Belum tahu, tergantung situasinya' } ] },
  { id: 'aq2', type: 'multi', maxSelect: 2, helper: 'Pilih maksimal 2.', prompt: 'Bidang mana yang paling bikin kamu penasaran?', options: [
    { id: 'a', label: 'Teknologi & komputer' }, { id: 'b', label: 'Kesehatan' },
    { id: 'c', label: 'Bisnis & uang' }, { id: 'd', label: 'Seni & desain' },
    { id: 'e', label: 'Sosial & mengajar' }, { id: 'f', label: 'Hukum & keadilan' },
    { id: 'g', label: 'Teknik & mesin' } ] },
  { id: 'aq3', type: 'linear', allowNeutral: true, prompt: 'Di kelas, kamu lebih nyaman di sisi mana?', left: 'Memahami teori & konsep', right: 'Langsung mencoba praktik', options: [
    { id: 'left', label: 'Memahami teori & konsep' }, { id: 'neutral', label: 'Sama saja' },
    { id: 'right', label: 'Langsung mencoba praktik' } ] },
  { id: 'aq4', type: 'single', prompt: 'Setelah lulus nanti, gambaran hidup mana yang paling kamu inginkan?', options: [
    { id: 'a', label: 'Cepat punya penghasilan & pengalaman kerja' },
    { id: 'b', label: 'Kuliah dulu setinggi mungkin' },
    { id: 'c', label: 'Kuliah sambil kerja atau usaha' },
    { id: 'd', label: 'Belum tahu, ingin cari gambaran dulu' } ] },
  { id: 'aq5', type: 'multi', maxSelect: 3, helper: 'Pilih maksimal 3.', prompt: 'Kegiatan apa yang bisa kamu lakukan lama tanpa cepat bosan?', options: [
    { id: 'a', label: 'Ngutak-atik aplikasi, gadget, atau kode' },
    { id: 'b', label: 'Membaca, meneliti, atau menyusun data' },
    { id: 'c', label: 'Mengobrol, membantu, atau mengajar orang' },
    { id: 'd', label: 'Gerak, olahraga, atau kerja fisik' },
    { id: 'e', label: 'Mengatur acara, uang, atau penjualan' },
    { id: 'f', label: 'Menggambar, musik, atau membuat konten' },
    { id: 'g', label: 'Membongkar-pasang atau merakit sesuatu' } ] },
  { id: 'aq11', type: 'single', prompt: 'Menurutmu, kuliah itu...', options: [
    { id: 'a', label: 'Harus — jalur utama menuju kesuksesan' },
    { id: 'b', label: 'Bagus, tapi hanya kalau memang cocok' },
    { id: 'c', label: 'Belum tentu perlu; skill & kerja juga bisa' },
    { id: 'd', label: 'Masih benar-benar bingung' } ] },
  { id: 'aq13', type: 'linear', allowNeutral: true, prompt: 'Antara SMA dan SMK, mana yang lebih menarik buatmu?', left: 'SMA — banyak materi & persiapan kuliah', right: 'SMK — banyak praktik & skill kerja', options: [
    { id: 'left', label: 'SMA — banyak materi & persiapan kuliah' },
    { id: 'neutral', label: 'Sama saja / belum tahu' },
    { id: 'right', label: 'SMK — banyak praktik & skill kerja' } ] },
  { id: 'aq15', type: 'multi', maxSelect: 3, optional: true, helper: 'Pilih maksimal 3, atau lewati kalau belum ada.', prompt: 'Hal apa yang ingin kamu siapkan atau coba dalam 6 bulan ke depan?', options: [
    { id: 'a', label: 'Merapikan nilai rapor' }, { id: 'b', label: 'Ikut lomba atau organisasi' },
    { id: 'c', label: 'Belajar skill baru secara mandiri' }, { id: 'd', label: 'Mencari info jurusan & kampus' },
    { id: 'e', label: 'Mencari info kerja atau PKL' }, { id: 'f', label: 'Mengerjakan proyek kecil sendiri' },
    { id: 'g', label: 'Diskusi dengan guru atau orang tua' } ] },
]

function aiResultsAnswers() {
  return {
    aq1: ['a'], aq2: ['a'], aq3: ['left'], aq4: ['b'], aq5: ['a'],
    aq8: ['d'], aq9: ['right'], aq10: ['a'], aq11: ['a'], aq13: ['left'],
    aq14: ['a'], aq15: ['c', 'd', 'g'],
  }
}

const AI_NOTES = {
  tq1: 'Aku ingin jadi programmer dan suka membongkar-pasang aplikasi.',
  tq3: 'Orang tuaku mendukung penuh, asalkan aku tetap punya rencana yang jelas.',
}

await setViewport(VIEWPORT)

await goto('/')
await setMode('default')

await setCharacter('boy')
await goto('/')
await settle()

const heroHasMascot = await evaluate(
  "Boolean(document.querySelector('.landing-hero img'))",
)
check('landing hero renders the mascot', heroHasMascot)
const heroIsBoy = await evaluate(
  "document.querySelector('.landing-hero img')?.getAttribute('src')",
)
check('landing hero uses the boy character', heroIsBoy?.includes('boy'), heroIsBoy)
const landingOverflow = await evaluate(
  'document.documentElement.scrollWidth - window.innerWidth',
)
check('landing has no horizontal overflow (desktop)', landingOverflow <= 0, `${landingOverflow}px`)

await sectionShot('landing/01-hero', '.landing-hero')
await sectionShot('landing/02-about', '#tentang')
await sectionShot('landing/03-how-it-works', '#cara-kerja')
await sectionShot('landing/04-assessment-preview', '#preview-asesmen')
await sectionShot('landing/05-reflection', '.reflection-section')
await sectionShot('landing/06-for-whom', '#untuk-siapa')
await sectionShot('landing/07-call-to-action', '.cta-band')
await sectionShot('landing/08-footer', 'footer')

await seedExploration({ level: null, track: null, answers: {}, notes: {}, index: 0, completed: false, completedAt: null })
await goto('/mulai')
await settle()
await sectionShot('assessment/01-level-selection', '.page-shell')

await seedExploration({ level: 'sma-smk', track: 'sma', answers: {}, notes: {}, index: 0, completed: false, completedAt: null })
await goto('/mulai/sekolah')
await settle()
await sectionShot('assessment/02-track-selection', '.page-shell')

await seedExploration({ level: 'sma-smk', track: 'sma', answers: {}, notes: {}, index: 0, completed: false, completedAt: null })
await goto('/asesmen/pengantar')
await settle()
await sectionShot('assessment/03-introduction', '.page-shell')

await setMode('ai', 'demo-key-for-screenshots')
await seedExploration({
  level: 'smp',
  track: null,
  answers: {},
  notes: {
    tq1: 'Aku suka membongkar-pasang aplikasi dan mencoba fitur baru.',
    tq2: 'Pengin kuliah teknik, tapi belum yakin jurusannya apa.',
    tq3: 'Kalau kerja kelompok aku biasanya yang merapikan ide.',
    tq4: 'Suka bingung milih karena banyak yang pengen dicoba.',
    tq5: 'Enam bulan ke depan mau belajar dasar coding sendiri.',
  },
  index: 1,
  completed: false,
  completedAt: null,
})
await goto('/asesmen/kecenderungan')
await settle()
const essayHasTextarea = await evaluate("Boolean(document.querySelector('.tendency textarea'))")
check('tendency page renders a free-text essay answer', essayHasTextarea)
await sectionShot('assessment/04-ai-reflection-essay', '.tendency')

await setMode('default')
const base = { level: 'smp', track: null, notes: {}, completed: false, completedAt: null }

await seedExploration({ ...base, answers: {}, index: 0 })
await goto('/asesmen')
await settle()
const singleChoices = await evaluate("document.querySelectorAll('.assessment .choice').length")
check('single-choice question shows options', singleChoices > 0, `${singleChoices} options`)
await sectionShot('assessment/05-question-single-choice', '.assessment')

await seedExploration({ ...base, answers: smpAnswers(3), index: 3 })
await goto('/asesmen')
await settle()
const multiHelper = await evaluate(
  "Boolean([...document.querySelectorAll('.assessment__hint')].find((e) => /Pilih/i.test(e.textContent)))",
)
check('multi-select question shows a "pilih" hint', multiHelper)
await sectionShot('assessment/06-question-multi-select', '.assessment')

await seedExploration({ ...base, answers: smpAnswers(10), index: 10 })
await goto('/asesmen')
await settle()
const isScale = await evaluate("Boolean(document.querySelector('.assessment .choices--scale'))")
check('scale question renders the 1-5 scale control', isScale)
await sectionShot('assessment/07-question-scale', '.assessment')

await setMode('ai', 'demo-key-for-screenshots')
await seedExploration({
  level: 'smp', track: null, answers: {}, notes: AI_NOTES,
  index: 2, completed: false, completedAt: null,
  modeUsed: 'ai', aiQuestions: AI_QUESTIONS, aiResult: null,
})
await goto('/asesmen')
await settle()
const aiLinear = await evaluate("Boolean(document.querySelector('.assessment .choices--linear'))")
check('AI question renders the linear (side-choice) control', aiLinear)
await sectionShot('assessment/08-ai-question-linear', '.assessment')

await setMode('default')
await seedExploration({
  level: 'smp', track: null, answers: {}, notes: {},
  index: 15, completed: true, completedAt: new Date().toISOString(), modeUsed: 'default',
})
await send('Page.navigate', { url: `${BASE}/asesmen/selesai` })
await sleep(700)
await sectionShot('assessment/09-completion', '.complete', { underNav: false, optional: true })

await seedExploration({
  level: 'smp',
  track: null,
  answers: smpResultsAnswers(),
  notes: {},
  index: 15,
  completed: true,
  completedAt: new Date().toISOString(),
  modeUsed: 'default',
})
await goto('/hasil')
await settle(500)
const resultsMascot = await evaluate(
  "document.querySelector('.results-hero__figure img')?.getAttribute('src')",
)
check('results show the celebrating pose', resultsMascot?.includes('celebrating'), resultsMascot)
check('results use the boy character', resultsMascot?.includes('boy'), resultsMascot)
await sectionShot('results/01-summary', '.results-hero')
await sectionShot('results/02-interest-signals', 'section:has(#tendensi-title)')
await sectionShot('results/03-field-recommendations', 'section:has(#bidang-title)')
await sectionShot('results/04-alternative-fields', 'section:has(#alternatif-title)', { optional: true })
await sectionShot('results/05-pathway-note', 'section:has(#jalur-title)', { optional: true })
await sectionShot('results/06-next-exploration', 'section:has(#eksplorasi-title)')

await seedExploration({
  level: 'sma-smk',
  track: 'sma',
  answers: Object.fromEntries(
    Array.from({ length: 10 }, (_, i) => ['sq' + (i + 1), ['a']]),
  ),
  notes: {},
  index: 15,
  completed: true,
  completedAt: new Date().toISOString(),
  modeUsed: 'default',
})
await goto('/hasil/sma-smk')
await settle(500)
await sectionShot('results/07-sma-smk-summary', '.results-hero')
await sectionShot('results/08-sma-smk-direction', 'section:has(#arah-title)')

await seedExploration({
  level: 'smp', track: null, answers: aiResultsAnswers(), notes: AI_NOTES,
  index: 0, completed: true, completedAt: new Date().toISOString(),
  modeUsed: 'ai', aiQuestions: AI_QUESTIONS, aiResult: null,
})
await goto('/hasil/ai')
await settle(600)
const aiEyebrow = await evaluate(
  "[...document.querySelectorAll('.eyebrow')].some((e) => /Hasil AI/i.test(e.textContent))",
)
check('AI results page shows the "Hasil AI · ringkas" label', aiEyebrow)
const aiNoErrorBanner = await evaluate(
  "!document.querySelector('.result-section .callout--quiet, .callout[title*=\"belum bisa\"]')",
)
check('AI results page renders without an AI-failure banner', aiNoErrorBanner)
await sectionShot('results/09-ai-summary', '.results-hero')
await sectionShot('results/10-ai-choices', 'section:has(#ringkasan-title)')
await sectionShot('results/11-ai-recommendation', 'section:has(#rekom-title)')
await sectionShot('results/12-ai-preparation', 'section:has(#alasan-title)')

await goto('/jalur')
await settle()
await sectionShot('pathways/01-pathway-info', '.page-shell')

const smkTabClicked = await evaluate(
  "(() => { const b = [...document.querySelectorAll('[role=\"tab\"]')].find((x) => /SMK/i.test(x.textContent)); if (!b) return false; b.click(); return true; })()",
)
check('pathways page exposes a selectable SMK tab', smkTabClicked)
await sleep(350)
await sectionShot('pathways/02-pathway-smk-tab', '.page-shell')

await goto('/jalur/bandingkan')
await settle()
await sectionShot('pathways/03-pathway-comparison', '.page-shell')

await goto('/jelajah/bidang/tech')
await settle()
await sectionShot('pathways/04-field-exploration', '.results-hero')

await setViewport(MOBILE)
await goto('/')
await settle()
const mobileOverflow = await evaluate(
  'document.documentElement.scrollWidth - window.innerWidth',
)
check('landing has no horizontal overflow (mobile)', mobileOverflow <= 0, `${mobileOverflow}px`)
await sectionShot('mobile/01-landing-hero', '.landing-hero')

await setMode('default')
await seedExploration({ ...base, answers: {}, index: 0 })
await goto('/asesmen')
await settle()
await sectionShot('mobile/02-assessment-question', '.assessment', { underNav: false })

console.log(`\nScreenshots written to ${OUT}/`)
const failed = results.filter((r) => !r.pass)
console.log(`${results.length - failed.length}/${results.length} checks passed`)
if (failed.length) {
  console.log('Failed checks:')
  for (const f of failed) console.log(`  - ${f.name}${f.detail ? ` (${f.detail})` : ''}`)
}
socket.close()
chrome.kill()
process.exit(failed.length === 0 ? 0 : 1)
