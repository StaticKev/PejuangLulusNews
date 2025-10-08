import { Berita } from './berita';
import { User } from './user';

export interface Rating {
  id: number;
  berita: Berita;
  user: User;
  nilai: number;
}

// let RATING: Rating[] = [
//   {
//     id: 1,
//     berita: {
//       id: 101,
//       judul: 'Framework Ionic 8 Resmi Dirilis',
//       foto_utama: 'https://placehold.co/600x400/007bff/white?text=Teknologi',
//       idKategori: [1],
//       gambar_konten: [
//         'https://placehold.co/800x600/007bff/FFFFFF?text=Gambar+1',
//         'https://placehold.co/800x600/007bff/FFFFFF?text=Gambar+2',
//         'https://placehold.co/800x600/007bff/FFFFFF?text=Gambar+3',
//       ],
//       timestamp: new Date('2025-09-26T10:00:00'),
//       isi: '...',
//       komentar: []
//     },
//     user: {
//       id: 1,
//       username: 'pejuang_lulus',
//       password: '123',
//       email: 'pejuang@email.com',
//       favorit: [],
//     },
//     nilai: 2,
//   },
//   {
//     id: 2,
//     berita: {
//       id: 101,
//       judul: 'Framework Ionic 8 Resmi Dirilis',
//       foto_utama: 'https://placehold.co/600x400/007bff/white?text=Teknologi',
//       idKategori: [1],
//       gambar_konten: [
//         'https://placehold.co/800x600/007bff/FFFFFF?text=Gambar+1',
//         'https://placehold.co/800x600/007bff/FFFFFF?text=Gambar+2',
//         'https://placehold.co/800x600/007bff/FFFFFF?text=Gambar+3',
//       ],
//       timestamp: new Date('2025-09-26T10:00:00'),
//       isi: '...',
//     },
//     user: {
//       id: 3,
//       username: 'budi_coder',
//       password: '789',
//       email: 'budi@email.com',
//       favorit: [],
//     },
//     nilai: 3,
//   },
//   {
//     id: 3,
//     berita: {
//       id: 103,
//       judul: 'Startup Lokal Dapatkan Pendanaan Seri B',
//       foto_utama: 'https://placehold.co/600x400/ffc107/black?text=Ekonomi',
//       idKategori: [1, 3],
//       gambar_konten: [
//         'https://placehold.co/800x600/ffc107/000000?text=Info+1',
//         'https://placehold.co/800x600/ffc107/000000?text=Info+2',
//       ],
//       timestamp: new Date('2025-09-27T14:00:00'),
//       isi: '...',
//     },
//     user: {
//       id: 2,
//       username: 'mahasiswa_rajin',
//       password: '456',
//       email: 'rajin@email.com',
//       favorit: [],
//     },
//     nilai: 5,
//   },
//   {
//     id: 1,
//     berita: {
//       id: 104,
//       judul: 'Konser Musik Akbar Akan Digelar di Jakarta',
//       foto_utama: 'https://placehold.co/600x400/dc3545/white?text=Hiburan',
//       idKategori: [5],
//       gambar_konten: [
//         'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+1',
//         'https://placehold.co/800x600/dc3545/FFFFFF?text=Artis+2',
//       ],
//       timestamp: new Date('2025-09-25T09:00:00'),
//       isi: '...',
//     },
//     user: {
//       id: 4,
//       username: 'siti_news',
//       password: 'abc',
//       email: 'siti@email.com',
//       favorit: [],
//     },
//     nilai: 4,
//   },
//   {
//     id: 5,
//     berita: {
//       id: 109,
//       judul: "Film 'Pejuang Lulus' Tembus 1 Juta Penonton",
//       foto_utama: 'https://placehold.co/600x400/dc3545/white?text=Hiburan',
//       idKategori: [5],
//       gambar_konten: ['https://placehold.co/800x600/dc3545/FFFFFF?text=Poster'],
//       timestamp: new Date('2025-09-27T20:00:00'),
//       isi: '...',
//     },
//     user: {
//       id: 4,
//       username: 'siti_news',
//       password: 'abc',
//       email: 'siti@email.com',
//       favorit: [],
//     },
//     nilai: 2,
//   },
//   {
//     id: 6,
//     berita: {
//       id: 109,
//       judul: "Film 'Pejuang Lulus' Tembus 1 Juta Penonton",
//       foto_utama: 'https://placehold.co/600x400/dc3545/white?text=Hiburan',
//       idKategori: [5],
//       gambar_konten: ['https://placehold.co/800x600/dc3545/FFFFFF?text=Poster'],
//       timestamp: new Date('2025-09-27T20:00:00'),
//       isi: '...',
//     },
//     user: {
//       id: 1,
//       username: 'pejuang_lulus',
//       password: '123',
//       email: 'pejuang@email.com',
//       favorit: [],
//     },
//     nilai: 4,
//   },
//   {
//     id: 7,
//     berita: {
//       id: 115,
//       judul: 'Bahaya Keamanan Siber: Cara Melindungi Data Pribadi',
//       foto_utama: 'https://placehold.co/600x400/007bff/white?text=Teknologi',
//       idKategori: [1],
//       gambar_konten: [
//         'https://placehold.co/800x600/007bff/FFFFFF?text=Security',
//       ],
//       timestamp: new Date('2025-09-21T14:45:00'),
//       isi: '...',
//     },
//     user: {
//       id: 3,
//       username: 'budi_coder',
//       password: '789',
//       email: 'budi@email.com',
//       favorit: [],
//     },
//     nilai: 5,
//   },
//   {
//     id: 8,
//     berita: {
//       id: 102,
//       judul: 'Indonesia Menang 3-0 di Laga Persahabatan',
//       foto_utama: 'https://placehold.co/600x400/28a745/white?text=Olah+Raga',
//       idKategori: [2],
//       gambar_konten: [
//         'https://placehold.co/800x600/28a745/FFFFFF?text=Laga+1',
//         'https://placehold.co/800x600/28a745/FFFFFF?text=Laga+2',
//       ],
//       timestamp: new Date('2025-09-27T11:30:00'),
//       isi: '...',
//     },
//     user: {
//       id: 5,
//       username: 'admin',
//       password: 'admin123',
//       email: 'admin@email.com',
//       favorit: [],
//     },
//     nilai: 2,
//   },
//   {
//     id: 9,
//     berita: {
//       id: 114,
//       judul: 'Tips Mengelola Keuangan untuk Mahasiswa',
//       foto_utama: 'https://placehold.co/600x400/ffc107/black?text=Ekonomi',
//       idKategori: [3],
//       gambar_konten: ['https://placehold.co/800x600/ffc107/000000?text=Tips'],
//       timestamp: new Date('2025-09-22T16:00:00'),
//       isi: '...',
//     },
//     user: {
//       id: 2,
//       username: 'mahasiswa_rajin',
//       password: '456',
//       email: 'rajin@email.com',
//       favorit: [],
//     },
//     nilai: 1,
//   },
//   {
//     id: 10,
//     berita: {
//       id: 114,
//       judul: 'Tips Mengelola Keuangan untuk Mahasiswa',
//       foto_utama: 'https://placehold.co/600x400/ffc107/black?text=Ekonomi',
//       idKategori: [3],
//       gambar_konten: ['https://placehold.co/800x600/ffc107/000000?text=Tips'],
//       timestamp: new Date('2025-09-22T16:00:00'),
//       isi: '...',
//     },
//     user: {
//       id: 1,
//       username: 'pejuang_lulus',
//       password: '123',
//       email: 'pejuang@email.com',
//       favorit: [],
//     },
//     nilai: 4,
//   },
// ];

let RATING: Rating[] = []

export const getAllRating = (): Rating[] => {
  return RATING;
};

export function updateRatingArray(updatedRatings: Rating[]): void {
  RATING.splice(0, RATING.length, ...updatedRatings);

  console.log(
    `[DATA] Array RATING berhasil diupdate. Total rating: ${RATING.length}`
  );
}
