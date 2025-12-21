import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http'; // 1. Import HTTP
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators'; // 2. Import operator tap

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOGGED_IN_KEY = 'isLoggedIn';
  private readonly USERNAME_KEY = 'loggedInUsername'; // Simpan key biar konsisten
  
  // URL API Kamu
  private baseUrl = 'https://ubaya.cloud/hybrid/160423020/uas/'; 

  constructor(
    private router: Router,
    private http: HttpClient // Inject HttpClient
  ) {}

  // Helper untuk encode form data
  private encode(body: URLSearchParams) {
    return body.toString();
  }

  // --- FUNGSI LOGIN (MIGRASI KE API) ---
  // Return type berubah dari boolean menjadi Observable
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
      // 'tap' digunakan untuk melakukan side-effect (seperti simpan ke localStorage)
      // tanpa mengubah data respon asli yang akan diterima component
      tap((response: any) => {
        if (response.result === 'success') {
          console.log('USER FOUND via API!');
          // Simpan session seperti kode lama kamu
          localStorage.setItem(this.LOGGED_IN_KEY, 'true');
          localStorage.setItem(this.USERNAME_KEY, response.username); 
          
          // Opsional: Simpan email jika perlu
          // localStorage.setItem('email', response.email);
        }
      })
    );
  }

  // --- FUNGSI LOGOUT (Tetap sama, hanya merapikan) ---
  logout() {
    localStorage.clear(); // Hapus semua session
    console.log('All session data cleared');

    this.router.navigate(['/login']).then(() => {
      // Reload halaman agar state aplikasi benar-benar bersih
      window.location.reload(); 
    });
  }

  // --- CEK STATUS LOGIN (Tetap sama) ---
  isLoggedIn(): boolean {
    return localStorage.getItem(this.LOGGED_IN_KEY) === 'true';
  }

  // --- AMBIL USERNAME (Tambahan helper) ---
  getUserName(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  // --- GUARD MANUAL (Tetap sama) ---
  checkLogin(): boolean {
    if (!this.isLoggedIn()) {
      console.log('User not logged in, redirecting to login...');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}