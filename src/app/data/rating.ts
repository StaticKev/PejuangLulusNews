interface Rating {
  id: number;
  idBerita: number;
  idUser: number;
  nilai: number;
}

const RATING: Rating[] = [
  { id: 1, idBerita: 101, idUser: 2, nilai: 5 },
  { id: 2, idBerita: 101, idUser: 3, nilai: 4 },
  { id: 3, idBerita: 102, idUser: 1, nilai: 5 },
  { id: 4, idBerita: 102, idUser: 4, nilai: 5 },
  { id: 5, idBerita: 103, idUser: 5, nilai: 4.5 },
];

export const getAllRating = (): Rating[] => {
  return RATING;
};
