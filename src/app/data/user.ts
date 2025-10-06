import { Berita } from './berita';

export interface User {
  id: number;
  username: string;
  password: string;
  email: string;
  favorit: Berita[];
}

const USERS: User[] = [
  {
    id: 1,
    username: 'pejuang_lulus',
    password: '123',
    email: 'pejuang@email.com',
    favorit: [],
  },
  {
    id: 2,
    username: 'mahasiswa_rajin',
    password: '456',
    email: 'rajin@email.com',
    favorit: [],
  },
  {
    id: 3,
    username: 'budi_coder',
    password: '789',
    email: 'budi@email.com',
    favorit: [],
  },
  {
    id: 4,
    username: 'siti_news',
    password: 'abc',
    email: 'siti@email.com',
    favorit: [],
  },
  {
    id: 5,
    username: 'admin',
    password: 'admin123',
    email: 'admin@email.com',
    favorit: [],
  },
];
export const getAllUsers = (): User[] => {
  return USERS;
};

export function updateUser(updatedUser: User): void {
  const index = USERS.findIndex((u) => u.username === updatedUser.username);

  if (index > -1) {
    USERS[index] = updatedUser;

    console.log(`[DATA] Pengguna ${updatedUser.username} berhasil diupdate.`);
  }
}
