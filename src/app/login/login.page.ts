import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [CommonModule, IonicModule, FormsModule],
})
export class LoginPage {
  inputUsername = '';
  inputPassword = '';
  loginError = false;

  constructor(private authService: AuthService, private router: Router) { }

  ionViewWillEnter() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  doLogin() {
    this.authService.login(this.inputUsername, this.inputPassword).subscribe(
      (response) => {
        if (response.result === 'success') {
          this.router.navigate(['/home']);
        } else {
          alert(response.message);
        }
      },
      (error) => {
        console.error('Network Error:', error);
        alert('Gagal koneksi ke server');
      }
    );
  }
  goToRegister() {
    this.router.navigate(['/signup']);
  }
}
