import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAllKategori, Kategori } from '../data/kategori';
import { CommonModule } from '@angular/common'; // Tambahkan CommonModule jika hilang
import { FormsModule } from '@angular/forms'; // Tambahkan FormsModule jika hilang
import { IonicModule } from '@ionic/angular'; // Tambahkan IonicModule jika hilang

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
   * Mengarahkan pengguna ke halaman daftar berita.
   * Jika kategori ID adalah 4 (Politik), navigasi ke halaman khusus '/kategoripolitik'.
   * Jika tidak, navigasi ke halaman umum '/daftar-berita' dengan parameter ID.
   * @param kategoriId ID dari kategori yang diklik
   */
  goToBeritaByKategori(kategoriId: number) {
    // ID 4 diasumsikan untuk kategori 'Politik'
    if (kategoriId === 4) { 
      // Navigasi ke rute khusus untuk Politik
      this.router.navigate(['/kategoripolitik']);
    } else {
      // Navigasi ke rute umum dengan ID sebagai parameter
      this.router.navigate(['/daftar-berita', kategoriId]);
    }
  }
}
