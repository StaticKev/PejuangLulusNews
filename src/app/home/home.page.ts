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
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomePage implements OnInit {
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

  lihatKategori(namaKategori: string | null) {
    if (namaKategori === null) {
      this.router.navigate(['/home']);
      return;
    }
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
