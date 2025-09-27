interface Komentar {
  id: number;
  idBerita: number;
  idUser: number;
  komentar: string;
  timestamp: Date;
}

const KOMENTAR: Komentar[] = [
  {
    id: 1,
    idBerita: 101,
    idUser: 2,
    komentar: 'Wow, update yang ditunggu-tunggu!',
    timestamp: new Date(),
  },
  {
    id: 2,
    idBerita: 101,
    idUser: 3,
    komentar: 'Perlu coba nih fitur barunya.',
    timestamp: new Date(),
  },
  {
    id: 3,
    idBerita: 102,
    idUser: 1,
    komentar: 'Garuda di dadaku!',
    timestamp: new Date(),
  },
  {
    id: 4,
    idBerita: 103,
    idUser: 5,
    komentar: 'Selamat untuk kemajuannya!',
    timestamp: new Date(),
  },
  {
    id: 5,
    idBerita: 104,
    idUser: 4,
    komentar: 'Siapa aja bintang tamunya?',
    timestamp: new Date(),
  },
];

export const getAllKomentar = (): Komentar[] => {
  return KOMENTAR;
};
