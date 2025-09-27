interface Favorite {
  id: number;
  idUser: number;
  idBerita: number;
  timestamp: Date;
}

const FAVORITE: Favorite[] = [
  { id: 1, idUser: 1, idBerita: 102, timestamp: new Date() },
  { id: 2, idUser: 1, idBerita: 104, timestamp: new Date() },

  { id: 3, idUser: 2, idBerita: 101, timestamp: new Date() },

  { id: 4, idUser: 4, idBerita: 102, timestamp: new Date() },

  { id: 5, idUser: 5, idBerita: 101, timestamp: new Date() },
  { id: 6, idUser: 5, idBerita: 102, timestamp: new Date() },
  { id: 7, idUser: 5, idBerita: 103, timestamp: new Date() },
];

export const getAllFavorite = (): Favorite[] => {
  return FAVORITE;
};
