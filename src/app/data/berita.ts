import { getAllKategori } from './kategori';
import { Komentar } from './komentar';

export interface Berita {
    id: number
    judul: string
    foto_utama: string
    idKategori: number[]
    gambar_konten: string[]
    timestamp: Date
    isi: string
    komentar: Komentar[]
    kalimat:string
}

export interface BeritaDetail extends Berita {
  namaKategori: string[];
    rating?: number | null;

}

// Acuan Kategori:
// 1: Teknologi, 2: Olahraga, 3: Ekonomi, 4: Politik, 5: Hiburan

const BERITA: Berita[] = [
    {
        id: 101,
        judul: 'Framework Ionic 8 Resmi Dirilis',
        foto_utama: 'https://placehold.co/600x400/007bff/white?text=Teknologi',
        idKategori: [1],
        gambar_konten: [
        'https://placehold.co/800x600/007bff/FFFFFF?text=Gambar+1',
        'https://placehold.co/800x600/007bff/FFFFFF?text=Gambar+2',
        'https://placehold.co/800x600/007bff/FFFFFF?text=Gambar+3',
        ],
        timestamp: new Date('2025-09-26T10:00:00'),
        isi: "Jakarta — Setelah melalui serangkaian uji coba beta dan kandidat rilis, tim pengembang Ionic akhirnya mengumumkan peluncuran resmi Ionic Framework versi 8. Rilis terbaru ini membawa sejumlah pembaruan besar yang menekankan pada peningkatan performa, aksesibilitas, dan fleksibilitas desain antarmuka bagi pengembang aplikasi lintas platform.\n\nIonic 8 memperkenalkan sistem tema baru yang sepenuhnya mendukung mode terang, gelap, serta skema kontras tinggi untuk memenuhi standar aksesibilitas web terkini. Pembaruan ini memungkinkan pengembang menyesuaikan tampilan aplikasi secara dinamis tanpa perlu melakukan penyesuaian manual pada setiap komponen. Selain itu, framework ini juga menghadirkan peningkatan performa rendering yang membuat transisi dan animasi terasa lebih halus, terutama pada perangkat dengan refresh rate tinggi.\n\nFitur lain yang menjadi sorotan adalah hadirnya komponen picker generasi baru yang lebih responsif dan intuitif, mendukung integrasi lintas framework seperti Angular, React, dan Vue dengan setup yang lebih sederhana. Tim Ionic juga memastikan bahwa proses migrasi dari versi 7 ke versi 8 dapat dilakukan dengan mudah, berkat dokumentasi yang lebih terstruktur dan alat bantu otomatisasi untuk menyesuaikan perubahan API.\n\nDengan rilis Ionic 8, ekosistem pengembangan aplikasi hibrida kembali mendapat dorongan besar. Banyak pengembang menyambut baik peningkatan ini karena memberikan keseimbangan antara performa aplikasi native dan fleksibilitas teknologi web modern. Framework ini diharapkan menjadi fondasi utama dalam pengembangan aplikasi mobile dan desktop berbasis web di tahun-tahun mendatang.",
        komentar: [],
        kalimat: ""
    },
    {
        id: 102,
        judul: 'Indonesia Menang 3-0 di Laga Persahabatan',
        foto_utama: 'https://placehold.co/600x400/28a745/white?text=Olah+Raga',
        idKategori: [2],
        gambar_konten: [
        'https://placehold.co/800x600/28a745/FFFFFF?text=Laga+1',
        'https://placehold.co/800x600/28a745/FFFFFF?text=Laga+2',
        ],
        timestamp: new Date('2025-09-27T11:30:00'),
        isi: "Jakarta — Tim Nasional Indonesia berhasil meraih kemenangan meyakinkan dengan skor 3-0 dalam laga persahabatan melawan Malaysia yang digelar di Stadion Utama Gelora Bung Karno pada Selasa malam. Pertandingan ini menjadi ajang uji coba penting bagi pelatih kepala, yang tengah menyiapkan komposisi pemain untuk turnamen internasional mendatang.\n\nSejak awal laga, Indonesia tampil dominan dengan penguasaan bola mencapai lebih dari 65 persen. Gol pertama dicetak melalui skema umpan terobosan cepat di menit ke-18, sementara dua gol tambahan lahir dari situasi bola mati dan serangan balik cepat pada babak kedua. Lini tengah yang solid dan transisi bertahan yang lebih disiplin menjadi sorotan positif dari penampilan kali ini.\n\nPelatih menyebut kemenangan ini bukan hanya soal hasil, tetapi juga tentang progres taktik dan kerja sama tim. Ia menekankan bahwa para pemain menunjukkan peningkatan dalam penerapan strategi pressing tinggi serta efektivitas di sepertiga akhir lapangan. Beberapa pemain muda juga mendapatkan kesempatan tampil dan menunjukkan performa yang menjanjikan.\n\nDengan kemenangan 3-0 ini, Tim Garuda semakin percaya diri menghadapi jadwal padat di bulan depan. Staf pelatih berencana melakukan rotasi pemain dan menekankan latihan pada aspek penyelesaian akhir serta koordinasi antar lini. Laga ini dianggap sebagai langkah positif dalam membangun tim nasional yang lebih kompetitif dan konsisten di tingkat internasional.",
        komentar: [],
        kalimat: ""
    },
    {
        id: 103,
        judul: 'Startup Lokal Dapatkan Pendanaan Seri B',
        foto_utama: 'https://placehold.co/600x400/ffc107/black?text=Ekonomi',
        idKategori: [1, 3],
        gambar_konten: [
        'https://placehold.co/800x600/ffc107/000000?text=Info+1',
        'https://placehold.co/800x600/ffc107/000000?text=Info+2',
        ],
        timestamp: new Date('2025-09-27T14:00:00'),
        isi: "Jakarta — Sebuah startup teknologi asal Indonesia resmi mengumumkan perolehan pendanaan Seri B senilai 15 juta dolar Amerika Serikat dari konsorsium investor regional. Putaran pendanaan ini dipimpin oleh firma modal ventura asal Singapura, dengan partisipasi dari beberapa investor strategis yang sebelumnya telah berpartisipasi dalam pendanaan tahap awal perusahaan tersebut.\n\nStartup yang berfokus pada pengembangan platform layanan keuangan digital ini berencana menggunakan dana segar tersebut untuk memperluas jangkauan pasar ke kota-kota lapis kedua di Indonesia, sekaligus memperkuat infrastruktur teknologi berbasis kecerdasan buatan. Menurut pernyataan resmi perusahaan, fokus utama ekspansi adalah mempercepat digitalisasi sektor UMKM dan meningkatkan akses masyarakat terhadap layanan finansial yang inklusif.\n\nDalam keterangan persnya, CEO perusahaan menyatakan bahwa pendanaan ini menjadi validasi terhadap model bisnis yang berkelanjutan dan tingkat pertumbuhan pengguna yang konsisten selama dua tahun terakhir. Ia juga menambahkan bahwa tim pengembang tengah menyiapkan sejumlah fitur baru berbasis analitik perilaku pengguna dan sistem keamanan data bersertifikasi internasional untuk menjaga kepercayaan pelanggan.\n\nInvestor utama menilai potensi pasar fintech di Indonesia masih sangat besar, mengingat lebih dari separuh populasi belum sepenuhnya terintegrasi dengan layanan keuangan digital. Dengan strategi ekspansi yang agresif dan fondasi teknologi yang kuat, startup ini diproyeksikan menjadi salah satu pemain utama di ekosistem digital Asia Tenggara dalam beberapa tahun ke depan.",
        komentar: [],
        kalimat: ""
    },
    {
        id: 104,
        judul: 'Konser Musik Akbar Akan Digelar di Jakarta',
        foto_utama: 'https://placehold.co/600x400/dc3545/white?text=Hiburan',
        idKategori: [5],
        gambar_konten: [
        'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+1',
        'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
        'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
        'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
        'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
        'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
        ],
        timestamp: new Date('2025-09-25T09:00:00'),
        isi: "Jakarta — Sebuah konser musik akbar bertajuk 'Sound of Unity 2025' akan segera digelar di Jakarta pada awal Desember mendatang. Acara ini dijadwalkan berlangsung di Stadion Internasional Jakarta dan akan menampilkan deretan musisi ternama dari dalam maupun luar negeri. Panitia menyebutkan bahwa konser ini diharapkan menjadi salah satu perhelatan musik terbesar di Asia Tenggara tahun ini.\n\nKonser tersebut mengusung konsep hybrid dengan kombinasi pertunjukan langsung dan siaran digital beresolusi tinggi melalui platform streaming resmi. Sistem tata suara dan pencahayaan dikabarkan menggunakan teknologi terbaru dengan kalibrasi otomatis berbasis AI untuk menyesuaikan efek audio-visual terhadap kondisi cuaca dan jumlah penonton di lokasi.\n\nSelain menonjolkan kemegahan produksi, pihak penyelenggara juga menekankan komitmen terhadap keberlanjutan lingkungan. Seluruh peralatan listrik utama akan menggunakan energi terbarukan, sementara tiket fisik digantikan oleh sistem digital berbasis QR yang terintegrasi dengan aplikasi mobile resmi. Fasilitas daur ulang dan area hijau sementara juga disediakan di sekitar lokasi acara.\n\nPihak promotor menyatakan bahwa penjualan tiket tahap pertama telah habis dalam waktu kurang dari dua jam sejak dibuka. Antusiasme penonton yang tinggi ini menunjukkan gairah industri hiburan yang mulai pulih pasca-pandemi. Dengan dukungan teknologi mutakhir dan manajemen acara profesional, 'Sound of Unity 2025' diyakini akan menjadi tolok ukur baru bagi penyelenggaraan konser berskala internasional di Indonesia.",
        komentar: [],
        kalimat: ""
    },
    {
        id: 105,
        judul: 'Debat Publik Calon Kepala Daerah Memanas',
        foto_utama: 'https://placehold.co/600x400/6c757d/white?text=Politik',
        idKategori: [4],
        gambar_konten: [
        'https://placehold.co/800x600/6c757d/FFFFFF?text=Debat+1',
        'https://placehold.co/800x600/6c757d/FFFFFF?text=Debat+2',
        ],
        timestamp: new Date('2025-09-24T18:00:00'),
        isi: "Surabaya — Suasana debat publik calon kepala daerah yang digelar pada Senin malam berlangsung panas sejak awal sesi. Kedua kandidat utama saling beradu argumen mengenai isu transparansi anggaran, kebijakan pembangunan infrastruktur, dan penanganan kesejahteraan masyarakat. Acara yang disiarkan secara langsung oleh beberapa stasiun televisi nasional itu menarik perhatian publik luas, terutama karena gaya komunikasi kedua kandidat yang tegas dan kontras.\n\nDebat dibuka dengan segmen visi dan misi, namun ketegangan mulai meningkat ketika salah satu calon menyinggung kinerja lawannya selama menjabat di periode sebelumnya. Saling sanggah dan interupsi terjadi berkali-kali, membuat moderator harus beberapa kali menenangkan suasana agar diskusi tetap berjalan sesuai aturan Komisi Pemilihan Umum. Meski begitu, kedua kandidat tetap mampu menyampaikan poin-poin kebijakan dengan argumentasi yang terstruktur.\n\nDalam segmen kebijakan publik, isu pengelolaan dana daerah dan efisiensi birokrasi menjadi topik paling sengit. Salah satu kandidat menyoroti perlunya digitalisasi sistem administrasi pemerintahan untuk mencegah kebocoran anggaran, sementara kandidat lain menekankan pentingnya pembangunan infrastruktur sosial dan penguatan layanan publik berbasis komunitas. Analisis para pengamat menilai bahwa debat kali ini menunjukkan perbedaan ideologi dan pendekatan kebijakan yang cukup tajam.\n\nMenjelang akhir acara, kedua calon diingatkan untuk menyampaikan pernyataan penutup yang berfokus pada solusi, bukan serangan pribadi. Meski tensi tetap tinggi, debat tersebut dinilai berhasil memberikan gambaran jelas bagi pemilih mengenai arah dan gaya kepemimpinan masing-masing kandidat. Tahapan kampanye selanjutnya diperkirakan akan semakin intens, seiring meningkatnya perhatian publik terhadap dinamika politik daerah menjelang hari pemungutan suara.",
        komentar: [],
        kalimat: ""
    },
    {
        id: 106,
        judul: 'Jadwal Pertandingan Liga 1 Pekan Ini',
        foto_utama: 'https://placehold.co/600x400/28a745/white?text=Olah+Raga',
        idKategori: [2],
        gambar_konten: ['https://placehold.co/800x600/28a745/FFFFFF?text=Jadwal'],
        timestamp: new Date('2025-09-28T08:00:00'),
        isi: "Jakarta — Liga 1 Indonesia kembali bergulir akhir pekan ini dengan sejumlah pertandingan menarik yang siap memanaskan persaingan papan atas. Sejumlah klub besar dijadwalkan bertanding di stadion kebanggaan masing-masing, membawa misi penting untuk mengamankan posisi sebelum memasuki paruh kedua musim kompetisi.\n\nPertandingan pembuka pekan ini akan mempertemukan Persib Bandung melawan Borneo FC, laga yang diprediksi berlangsung sengit mengingat keduanya sama-sama mengincar posisi tiga besar klasemen sementara. Di laga lainnya, Persebaya Surabaya akan menghadapi Arema FC dalam duel bertajuk “Derby Jawa Timur” yang selalu menyajikan tensi tinggi, baik di dalam maupun luar lapangan.\n\nSementara itu, tim promosi musim ini seperti Malut United dan PSBS Biak terus berupaya mencuri poin penting di kandang lawan untuk menjaga peluang bertahan di kasta tertinggi. Pelatih kedua tim menegaskan fokus mereka kini ada pada stabilitas performa dan efisiensi penyelesaian akhir yang masih menjadi pekerjaan rumah di beberapa pertandingan terakhir.\n\nOperator liga memastikan seluruh pertandingan pekan ini akan menggunakan sistem wasit tambahan berbasis video (VAR) yang telah diperbarui, guna meningkatkan akurasi pengambilan keputusan di lapangan. Dengan atmosfer kompetisi yang semakin ketat, pekan ini diharapkan menyajikan tontonan menarik bagi para pecinta sepak bola nasional sekaligus mengukuhkan kualitas Liga 1 sebagai kompetisi profesional unggulan di kawasan Asia Tenggara.",
        komentar: [],
        kalimat: ""
    },
    {
        id: 107,
        judul: 'Review Smartphone Terbaru: Fitur dan Harga',
        foto_utama: 'https://placehold.co/600x400/007bff/white?text=Teknologi',
        idKategori: [1],
        gambar_konten: ['https://placehold.co/800x600/007bff/FFFFFF?text=Review'],
        timestamp: new Date('2025-09-28T09:15:00'),
        isi: "Jakarta — Industri smartphone kembali diramaikan dengan peluncuran beberapa model terbaru dari berbagai merek ternama yang menawarkan kombinasi fitur canggih dan harga kompetitif. Produk-produk yang dirilis pada kuartal terakhir tahun ini menyoroti peningkatan performa prosesor, efisiensi daya, serta kemampuan kamera yang semakin mendekati standar perangkat profesional.\n\nSalah satu smartphone yang menarik perhatian adalah model flagship terbaru dengan dukungan prosesor berarsitektur 4 nanometer, menghadirkan efisiensi tinggi tanpa mengorbankan kecepatan. Ponsel ini juga dibekali layar AMOLED beresolusi tinggi dengan refresh rate 120Hz, menjadikannya ideal bagi pengguna yang mengutamakan visual tajam dan responsivitas maksimal. Sistem pendingin berbasis vapor chamber turut disematkan untuk menjaga kestabilan suhu selama aktivitas gaming atau multitasking berat.\n\nDari sisi kamera, sebagian besar produsen kini fokus pada teknologi penggabungan piksel (pixel binning) serta pemrosesan berbasis AI untuk menghasilkan foto dengan detail dan dinamika warna yang lebih akurat. Tak hanya itu, fitur perekaman video kini mendukung resolusi hingga 8K, lengkap dengan sistem stabilisasi optik ganda untuk hasil yang lebih halus. Peningkatan pada sistem audio dan dukungan codec nirkabel terbaru juga memperkuat pengalaman multimedia pengguna.\n\nSecara harga, perangkat di kelas menengah kini mulai mengadopsi fitur yang sebelumnya eksklusif untuk flagship, seperti konektivitas 5G, pengisian cepat 100W, dan sertifikasi tahan air IP68. Tren ini menunjukkan bahwa kompetisi antarprodusen semakin ketat, mendorong inovasi lebih cepat dengan harga yang tetap rasional. Dengan beragam pilihan dan peningkatan signifikan di berbagai lini, konsumen kini memiliki lebih banyak alternatif untuk menyesuaikan kebutuhan performa dan anggaran mereka.",
        komentar: [],
        kalimat: ""
    },
    {
        id: 108,
        judul: 'Harga Emas Kembali Naik, Investor Cemas',
        foto_utama: 'https://placehold.co/600x400/ffc107/black?text=Ekonomi',
        idKategori: [3],
        gambar_konten: ['https://placehold.co/800x600/ffc107/000000?text=Grafik'],
        timestamp: new Date('2025-09-28T10:30:00'),
        isi: "Jakarta — Harga emas dunia kembali mengalami kenaikan signifikan pada perdagangan Selasa pagi, didorong oleh meningkatnya kekhawatiran investor terhadap ketidakstabilan ekonomi global dan pelemahan nilai tukar beberapa mata uang utama. Lonjakan harga logam mulia ini tercatat sebagai yang tertinggi dalam tiga bulan terakhir, dengan harga spot emas menembus level psikologis 2.400 dolar AS per troy ounce.\n\nAnalis pasar menilai pergerakan ini merupakan respons langsung terhadap meningkatnya permintaan aset aman (safe haven) di tengah gejolak geopolitik dan kekhawatiran terhadap potensi resesi di sejumlah negara besar. Selain itu, kebijakan moneter bank sentral yang masih mempertahankan suku bunga tinggi turut mendorong volatilitas di pasar saham dan obligasi, membuat investor beralih pada komoditas yang dianggap lebih stabil.\n\nDi pasar domestik, harga emas batangan juga mengalami penyesuaian sejalan dengan tren global. Nilai jual emas di sejumlah gerai resmi naik rata-rata sebesar Rp15.000 per gram dibandingkan akhir pekan lalu. Kenaikan ini diprediksi akan terus berlanjut apabila tekanan inflasi di Amerika Serikat dan Eropa tidak segera mereda.\n\nPara analis memperingatkan bahwa meski kenaikan harga emas mencerminkan meningkatnya minat investor terhadap instrumen lindung nilai, kondisi ini juga mengindikasikan ketidakpastian ekonomi yang semakin tinggi. Jika situasi global tidak segera stabil, pasar komoditas kemungkinan akan tetap menjadi fokus utama dalam strategi diversifikasi portofolio jangka menengah hingga akhir tahun ini.",
        komentar: [],
        kalimat: ""
    },
    {
        id: 109,
        judul: "Film 'Pejuang Lulus' Tembus 1 Juta Penonton",
        foto_utama: 'https://placehold.co/600x400/dc3545/white?text=Hiburan',
        idKategori: [5], 
        gambar_konten: ['https://placehold.co/800x600/dc3545/FFFFFF?text=Poster', 
            'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
            'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
            'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
            'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
            'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
        ],
        timestamp: new Date('2025-09-27T20:00:00'),
        isi: "Jakarta — Film nasional berjudul Pejuang Lulus sukses menembus angka satu juta penonton hanya dalam waktu lima hari penayangan di bioskop.\nCapaian ini menjadikannya salah satu film lokal dengan pertumbuhan jumlah penonton tercepat tahun ini, sekaligus menandai kebangkitan kembali industri perfilman Indonesia setelah periode lesu di awal kuartal.\nAntusiasme penonton terlihat dari padatnya jadwal pemutaran di berbagai kota besar seperti Jakarta, Surabaya, Bandung, dan Medan.\n\nFilm yang mengangkat kisah perjuangan sekelompok mahasiswa menghadapi tekanan ujian akhir dan realita kehidupan pasca-kampus ini berhasil menarik perhatian publik berkat jalan cerita yang relevan dan emosional.\nSutradara film, Raka Wirawan, menyebut bahwa keberhasilan tersebut merupakan hasil dari riset mendalam terhadap dinamika generasi muda yang sedang berjuang meraih masa depan di tengah tekanan sosial dan ekonomi.\n\nSelain cerita yang kuat, keberhasilan Pejuang Lulus juga ditopang oleh strategi promosi digital yang agresif melalui media sosial dan platform streaming.\nBanyak penonton muda yang mengaku terhubung secara emosional dengan karakter-karakter di film tersebut, terutama dalam menggambarkan kegelisahan dan semangat pantang menyerah di usia muda.\n\nPengamat industri film menilai bahwa pencapaian ini menjadi bukti bahwa pasar domestik masih sangat potensial bagi film-film bertema realistik dan inspiratif.\nDengan tren positif tersebut, Pejuang Lulus diprediksi mampu menembus angka dua juta penonton dalam waktu dekat, sekaligus membuka peluang bagi produksi film sejenis di masa mendatang.",
        komentar: [],
        kalimat: ""
    },
    {
        id: 110,
        judul: 'Pemerintah Umumkan Kebijakan Baru Terkait Subsidi',
        foto_utama: 'https://placehold.co/600x400/6c757d/white?text=Politik',
        idKategori: [4, 3],
        gambar_konten: [
        'https://placehold.co/800x600/6c757d/FFFFFF?text=Konferensi',
        ],
        timestamp: new Date('2025-09-26T15:00:00'),
        isi: "Jakarta — Pemerintah resmi mengumumkan kebijakan baru terkait penyaluran subsidi energi dan pangan yang akan mulai diterapkan pada awal kuartal depan.\nLangkah ini diambil sebagai bagian dari upaya restrukturisasi fiskal untuk memastikan bantuan negara lebih tepat sasaran kepada kelompok masyarakat berpendapatan rendah.\nDalam kebijakan terbaru ini, sistem distribusi subsidi akan sepenuhnya terintegrasi dengan basis data kependudukan nasional dan menggunakan pendekatan digital melalui aplikasi resmi pemerintah.\n\nMenteri Keuangan menjelaskan bahwa reformasi kebijakan subsidi ini bertujuan untuk mengurangi potensi kebocoran anggaran sekaligus memperkuat daya beli masyarakat yang benar-benar membutuhkan.\nPemerintah juga akan menerapkan sistem verifikasi otomatis berbasis Nomor Induk Kependudukan (NIK) dan data penerimaan bantuan sosial guna mencegah tumpang tindih penerima manfaat.\nLangkah ini diharapkan mampu meningkatkan efisiensi alokasi dana hingga 15% dibandingkan dengan mekanisme sebelumnya.\n\nSelain sektor energi, kebijakan baru ini juga mencakup subsidi untuk bahan pokok seperti beras, minyak goreng, dan pupuk.\nPenyesuaian formula subsidi akan dilakukan secara dinamis mengikuti harga pasar global, namun dengan batas intervensi tertentu untuk menjaga stabilitas harga di tingkat konsumen.\nPara pelaku industri menyambut baik kebijakan ini, meskipun sebagian pihak menilai perlu adanya transisi yang lebih bertahap agar tidak menimbulkan gejolak harga di pasar.\n\nDengan langkah ini, pemerintah berharap dapat memperkuat ketahanan ekonomi nasional sekaligus memperkecil kesenjangan sosial.\nEvaluasi atas efektivitas kebijakan tersebut akan dilakukan setiap enam bulan, dengan laporan terbuka kepada publik untuk menjaga transparansi dan akuntabilitas.",
        komentar: [],
        kalimat: ""
    },
    {
        id: 111,
        judul: 'Perusahaan Teknologi PHK Massal, Apa Dampaknya?',
        foto_utama: 'https://placehold.co/600x400/007bff/white?text=Teknologi',
        idKategori: [1, 3],
        gambar_konten: ['https://placehold.co/800x600/007bff/FFFFFF?text=Dampak'],
        timestamp: new Date('2025-09-25T13:00:00'),
        isi: "Jakarta — Gelombang pemutusan hubungan kerja (PHK) massal kembali terjadi di sektor teknologi, setelah salah satu perusahaan raksasa digital nasional mengumumkan pengurangan ribuan karyawan pada awal pekan ini.\nKebijakan tersebut disebut sebagai langkah strategis untuk menekan beban operasional dan mengalihkan fokus pada lini bisnis yang dianggap lebih menguntungkan.\nMeski demikian, keputusan ini menimbulkan kekhawatiran di kalangan pekerja industri digital yang mulai merasakan ketidakpastian karier di tengah perlambatan ekonomi global.\n\nMenurut keterangan resmi perusahaan, restrukturisasi dilakukan akibat penurunan permintaan terhadap beberapa layanan digital serta meningkatnya biaya infrastruktur data.\nManajemen mengklaim bahwa PHK ini merupakan keputusan sulit namun diperlukan agar perusahaan tetap kompetitif dalam jangka panjang.\nNamun, sejumlah analis menilai bahwa langkah tersebut juga mencerminkan perubahan arah industri teknologi menuju efisiensi dan otomatisasi, yang berpotensi mengurangi kebutuhan tenaga kerja manusia di beberapa divisi.\n\nDi sisi lain, pemerintah melalui Kementerian Ketenagakerjaan menyatakan akan memantau proses PHK tersebut untuk memastikan hak-hak pekerja tetap terpenuhi sesuai ketentuan Undang-Undang Ketenagakerjaan.\nBeberapa program pelatihan ulang dan penempatan kerja juga disiapkan untuk membantu para pekerja terdampak agar dapat segera beradaptasi dengan kebutuhan industri baru.\n\nPengamat ekonomi menilai bahwa fenomena ini bisa menjadi titik balik bagi ekosistem startup nasional untuk lebih fokus pada profitabilitas ketimbang ekspansi agresif.\nDalam jangka panjang, tren efisiensi di sektor teknologi diperkirakan akan mendorong munculnya model bisnis yang lebih berkelanjutan dan berbasis inovasi nyata, bukan hanya pada valuasi pasar semata.",
        komentar: [],
        kalimat: ""
    },
    {
        id: 112,
        judul: 'Profil Pemain Muda Berbakat Timnas U-19',
        foto_utama: 'https://placehold.co/600x400/28a745/white?text=Olah+Raga',
        idKategori: [2],
        gambar_konten: ['https://placehold.co/800x600/28a745/FFFFFF?text=Pemain'],
        timestamp: new Date('2025-09-24T11:00:00'),
        isi: "Jakarta — Nama-nama baru mulai mencuri perhatian di skuad Timnas Indonesia U-19 setelah beberapa pemain muda menunjukkan performa gemilang dalam ajang turnamen internasional terakhir.\nSalah satu yang paling disorot adalah gelandang serang berusia 18 tahun, Ardan Wijaya, yang berhasil mencetak dua gol dan tiga assist dalam tiga pertandingan.\nPermainannya yang tenang, kemampuan membaca arah bola, serta kecepatan dalam mengambil keputusan membuatnya disebut-sebut sebagai calon bintang masa depan sepak bola nasional.\n\nArdan diketahui meniti karier sepak bola sejak usia 10 tahun melalui akademi lokal di Yogyakarta sebelum akhirnya direkrut oleh klub Liga 1 papan tengah.\nPelatih Timnas U-19 mengakui bahwa pemain muda tersebut memiliki etos kerja tinggi dan kemampuan adaptasi yang luar biasa di lapangan.\nDengan dukungan pelatihan intensif dan jam terbang yang meningkat, Ardan diproyeksikan menjadi tulang punggung tim di kompetisi internasional mendatang.\n\nSelain Ardan, beberapa nama lain seperti bek tengah Dimas Prakoso dan penyerang lincah Rafi Alamsyah juga menunjukkan perkembangan signifikan.\nKeduanya dikenal memiliki disiplin taktik yang baik serta mampu tampil konsisten menghadapi tekanan pertandingan besar.\nPara pelatih di pusat pelatihan nasional bahkan mulai memantau progres mereka untuk kemungkinan promosi ke level U-23 dalam waktu dekat.\n\nDengan semakin banyaknya talenta muda berkualitas, Timnas U-19 kini disebut tengah berada di era emas pembinaan pemain.\nFederasi Sepak Bola Indonesia (PSSI) pun berkomitmen untuk memperkuat sistem akademi dan memberikan kesempatan lebih luas bagi pemain muda agar dapat berkembang melalui kompetisi yang berkesinambungan.",
        komentar: [],
        kalimat: ""
    },
    {
        id: 113,
        judul: 'Daftar Pemenang Festival Film Surabaya 2025',
        foto_utama: 'https://placehold.co/600x400/dc3545/white?text=Hiburan',
        idKategori: [5], // BENAR: Hiburan
        gambar_konten: ['https://placehold.co/800x600/dc3545/FFFFFF?text=Piala',
            'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
            'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
            'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
            'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
            'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
        ],
        timestamp: new Date('2025-09-23T21:00:00'),
        isi: "Surabaya — Ajang tahunan Festival Film Surabaya 2025 resmi berakhir pada Sabtu malam dengan menghadirkan sejumlah nama besar dan pendatang baru yang berhasil meraih penghargaan bergengsi.\nAcara yang digelar di Gedung Kesenian Cak Durasim ini menampilkan lebih dari 80 karya film dari berbagai daerah di Indonesia, mencakup kategori film panjang, film pendek, dokumenter, dan animasi.\nSuasana meriah terasa sejak awal acara ketika para sineas muda dan profesional berjalan di atas karpet merah dengan busana terbaik mereka.\n\nFilm Langit di Ujung Pagi karya sutradara muda Nadira Sasmita keluar sebagai pemenang kategori Film Terbaik, berkat kekuatan narasi dan sinematografi yang memukau.\nSementara itu, penghargaan Sutradara Terbaik jatuh kepada Ario Prabowo melalui karyanya Jejak di Balik Kabut, yang dinilai berhasil menyajikan pendekatan visual eksperimental namun tetap komunikatif.\nUntuk kategori Pemeran Utama Pria Terbaik, piala berhasil dibawa pulang oleh Rangga Wibowo berkat aktingnya yang memikat dalam film Retakan Waktu.\n\nTidak kalah menarik, kategori Film Pendek Terbaik dimenangkan oleh Senja di Jalan Sempit, sebuah karya dari mahasiswa Institut Seni Indonesia yang mengangkat tema kehidupan urban dengan sentuhan humanis.\nSedangkan kategori Animasi Terbaik berhasil diraih oleh Bintang Kecil di Atas Laut, animasi lokal yang memadukan teknik 3D dengan unsur budaya pesisir Jawa Timur.\nPara juri menyebut bahwa tahun ini menunjukkan peningkatan signifikan dalam kualitas teknis maupun keberagaman tema film yang dipertandingkan.\n\nKetua panitia, Dwi Nugraheni, menyatakan bahwa Festival Film Surabaya 2025 menjadi bukti nyata bahwa ekosistem perfilman daerah semakin matang dan mampu bersaing di level nasional.\nIa juga menambahkan bahwa tahun depan, festival ini akan membuka kategori baru khusus untuk sineas pelajar guna menumbuhkan regenerasi kreatif sejak dini.\nDengan semangat tersebut, Surabaya kian menegaskan posisinya sebagai salah satu pusat perkembangan perfilman nasional yang dinamis dan progresif.",
        komentar: [],
        kalimat: ""
    },
    {
        id: 114,
        judul: 'Tips Mengelola Keuangan untuk Mahasiswa',
        foto_utama: 'https://placehold.co/600x400/ffc107/black?text=Ekonomi',
        idKategori: [3],
        gambar_konten: ['https://placehold.co/800x600/ffc107/000000?text=Tips'],
        timestamp: new Date('2025-09-22T16:00:00'),
        isi: "Jakarta — Mengelola keuangan dengan bijak menjadi tantangan tersendiri bagi banyak mahasiswa, terutama bagi mereka yang baru mulai hidup mandiri jauh dari keluarga.\nKeterbatasan pemasukan sering kali membuat mahasiswa harus pandai mengatur setiap rupiah agar kebutuhan akademik dan pribadi dapat terpenuhi tanpa terjebak utang atau gaya hidup konsumtif.\nMenurut para ahli finansial, kunci utama pengelolaan keuangan mahasiswa adalah perencanaan yang realistis dan disiplin dalam pelaksanaannya.\n\nLangkah pertama yang disarankan adalah menyusun anggaran bulanan yang mencakup kebutuhan pokok seperti makan, transportasi, kos, serta dana darurat.\nMahasiswa juga dianjurkan untuk memisahkan antara uang kebutuhan dan uang hiburan dengan menggunakan rekening berbeda atau aplikasi pengelola keuangan.\nPendekatan ini membantu menciptakan kebiasaan finansial sehat sejak dini serta menghindari pengeluaran impulsif yang sering terjadi di akhir bulan.\n\nSelain itu, mahasiswa perlu memahami pentingnya mencatat pengeluaran harian.\nMeskipun terlihat sepele, kebiasaan ini memungkinkan mereka mengevaluasi pola belanja dan menyesuaikan prioritas di bulan berikutnya.\nBeberapa platform digital seperti dompet elektronik dan aplikasi keuangan kini bahkan menyediakan fitur otomatis untuk mencatat transaksi, memudahkan pengguna memantau arus kas pribadi.\n\nTerakhir, para pakar menyarankan agar mahasiswa mulai menabung atau berinvestasi kecil-kecilan, misalnya melalui tabungan berjangka atau instrumen reksa dana pasar uang.\nKebiasaan ini bukan hanya membantu membangun dana cadangan, tetapi juga menanamkan kesadaran finansial jangka panjang.\nDengan disiplin dan perencanaan yang matang, mahasiswa dapat belajar menjadi lebih mandiri secara finansial serta siap menghadapi tantangan ekonomi setelah lulus nanti.",
        komentar: [],
        kalimat: ""
    },
    {
        id: 115,
        judul: 'Bahaya Keamanan Siber: Cara Melindungi Data Pribadi',
        foto_utama: 'https://placehold.co/600x400/007bff/white?text=Teknologi',
        idKategori: [1],
        gambar_konten: ['https://placehold.co/800x600/007bff/FFFFFF?text=Security'],
        timestamp: new Date('2025-09-21T14:45:00'),
        isi: "Jakarta — Di era digital yang serba terhubung, ancaman keamanan siber semakin meningkat dan menargetkan individu maupun lembaga tanpa pandang bulu.\nSerangan berupa pencurian data pribadi, phishing, malware, dan penyusupan akun kini menjadi ancaman nyata yang bisa menimpa siapa saja, terutama pengguna aktif internet dan media sosial.\nMenurut pakar keamanan digital, lemahnya kesadaran masyarakat terhadap pentingnya perlindungan data pribadi menjadi salah satu penyebab utama meningkatnya kasus kebocoran informasi di Indonesia.\n\nPara ahli menekankan pentingnya penerapan kebiasaan digital aman (digital hygiene) seperti menggunakan kata sandi yang kuat dan berbeda untuk setiap akun.\nDisarankan pula untuk mengaktifkan verifikasi dua langkah (two-factor authentication) guna menambah lapisan keamanan saat mengakses layanan daring.\nPengguna juga perlu waspada terhadap tautan mencurigakan yang sering disebar melalui email, pesan singkat, atau media sosial karena bisa menjadi pintu masuk serangan phishing.\n\nSelain itu, penggunaan jaringan publik tanpa perlindungan juga berpotensi membuka celah bagi peretas untuk mencuri data.\nOleh karena itu, disarankan agar pengguna mengaktifkan VPN saat menggunakan Wi-Fi umum serta rutin memperbarui sistem keamanan perangkat dan aplikasi.\nLangkah sederhana seperti tidak membagikan informasi pribadi di platform terbuka dapat menjadi benteng awal dalam mencegah penyalahgunaan data.\n\nPemerintah sendiri telah memperkuat regulasi melalui Undang-Undang Perlindungan Data Pribadi (UU PDP) yang mengatur hak dan kewajiban pengguna serta penyedia layanan digital.\nNamun, efektivitas kebijakan tersebut tetap bergantung pada kesadaran individu untuk menjaga privasinya sendiri.\nDengan meningkatnya literasi keamanan siber, diharapkan masyarakat Indonesia dapat lebih tangguh menghadapi ancaman digital dan menjaga kedaulatan data pribadi di dunia maya.",
        komentar: [],
        kalimat: ""
    }
];

export const getAllBerita = (): Berita[] => {
  return BERITA;
};

export const getBeritaWithKategori = (): BeritaDetail[] => {
  const allKategori = getAllKategori();

  return BERITA.map((berita) => {
    const namaKategori = berita.idKategori.map((id) => {
      const kategori = allKategori.find((k) => k.id === id);
      return kategori ? kategori.nama : 'Tidak Ditemukan';
    });

    return {
      ...berita,
      namaKategori: namaKategori,
    };
  });
};

export const getBeritaByKategori = (idKategori: number): Berita[] => {
  return BERITA.filter((berita) => berita.idKategori.includes(idKategori));
};

export const addBerita = (berita: Berita): void => {
    const maxId = BERITA.reduce((m, b) => (b.id > m ? b.id : m), 0);
    if (!berita.id || berita.id <= maxId) {
        berita.id = maxId + 1;
    }
    BERITA.push(berita);
};

export const updateBeritaArray = (updatedBerita: Berita[]): void => {
    BERITA.length = 0; 
    BERITA.push(...updatedBerita); 
}

export const deleteBerita = (idBerita: number): boolean => {
    const initialLength = BERITA.length;
    const index = BERITA.findIndex((b) => b.id === idBerita);

    if (index > -1) {
        BERITA.splice(index, 1);
        return true;
    }
    return false; 
};
