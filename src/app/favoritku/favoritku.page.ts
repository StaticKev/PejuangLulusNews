import { AuthService } from '../data/auth';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { BeritaDetail, getBeritaWithKategori } from '../data/berita';
import { Kategori, getAllKategori } from '../data/kategori';
import { User, getAllUsers } from '../data/user';

@Component({
  selector: 'app-favoritku',
  templateUrl: 'favoritku.page.html',
  styleUrls: ['favoritku.page.scss'],
  standalone: false,
})
export class FavoritkuPage implements OnInit {
  public beritaFavorit: BeritaDetail[] = [];
  public semuaKategori: Kategori[] = [];
  public kategoriAktif: number | null = null;
  public loggedInUser: User | null = null;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.semuaKategori = getAllKategori();
    this.loadFavorit();
  }

  ionViewWillEnter() {
    this.loadFavorit();
  }

  loadFavorit() {
    this.beritaFavorit = [];
    this.loggedInUser = null;

    const loggedInUsername = localStorage.getItem('loggedInUsername');

    for (const u of getAllUsers()) {
      if (u.username === loggedInUsername) {
        this.loggedInUser = u;
        break;
      }
    }

    if (this.loggedInUser != null) {
      const allBeritaWithKategori = getBeritaWithKategori();
      const hasilFavorit: BeritaDetail[] = [];

      for (const favorit of this.loggedInUser.favorit) {
        const berita = allBeritaWithKategori.find((b) => b.id === favorit.id);
        if (berita) {
          hasilFavorit.push(berita);
        }
      }

      this.beritaFavorit = hasilFavorit;
    }
  }

  doLogout() {
    this.authService.logout();
  }

  getNamaKategori(berita: BeritaDetail): string {
    if (berita.namaKategori && berita.namaKategori.length > 0) {
      return berita.namaKategori[0];
    }
    return 'Umum';
  }

  bacaBerita(idBerita: number) {
    this.router.navigate(['/baca-berita', idBerita]);
  }
}
