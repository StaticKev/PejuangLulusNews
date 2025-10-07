import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAllKategori, Kategori } from '../data/kategori';

@Component({
  standalone: false,
  selector: 'app-kategori',
  templateUrl: './kategori.page.html',
  styleUrls: ['./kategori.page.scss'],
})
export class KategoriPage implements OnInit {
  kategoriList: Kategori[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.kategoriList = getAllKategori();
  }

  /**
   * @param kategoriId
   */
  goToBeritaByKategori(idKategori: number) {
    const kategori = this.kategoriList.find((k) => k.id === idKategori);

    if (kategori) {
      this.router.navigate(['/home'], {
        queryParams: { kategori: kategori.nama.toLowerCase() },
      });
    } else {
      console.error(`Kategori dengan ID ${idKategori} tidak ditemukan.`);
    }
  }
}
