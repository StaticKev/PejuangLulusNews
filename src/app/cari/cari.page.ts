import { Component } from '@angular/core';
import { AuthService } from '../data/auth';
import { Router } from '@angular/router';

@Component({
    selector: 'app-cari',
    templateUrl: 'cari.page.html',
    styleUrls: ['cari.page.scss'],
    standalone: false,
})
export class CariPage {

    constructor(private router: Router, private authService: AuthService) {
        this.authService.checkLogin();
    }

    doLogout() {
        this.authService.logout();
    }

}
