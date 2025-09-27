import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAllUsers } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOGGED_IN_KEY = 'isLoggedIn';

  constructor(private router: Router) {}

  login(username: string, password: string): boolean {
    const users = getAllUsers();
    const userFound = users.find(
      (u) => u.username === username && u.password === password
    );

    if (userFound) {
      localStorage.setItem(this.LOGGED_IN_KEY, 'true');
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem(this.LOGGED_IN_KEY);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGGED_IN_KEY) === 'true';
  }

  checkLogin() {
    if (!this.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}
