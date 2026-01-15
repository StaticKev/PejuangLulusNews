import { Component } from '@angular/core';
import { IonicModule, NavController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage {

  nama = '';
  email = '';
  password = '';
  confirmPassword = '';
  errorMessage = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private navCtrl: NavController
  ) {}

  register() {
    this.errorMessage = '';

    if (!this.nama || /\d/.test(this.nama)) {
      this.errorMessage = 'Nama wajib diisi dan tidak boleh mengandung angka';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.email) {
      this.errorMessage = 'Email wajib diisi';
      return;
    }

    if (!emailRegex.test(this.email)) {
      this.errorMessage = 'Format email tidak valid';
      return;
    }

    if (this.password.length < 8) {
      this.errorMessage = 'Password minimal 8 karakter';
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Password dan konfirmasi tidak sama';
      return;
    }

    this.auth.register(this.nama, this.email, this.password)
      .subscribe({
        next: (res: any) => {
          console.log('RESPONSE REGISTER:', res);
          if (res.result === 'success') {
            alert('Register berhasil');
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = res.message || 'Register gagal';
          }
        },
        error: () => {
          this.errorMessage = 'Terjadi kesalahan pada server';
        }
      });
  }
}
