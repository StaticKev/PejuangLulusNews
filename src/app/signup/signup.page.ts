import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { NavController } from '@ionic/angular';

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
  ) { }

  register() {
    this.errorMessage = '';

    // Validasi
    if (!this.nama || /\d/.test(this.nama)) {
      this.errorMessage = 'Nama wajib diisi dan tidak boleh angka';
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

    // 🔥 PANGGIL SERVICE
    this.auth.register(this.nama, this.email, this.password)
      .subscribe(res => {
        console.log('RESPONSE REGISTER:', res);
        if (res.result === 'success') {
          alert('Register berhasil');
         window.location.href = '/login';
        } else {
          this.errorMessage = res.message;
        }
      });
  }
}
