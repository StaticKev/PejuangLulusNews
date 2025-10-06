import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
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
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomePage implements OnInit {
  public semuaBerita: BeritaDetail[] = [];
  public beritaTerbaru: BeritaDetail[] = [];
  public semuaKategori: Kategori[] = [];
  public kategoriAktif: number | null = null;
  public namaUser: string = 'Pejuang Lulus';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ionViewWillEnter() {
    this.authService.checkLogin();
  }

  ngOnInit() {
    this.semuaKategori = getAllKategori();
    this.semuaBerita = getBeritaWithKategori().sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );

    this.route.queryParams.subscribe((params) => {
      const namaKategoriDariUrl = params['kategori'];

      if (namaKategoriDariUrl) {
        const kategoriDitemukan = this.semuaKategori.find(
          (k) => k.nama.toLowerCase() === namaKategoriDariUrl.toLowerCase()
        );

        if (kategoriDitemukan) {
          this.applyFilter(kategoriDitemukan.id);
        } else {
          this.applyFilter(null);
        }
      } else {
        this.applyFilter(null);
      }
    });
  }

  lihatKategori(idKategori: number) {
    if (this.kategoriAktif === idKategori) {
      this.router.navigate(['/home']);
    } else {
      const kategori = this.semuaKategori.find((k) => k.id === idKategori);
      if (kategori) {
        this.router.navigate(['/home'], {
          queryParams: { kategori: kategori.nama.toLowerCase() },
        });
      }
    }
  }

  private applyFilter(idKategori: number | null) {
    this.kategoriAktif = idKategori;
    if (idKategori === null) {
      this.beritaTerbaru = [...this.semuaBerita];
    } else {
      this.beritaTerbaru = this.semuaBerita.filter((berita) =>
        berita.idKategori.includes(idKategori)
      );
    }
  }

  bacaBerita(idBerita: number) {
    this.router.navigate(['/baca-berita', idBerita]);
  }

  getNamaKategori(berita: BeritaDetail): string {
    if (this.kategoriAktif) {
      const idx = berita.idKategori.indexOf(this.kategoriAktif);
      if (idx !== -1) {
        return berita.namaKategori[idx];
      }
    }
    return berita.namaKategori[0];
  }

  doLogout() {
    this.authService.logout();
  }
}
