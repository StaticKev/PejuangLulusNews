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
  username: string | null = null;
  uid : number = 0;
  

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

    this.username = localStorage.getItem('loggedInUsername');
    this.uid = Number(localStorage.getItem('uid') || '0');
      if (!this.uid) return;

    this.beritaService.getFavoritByUser(this.uid)
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

  async doLogout() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Konfirmasi';
    alert.message = 'Apakah Anda yakin ingin keluar?';
    alert.buttons = [
      { text: 'Batal', role: 'cancel' },
      {
        text: 'Ya, Keluar',
        role: 'confirm',
        handler: () => this.authService.logout(),
      },
    ];

    document.body.appendChild(alert);
    await alert.present();
  }

  getNamaKategori(berita: BeritaDetail): string {
    return berita.namaKategori?.[0] ?? 'Umum';
  }

  bacaBerita(id: number) {
    this.router.navigate(['/detailBerita', id, 'favoritku']);
  }
}
