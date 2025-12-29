import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavController } from '@ionic/angular';

import { AuthService } from '../auth.service';
import { BeritaService } from '../berita.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomePage implements OnInit {

  // ===== DUMMY (dikomen) =====
  // public semuaBerita: BeritaDetail[] = [];
  // public beritaTerbaruDenganRating: (BeritaDetail & { avgRating: number })[] = [];
  // public semuaKategori: Kategori[] = [];
  // public kategoriAktif: number | null = null;

  // ===== API VERSION =====
  semuaBerita: any[] = [];
  beritaTerbaru: any[] = [];
  semuaKategori: any[] = [];
  kategoriAktif: string | null = null;

  public namaUser: string = '';

  constructor(
    private navCtrl: NavController,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private beritaService: BeritaService
  ) { }

  ionViewWillEnter() {
    this.loadUserName();
  }

  ngOnInit() {

    // ===== API VERSION =====
    this.loadKategori();

    this.route.queryParams.subscribe(params => {
      const kategori = params['kategori'];

      if (kategori) {
        this.kategoriAktif = kategori;
        this.loadBeritaByKategori(kategori);
      } else {
        this.kategoriAktif = null;
        this.loadSemuaBerita();
      }
    });
  }

  /* =====================
     API FUNCTIONS
     ===================== */

  loadSemuaBerita() {
    this.beritaService.getAllBerita().subscribe((res: any) => {
      this.beritaTerbaru = res.result === 'success' ? res.data : [];
    });
  }

  loadBeritaByKategori(namaKategori: string) {
    this.beritaService.getBeritaByKategori(namaKategori).subscribe((res: any) => {
      this.beritaTerbaru = res.result === 'success' ? res.data : [];
    });
  }

  loadKategori() {
    this.beritaService.getKategori().subscribe((res: any) => {
      this.semuaKategori = res.data || [];
    });
  }

  /* =====================
     DUMMY FUNCTIONS (dikomen)
     ===================== */

  /*
  private processBeritaWithRating(beritaArray: BeritaDetail[]) {
    this.beritaTerbaruDenganRating = beritaArray.map((berita) => {
      const avgRating = this.getAverageRating(berita.id);
      return { ...berita, avgRating };
    });
  }

  getAverageRating(beritaId: number): number {
    const ratings = getAllRating().filter((r) => r.berita.id === beritaId);
    if (ratings.length === 0) return 0;
    const total = ratings.reduce((sum, r) => sum + r.nilai, 0);
    return parseFloat((total / ratings.length).toFixed(1));
  }
  */

  /* =====================
     UI ACTION
     ===================== */

  // ===== DUMMY (dikomen) =====
  /*
  lihatKategori(idKategori: number) {
    if (this.kategoriAktif === idKategori) {
      this.router.navigate(['/home']);
    } else {
      const kategori = this.semuaKategori.find(k => k.id === idKategori);
      if (kategori) {
        this.router.navigate(['/home'], {
          queryParams: { kategori: kategori.nama.toLowerCase() }
        });
      }
    }
  }
  */

  // ===== API VERSION =====
  lihatKategori(namaKategori: string | null) {

    // klik "Semua"
    if (namaKategori === null) {
      this.router.navigate(['/home']);
      return;
    }

    // klik kategori yang sama → reset
    if (this.kategoriAktif === namaKategori) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/home'], {
        queryParams: { kategori: namaKategori }
      });
    }
  }

  keKategori() {
    this.navCtrl.navigateRoot('/kategori');
  }
  getNamaKategori(berita: any): string {
    return berita.kategori?.[0]?.nama || '';
  }

  getRating(berita: any): number {
    return berita.rating ? parseFloat(berita.rating) : 0;
  }

  loadUserName() {
    const username = localStorage.getItem('loggedInUsername');
    if (username) {
      this.namaUser = username;
    }
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
}
