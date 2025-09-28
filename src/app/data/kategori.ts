export interface Kategori {
  id: number;
  nama: string;
  icon: string;
}

export function getAllKategori(): Kategori[] {
  return [
    { id: 1, nama: 'Teknologi', icon: 'assets/icon/technology.png' },
    { id: 2, nama: 'Olahraga', icon: 'assets/icon/olahraga.png' },
    { id: 3, nama: 'Ekonomi', icon: 'assets/icon/ekonomi.png' },
    { id: 4, nama: 'Politik', icon: 'assets/icon/politik.png' },
    { id: 5, nama: 'Hiburan', icon: 'assets/icon/entertainment.png' },
  ];
}
