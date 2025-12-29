import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAllUsers } from './user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOGGED_IN_KEY = 'isLoggedIn';

  constructor(private router: Router) {}

  // logout() {
  //   localStorage.clear();
  //   console.log('All session data cleared');

  //   this.router.navigate(['/login']).then(() => {
  //     window.location.reload();
  //   });
  // }

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
