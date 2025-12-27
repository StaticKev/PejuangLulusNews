import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BeritaDetail } from '../data/berita';
import { Kategori, getAllKategori } from '../data/kategori';
import { BeritaService } from '../berita.service';
import { AuthService } from '../auth.service';
import { getAllUsers, User } from '../data/user';

@Component({
  selector: 'app-favoritku',
  templateUrl: 'favoritku.page.html',
  styleUrls: ['favoritku.page.scss'],
  standalone: false,
})
export class FavoritkuPage implements OnInit {

  beritaFavorit: BeritaDetail[] = [];
  semuaKategori: Kategori[] = [];
  loggedInUserId: number | null = null;
  loggedInUser: User | null = null;
  

  constructor(
    private router: Router,
    private beritaService: BeritaService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.semuaKategori = getAllKategori();
  }

  ionViewWillEnter() {
    this.loadFavorit();
  }

  loadFavorit() {
    this.beritaFavorit = [];

    const username = localStorage.getItem('loggedInUsername');
    this.loggedInUser = getAllUsers().find(u => u.username === username) || null;
    
    const uid = this.loggedInUser ? this.loggedInUser.id : 0;
    if (!uid) return;

    this.loggedInUserId = Number(uid);
    this.beritaService.getFavoritByUser(this.loggedInUserId)
      .subscribe(res => {
        if (res.result === 'success') {
          this.beritaFavorit = res.data.map((b: any) => ({
            id: b.id,
            judul: b.judul,
            foto_utama: b.foto_utama,
            rating: b.rating ? parseFloat(b.rating) : null,
            namaKategori: b.kategori.map((k: any) => k.nama)
          }));
        } else {
          this.beritaFavorit = [];
        }
      });
  }

  doLogout() {
    this.authService.logout();
  }

  getNamaKategori(berita: BeritaDetail): string {
    return berita.namaKategori?.[0] ?? 'Umum';
  }

  bacaBerita(id: number) {
    this.router.navigate(['/detailBerita', id, 'favoritku']);
  }
}
