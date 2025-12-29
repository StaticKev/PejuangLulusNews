import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOGGED_IN_KEY = 'isLoggedIn';
  private readonly USERNAME_KEY = 'loggedInUsername'; 
  private readonly UID = 'uid';
  
  private baseUrl = 'https://ubaya.cloud/hybrid/160423020/uas/'; 

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}

  private encode(body: URLSearchParams) {
    return body.toString();
  }

  login(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post(
      this.baseUrl + 'login.php', 
      this.encode(body), 
      { headers }
    ).pipe(
      tap((response: any) => {
        if (response.result === 'success') {
          console.log('USER FOUND via API!');
          localStorage.setItem(this.LOGGED_IN_KEY, 'true');
          localStorage.setItem(this.USERNAME_KEY, response.username); 
          localStorage.setItem(this.UID, response.uid.toString()); 
        }
      })
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload(); 
    });
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGGED_IN_KEY) === 'true';
  }

  getUserName(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
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