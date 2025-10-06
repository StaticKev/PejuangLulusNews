import { Component, OnInit } from '@angular/core';
import { AuthService } from '../data/auth';
import { Router } from '@angular/router';
import { getAllBerita } from '../data/berita';
import { Berita } from '../data/berita';

@Component({
    selector: 'app-cari',
    templateUrl: 'cari.page.html',
    styleUrls: ['cari.page.scss'],
    standalone: false,
})
export class CariPage implements OnInit{

    constructor(private router: Router, private authService: AuthService) {
        this.authService.checkLogin();
    }

    doLogout() {
        this.authService.logout();
    }
    semuaBerita: Berita[] = [];
    hasilCari: Berita[] = [];
    keyword: string = '';
    private timeout: any;

    ngOnInit() {
        this.semuaBerita = getAllBerita();
    }

    onSearchChange(event: any) {
        const value = event.detail.value.toLowerCase();

        // Reset debounce
        clearTimeout(this.timeout);

        // Jalankan pencarian setelah 500 ms user berhenti mengetik
        this.timeout = setTimeout(() => {
            if (value.trim() === '') {
                this.hasilCari = [];
                return;
            }

            this.hasilCari = this.semuaBerita.filter((berita) =>
                berita.judul.toLowerCase().includes(value)
            );
        }, 500);
    }

}
