

export type ActivityCategory = 'Perangkat Lunak' | 'Jaringan' | 'Desain' | 'Sains' | 'Elektronika'

export interface ActivityStep {
  title: string
  copy: string
}

export interface Activity {
  id: string
  title: string
  category: ActivityCategory
  summary: string
  description: string
  duration: string
  tools: string[]
  level: 'Pemula'
  learn: string[]
  steps: ActivityStep[]
  tip: string
  relatedPathway: string
}

export const activities: Activity[] = [
  {
    id: 'webpage',
    title: 'Buat halaman web pertama',
    category: 'Perangkat Lunak',
    summary: 'Susun satu halaman sederhana berisi nama, foto favorit, dan tiga hal yang kamu suka.',
    description:
      'Aktivitas ini mengenalkan cara kerja halaman web: teks, gambar, dan tata letak. Kamu tidak perlu menghafal kode — cukup mencoba mengubah beberapa baris dan melihat hasilnya.',
    duration: '60–90 menit',
    tools: ['Komputer atau laptop', 'Editor kode gratis', 'Koneksi internet untuk referensi'],
    level: 'Pemula',
    learn: [
      'Bagaimana teks dan gambar disusun di halaman web.',
      'Arti tag dan atribut dasar pada HTML.',
      'Cara mengubah warna, ukuran, dan jarak dengan CSS.',
    ],
    steps: [
      {
        title: 'Tentukan isi halaman',
        copy: 'Tulis di kertas: judul, satu paragraf tentang dirimu, dan tiga hal yang kamu sukai.',
      },
      {
        title: 'Susun kerangka HTML',
        copy: 'Buat judul, paragraf, dan daftar sederhana. Jalankan di browser dan periksa hasilnya.',
      },
      {
        title: 'Tambahkan gambar dan warna',
        copy: 'Sisipkan satu gambar lokal, lalu ubah warna latar dan ukuran huruf lewat CSS.',
      },
      {
        title: 'Ubah satu hal dan amati',
        copy: 'Ganti jarak atau warna, lalu catat apa yang berubah. Ini melatih kebiasaan mencoba.',
      },
    ],
    tip: 'Kalau ada yang tidak muncul, bandingkan kode dengan contoh dan periksa apakah ada tanda kurung yang tertutup.',
    relatedPathway: 'PPLG di SMK, atau peminatan teknologi di SMA.',
  },
  {
    id: 'network',
    title: 'Selidiki cara perangkat saling terhubung',
    category: 'Jaringan',
    summary: 'Cari tahu bagaimana ponsel dan laptop di rumah bisa terhubung ke internet yang sama.',
    description:
      'Kamu akan mengamati jaringan di sekitar tanpa mengubah pengaturan apa pun. Fokusnya adalah memahami peran router, kabel, dan sinyal Wi-Fi.',
    duration: '45–60 menit',
    tools: ['Ponsel atau laptop', 'Router Wi-Fi di rumah', 'Buku catatan'],
    level: 'Pemula',
    learn: [
      'Peran router, modem, dan perangkat yang terhubung.',
      'Perbedaan jaringan kabel dan nirkabel.',
      'Cara membaca nama jaringan dan jumlah perangkat.',
    ],
    steps: [
      {
        title: 'Daftar perangkat',
        copy: 'Catat semua perangkat di rumah yang terhubung ke internet dan bagaimana caranya terhubung.',
      },
      {
        title: 'Amati router',
        copy: 'Perhatikan lampu indikator dan port kabel. Jangan mengubah pengaturan apa pun.',
      },
      {
        title: 'Gambar diagram sederhana',
        copy: 'Gambarkan alur dari perangkat ke router, lalu ke internet.',
      },
      {
        title: 'Buat satu pertanyaan',
        copy: 'Contoh: mengapa sinyal melemah di kamar tertentu? Cari jawabannya di sumber terpercaya.',
      },
    ],
    tip: 'Jangan membuka atau mengubah pengaturan router tanpa izin orang dewasa di rumah.',
    relatedPathway: 'TJKT di SMK, atau pembelajaran mandiri lewat komunitas jaringan.',
  },
  {
    id: 'design',
    title: 'Redesain poster atau tampilan sederhana',
    category: 'Desain',
    summary: 'Ambil satu poster atau halaman aplikasi, lalu rancang ulang agar lebih mudah dibaca.',
    description:
      'Latihan ini melatih cara melihat hierarki: mana yang harus dibaca lebih dulu, mana yang bisa dibuat lebih tenang, dan bagaimana warna membantu pesan.',
    duration: '45–75 menit',
    tools: ['Kertas dan pensil', 'Aplikasi desain gratis (opsional)', 'Contoh poster atau tangkapan layar'],
    level: 'Pemula',
    learn: [
      'Menyusun urutan informasi yang mudah dibaca.',
      'Memilih warna dan ukuran huruf yang konsisten.',
      'Memberi alasan pada setiap keputusan desain.',
    ],
    steps: [
      {
        title: 'Pilih satu objek',
        copy: 'Gunakan poster sekolah, pengumuman, atau halaman aplikasi yang sering kamu lihat.',
      },
      {
        title: 'Tandai masalahnya',
        copy: 'Lingkari bagian yang membingungkan: terlalu banyak warna, tulisan kecil, atau jarak berantakan.',
      },
      {
        title: 'Buat versi ulang',
        copy: 'Susun ulang di kertas: satu pesan utama, satu ajakan, dan informasi pendukung.',
      },
      {
        title: 'Minta satu pendapat',
        copy: 'Tanyakan ke teman apa yang pertama kali mereka lihat, lalu bandingkan dengan maksudmu.',
      },
    ],
    tip: 'Desain yang baik biasanya terasa tenang: sedikit warna, jelas urutannya, dan tidak semua hal dibuat menonjol.',
    relatedPathway: 'DKV di SMK, atau kegiatan ekstrakurikuler desain dan media sekolah.',
  },
  {
    id: 'science',
    title: 'Rancang eksperimen kecil',
    category: 'Sains',
    summary: 'Buat satu pertanyaan sederhana, uji dengan dua kondisi berbeda, dan catat hasilnya.',
    description:
      'Kamu akan merasakan cara kerja penelitian: membuat dugaan, menguji, mencatat, lalu menyimpulkan. Tidak perlu alat khusus.',
    duration: '60 menit',
    tools: ['Dua gelas bening', 'Air', 'Gula atau garam', 'Alat tulis'],
    level: 'Pemula',
    learn: [
      'Membedakan dugaan dan hasil pengamatan.',
      'Mencatat data dengan cara yang bisa dibandingkan.',
      'Menyimpulkan tanpa melebih-lebihkan hasil.',
    ],
    steps: [
      {
        title: 'Tulis pertanyaan',
        copy: 'Contoh: apakah air hangat melarutkan gula lebih cepat daripada air dingin?',
      },
      {
        title: 'Tentukan perlakuan',
        copy: 'Siapkan dua gelas dengan jumlah air dan gula yang sama, bedakan hanya suhunya.',
      },
      {
        title: 'Catat hasil',
        copy: 'Ukur waktu sampai gula larut. Ulangi dua kali agar hasilnya lebih bisa dipercaya.',
      },
      {
        title: 'Simpulkan dengan hati-hati',
        copy: 'Tulis kesimpulan dan satu hal yang belum bisa dijawab oleh percobaanmu.',
      },
    ],
    tip: 'Hasil yang tidak sesuai dugaan tetap berguna. Yang penting adalah mencatat apa adanya.',
    relatedPathway: 'Peminatan sains di SMA, atau bidang penelitian di perguruan tinggi.',
  },
  {
    id: 'electronics',
    title: 'Coba rangkaian sederhana di simulator',
    category: 'Elektronika',
    summary: 'Susun rangkaian lampu dan sakelar secara virtual untuk melihat aliran listrik bekerja.',
    description:
      'Aktivitas ini memakai simulator online sehingga aman dicoba tanpa alat. Kamu akan mengenal komponen dasar dan cara membaca rangkaian.',
    duration: '40–60 menit',
    tools: ['Komputer atau laptop', 'Simulator rangkaian online', 'Buku catatan'],
    level: 'Pemula',
    learn: [
      'Nama dan fungsi komponen dasar seperti baterai, resistor, dan lampu.',
      'Bagaimana rangkaian tertutup membuat lampu menyala.',
      'Membaca skema rangkaian sederhana.',
    ],
    steps: [
      {
        title: 'Kenali komponennya',
        copy: 'Buka simulator, lalu cari simbol baterai, kabel, sakelar, dan lampu.',
      },
      {
        title: 'Susun rangkaian pertama',
        copy: 'Hubungkan baterai, sakelar, dan lampu sampai lampu menyala.',
      },
      {
        title: 'Ubah satu komponen',
        copy: 'Tambahkan resistor dan amati apa yang berubah pada nyala lampu.',
      },
      {
        title: 'Gambar ulang skemanya',
        copy: 'Gambar rangkaianmu di buku dengan simbol yang sama seperti di simulator.',
      },
    ],
    tip: 'Gunakan hanya simulator untuk percobaan listrik. Jangan mencoba merakit komponen listrik dari jaringan rumah.',
    relatedPathway: 'Teknik Elektronika di SMK, atau peminatan teknologi di SMA.',
  },
]

export const activityCategories: Array<'Semua' | ActivityCategory> = [
  'Semua',
  'Perangkat Lunak',
  'Jaringan',
  'Desain',
  'Sains',
  'Elektronika',
]

export function getActivity(id: string | undefined): Activity | undefined {
  return activities.find((activity) => activity.id === id)
}
