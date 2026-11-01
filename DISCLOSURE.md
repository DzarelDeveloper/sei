# AI & Technology Disclosure — SEI

Dokumen ini mengikuti format Lampiran C *Panduan Peserta AI Web Innovation
Challenge — Bali DigiFest 2026* dan dibuka untuk publik bersama source code.

| Komponen | Isi |
|---|---|
| **Nama Produk** | SEI — Self Exploration Intelligence |
| **Framework / Frontend** | React 18.3 + TypeScript 5.7 (strict), dibangun dengan Vite 6, routing dengan React Router 6. Tanpa framework UI pihak ketiga — seluruh styling CSS kustom (design tokens buatan sendiri). |
| **Backend / Runtime** | Tidak ada. Aplikasi 100% client-only; seluruh logika (skoring, rekomendasi, state) berjalan di browser. |
| **Database / Storage** | Tidak ada server database. Persistensi memakai `localStorage` perangkat pengguna (kunci: `sei.exploration.v1`, `sei.settings.v1`, `sei.character.v1`). |
| **Hosting / Deployment** | Netlify (free tier) — https://sei-explore.netlify.app. Build otomatis dari branch `main` GitHub via `netlify.toml`. |
| **AI Model / API / Method** | Mode AI memakai LLM siap pakai via API langsung dari browser (bring-your-own-key): OpenAI GPT-4o-mini, Anthropic Claude 3.5 Haiku, Google Gemini Flash, Groq Llama 3.3 70B, atau OpenRouter. Provider dan model dideteksi otomatis dari prefiks API key (`src/services/aiClient.ts`). Tidak ada model yang dilatih sendiri. |
| **Peran AI dalam Produk** | (1) Menyusun soal asesmen personal berdasarkan profil, jalur, dan catatan esai pengguna; (2) Membaca & menganalisis jawaban esai pengguna (NLP) menjadi sintesis kecenderungan; (3) Menyusun halaman hasil AI (`/hasil/ai`): narasi rekomendasi jurusan/pasar kerja, strategi belajar, dan refleksi. AI memberi kemampuan yang tidak bisa dicapai aturan tetap (analisis bahasa alami esai user). Skoring numerik tetap rule-based dan dinyatakan jujur sebagai bukan-AI. |
| **Dataset / Data Source** | Tidak ada dataset pribadi. Data konten (profil bidang, jurusan, jalur SMA/SMK, perbandingan) adalah kurasi editorial buatan sendiri yang dipegang sebagai TypeScript data di `src/data/`. Jawaban asesmen tidak pernah disimpan ke server mana pun; pada mode AI, hanya teks jawaban yang dikirim langsung ke API provider pilihan pengguna. |
| **Open-source Libraries** | react, react-dom, react-router-dom (MIT); devDependencies: vite, @vitejs/plugin-react, typescript, @types/* (MIT). Font: Plus Jakarta Sans (SIL Open Font License, via @fontsource-variable). |
| **Template / Boilerplate** | Tidak memakai template produk. Struktur awal dari scaffold standar `npm create vite@latest` (react-ts) yang seluruh isinya kemudian ditulis ulang manual. |
| **AI Coding Assistant** | Ya — agen coding AI (IDE agent) digunakan sebagai development assistant untuk menulis, men-debug, dan mem-review sebagian source code, membuat aset bootstrap (skrip Python sekali-pakai untuk komposisi citra maskot), serta menyusun draf dokumentasi. Seluruh kode telah dibaca, diuji (typecheck, build, QA uji manual + skrip verifikasi otomatis), dan dipertanggungjawabkan oleh penulis. |
| **Pre-existing Components** | Seluruh MVP dikembangkan sebagai proyek pribadi **sebelum** kompetisi (Sei adalah satu-satunya karya yang disubmit; tidak ada komponen yang dibeli/diambil dari proyek pihak lain). Yang dikembangkan khusus untuk kompetisi: paket dokumentasi submission (DISCLOSURE, .env.example, bagian README sesuai Lampiran B), penajaman alur demo juri, dan tag versi submission. Maskot & logo: aset citra dibuat untuk proyek ini (diproses sendiri lewat skrip komposisi citra), bukan aset berbayar/pihak ketiga. |
| **Third-party Assets / Credits** | Font Plus Jakarta Sans (Google Fonts / fontsource, OFL). Badge README: shields.io. Ikon pada banner README digambar sendiri (SVG). Tidak memakai foto/generik stok pihak ketiga. |

## Pernyataan

Kami menyatakan bahwa informasi di atas benar dan lengkap. Kami bertanggung
jawab atas penggunaan teknologi, source code, data, library, API, model AI,
dan aset yang digunakan pada produk.

— Muhamad Dzarel Alghifari (peserta individu), November 2026
