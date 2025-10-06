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
      console.log('USER FOUND!');
      localStorage.setItem(this.LOGGED_IN_KEY, 'true');
      localStorage.setItem('loggedInUsername', userFound.username);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.clear();
    console.log('All session data cleared');

    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGGED_IN_KEY) === 'true';
  }

  checkLogin(): boolean {
    if (!this.isLoggedIn()) {
      console.log('User not logged in, redirecting to login...');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
