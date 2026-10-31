

import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'

const BASE = 'http://localhost:5173'
const OUT = 'design/verify'
const PORT = 9333

mkdirSync(OUT, { recursive: true })

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const chrome = spawn('google-chrome-stable', [
  '--headless=new',
  '--disable-gpu',
  '--no-sandbox',
  '--hide-scrollbars',
  '--remote-debugging-port=' + PORT,
  '--user-data-dir=/tmp/sei-verify-profile',
  '--window-size=1440,1000',
  'about:blank',
])

process.on('exit', () => chrome.kill())

async function waitForDevtools() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
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
    }, 15000)
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

async function setViewport(width, height) {
  await send('Emulation.setDeviceMetricsOverride', {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width < 700,
  })
}

async function goto(path) {
  const loaded = once('Page.loadEventFired')
  await send('Page.navigate', { url: BASE + path })
  await loaded
  await sleep(700)
}

async function evaluate(expression) {
  const result = await send('Runtime.evaluate', {
    expression,
    returnByValue: true,
    awaitPromise: true,
  })
  if (result.exceptionDetails) {
    throw new Error(
      `${expression.slice(0, 60)} -> ${result.exceptionDetails.text}`,
    )
  }
  return result.result.value
}

async function screenshot(name, { full = false } = {}) {
  let params = { format: 'png' }
  if (full) {
    const metrics = await send('Page.getLayoutMetrics')
    const width = Math.ceil(metrics.cssContentSize.width)
    const height = Math.ceil(metrics.cssContentSize.height)
    params = {
      format: 'png',
      captureBeyondViewport: true,
      clip: { x: 0, y: 0, width, height, scale: 1 },
    }
  }
  const { data } = await send('Page.captureScreenshot', params)
  writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, 'base64'))
  return `${OUT}/${name}.png`
}

const results = []
function check(name, pass, detail = '') {
  results.push({ name, pass, detail })
  console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ` — ${detail}` : ''}`)
}

await setViewport(1440, 1000)
await goto('/')
await evaluate("localStorage.setItem('sei.character.v1','boy')")
await goto('/')

const heroBoy = await evaluate(
  "document.querySelector('.hero-mascot__image')?.getAttribute('src')",
)
check('hero shows the stored character', heroBoy?.includes('boy-main'), heroBoy)

const previewMascot = await evaluate(
  "document.querySelector('.preview-section__mascot img')?.getAttribute('src')",
)
check('preview section uses the thinking pose', previewMascot?.includes('thinking'), previewMascot)

await screenshot('landing-hero')
await screenshot('landing-full', { full: true })

const overflowDesktop = await evaluate(
  'document.documentElement.scrollWidth - window.innerWidth',
)
check('landing has no horizontal overflow', overflowDesktop <= 0, `${overflowDesktop}px`)
await send('Runtime.evaluate', { expression: "document.querySelector('#preview-asesmen').scrollIntoView()" })
await sleep(400)
await screenshot('landing-preview')

const seed = {
  level: 'smp',
  answers: { q1: ['a'], q2: ['b'] },
  notes: {},
  index: 2,
  completed: false,
  completedAt: null,
}
await evaluate(
  `sessionStorage.setItem('sei.exploration.v1', ${JSON.stringify(JSON.stringify(seed))})`,
)
await goto('/asesmen/pengantar')
await screenshot('intro-picker', { full: true })

const pickerCount = await evaluate("document.querySelectorAll('.character-grid .character-card').length")
check('picker renders both characters', pickerCount === 2, `${pickerCount} cards`)

await evaluate("document.querySelectorAll('.character-grid .character-card')[1].click()")
await sleep(300)
const storedCharacter = await evaluate("localStorage.getItem('sei.character.v1')")
check('choice persists to localStorage', storedCharacter === 'girl', storedCharacter)

const selectedState = await evaluate(
  "document.querySelector('.character-card--selected .character-card__name')?.textContent",
)
check('selected card shows a selected state', selectedState === 'Karakter cewek', selectedState)

await goto('/')
await sleep(600)
await screenshot('landing-hero-girl')

await goto('/asesmen/pengantar')
const selectedAfterReload = await evaluate(
  "document.querySelector('.character-card--selected .character-card__name')?.textContent",
)
check('choice survives a reload', selectedAfterReload === 'Karakter cewek', selectedAfterReload)

await evaluate(
  `sessionStorage.setItem('sei.exploration.v1', ${JSON.stringify(JSON.stringify(seed))})`,
)

await goto('/asesmen')
const mascotSrc = await evaluate(
  "document.querySelector('.assessment__mascot')?.getAttribute('src')",
)
check('assessment companion follows the character', mascotSrc?.includes('girl-encouraging'), mascotSrc)

await evaluate("document.querySelector('.assessment__body .choice')?.click()")
await sleep(250)
const answersAfterSelect = await evaluate(
  "JSON.parse(sessionStorage.getItem('sei.exploration.v1')).answers",
)
check('answers still recorded after the visual change', Boolean(answersAfterSelect.q3), JSON.stringify(answersAfterSelect))

await screenshot('assessment-desktop')

await evaluate("document.querySelector('.focus__actions .character-trigger').click()")
await sleep(400)
const modalOpen = await evaluate("Boolean(document.querySelector('.modal .character-grid'))")
check('Ganti karakter opens a dialog with the picker', modalOpen)
await screenshot('assessment-switcher')

await evaluate("document.querySelectorAll('.modal .character-card')[0].click()")
await sleep(400)
const afterSwitch = await evaluate(
  "JSON.parse(sessionStorage.getItem('sei.exploration.v1')).answers",
)
check(
  'switching character keeps the answers',
  afterSwitch.q1?.[0] === 'a' && afterSwitch.q3?.length === 1,
  JSON.stringify(afterSwitch),
)
const modalClosed = await evaluate("!document.querySelector('.modal')")
check('dialog closes after choosing', modalClosed)
const switchedMascot = await evaluate(
  "document.querySelector('.assessment__mascot')?.getAttribute('src')",
)
check('mascot swaps without a reload', switchedMascot?.includes('boy-encouraging'), switchedMascot)

await evaluate(
  `sessionStorage.setItem('sei.exploration.v1', ${JSON.stringify(
    JSON.stringify({ ...seed, completed: true, completedAt: new Date().toISOString() }),
  )})`,
)
await goto('/hasil')
const resultsMascot = await evaluate(
  "document.querySelector('.results-hero__figure img')?.getAttribute('src')",
)
check('results show the celebrating pose', resultsMascot?.includes('celebrating'), resultsMascot)
await screenshot('results-hero')

await goto('/asesmen/selesai')
await screenshot('completion')

await setViewport(390, 844)
await goto('/')
await sleep(400)
const overflowMobile = await evaluate(
  'document.documentElement.scrollWidth - window.innerWidth',
)
check('landing has no horizontal overflow on mobile', overflowMobile <= 0, `${overflowMobile}px`)
await screenshot('mobile-landing', { full: true })

await goto('/asesmen/pengantar')
await sleep(300)
const overflowPicker = await evaluate(
  'document.documentElement.scrollWidth - window.innerWidth',
)
check('picker has no horizontal overflow on mobile', overflowPicker <= 0, `${overflowPicker}px`)
await screenshot('mobile-picker', { full: true })

await evaluate(
  `sessionStorage.setItem('sei.exploration.v1', ${JSON.stringify(JSON.stringify(seed))})`,
)
await goto('/asesmen')
const overflowAssessment = await evaluate(
  'document.documentElement.scrollWidth - window.innerWidth',
)
check('assessment has no horizontal overflow on mobile', overflowAssessment <= 0, `${overflowAssessment}px`)
await screenshot('mobile-assessment')

await evaluate(
  `sessionStorage.setItem('sei.exploration.v1', ${JSON.stringify(
    JSON.stringify({ ...seed, completed: true, completedAt: new Date().toISOString() }),
  )})`,
)
await goto('/hasil')
await screenshot('mobile-results')

await setViewport(1440, 1000)
await goto('/hasil')
const fallback = await evaluate(`(async () => {
  const img = document.querySelector('.results-hero__figure img')
  const before = img.getAttribute('src')
  img.dispatchEvent(new Event('error'))
  await new Promise((resolve) => setTimeout(resolve, 200))
  return [before, img.getAttribute('src'), img.getAttribute('width'), img.getAttribute('height')]
})()`)
check('missing pose falls back to the main asset', fallback[1]?.includes('main'), fallback.join(' | '))

console.log('\nScreenshots in', OUT)
const failed = results.filter((result) => !result.pass)
console.log(`${results.length - failed.length}/${results.length} checks passed`)
socket.close()
chrome.kill()
process.exit(failed.length === 0 ? 0 : 1)
