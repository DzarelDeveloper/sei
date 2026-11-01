# Proposal Solusi & MVP AI Web — Bali DigiFest 2026 (AIWIC2026)

> Draft isi (maks. 5 halaman A4). Ekspor ke PDF A4 dengan nama file:
> `AIWIC2026_Dzarel_SEI.pdf`. Bagian ini adalah isi; cover & lampiran terpisah.

---

## Cover (halaman sendiri — di luar batas 5 halaman)

**SEI — Self Exploration Intelligence**
Peserta: Muhamad Dzarel Alghifari (individu)
Kategori: *(isi sesuai statusmu — SMA/SMK atau Mahasiswa/Umum)*
Kontak: *(isi email/WhatsApp ketua = kamu sendiri)*

---

## 1. Problem & Background

Kebingungan memilih jalur pendidikan adalah masalah nyata dan mahal di
Indonesia, termasuk di Bali. Siswa SMP kelas IX diminta memutuskan lanjut ke
SMA atau SMK; siswa SMA/SMK diminta memilih jurusan perguruan tinggi — sering
dengan informasi seadanya, tekanan sosial, dan tes "minat" instan yang sebenarnya
hanya kuis warna.

Gejalanya terlihat dari angka putus kuliah dan ganti jurusan yang terus
berulang, serta siswa SMK Bali yang masuk pasar kerja pariwisata/kreatif yang
kini bertransformasi digital tanpa tahu skill jembatan apa yang perlu mereka
siapkan. Penyebab utamanya sederhana: **tidak ada alat refleksi yang murah,
private, dan jujur** — yang ada hanya psikotes berbayar, tes bakat instan yang
pseudosains, atau konsultasi terbatas di sekolah.

## 2. Target User

- **Pengguna utama:** siswa SMP/SMA/SMK (13–19 th) di Bali & Indonesia umum;
  orang tua/wali yang mendampingi keputusan.
- **Pain point:** (a) tidak tahu minatnya sendiri diarahkan ke apa; (b) informasi
  jalur (SMA vs SMK, jurusan, beasiswa) tersebar dan tidak dibandingkan;
  (c) takut data pribadi dipakai/dijual aplikasi psikotes.
- **Konteks pemakaian:** ponsel atau laptop pribadi, bahasa Indonesia santai,
  tanpa akun, bisa diulang kapan pun pikiran berubah.

## 3. Proposed Solution

SEI adalah aplikasi web (client-only, tanpa akun, tanpa backend) yang mengubah
asesmen menjadi **proses refleksi bertahap**:

**User journey utama:** Mulai (pilih level & jalur) → Pengantar & kontrak
kejujuran → Asesmen 15 soal (skala, pilihan, linear, esai) → Sintesis
kecenderungan (esai dijabarkan) → Hasil: skor 5 bidang (software, jaringan,
desain, sains, elektronika) + rekomendasi bertingkat → Jelajah bidang
(kurikulum mini + proyek) → Bandingkan jalur SMA/SMK/kerja/kuliah → Langkah
berikutnya.

Nilai proposisinya: **bukan tes bakat, tapi alat refleksi** — tidak ada jurusan
yang dipaksakan, arah tetap milik siswa, dan semua data berhenti di perangkat
sendiri.

## 4. AI Implementation

SEI punya dua mode yang dinyatakan jujur ke pengguna:

| | Mode Default (rule-based) | **Mode AI (BYOK)** |
|---|---|---|
| Skoring | rumus bobot di browser | sama (AI tidak memanipulasi skor) |
| Soal | bank soal statis | **LLM menyusun 3 soal esai personal** dari profil, jalur, dan catatan pengguna |
| Analisis esai | ringkasan heuristik | **LLM membaca jawaban esai** → sintesis kecenderungan berbahasa natural |
| Halaman hasil | kartu aturan | **`/hasil/ai`** — narasi rekomendasi jurusan/pasar kerja, strategi belajar, dan pertanyaan refleksi |

- **Model/API:** OpenAI GPT-4o-mini, Anthropic Claude 3.5 Haiku, Google Gemini
  Flash, Groq Llama 3.3 70B, atau OpenRouter — dipilih otomatis dari prefiks
  API key pengguna (`src/services/aiClient.ts`), dipanggil langsung dari
  browser. Tidak ada server perantara.
- **Input → output:** input = profil + jawaban esai + preferensi (teks);
  output = soal esai personal (JSON tervalidasi skema), sintesis kecenderungan,
  dan narasi hasil (JSON → dirender UI). Parsing defensif + retry backoff +
  pesan error berbahasa Indonesia saat API gagal/429/401.
- **Kenapa AI memang diperlukan:** memahami bahasa alami esai siswa (kalimat
  bebas, bukan pilihan ganda) tidak dapat dilakukan aturan tetap dengan kualitas
  setara; di sinilah LLM menjadi bagian material solusi.
- **Batasan:** rekomendasi LLM tidak diklaim valid secara psikometrik; UI selalu
  menandai mana hasil aturan dan mana hasil AI; tidak ada data dikirim tanpa key
  aktif milik pengguna.

## 5. MVP & Key Features

Sudah berfungsi dan dapat diuji sekarang di **https://sei-explore.netlify.app**:

- Core: alur asesmen lengkap 15 soal, 5 bidang skor, halaman hasil bertingkat,
  jelajah 5 bidang, informasi & perbandingan jalur (SMA/SMK/kerja/kuliah,
  termasuk beasiswa seperti KIP/KIP-K), persistensi progres localStorage,
  pemilihan maskot & karakter.
- AI: susun soal personal, analisis esai, halaman hasil AI, pengaturan BYOK +
  tes koneksi, fallback pesan error ramah.
- Tambahan: dokumentasi produk (README, galeri screenshot otomatis 35 bidikan,
  smoke-test/regenerasi screenshot), brand kit lengkap buatan sendiri.

## 6. Technical Architecture

```text
User (browser, HP/laptop)
  └─ React 18 + TypeScript SPA (Vite 6, React Router 6)   ← hosting Netlify
       ├─ Context state (progres, pengaturan, karakter)
       ├─ localStorage  (satu-satunya penyimpanan data)
       ├─ Mesin skoring & rekomendasi rule-based (di browser)
       └─ [Mode AI] fetch langsung → API provider LLM (BYOK, tanpa backend)
             └─ respons JSON → validasi → dirender ke halaman hasil
```

## 7. Innovation & Differentiation

vs. psikotes berbayar — gratis & private; vs. kuis minat viral — tidak
memaksa label jurusan, memakai esai berbahasa bebas yang dianalisis AI; vs.
aplikasi karier ber-backend — data tidak pernah meninggalkan perangkat; vs.
buku panduan jalur — jalur bisa dibandingkan side-by-side dan terhubung langsung
dengan hasil refleksi personal. Positioning "alat refleksi, bukan tes bakat"
adalah diferensiasi utama yang tidak diambil kompetitor.

## 8. Impact & Development Potential

Dampak: keputusan jalur yang lebih reflektif, penurunan salah jurusan, akses
setara bagi siswa yang tidak mampu membayar psikotes. Relevansi Bali: konten
jalur dapat diperkaya konteks lokal (vokasi pariwisata, ekonomi kreatif,
transformasi digital UMKM). Pengembangan selanjutnya: paket konten per daerah,
mode guru/BK untuk dampingi massal, export hasil ke PDF, dan kalibrasi
instrumen bersama profesional. **Keterbatasan yang diakui jujur:** instrumen
belum divalidasi psikometrik formal; kualitas mode AI bergantung provider &
key pengguna.

## 9. Technology Disclosure

Ringkas: React/TS/Vite/Router (MIT), CSS kustom, font OFL, hosting Netlify
free-tier, LLM via API BYOK, tanpa backend/database, pengembangan dibantu AI
coding assistant, proyek pre-existing pribadi yang diungkap transparan.
**Tabel lengkap: lihat [`DISCLOSURE.md`](../DISCLOSURE.md) di repository.**

## 10. Submission Links

| | |
|---|---|
| GitHub Repository | https://github.com/DzarelDeveloper/sei |
| Deployment URL | https://sei-explore.netlify.app |
| Commit Hash / Tag | `v1.0-submission` *(catat hash final saat deadline)* |
| Demo Account | tidak perlu login; kunci demo mode AI dikirim via kanal panitia |
