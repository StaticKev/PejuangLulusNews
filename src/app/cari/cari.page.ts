import { Component, OnInit } from '@angular/core';
import { AuthService } from '../data/auth';
import { Router } from '@angular/router';
import { BeritaDetail, getBeritaWithKategori } from '../data/berita';
import { Kategori, getAllKategori } from '../data/kategori';
import { Rating, getAllRating } from '../data/rating';

@Component({
  selector: 'app-cari',
  templateUrl: 'cari.page.html',
  styleUrls: ['cari.page.scss'],
  standalone: false,
})
export class CariPage implements OnInit {
  constructor(private authService: AuthService) {}

  doLogout() {
    this.authService.logout();
  }

  semuaBerita: BeritaDetail[] = [];
  hasilCari: BeritaDetail[] = [];

  semuaKategori: Kategori[] = [];
  kategoriAktif: number | null = null;

  private timeout: any;

  ngOnInit() {
    this.semuaBerita = getBeritaWithKategori();
    this.semuaKategori = getAllKategori();
  }

  onSearchChange(event: any) {
    const value = event.detail.value.toLowerCase();

    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      if (value.trim() === '') {
        this.hasilCari = [];
        return;
      }

      this.hasilCari = this.semuaBerita.filter(
        (berita) =>
          berita.judul.toLowerCase().includes(value) ||
          berita.isi.toLowerCase().includes(value)
      ) as BeritaDetail[];
    }, 500);
  }

  getNamaKategori(berita: BeritaDetail): string {
    if (berita.namaKategori && berita.namaKategori.length > 0) {
      return berita.namaKategori[0];
    }
    return 'Umum';
  }

  getAverageRating(beritaId: number): number {
    const ratings = getAllRating().filter((r) => r.berita.id === beritaId);

    if (ratings.length === 0) {
      return 0;
    }

    const totalNilai = ratings.reduce((sum, r) => sum + r.nilai, 0);
    return parseFloat((totalNilai / ratings.length).toFixed(1));
  }
}
