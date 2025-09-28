import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { BeritaDetail, getBeritaWithKategori } from '../data/berita';
import { Kategori, getAllKategori } from '../data/kategori';
import { AuthService } from '../data/auth';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule, IonicModule],
})
export class HomePage implements OnInit {
  public semuaBerita: BeritaDetail[] = [];   // semua berita
  public beritaTerbaru: BeritaDetail[] = []; // berita yg ditampilkan (filtered)
  public semuaKategori: Kategori[] = [];
  public kategoriAktif: number | null = null;
  public namaUser: string = 'Pejuang Lulus';

  constructor(private router: Router, private authService: AuthService) {
    this.authService.checkLogin();
  }

  ngOnInit() {
    this.semuaBerita = getBeritaWithKategori().sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
    this.beritaTerbaru = [...this.semuaBerita]; // awalnya semua berita
    this.semuaKategori = getAllKategori();
  }

  bacaBerita(idBerita: number) {
    this.router.navigate(['/baca-berita', idBerita]);
  }

  lihatKategori(idKategori: number) {
    if (this.kategoriAktif === idKategori) {
      // klik ulang kategori → reset ke semua berita
      this.kategoriAktif = null;
      this.beritaTerbaru = [...this.semuaBerita];
    } else {
      // filter berita sesuai kategori
      this.kategoriAktif = idKategori;
      this.beritaTerbaru = this.semuaBerita.filter((b) =>
        b.idKategori.includes(idKategori)
      );
    }
  }
  getNamaKategori(berita: BeritaDetail): string {
  if (this.kategoriAktif) {
    // cari index kategori yang cocok
    const idx = berita.idKategori.indexOf(this.kategoriAktif);
    if (idx !== -1) {
      return berita.namaKategori[idx];
    }
  }
  // fallback: pakai kategori pertama
  return berita.namaKategori[0];
}


  doLogout() {
    this.authService.logout();
  }
}
