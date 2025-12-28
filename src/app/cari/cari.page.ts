import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { BeritaDetail } from '../data/berita';
import { BeritaService } from '../berita.service';

@Component({
  selector: 'app-cari',
  templateUrl: 'cari.page.html',
  styleUrls: ['cari.page.scss'],
  standalone: false,
})
export class CariPage implements OnInit {
  constructor(private authService: AuthService
    , private beritaService: BeritaService
  ) {}

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

  hasilCari: BeritaDetail[] = [];
  kategoriAktif: number | null = null;

  private timeout: any;

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.hasilCari = [];
  }

  onSearchChange(event: any) {
  const keyword = event.detail.value;
  console.log('keyword:', keyword);


  clearTimeout(this.timeout);

  if (!keyword || keyword.trim() === '') {
    this.hasilCari = [];
    return;
  }

  this.timeout = setTimeout(() => {
    this.beritaService.getBeritaByKeyword(keyword).subscribe(res => {
      if (res.result === 'success') {
        this.hasilCari = res.data.map((b: any) => ({
          id: b.id,
          judul: b.judul,
          foto_utama: b.foto_utama,
          isi: b.isi,
          rating: b.rating,
          namaKategori: b.kategori.map((k: any) => k.nama),
          kalimat: ''  
        }));
      } else {
        this.hasilCari = [];
      }
    });
  }, 500);
}


  getNamaKategori(berita: BeritaDetail): string {
    if (berita.namaKategori && berita.namaKategori.length > 0) {
      return berita.namaKategori[0];
    }
    return 'Umum';
  }

 
}
