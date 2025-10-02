import { Component } from '@angular/core';
import { AuthService } from '../data/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favoritku',
  templateUrl: 'favoritku.page.html',
  styleUrls: ['favoritku.page.scss'],
  standalone: false,
})
export class FavoritkuPage {

    constructor(private router: Router, private authService: AuthService) {
        this.authService.checkLogin();
    }

    doLogout() {
        this.authService.logout();
    }

}
