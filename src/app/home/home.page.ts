import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { BeritaDetail, getBeritaWithKategori } from '../data/berita';
import { Kategori, getAllKategori } from '../data/kategori';
import { AuthService } from '../data/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class HomePage implements OnInit {
  public beritaTerbaru: BeritaDetail[] = [];
  public semuaKategori: Kategori[] = [];
  public namaUser: string = 'Pejuang Lulus';

  constructor(private router: Router, private authService: AuthService) {
    this.authService.checkLogin();
  }

  ngOnInit() {
    this.beritaTerbaru = getBeritaWithKategori().sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
    this.semuaKategori = getAllKategori();
  }

  bacaBerita(idBerita: number) {
    this.router.navigate(['/baca-berita', idBerita]);
  }

  lihatKategori(idKategori: number) {
    this.router.navigate(['/daftar-berita', idKategori]);
  }

  doLogout() {
    this.authService.logout();
  }
}
