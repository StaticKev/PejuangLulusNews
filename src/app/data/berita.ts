import { getAllKategori } from './kategori';

export interface Berita {
  id: number;
  judul: string;
  foto_utama: string;
  idKategori: number[];
  gambar_konten: string[];
  timestamp: Date;
}

export interface BeritaDetail extends Berita {
  namaKategori: string[];
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
    ],
    timestamp: new Date('2025-09-26T10:00:00'),
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
  },
  {
    id: 103,
    judul: 'Startup Lokal Dapatkan Pendanaan Seri B',
    foto_utama: 'https://placehold.co/600x400/ffc107/black?text=Ekonomi',
    idKategori: [1, 3], // Kategori: Teknologi & Ekonomi
    gambar_konten: [
      'https://placehold.co/800x600/ffc107/000000?text=Info+1',
      'https://placehold.co/800x600/ffc107/000000?text=Info+2',
    ],
    timestamp: new Date('2025-09-27T14:00:00'),
  },
  {
    id: 104,
    judul: 'Konser Musik Akbar Akan Digelar di Jakarta',
    foto_utama: 'https://placehold.co/600x400/dc3545/white?text=Hiburan',
    idKategori: [5], // BENAR: Hiburan
    gambar_konten: [
      'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+1',
      'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
    ],
    timestamp: new Date('2025-09-25T09:00:00'),
  },
  {
    id: 105,
    judul: 'Debat Publik Calon Kepala Daerah Memanas',
    foto_utama: 'https://placehold.co/600x400/6c757d/white?text=Politik',
    idKategori: [4], // BENAR: Politik
    gambar_konten: [
      'https://placehold.co/800x600/6c757d/FFFFFF?text=Debat+1',
      'https://placehold.co/800x600/6c757d/FFFFFF?text=Debat+2',
    ],
    timestamp: new Date('2025-09-24T18:00:00'),
  },
  {
    id: 106,
    judul: 'Jadwal Pertandingan Liga 1 Pekan Ini',
    foto_utama: 'https://placehold.co/600x400/28a745/white?text=Olah+Raga',
    idKategori: [2],
    gambar_konten: ['https://placehold.co/800x600/28a745/FFFFFF?text=Jadwal'],
    timestamp: new Date('2025-09-28T08:00:00'),
  },
  {
    id: 107,
    judul: 'Review Smartphone Terbaru: Fitur dan Harga',
    foto_utama: 'https://placehold.co/600x400/007bff/white?text=Teknologi',
    idKategori: [1],
    gambar_konten: ['https://placehold.co/800x600/007bff/FFFFFF?text=Review'],
    timestamp: new Date('2025-09-28T09:15:00'),
  },
  {
    id: 108,
    judul: 'Harga Emas Kembali Naik, Investor Cemas',
    foto_utama: 'https://placehold.co/600x400/ffc107/black?text=Ekonomi',
    idKategori: [3],
    gambar_konten: ['https://placehold.co/800x600/ffc107/000000?text=Grafik'],
    timestamp: new Date('2025-09-28T10:30:00'),
  },
  {
    id: 109,
    judul: "Film 'Pejuang Lulus' Tembus 1 Juta Penonton",
    foto_utama: 'https://placehold.co/600x400/dc3545/white?text=Hiburan',
    idKategori: [5], // BENAR: Hiburan
    gambar_konten: ['https://placehold.co/800x600/dc3545/FFFFFF?text=Poster'],
    timestamp: new Date('2025-09-27T20:00:00'),
  },
  {
    id: 110,
    judul: 'Pemerintah Umumkan Kebijakan Baru Terkait Subsidi',
    foto_utama: 'https://placehold.co/600x400/6c757d/white?text=Politik',
    idKategori: [4, 3], // BENAR: Politik & Ekonomi
    gambar_konten: [
      'https://placehold.co/800x600/6c757d/FFFFFF?text=Konferensi',
    ],
    timestamp: new Date('2025-09-26T15:00:00'),
  },
  {
    id: 111,
    judul: 'Perusahaan Teknologi PHK Massal, Apa Dampaknya?',
    foto_utama: 'https://placehold.co/600x400/007bff/white?text=Teknologi',
    idKategori: [1, 3],
    gambar_konten: ['https://placehold.co/800x600/007bff/FFFFFF?text=Dampak'],
    timestamp: new Date('2025-09-25T13:00:00'),
  },
  {
    id: 112,
    judul: 'Profil Pemain Muda Berbakat Timnas U-19',
    foto_utama: 'https://placehold.co/600x400/28a745/white?text=Olah+Raga',
    idKategori: [2],
    gambar_konten: ['https://placehold.co/800x600/28a745/FFFFFF?text=Pemain'],
    timestamp: new Date('2025-09-24T11:00:00'),
  },
  {
    id: 113,
    judul: 'Daftar Pemenang Festival Film Surabaya 2025',
    foto_utama: 'https://placehold.co/600x400/dc3545/white?text=Hiburan',
    idKategori: [5], // BENAR: Hiburan
    gambar_konten: ['https://placehold.co/800x600/dc3545/FFFFFF?text=Piala'],
    timestamp: new Date('2025-09-23T21:00:00'),
  },
  {
    id: 114,
    judul: 'Tips Mengelola Keuangan untuk Mahasiswa',
    foto_utama: 'https://placehold.co/600x400/ffc107/black?text=Ekonomi',
    idKategori: [3],
    gambar_konten: ['https://placehold.co/800x600/ffc107/000000?text=Tips'],
    timestamp: new Date('2025-09-22T16:00:00'),
  },
  {
    id: 115,
    judul: 'Bahaya Keamanan Siber: Cara Melindungi Data Pribadi',
    foto_utama: 'https://placehold.co/600x400/007bff/white?text=Teknologi',
    idKategori: [1],
    gambar_konten: ['https://placehold.co/800x600/007bff/FFFFFF?text=Security'],
    timestamp: new Date('2025-09-21T14:45:00'),
  },
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
