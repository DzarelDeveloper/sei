

export type SmaSmkFieldId =
  | 'tech'
  | 'health'
  | 'business'
  | 'creative'
  | 'education-social'
  | 'law'
  | 'engineering'

export interface UniversityLink {
  
  label: string
  
  url: string
}

export interface StudyProgramme {
  name: string
  note: string
  
  urls?: UniversityLink[]
}

export interface Profession {
  name: string
  note: string
}

export interface SmaSmkFieldDefinition {
  id: SmaSmkFieldId
  name: string
  copy: string
  
  nextStep: string
  programmes: StudyProgramme[]
  professions: Profession[]
}

export const smaSmkFieldDefinitions: SmaSmkFieldDefinition[] = [
  {
    id: 'tech',
    name: 'Teknologi dan Komputer',
    copy: 'Membangun aplikasi, mengelola data, dan membuat sistem yang dipakai orang banyak.',
    nextStep: 'Ikuti kursus dasar pemrograman atau data, lalu buat satu proyek kecil yang bisa kamu tunjukkan.',
    programmes: [
      {
        name: 'Teknik Informatika / Ilmu Komputer',
        note: 'Cek UI (Depok), ITB (Bandung), UGM (Yogyakarta), ITS (Surabaya) — PTN favorit, seleksi ketat; juga tersedia di PTS seperti BINUS (Jakarta) dan UMN (Tangerang).',
        urls: [
          { label: 'UI', url: 'https://www.ui.ac.id' },
          { label: 'ITB', url: 'https://www.itb.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'ITS', url: 'https://www.its.ac.id' },
          { label: 'BINUS', url: 'https://binus.ac.id' },
          { label: 'UMN', url: 'https://www.umn.ac.id' },
        ],
      },
      {
        name: 'Sistem Informasi',
        note: 'Tersedia di ITB, UGM, dan Universitas Telkom (Bandung). Kombinasi teknologi dan kebutuhan bisnis — prospek kerja luas.',
        urls: [
          { label: 'ITB', url: 'https://www.itb.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'Univ. Telkom', url: 'https://telkomuniversity.ac.id' },
        ],
      },
      {
        name: 'Rekayasa Perangkat Lunak',
        note: 'Banyak tersedia sebagai program vokasi di ITB dan UGM; BINUS dan Universitas Telkom juga membuka jalur ini dengan banyak praktik membangun aplikasi.',
        urls: [
          { label: 'ITB', url: 'https://www.itb.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'BINUS', url: 'https://binus.ac.id' },
          { label: 'Univ. Telkom', url: 'https://telkomuniversity.ac.id' },
        ],
      },
    ],
    professions: [
      { name: 'Software Developer', note: 'Membuat dan merawat aplikasi atau website. Mulai dengan portofolio proyek kecil di GitHub; cari lowongan di perusahaan teknologi lokal atau startup.' },
      { name: 'Data Analyst', note: 'Membaca data untuk membantu keputusan bisnis. Cari magang atau posisi junior di bank, e-commerce, atau konsultan data.' },
      { name: 'Network / Security Engineer', note: 'Menjaga infrastruktur jaringan dan keamanan siber. Dibutuhkan di ISP (Telkom, Biznet), data center, dan perusahaan besar.' },
    ],
  },
  {
    id: 'health',
    name: 'Kesehatan',
    copy: 'Merawat orang, menjaga kebersihan, dan memastikan informasi kesehatan dipercaya.',
    nextStep: 'Jadi relawan kegiatan kesehatan di sekolah atau puskesmas, dan ngobrol dengan tenaga kesehatan tentang hari kerja mereka.',
    programmes: [
      {
        name: 'Keperawatan',
        note: 'Tersedia di UI (Depok), UGM (Yogyakarta), Unair (Surabaya), serta STIKES binaan Pemda dan PTS seperti Universitas YARSI (Jakarta).',
        urls: [
          { label: 'UI', url: 'https://www.ui.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'Unair', url: 'https://www.unair.ac.id' },
          { label: 'Univ. YARSI', url: 'https://www.yarsi.ac.id' },
        ],
      },
      {
        name: 'Kedokteran / Gigi',
        note: 'Jenjang panjang dengan biaya tinggi. PTN favorit: UI, UGM, Unair, Unpad. PTS: Universitas YARSI, UPH (Jakarta/Tangsel), Universitas Tarumanagara (Untar).',
        urls: [
          { label: 'UI', url: 'https://www.ui.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'Unair', url: 'https://www.unair.ac.id' },
          { label: 'Unpad', url: 'https://www.unpad.ac.id' },
          { label: 'Univ. YARSI', url: 'https://www.yarsi.ac.id' },
          { label: 'UPH', url: 'https://uph.ac.id' },
          { label: 'Untar', url: 'https://utar.ac.id' },
        ],
      },
      {
        name: 'Keperawatan Gigi / Gizi / Farmasi',
        note: 'Jalur kesehatan lain yang lebih pendek dan aplikatif; tersedia di UGM, UI, dan banyak STIKES/PTS kesehatan terdekat.',
        urls: [
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'UI', url: 'https://www.ui.ac.id' },
        ],
      },
      {
        name: 'Kesehatan Masyarakat',
        note: 'Fokus ke pencegahan dan kampanye; tersedia di UI, UGM, Unair, serta institut kesehatan masyarakat di berbagai daerah.',
        urls: [
          { label: 'UI', url: 'https://www.ui.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'Unair', url: 'https://www.unair.ac.id' },
        ],
      },
    ],
    professions: [
      { name: 'Perawat', note: 'Merawat pasien di rumah sakit atau puskesmas. Setelah lulus, perlu STR (Surat Tanda Registrasi) untuk bisa praktik.' },
      { name: 'Ahli Gizi', note: 'Menyusun pola makan sehat untuk individu atau komunitas. Dibutuhkan di RS, puskesmas, industri makanan, dan klinik.' },
      { name: 'Promotor Kesehatan', note: 'Mengedukasi masyarakat soal kebiasaan sehat. Banyak posisi di dinas kesehatan daerah dan organisasi seperti WHO Indonesia.' },
    ],
  },
  {
    id: 'business',
    name: 'Bisnis dan Keuangan',
    copy: 'Mengatur uang, menjual produk, dan membuat usaha kecil tumbuh.',
    nextStep: 'Jalankan usaha kecil satu bulan (preorder, jasa, atau reseller) dan catat untung-ruginya.',
    programmes: [
      {
        name: 'Manajemen',
        note: 'Fakultas Ekonomi UI (Depok), UGM (Yogyakarta), Unpad (Bandung) untuk PTN; Universitas Trisakti dan Universitas Merdeka Malang untuk PTS. Jalur luas: pemasaran, keuangan, operasional.',
        urls: [
          { label: 'UI', url: 'https://www.ui.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'Unpad', url: 'https://www.unpad.ac.id' },
          { label: 'Trisakti', url: 'https://trisakti.ac.id' },
          { label: 'Unmer Malang', url: 'https://unmer.ac.id' },
        ],
      },
      {
        name: 'Akuntansi',
        note: 'Tersedia di UI, UGM, Unpad untuk PTN; serta PTS seperti Universitas Tarumanagara (Untar) dan UPH. Profesi akuntan publik bisa lanjut ke sertifikasi CA/CPA.',
        urls: [
          { label: 'UI', url: 'https://www.ui.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'Unpad', url: 'https://www.unpad.ac.id' },
          { label: 'Untar', url: 'https://utar.ac.id' },
          { label: 'UPH', url: 'https://uph.ac.id' },
        ],
      },
      {
        name: 'Bisnis Digital / Kewirausahaan',
        note: 'Dibuka di ITB, Universitas Telkom (Bandung), dan BINUS. Cocok kalau kamu ingin membangun startup atau bekerja di industri digital.',
        urls: [
          { label: 'ITB', url: 'https://www.itb.ac.id' },
          { label: 'Univ. Telkom', url: 'https://telkomuniversity.ac.id' },
          { label: 'BINUS', url: 'https://binus.ac.id' },
        ],
      },
    ],
    professions: [
      { name: 'Pengusaha / Pemilik Usaha', note: 'Membangun dan memimpin usaha sendiri. Mulai dari usaha kecil — gunakan modal seadanya dan validasi pasar dulu.' },
      { name: 'Analis Keuangan', note: 'Menilai kesehatan keuangan perusahaan. Dibutuhkan di bank (BCA, Mandiri, BNI), sekuritas, dan perusahaan konsultan.' },
      { name: 'Digital Marketing Specialist', note: 'Menjangkau pelanggan lewat kanal digital. Banyak dicari oleh e-commerce (Tokopedia, Shopee), startup, dan agensi kreatif.' },
    ],
  },
  {
    id: 'creative',
    name: 'Desain dan Media Kreatif',
    copy: 'Merancang tampilan, cerita, dan konten yang membuat pesan mudah dipahami.',
    nextStep: 'Buat portofolio 3 karya sederhana (poster, edit video, atau desain UI) dan minta masukan orang yang kamu percaya.',
    programmes: [
      {
        name: 'DKV / Desain Grafis',
        note: 'ITB (Bandung) punya FSRD yang ternama; juga tersedia di ISI Yogyakarta, BINUS, dan UMN (Tangerang).',
        urls: [
          { label: 'ITB', url: 'https://www.itb.ac.id' },
          { label: 'ISI Yogyakarta', url: 'https://www.isi.ac.id' },
          { label: 'BINUS', url: 'https://binus.ac.id' },
          { label: 'UMN', url: 'https://www.umn.ac.id' },
        ],
      },
      {
        name: 'Ilmu Komunikasi (Peminatan Media)',
        note: 'UI, UGM, dan Unpad (PTN); LSPR (Jakarta) dan Universitas Prof. Dr. Moestopo (PTS) juga kuat di bidang ini.',
        urls: [
          { label: 'UI', url: 'https://www.ui.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'Unpad', url: 'https://www.unpad.ac.id' },
          { label: 'LSPR', url: 'https://lspr.edu' },
          { label: 'Moestopo', url: 'https://moestopo.ac.id' },
        ],
      },
      {
        name: 'Desain Produk / Interior',
        note: 'Desain Produk tersedia di ITB dan ISI Yogyakarta; Desain Interior banyak di BINUS, UNIKOM (Bandung), dan Universitas Kristen Petra (Surabaya).',
        urls: [
          { label: 'ITB', url: 'https://www.itb.ac.id' },
          { label: 'ISI Yogyakarta', url: 'https://www.isi.ac.id' },
          { label: 'BINUS', url: 'https://binus.ac.id' },
          { label: 'UNIKOM', url: 'https://unikom.ac.id' },
          { label: 'UK Petra', url: 'https://petra.ac.id' },
        ],
      },
    ],
    professions: [
      { name: 'Desainer Grafis / UI', note: 'Merancang tampilan produk digital dan visual. Bangun portofolio di Behance/Dribbble; banyak dibutuhkan di startup teknologi dan agensi.' },
      { name: 'Video Editor / Kreator Konten', note: 'Memproduksi konten untuk YouTube, TikTok, atau brand. Bisa mulai sebagai freelancer atau bergabung dengan rumah produksi dan agensi kreatif.' },
      { name: 'Illustrator / Seniman Visual', note: 'Karya visual untuk buku, game, merchandise, dan media. Jalur freelance sangat umum di bidang ini.' },
    ],
  },
  {
    id: 'education-social',
    name: 'Pendidikan dan Sosial',
    copy: 'Menjelaskan, memberdayakan, dan mendampingi orang atau komunitas.',
    nextStep: 'Coba mengajar atau membuat konten edukasi singkat, lalu nilai apakah kamu menikmati prosesnya.',
    programmes: [
      {
        name: 'Keguruan (PGSD / Pendidikan Mapel)',
        note: 'UT (Universitas Terbuka, Depok) untuk jalur jarak jauh; UNY (Yogyakarta), UPI (Bandung), UNJ (Jakarta), dan UNESA (Surabaya) untuk PTN luring.',
        urls: [
          { label: 'UT', url: 'https://www.ut.ac.id' },
          { label: 'UNY', url: 'https://uny.ac.id' },
          { label: 'UPI', url: 'https://upi.edu' },
          { label: 'UNJ', url: 'https://unj.ac.id' },
          { label: 'UNESA', url: 'https://unesa.ac.id' },
        ],
      },
      {
        name: 'Psikologi',
        note: 'UI, UGM, dan Unpad (PTN); Universitas Tarumanagara (Untar) dan UPH (PTS) juga tersedia. Jalur praktisi (Psikolog) butuh pendidikan profesi tambahan.',
        urls: [
          { label: 'UI', url: 'https://www.ui.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'Unpad', url: 'https://www.unpad.ac.id' },
          { label: 'Untar', url: 'https://utar.ac.id' },
          { label: 'UPH', url: 'https://uph.ac.id' },
        ],
      },
      {
        name: 'Sosiologi / Pengembangan Masyarakat',
        note: 'FISIP UI, UGM, dan Unpad punya program studi ini. Cocok untuk pemberdayaan masyarakat dan riset sosial.',
        urls: [
          { label: 'UI', url: 'https://www.ui.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'Unpad', url: 'https://www.unpad.ac.id' },
        ],
      },
    ],
    professions: [
      { name: 'Guru / Dosen', note: 'Mengajar dan membimbing peserta didik. Guru butuh PPG (Pendidikan Profesi Guru); dosen umumnya butuh S2/S3.' },
      { name: 'Pendamping Komunitas', note: 'Program pemberdayaan masyarakat di NGO, CSR perusahaan, atau dinas sosial daerah.' },
      { name: 'Content Creator Edukasi', note: 'Menjelaskan hal sulit jadi mudah, lewat media. Bisa dimulai sebagai side project sambil tetap mengajar di institusi formal.' },
    ],
  },
  {
    id: 'law',
    name: 'Hukum dan Kebijakan',
    copy: 'Memastikan aturan adil, sengketa selesai jelas, dan tidak ada yang dirugikan.',
    nextStep: 'Ikuti sidang simulasi atau debat, dan pelajari jalur profesi hukum di wilayahmu.',
    programmes: [
      {
        name: 'Ilmu Hukum',
        note: 'FH UI (Depok), UGM (Yogyakarta), dan Unpad (Bandung) adalah PTN unggulan. PTS dengan fakultas hukum kuat: Universitas Trisakti, UPH, dan Universitas Tarumanagara.',
        urls: [
          { label: 'UI', url: 'https://www.ui.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'Unpad', url: 'https://www.unpad.ac.id' },
          { label: 'Trisakti', url: 'https://trisakti.ac.id' },
          { label: 'UPH', url: 'https://uph.ac.id' },
          { label: 'Untar', url: 'https://utar.ac.id' },
        ],
      },
      {
        name: 'Hukum Bisnis / Internasional',
        note: 'Konsentrasi pasca-sarjana tersedia di UI, UGM, dan Unpad; beberapa mahasiswa langsung memilih fokus ini sejak S1.',
        urls: [
          { label: 'UI', url: 'https://www.ui.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'Unpad', url: 'https://www.unpad.ac.id' },
        ],
      },
    ],
    professions: [
      { name: 'Pengacara', note: 'Pendamping hukum untuk orang atau perusahaan. Perlu Uji Kompetensi Advokat (UKA) setelah magang di kantor advokat minimal 2 tahun.' },
      { name: 'Notaris', note: 'Akta dan kepastian hukum. Wajib lulus Magister Kenotariatan (S2) + ujian negara — jalur ini butuh waktu lebih lama setelah S1 Hukum.' },
      { name: 'Mediator / Paralegal', note: 'Membantu menyelesaikan sengketa di luar pengadilan. Bisa masuk melalui lembaga bantuan hukum (LBH) atau kantor konsultan hukum.' },
    ],
  },
  {
    id: 'engineering',
    name: 'Teknik dan Lingkungan',
    copy: 'Merancang bangunan, mesin, dan sistem agar kehidupan sehari-hari lebih lancar dan lestari.',
    nextStep: 'Ikut proyek kecil perbaikan lingkungan atau rekayasa sederhana di sekolah, dan amati cara insinyur bekerja di lapangan.',
    programmes: [
      {
        name: 'Teknik Sipil / Arsitektur',
        note: 'ITB (Bandung), UGM (Yogyakarta), UI (Depok), dan ITS (Surabaya) adalah PTN terkuat. PTS: UPH (Tangsel) dan UNPAR (Bandung) punya program arsitektur yang baik.',
        urls: [
          { label: 'ITB', url: 'https://www.itb.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'UI', url: 'https://www.ui.ac.id' },
          { label: 'ITS', url: 'https://www.its.ac.id' },
          { label: 'UPH', url: 'https://uph.ac.id' },
          { label: 'UNPAR', url: 'https://unpar.ac.id' },
        ],
      },
      {
        name: 'Teknik Mesin / Elektro',
        note: 'ITB, UGM, ITS, dan UI untuk PTN; BINUS, Universitas Muhammadiyah, dan UNIKOM (Bandung) juga buka jalur ini dengan biaya bervariasi.',
        urls: [
          { label: 'ITB', url: 'https://www.itb.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'ITS', url: 'https://www.its.ac.id' },
          { label: 'UI', url: 'https://www.ui.ac.id' },
          { label: 'BINUS', url: 'https://binus.ac.id' },
          { label: 'UNIKOM', url: 'https://unikom.ac.id' },
        ],
      },
      {
        name: 'Teknik Lingkungan',
        note: 'ITS, ITB, UGM, dan UNS (Surakarta) memiliki program teknik lingkungan yang diakui. Peluang kerja di perusahaan air, tambang, dan konsultan AMDAL.',
        urls: [
          { label: 'ITS', url: 'https://www.its.ac.id' },
          { label: 'ITB', url: 'https://www.itb.ac.id' },
          { label: 'UGM', url: 'https://www.ugm.ac.id' },
          { label: 'UNS', url: 'https://uns.ac.id' },
        ],
      },
    ],
    professions: [
      { name: 'Insinyur / Engineer', note: 'Merancang sistem dan menyelesaikan masalah teknis. Bersertifikat SKA (Surat Keterangan Ahli) untuk proyek pemerintah/konstruksi besar.' },
      { name: 'Arsitek', note: 'Merancang bangunan. Wajib punya STRA (Surat Tanda Registrasi Arsitek) untuk praktik mandiri; banyak dibutuhkan di konsultan arsitektur dan developer.' },
      { name: 'Teknisi / Specialist Lingkungan', note: 'Merawat peralatan atau mengelola dampak lingkungan. Dibutuhkan di industri manufaktur, pertambangan, dan konsultan AMDAL/UKL-UPL.' },
    ],
  },
]

export function getSmaSmkField(id: SmaSmkFieldId): SmaSmkFieldDefinition {
  const found = smaSmkFieldDefinitions.find((field) => field.id === id)
  if (!found) {
    throw new Error(`Unknown SMA/SMK field: ${id}`)
  }
  return found
}
