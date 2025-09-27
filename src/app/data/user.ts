interface User {
  id: number;
  username: string;
  password: string;
  email: string;
}

const USERS: User[] = [
  {
    id: 1,
    username: 'pejuang_lulus',
    password: '123',
    email: 'pejuang@email.com',
  },
  {
    id: 2,
    username: 'mahasiswa_rajin',
    password: '456',
    email: 'rajin@email.com',
  },
  { id: 3, username: 'budi_coder', password: '789', email: 'budi@email.com' },
  { id: 4, username: 'siti_news', password: 'abc', email: 'siti@email.com' },
  { id: 5, username: 'admin', password: 'admin123', email: 'admin@email.com' },
];
export const getAllUsers = (): User[] => {
  return USERS;
};
