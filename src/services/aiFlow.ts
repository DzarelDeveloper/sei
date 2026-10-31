
import {
  chat,
  extractJson,
} from './aiClient'
import type {
  EducationLevelId,
  Question,
  QuestionOption,
  QuestionType,
  SmaSmkTrackId,
} from '../data/questions'
import type { AiAssessmentResult, AiScholarship } from '../data/assessmentResultsAi'
import type { Profession, StudyProgramme, SmaSmkFieldId, UniversityLink } from '../data/planningSmaSmk'

const FIELD_IDS: SmaSmkFieldId[] = [
  'tech',
  'health',
  'business',
  'creative',
  'education-social',
  'law',
  'engineering',
]

export const AI_QUESTION_TARGET = 15

interface QuestionContext {
  level: EducationLevelId | null
  track?: SmaSmkTrackId | null
  essays: Record<string, string>
}

interface ResultContext extends QuestionContext {
  questions: Question[]
  answers: Record<string, string[]>
}

export async function aiGenerateQuestions(
  apiKey: string,
  ctx: QuestionContext,
): Promise<Question[]> {
  const system = [
    'Kamu adalah bagian dari SEI, pendamping eksplorasi karier pelajar Indonesia.',
    'Bahasa: Indonesia, santai, hangat, jelas. Untuk pelajar SMP/SMA/SMK.',
    'Balas HANYA dengan JSON valid, tanpa penjelasan, tanpa pagar kode.',
  ].join('\n')

  const schema =
    'Format JSON: {"questions":[<15 objek>]} — tiap objek punya: ' +
    '"type" ("single" | "multi" | "linear" | "essay"), "prompt" (1 kalimat), ' +
    '"optional" (true/false; WAJIB false untuk semua essay) dan untuk essay tambahkan "placeholder" (petunjuk singkat isian). ' +
    'Untuk "single"/"multi"/"linear" ada "options" (array {"id","label","description?"}). ' +
    'Untuk "multi" tambah "maxSelect" (2-3). ' +
    'Untuk "linear" tambah "left","right","allowNeutral" (true/false), dan options-nya WAJIB ber-id "left","right" (plus "neutral" bila allowNeutral). ' +
    'single: 3-5 opsi (id "a","b","c",...). essay: TANPA options (hanya prompt + placeholder). ' +
    'Semua id soal dibuat otomatis (aq1..aq15), jangan kirim id.'

  const scopeNote =
    ctx.level === 'sma-smk'
      ? `Siswa ini SUDAH berada di jenjang ${levelLabel(ctx.level, ctx.track)}. JANGAN lagi menanyakan pilihan SMA vs SMK (sudah diputuskan). Gali arah SETELAH lulus: kuliah vs kerja, minat bidang, kendala BIAYA, rencana beasiswa, target jurusan/PTN vs PTS, atau pekerjaan yang ingin dilamar.`
      : 'Siswa ini masih SMP dan akan memilih SMA atau SMK setelahnya. Gali KEDUA pilihan sekolah itu dan gambaran arah setelahnya.'

  const user = [
    `Jenjang: ${levelLabel(ctx.level, ctx.track)}.`,
    scopeNote,
    'Jawaban esai awal siswa (jadi dasar supaya soal FOKUS ke arah & kondisinya, bukan generik):',
    essaysDigest(ctx.essays),
    '',
    `Buat TEPAT ${AI_QUESTION_TARGET} soal dengan CAMPURAN: MINIMAL 5 soal "essay" (jawaban diketik bebas, tidak ada pilihan), sisanya campuran "single", "multi", dan "linear".`,
    'Semua soal essay WAJIB diisi (optional false).',
    'GALI LEBIH DALAM & SPESIFIK dari esai di atas, bukan pertanyaan generik. Sertakan dilema nyata yang bikin siswa bingung, misalnya: alasan bingung kuliah vs kerja karena BIAYA (tidak punya dana kuliah makanya mau kerja dulu), rencana mengambil BEASISWA tapi tetap mempertimbangkan kerja dulu, kesiapan mental/homesick, tekanan atau restu orang tua, target kampus PTN vs PTS, atau bidang/posisi kerja yang ingin dilamar.',
    'Contoh soal essay yang DIMAKSUD: "Kalau biaya jadi hambatan kuliah, apa yang akan kamu lakukan? (kerja dulu kumpulkan uang, cari beasiswa, atau lain-lain — jelaskan.)". Hindari soal hambar seperti "apa motivasimu?".',
    'Sesuaikan contoh, angka, dan opsi jawaban dengan isi esai siswa. Jangan berasumsi jurusan/pekerjaan tertentu.',
    'Jaga teks ringkas (hemat token): prompt 1 kalimat, label opsi pendek.',
    schema,
  ].join('\n')

  const raw = await chat(apiKey, system, user, { json: true, temperature: 0.8 })
  const parsed = extractJson<{ questions?: unknown }>(raw)
  const list = Array.isArray(parsed) ? parsed : parsed?.questions

  const questions = normalizeQuestions(list)
  if (questions.length < 8) {
    throw new Error(
      'AI mengembalikan terlalu sedikit soal yang sah. Coba lagi.',
    )
  }
  return questions.slice(0, AI_QUESTION_TARGET)
}

export async function aiGenerateResult(
  apiKey: string,
  ctx: ResultContext,
): Promise<AiAssessmentResult> {
  const system = [
    'Kamu SEI, pendamping eksplorasi karier pelajar Indonesia. Bahasa Indonesia, hangat, ringkas.',
    'Balas HANYA JSON valid tanpa pagar kode atau teks lain. JAWABAN PENDEK: hemat token, kalimat singkat.',
  ].join('\n')

  const schema =
    'Format JSON: {"summary":string(maks 2 kalimat, sebutkan rencana siswa + bidang yang paling didukung), ' +
    '"direction":{"id":"kuliah"|"kerja"|"hybrid","name":"Kuliah dulu"|"Kerja / praktik dulu"|"Kuliah sambil kerja","headline":string(1 kalimat penyemangat yang spesifik)} — ' +
    'INI "arah jangka panjang SESUDAH sekolah" (mau kuliah, kerja, atau keduanya). JANGAN menaruh nama negara di sini. ' +
    '"school":{"id":"sma"|"smk"|"netral","label":string,"note":string(1 kalimat)} — ' +
    'INI "langkah sekolah TERDEKAT" (pilihan SMA vs SMK saat ini), BUKAN rencana kuliah/masa depan. label singkat (mis. "Cenderung cocok di SMA"). JANGAN tulis nama negara atau "kuliah ke luar negeri" di label/note sekolah. ' +
    '"field":{"id":salah satu ' + JSON.stringify(FIELD_IDS) + ' atau null,"name":string,"copy":string(1-2 kalimat),"programmes":[{"name","note","urls":[{"label","url"}]}] maks 3,"professions":[{"name","note"}] maks 3} — ' +
    'copy WAJIB spesifik mengaitkan minat nyata siswa dari jawabannya. DILARANG kalimat generik seperti "bidang yang menjanjikan dengan banyak peluang". ' +
    'programmes = JURUSAN konkret (maks 3); tiap note WAJIB menyebut NAMA KAMPUS NYATA Indonesia — bukan placeholder. ' +
    'Contoh PTN: UI (ui.ac.id), ITB (itb.ac.id), UGM (ugm.ac.id), ITS (its.ac.id), Unpad (unpad.ac.id), UB (ub.ac.id), Undip (undip.ac.id), Unair (unair.ac.id). ' +
    'Contoh PTS: BINUS (binus.ac.id), UMN (umn.ac.id), Univ. Telkom (telkomuniversity.ac.id), Trisakti (trisakti.ac.id), Untar (utar.ac.id), UPH (uph.ac.id), UK Petra (petra.ac.id), UNIKOM (unikom.ac.id). ' +
    'urls: sertakan array {label,note} berisi link kampus yang disebut di note — gunakan URL resmi. Jika tidak yakin, kosongkan array. ' +
    'DILARANG menulis "Universitas Negeri" sebagai nama kampus. ' +
    'professions = POSISI kerja konkret yang bisa mulai dilamar (mis. Staff Administrasi di perusahaan FMCG, Junior Web Developer di startup), tiap note menyebutkan tipe perusahaan/tempat kerja nyata. ' +
    '"reasons":[{"question":string,"answer":string}] maks 4 (kutip persis pilihan siswa yang paling menentukan arah & bidang), ' +
    '"goals":[string] PAS 3 (langkah konkret yang bisa disiapkan), ' +
    '"scholarships":[{"name":string,"url":string,"note":string(1 kalimat)}] maks 4 — rekomendasi beasiswa yang relevan dengan arah siswa. WAJIB gunakan URL https:// (bukan http://). Untuk kuliah dalam negeri (S1): KIP-Kuliah https://kip-kuliah.kemdiktisaintek.go.id, Beasiswa Indonesia Bangkit https://beasiswa.kemenag.go.id, Tanoto Foundation https://www.tanotofoundation.org, Djarum Plus https://djarumbeasiswaplus.org. Untuk S2/S3 atau luar negeri: LPDP https://lpdp.kemenkeu.go.id, Australia Awards https://www.australiaawardsindonesia.org, Chevening/UK https://www.chevening.org, Fulbright/AS https://fulbright.or.id, DAAD/Jerman https://daad-indonesia.org, MEXT/Jepang https://www.id.emb-japan.go.jp/scholarship.html, GKS/Korea https://www.studyinkorea.go.kr, Turkiye Burslari https://www.turkiyeburslari.gov.tr. Hanya tampilkan yang relevan dengan konteks siswa (S1/S2, dalam/luar negeri, bidang). ' +
    '"parentNote":string|null (1-3 kalimat; khusus kalau keinginan siswa & orang tua terlihat beda; kalau sejalan beri apresiasi singkat; selain itu null)}.'

  const axisNote =
    ctx.level === 'sma-smk'
      ? [
          `Siswa SUDAH menempuh ${levelLabel(ctx.level, ctx.track)} — keputusan SMA/SMK sudah lewat, JANGAN disarankan lagi. Set school.id jadi "netral" dan label sekolah cukup menyatakan jenjang saat ini.`,
          'Fokus utama: direction (kuliah vs kerja vs keduanya) + bidang + jurusan (PTN/PTS) atau posisi kerja konkret yang bisa dilamar.',
        ]
      : [
          'PENTING — bedakan dua hal supaya tidak rancu:',
          '1) school = keputusan SEKARANG (SMA atau SMK). 2) direction = arah JANGKA PANJANG setelah sekolah (kuliah/kerja).',
          'Kalau siswa menyebut mimpi tertentu (mis. kuliah/kerja ke luar negeri), itu masuk ke direction/headline atau goals, BUKAN membuat label sekolah jadi aneh.',
          'Contoh yang BENAR: school.label "Cenderung cocok di SMA" + direction.name "Kuliah dulu" + direction.headline menyebut mimpi luar negeri + goals menyiapkan bahasa/beasiswa.',
        ]

  const user = [
    `Jenjang: ${levelLabel(ctx.level, ctx.track)}.`,
    'Esai awal siswa:',
    essaysDigest(ctx.essays),
    'Jawaban soal pilihan siswa:',
    answersDigest(ctx.questions, ctx.answers, ctx.essays),
    '',
    ...axisNote,
    'Bacakan arah yang paling didukung jawaban. Kalau bukti lemah, akui dan beri langkah mencari contoh nyata.',
    'Jadilah SPESIFIK & TINDAK LANJUT NYATA, jangan mengambang:',
    '- Arah kuliah: tunjukkan jurusan yang cocok dan bandingkan PTN vs PTS mana yang lebih pas (mis. biaya, lokasi, seleksi) di catatan program studi. professions tetap sertakan sebagai alternatif "kalau mau sambil kerja".',
    '- Arah kerja: PRIORITASKAN professions — posisi konkret + langkah melamar. programmes hanya opsional "kalau mau lanjut kuliah nanti" dan cukup 2-3 saja.',
    '- Arah hybrid: tampilkan keduanya setara.',
    '- Beasiswa: sertakan jika siswa menyebut kendala biaya, rencana lanjut S2/S3, atau mimpi kuliah luar negeri.',
    '- goals: 3 langkah yang benar-benar bisa dikerjakan minggu ini (cek syarat PTN/PTS atau beasiswa, siapkan CV/portofolio, dll).',
    schema,
  ].join('\n')

  const raw = await chat(apiKey, system, user, { json: true, temperature: 0.5 })
  const parsed = extractJson<Record<string, any>>(raw)
  return normalizeResult(parsed, ctx)
}

const ALLOWED_TYPES: QuestionType[] = ['single', 'multi', 'linear', 'essay']

function normalizeQuestions(list: unknown): Question[] {
  if (!Array.isArray(list)) return []
  const out: Question[] = []

  list.forEach((itemRaw, index) => {
    if (!itemRaw || typeof itemRaw !== 'object') return
    const item = itemRaw as Record<string, any>
    const prompt = str(item.prompt)
    if (!prompt) return

    let type = (str(item.type) ?? '') as QuestionType
    if (!ALLOWED_TYPES.includes(type)) type = 'single'

    const options = sanitizeOptions(item.options)
    if (type === 'linear') {
      const built = buildLinear(item, options)
      if (!built) return
      out.push({
        id: `aq${index + 1}`,
        type: 'linear',
        prompt,
        helper: str(item.helper) ?? undefined,
        left: built.left,
        right: built.right,
        allowNeutral: built.allowNeutral,
        options: built.options,
      })
      return
    }

    if (type === 'essay') {
      out.push({
        id: `aq${index + 1}`,
        type: 'essay',
        prompt,
        helper: str(item.helper) ?? undefined,
        placeholder: str(item.placeholder) ?? undefined,
        optional: item.optional === true,
        options: [],
      })
      return
    }

    if (options.length < 2) return
    const question: Question = {
      id: `aq${index + 1}`,
      type,
      prompt,
      helper: str(item.helper) ?? undefined,
      options,
    }
    if (type === 'multi') {
      const max = Number(item.maxSelect)
      question.maxSelect = Number.isFinite(max) && max >= 2 ? Math.min(max, 4) : 2
      question.helper = question.helper ?? `Pilih maksimal ${question.maxSelect}.`
    }
    out.push(question)
  })

  return out
}

function sanitizeOptions(raw: unknown): QuestionOption[] {
  if (!Array.isArray(raw)) return []
  const seen = new Set<string>()
  const opts: QuestionOption[] = []
  raw.forEach((entry, i) => {
    if (!entry || typeof entry !== 'object') return
    const e = entry as Record<string, any>
    const label = str(e.label)
    if (!label) return
    const id = str(e.id) ?? String.fromCharCode(97 + i)
    if (seen.has(id)) return
    seen.add(id)
    const option: QuestionOption = { id, label }
    const description = str(e.description)
    if (description) option.description = description
    opts.push(option)
  })
  return opts
}

function buildLinear(
  item: Record<string, any>,
  options: QuestionOption[],
): { left: string; right: string; allowNeutral: boolean; options: QuestionOption[] } | null {
  const explicitLeft = options.find((o) => o.id === 'left')
  const explicitRight = options.find((o) => o.id === 'right')
  const left = str(item.left) ?? explicitLeft?.label
  const right = str(item.right) ?? explicitRight?.label ?? options[options.length - 1]?.label
  if (!left || !right) return null

  const allowNeutral =
    item.allowNeutral === true ||
    (item.allowNeutral !== false && options.some((o) => o.id === 'neutral'))

  const built: QuestionOption[] = [{ id: 'left', label: left }]
  if (allowNeutral) built.push({ id: 'neutral', label: 'Sama saja' })
  built.push({ id: 'right', label: right })

  return { left, right, allowNeutral, options: built }
}

function normalizeResult(
  parsed: Record<string, any>,
  ctx: ResultContext,
): AiAssessmentResult {
  const directionId = pick(str(parsed?.direction?.id), ['kuliah', 'kerja', 'hybrid'], 'hybrid')
  const schoolId = pick(str(parsed?.school?.id), ['sma', 'smk', 'netral'], 'netral')

  const directionName =
    directionId === 'kuliah'
      ? 'Kuliah dulu'
      : directionId === 'kerja'
        ? 'Kerja / praktik dulu'
        : 'Kuliah sambil kerja'

  const schoolLabel =
    schoolId === 'sma'
      ? 'Cenderung cocok di SMA'
      : schoolId === 'smk'
        ? 'Cenderung cocok di SMK'
        : 'SMA dan SMK sama-sama masuk akal'

  const fieldIdRaw = str(parsed?.field?.id)
  const fieldId =
    fieldIdRaw && (FIELD_IDS as string[]).includes(fieldIdRaw)
      ? (fieldIdRaw as SmaSmkFieldId)
      : null

  const reasons = Array.isArray(parsed?.reasons)
    ? parsed.reasons
        .map((r: any) => ({
          question: str(r?.question) ?? '',
          answer: str(r?.answer) ?? '',
        }))
        .filter((r) => r.answer)
        .slice(0, 4)
    : []

  const goals = (Array.isArray(parsed?.goals) ? parsed.goals : [])
    .map((g: any) => str(g))
    .filter((g): g is string => Boolean(g))
    .slice(0, 3)
  while (goals.length < 3) {
    goals.push('Cari satu contoh nyata jurusan atau pekerjaan di arah yang menarik bagimu.')
  }

  const programmeList: any[] = Array.isArray(parsed?.field?.programmes)
    ? parsed.field.programmes
    : []
  const programmes: StudyProgramme[] = programmeList
    .map((p: any) => {
      const rawUrls: any[] = Array.isArray(p?.urls) ? p.urls : []
      const urls: UniversityLink[] = rawUrls
        .map((u: any) => ({ label: str(u?.label) ?? '', url: str(u?.url) ?? '' }))
        .filter((u) => u.label && u.url && u.url.startsWith('http'))
      return {
        name: str(p?.name) ?? '',
        note: str(p?.note) ?? '',
        urls: urls.length ? urls : undefined,
      }
    })
    .filter((p) => p.name)
    .slice(0, 3)

  const professionList: any[] = Array.isArray(parsed?.field?.professions)
    ? parsed.field.professions
    : []
  const professions: Profession[] = professionList
    .map((p: any) => ({ name: str(p?.name) ?? '', note: str(p?.note) ?? '' }))
    .filter((p) => p.name)
    .slice(0, 3)

  const answeredCount = ctx.questions.filter(
    (question) => (ctx.answers[question.id] ?? []).length > 0,
  ).length

  const parentNote = str(parsed?.parentNote)

  const scholarshipList: any[] = Array.isArray(parsed?.scholarships)
    ? parsed.scholarships
    : []
  const scholarships: AiScholarship[] = scholarshipList
    .map((s: any) => ({
      name: str(s?.name) ?? '',
      url: str(s?.url) ?? '',
      note: str(s?.note) ?? '',
    }))
    .filter((s) => s.name && s.url)
    .slice(0, 4)

  return {
    hasEnoughSignals: answeredCount >= 5,
    answeredCount,
    summary:
      str(parsed?.summary) ??
      'AI sudah membaca jawabanmu, tapi rangkumannya kosong — ini hasil pembacaan lokal.',
    direction: {
      id: directionId,
      name: directionName,
      headline:
        str(parsed?.direction?.headline) ?? 'Arah awal dari pola jawabanmu.',
    },
    school: {
      id: schoolId,
      label: schoolLabel,
      note:
        str(parsed?.school?.note) ??
        'Belum ada sinyal kuat ke salah satu; bandingkan keduanya sebelum memutuskan.',
    },
    field: {
      id: fieldId,
      name: str(parsed?.field?.name) ?? 'Belum ada bidang menonjol',
      copy:
        str(parsed?.field?.copy) ??
        'Isi beberapa pertanyaan lagi untuk arahan yang lebih spesifik.',
      programmes,
      professions,
    },
    reasons,
    goals,
    parentNote,
    scholarships,
  }
}

const ESSAY_LABELS: Record<string, string> = {
  tq1: 'Rencana/pilihan',
  tq2: 'Alasan',
  tq3: 'Keinginan sendiri & orang tua',
  tq4: 'Cadangan',
  tq5: 'Harapan/kekhawatiran',
}

function essaysDigest(notes: Record<string, string>): string {
  const lines = Object.keys(ESSAY_LABELS)
    .map((id) => {
      const value = (notes[id] ?? '').trim()
      return value ? `- ${ESSAY_LABELS[id]}: ${truncate(value, 240)}` : null
    })
    .filter((line): line is string => Boolean(line))
  return lines.length ? lines.join('\n') : '(tidak ada isian esai)'
}

function answersDigest(
  questions: Question[],
  answers: Record<string, string[]>,
  notes: Record<string, string>,
): string {
  const lines: string[] = []
  for (const question of questions) {
    if (question.type === 'essay') {
      const text = (notes[question.id] ?? '').trim()
      if (text) lines.push(`- ${truncate(question.prompt, 90)} → (esai) ${truncate(text, 200)}`)
      continue
    }
    const selected = answers[question.id] ?? []
    if (selected.length === 0) continue
    const labels = selected
      .map((id) => question.options.find((option) => option.id === id)?.label ?? id)
      .join(', ')
    lines.push(`- ${truncate(question.prompt, 90)} → ${labels}`)
  }
  return lines.length ? lines.join('\n') : '(belum ada jawaban pilihan)'
}

function levelLabel(
  level: EducationLevelId | null,
  track?: SmaSmkTrackId | null,
): string {
  if (level === 'sma-smk') return track === 'smk' ? 'SMK' : track === 'sma' ? 'SMA' : 'SMA/SMK'
  return 'SMP'
}

function str(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

function pick<T extends string>(
  value: string | null,
  allowed: T[],
  fallback: T,
): T {
  return value && (allowed as string[]).includes(value) ? (value as T) : fallback
}

function truncate(text: string, max: number): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length > max ? `${clean.slice(0, max - 1)}…` : clean
}
