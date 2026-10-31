

export type PathwayId = 'sma' | 'smk'

export interface SmkField {
  key: string
  name: string
  shortName: string
  description: string
}

export interface Pathway {
  id: PathwayId
  name: string
  shortName: string
  tagline: string
  overview: string
  learningExperience: string[]
  typicalActivities: string[]
  skills: string[]
  nextSteps: string[]
  considerations: string[]
  questionsToAsk: string[]
  fields?: SmkField[]
  fieldsNote?: string
}

export const pathways: Record<PathwayId, Pathway> = {
  sma: {
    id: 'sma',
    name: 'SMA / Sederajat',
    shortName: 'SMA',
    tagline: 'Belajar lebih luas dulu, memilih arah berikutnya dengan lebih tenang.',
    overview:
      'SMA memberikan dasar akademik yang luas. Kamu mempelajari banyak mata pelajaran, lalu bisa memilih peminatan atau mata pelajaran pilihan sesuai kebijakan sekolah. Jalur ini berguna jika kamu masih ingin menjelajahi beberapa bidang sebelum memutuskan arah yang lebih spesifik.',
    learningExperience: [
      'Lebih banyak teori, diskusi, dan kegiatan di kelas dibanding praktik kejuruan.',
      'Belajar banyak mata pelajaran dalam satu semester, dengan tugas dan presentasi.',
      'Praktik biasanya terbatas pada laboratorium sains atau mata pelajaran tertentu.',
      'Ruang untuk mengikuti kegiatan ekstrakurikuler, organisasi, dan lomba akademik.',
    ],
    typicalActivities: [
      'Diskusi kelompok dan presentasi hasil penelitian kecil.',
      'Praktikum sains di laboratorium sekolah.',
      'Menulis esai, laporan, dan karya tulis sederhana.',
      'Mengikuti klub, organisasi, atau kompetisi antar sekolah.',
    ],
    skills: [
      'Membaca dan memahami materi yang cukup padat.',
      'Menyusun argumen dan menulis dengan rapi.',
      'Belajar mandiri dan mengatur waktu untuk banyak mata pelajaran.',
      'Meneliti topik dari beberapa sumber.',
    ],
    nextSteps: [
      'Melanjutkan ke perguruan tinggi pada bidang yang kemudian diminati.',
      'Masuk ke program vokasi atau politeknik untuk keterampilan yang lebih spesifik.',
      'Mengikuti kursus, pelatihan, atau program magang untuk pengalaman praktis.',
      'Bekerja setelah membangun keterampilan tambahan di luar sekolah.',
    ],
    considerations: [
      'Tidak semua SMA memiliki mata pelajaran pilihan atau peminatan yang sama.',
      'Karena masih umum, kamu perlu aktif mencari pengalaman praktik sendiri.',
      'Kualitas dan fasilitas berbeda antara satu sekolah dan sekolah lainnya.',
    ],
    questionsToAsk: [
      'Mata pelajaran pilihan apa saja yang tersedia di sini?',
      'Bagaimana cara sekolah membantu siswa menemukan minatnya?',
      'Kegiatan ekstrakurikuler dan klub apa yang aktif berjalan?',
      'Bagaimana dukungan sekolah untuk siswa yang masih ragu memilih arah?',
      'Bagaimana hasil dan dukungan alumni setelah lulus?',
    ],
  },
  smk: {
    id: 'smk',
    name: 'SMK / Sederajat',
    shortName: 'SMK',
    tagline: 'Belajar sambil mengerjakan, dengan bidang keahlian yang lebih spesifik.',
    overview:
      'SMK menggabungkan mata pelajaran umum dengan bidang keahlian. Sejak awal kamu memilih konsentrasi keahlian, sehingga banyak waktu dipakai untuk praktik, proyek, dan pengalaman kerja lapangan. Jalur ini cocok jika kamu sudah cukup tertarik pada bidang tertentu dan ingin mencobanya lebih cepat.',
    learningExperience: [
      'Lebih banyak praktik, proyek, dan kerja di bengkel atau laboratorium.',
      'Mata pelajaran umum tetap ada, dengan porsi bidang keahlian yang lebih besar.',
      'Sering ada proyek nyata, kunjungan industri, dan praktik kerja lapangan.',
      'Penilaian banyak berbasis hasil kerja, portofolio, dan keterampilan.',
    ],
    typicalActivities: [
      'Mengerjakan proyek perangkat lunak, jaringan, atau desain sesuai jurusan.',
      'Merawat dan mengoperasikan peralatan di laboratorium atau bengkel.',
      'Menyusun laporan dan portofolio hasil praktik.',
      'Mengikuti praktik kerja lapangan atau magang di mitra sekolah.',
    ],
    skills: [
      'Keterampilan teknis yang bisa langsung dipakai.',
      'Bekerja dengan standar, alat, dan prosedur tertentu.',
      'Menyelesaikan masalah di situasi kerja nyata.',
      'Bekerja dalam tim dan berkomunikasi dengan orang di luar sekolah.',
    ],
    nextSteps: [
      'Bekerja di bidang keahlian yang dipelajari.',
      'Melanjutkan ke program vokasi, politeknik, atau perguruan tinggi.',
      'Mengembangkan usaha atau jasa kecil di bidang yang dikuasai.',
      'Mengambil sertifikasi atau pelatihan tambahan untuk memperluas keterampilan.',
    ],
    considerations: [
      'Memilih konsentrasi keahlian di awal membutuhkan cukup banyak pertimbangan.',
      'Kualitas praktik sangat bergantung pada peralatan dan mitra industri sekolah.',
      'Tidak semua sekolah memiliki pilihan bidang yang sama atau lengkap.',
      'Tetap mungkin pindah arah, tetapi bisa perlu penyesuaian yang tidak kecil.',
    ],
    questionsToAsk: [
      'Konsentrasi keahlian apa saja yang benar-benar dibuka tahun ini?',
      'Bagaimana kondisi laboratorium, bengkel, dan peralatannya?',
      'Sekolah bekerja sama dengan industri atau perusahaan apa?',
      'Bagaimana pelaksanaan praktik kerja lapangan?',
      'Seperti apa jalur alumni setelah lulus?',
    ],
    fields: [
      {
        key: 'pplg',
        name: 'Pengembangan Perangkat Lunak dan Gim (PPLG)',
        shortName: 'PPLG',
        description: 'Membuat program, aplikasi, situs web, dan gim sederhana.',
      },
      {
        key: 'tjkt',
        name: 'Teknik Jaringan Komputer dan Telekomunikasi (TJKT)',
        shortName: 'TJKT',
        description: 'Mengatur jaringan, perangkat, dan komunikasi data.',
      },
      {
        key: 'dkv',
        name: 'Desain Komunikasi Visual (DKV)',
        shortName: 'DKV',
        description: 'Merancang tampilan, ilustrasi, dan media visual.',
      },
      {
        key: 'elektronika',
        name: 'Teknik Elektronika',
        shortName: 'Elektronika',
        description: 'Merakit dan merawat perangkat elektronik sehari-hari.',
      },
      {
        key: 'kuliner',
        name: 'Kuliner',
        shortName: 'Kuliner',
        description: 'Mengolah makanan dengan standar kebersihan dan penyajian.',
      },
      {
        key: 'akuntansi',
        name: 'Akuntansi dan Keuangan Lembaga',
        shortName: 'Akuntansi',
        description: 'Mencatat, mengelola, dan melaporkan data keuangan.',
      },
    ],
    fieldsNote:
      'Daftar ini hanya contoh bidang yang umum tersedia. Nama jurusan dan pilihan yang dibuka berbeda di setiap sekolah.',
  },
}

export interface ComparisonRow {
  id: string
  dimension: string
  sma: { title: string; copy: string }
  smk: { title: string; copy: string }
}

export const comparisonRows: ComparisonRow[] = [
  {
    id: 'approach',
    dimension: 'Cara belajar',
    sma: {
      title: 'Luas dan akademik',
      copy: 'Banyak mata pelajaran umum, teori, diskusi, dan tugas tulis. Pemantapan arah lebih sering terjadi di akhir jenjang.',
    },
    smk: {
      title: 'Fokus dan praktik',
      copy: 'Mata pelajaran umum tetap ada, tetapi porsi terbesar pada bidang keahlian yang dipilih sejak awal.',
    },
  },
  {
    id: 'activities',
    dimension: 'Kegiatan sehari-hari',
    sma: {
      title: 'Kelas dan laboratorium',
      copy: 'Presentasi, diskusi, praktikum sains, menulis laporan, dan kegiatan ekstrakurikuler.',
    },
    smk: {
      title: 'Bengkel dan proyek',
      copy: 'Praktik dengan alat, proyek bidang keahlian, kunjungan industri, dan praktik kerja lapangan.',
    },
  },
  {
    id: 'skills',
    dimension: 'Keterampilan yang tumbuh',
    sma: {
      title: 'Dasar akademik',
      copy: 'Membaca, menulis, meneliti, berargumen, dan belajar banyak bidang dalam waktu bersamaan.',
    },
    smk: {
      title: 'Keterampilan teknis',
      copy: 'Keterampilan kerja yang spesifik, disiplin prosedur, dan pengalaman menyelesaikan pekerjaan nyata.',
    },
  },
  {
    id: 'future',
    dimension: 'Peluang setelah lulus',
    sma: {
      title: 'Terbuka, perlu arah',
      copy: 'Bisa kuliah, masuk vokasi, kursus, atau bekerja setelah menambah keterampilan. Arah biasanya ditentukan setelah lulus.',
    },
    smk: {
      title: 'Spesifik, tetap fleksibel',
      copy: 'Bisa langsung bekerja di bidang keahlian, melanjutkan ke vokasi atau perguruan tinggi, atau mengembangkan usaha.',
    },
  },
  {
    id: 'questions',
    dimension: 'Pertanyaan untuk dirimu',
    sma: {
      title: 'Masih ingin menjelajah?',
      copy: 'Apakah kamu nyaman belajar banyak bidang sekaligus dan siap mencari pengalaman praktik sendiri?',
    },
    smk: {
      title: 'Sudah ada bidang yang menarik?',
      copy: 'Apakah kamu punya satu atau dua bidang yang ingin didalami, dan siap mencobanya dalam waktu lama?',
    },
  },
  {
    id: 'investigate',
    dimension: 'Yang perlu dicek di sekolah',
    sma: {
      title: 'Pilihan dan pendampingan',
      copy: 'Mata pelajaran pilihan, kualitas guru, kegiatan ekstrakurikuler, dan dukungan konseling karier.',
    },
    smk: {
      title: 'Peralatan dan mitra',
      copy: 'Kondisi laboratorium atau bengkel, mitra industri, dan bagaimana praktik kerja lapangan dijalankan.',
    },
  },
]

export const comparisonReminder =
  'Program, kualitas, biaya, lokasi, dan fasilitas setiap sekolah berbeda. Kunjungi sekolah yang kamu pertimbangkan dan tanyakan langsung, jangan hanya berpegang pada satu jalur.'
