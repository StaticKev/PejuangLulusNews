import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../data/auth';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
})
export class LoginPage {
  inputUsername = '';
  inputPassword = '';
  loginError = false;

  constructor(private authService: AuthService, private router: Router) {}

  ionViewWillEnter() {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }

  doLogin() {
    const loginSuccess = this.authService.login(
      this.inputUsername,
      this.inputPassword
    );

    if (loginSuccess) {
      this.loginError = false;
      this.router.navigate(['/home']);
    } else {
      this.loginError = true;
    }
  }
}
