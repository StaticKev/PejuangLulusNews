import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { BeritaDetail, getBeritaWithKategori } from '../data/berita';
import { getAllUsers, User } from '../data/user';
import { Kategori, getAllKategori } from '../data/kategori';
import { AuthService } from '../data/auth';
import { RouterModule } from '@angular/router';
import { getAllRating } from '../data/rating';
import { Beritaservice } from '../beritaservice';
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
  public beritaTerbaruDenganRating: (BeritaDetail & { avgRating: number })[] =
    [];
  public semuaKategori: Kategori[] = [];
  public kategoriAktif: number | null = null;
  public namaUser: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private beritaService : Beritaservice
  ) {}

  ionViewWillEnter() {
    this.loadUserName();
    this.refreshBerita();
  }

  ngOnInit() {
    this.semuaKategori = getAllKategori();
    this.semuaBerita = getBeritaWithKategori().sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );

    this.processBeritaWithRating(this.semuaBerita);

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

  private refreshBerita() {
    // reload latest berita from data source
    this.semuaKategori = getAllKategori();
    this.semuaBerita = getBeritaWithKategori().sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );

    // Reapply current filter if any
    if (this.kategoriAktif) {
      this.applyFilter(this.kategoriAktif);
    } else {
      this.processBeritaWithRating(this.semuaBerita);
    }
  }

  private processBeritaWithRating(beritaArray: BeritaDetail[]) {
    this.beritaTerbaruDenganRating = beritaArray.map((berita) => {
      const avgRating = this.getAverageRating(berita.id);

      return {
        ...berita,
        avgRating: avgRating,
      } as BeritaDetail & { avgRating: number };
    });
  }

  getAverageRating(beritaId: number): number {
    const ratings = getAllRating().filter((r) => r.berita.id === beritaId);

    if (ratings.length === 0) {
      return 0;
    }

    const totalNilai = ratings.reduce((sum, r) => sum + r.nilai, 0);
    return parseFloat((totalNilai / ratings.length).toFixed(1));
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
    let filteredBerita: BeritaDetail[];

    if (idKategori === null) {
      filteredBerita = [...this.semuaBerita];
    } else {
      filteredBerita = this.semuaBerita.filter((berita) =>
        berita.idKategori.includes(idKategori)
      );
    }

    this.processBeritaWithRating(filteredBerita);
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

  loadUserName() {
    const username = localStorage.getItem('loggedInUsername');
    if (username) {
      const user = getAllUsers().find((u) => u.username === username);
      this.namaUser = username;
    }
  }

  async doLogout() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Konfirmasi';
    alert.message = 'Apakah Anda yakin ingin keluar?';
    alert.buttons = [
      {
        text: 'Batal',
        role: 'cancel',
      },
      {
        text: 'Ya, Keluar',
        role: 'confirm',
        handler: () => {
          this.authService.logout();
        },
      },
    ];

    document.body.appendChild(alert);
    await alert.present();
  }
}
