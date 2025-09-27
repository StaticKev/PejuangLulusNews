export interface Kategori {
  id: number;
  nama: string;
}

const KATEGORI: Kategori[] = [
  { id: 1, nama: 'Teknologi' },
  { id: 2, nama: 'Olah Raga' },
  { id: 3, nama: 'Ekonomi' },
  { id: 4, nama: 'Hiburan' },
  { id: 5, nama: 'Politik' },
];

export const getAllKategori = (): Kategori[] => {
  return KATEGORI;
};
