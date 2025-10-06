import { AuthService } from '../data/auth';
import { Router, ActivatedRoute } from '@angular/router';

import { Component } from '@angular/core';

import { Berita, BeritaDetail, getBeritaWithKategori } from '../data/berita';
import { Kategori, getAllKategori } from '../data/kategori'

import { User, getAllUsers } from '../data/user';

@Component({
  selector: 'app-favoritku',
  templateUrl: 'favoritku.page.html',
  styleUrls: ['favoritku.page.scss'],
  standalone: false,
})
export class FavoritkuPage {

    public beritaFavorit: Berita[] = []
    public semuaKategori: Kategori[] = []
    public kategoriAktif: number | null = null
    
    public index: number = 0;
    backTo: string = ""

    loggedInUser: User | null = null;
    
    constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
        this.authService.checkLogin();
    }

    doLogout() {
        this.authService.logout();
    }

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.index = params['index']
                this.backTo = params['backTo']
            }
        )

        this.semuaKategori = getAllKategori()

        for (const u of getAllUsers()) {
            if (u.username == localStorage.getItem("loggedInUsername")) {
                this.loggedInUser = u
                break
            }
        }

        if (this.loggedInUser != null) {
            this.beritaFavorit = this.loggedInUser?.favorit
        }
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
    bacaBerita(idBerita: number) {
        this.router.navigate(['/baca-berita', idBerita]);
    }

}
