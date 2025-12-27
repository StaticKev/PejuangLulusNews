import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeritaDetail} from '../data/berita';
import {BeritaService} from '../berita.service';
import { Kategori, getAllKategori } from '../data/kategori';
import { User, getAllUsers, updateUser } from '../data/user';
import { Rating, getAllRating, updateRatingArray } from '../data/rating';
import { AlertController, ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';

interface Komentar {
  user: User;
  komentar: string;
  timestamp: Date;
  replies?: Komentar[];
  showReplyBox?: boolean;
  tempReply?: string;
}



@Component({
  selector: 'app-detailBerita',
  templateUrl: 'detailBerita.page.html',
  styleUrls: ['detailBerita.page.scss'],
  standalone: false,
})
export class DetailBerita {
  isFavorite: boolean = false;
  userRating: number = 0;

  semuaBerita: BeritaDetail[] = [];
  semuaKategori: Kategori[] = [];

  idBerita: number = 0;
  backTo: string = '';
  currentBerita?: BeritaDetail;

  loggedInUser: User | null = null;
  tempKomentar: string = '';

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private beritaService: BeritaService
  ) {}



    
  ngOnInit() {
    const username = localStorage.getItem('loggedInUsername');
    this.loggedInUser = getAllUsers().find(u => u.username === username) || null;

    const uid = this.loggedInUser ? this.loggedInUser.id : 0;

    this.route.paramMap.subscribe(params => {
      this.idBerita = Number(params.get('id'));
      this.backTo = params.get('backTo') || '';

      if (!this.idBerita) {
        console.error('ID berita tidak valid');
        return;
      }

      // console.log(this.idBerita, uid);
      this.beritaService
        .getBeritaDetail(this.idBerita, uid)
        .subscribe((res: any) => {
          
          if (res.result === 'success') {
            const data = res.data;

            this.currentBerita = {
              ...data,
              timestamp: new Date(data.timestamp),
              fotoUtama: data.foto_utama, 
              gambar_konten: data.gambar || [], 

              komentar: (data.komentar || []).map((k: any) => ({
                user: { 
                  username: k.username, 
                  id: 0, 
                  nama: k.username, 
                  email: '',
                  password: '',
                  favorit: []
                } as User,
                komentar: k.komentar,
                timestamp: new Date(k.timestamp),
                replies: [],   
                showReplyBox: false,
                tempReply: ''
              })),

              // Mapping Kategori
              kategori: (data.kategori || []).map((cat: any) => ({
                 nama: cat.nama,
                 icon: cat.icon
              }))
            };
            console.log(this.currentBerita);


            this.isFavorite = Number(data.favorit) > 0;
            this.userRating = data.rating ? Number(data.rating) : 0;

          } else {
            console.log('Data berita kosong atau tidak ditemukan');
            this.presentToast('Berita tidak ditemukan', 'warning');
          }
        }, err => {
          console.error('Gagal mengambil detail berita', err);
          this.presentToast('Gagal koneksi ke server', 'danger');
        });
    });
  }





  
  // Delete berita
  async presentToast(message: string, color: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color,
    });
    await toast.present();
  }
  async confirmDelete() {
    const alert = await this.alertController.create({
      header: 'Konfirmasi Hapus',
      message: `Apakah Anda yakin ingin menghapus berita: <b>${this.currentBerita?.judul}</b>?`,
      buttons: [
        {
          text: 'Batal',
          role: 'cancel',
        },
        {
          text: 'Hapus',
          cssClass: 'ion-color-danger',
          handler: () => {
            this.handleDelete();
          }
        }
      ]
    });

    await alert.present();
  }

  handleDelete() {
    if (!this.currentBerita) return;

    this.beritaService
      .deleteBerita(this.currentBerita.id)
      .subscribe((res: any) => {
        if (res.result === 'success') {
          this.presentToast(res.message, 'success');
          this.router.navigateByUrl('/home', { replaceUrl: true });
        } else {
          this.presentToast(res.message, 'danger');
        }
      }, err => {
        this.presentToast('Gagal terhubung ke server', 'danger');
      });
  }

  // === Rating ===
  loadUserRating() {
    if (!this.loggedInUser || !this.currentBerita) {
      this.userRating = 0;
      return;
    }

    const existingRating = getAllRating().find(
      (r) =>
        r.berita.id === this.currentBerita!.id &&
        r.user.id === this.loggedInUser!.id
    );

    this.userRating = existingRating ? existingRating.nilai : 0;
  }

  rateNews(star: number) {
  if (!this.loggedInUser) {
    alert('Anda harus login untuk memberikan rating!');
    return;
  }

  if (!this.currentBerita) {
    alert('Berita tidak ditemukan');
    return;
  }

  const uid = this.loggedInUser.id;
  const bid = this.currentBerita.id;
  const rating = star;
console.log(`Memberikan rating ${rating} untuk berita ID ${bid} oleh user ID ${uid}`);
  this.beritaService.addRating(uid, bid, rating)
    .subscribe({
      next: (res: any) => {
        if (res.result === 'success') {
          window.location.reload();
        } else {
          alert(res.message);
        }
      },
      error: () => {
        alert('Gagal mengirim rating');
      }
    });
}


 updateFavorite() {
  if (!this.loggedInUser || !this.currentBerita) {
    alert('Anda harus login untuk mengubah favorit');
    return;
  }

  const uid = this.loggedInUser.id;
  const bid = this.currentBerita.id;

  this.beritaService
    .changeFavorite(uid, bid, this.isFavorite)
    .subscribe({
      next: (res: any) => {
        if (res.result === 'success') {
          // toggle UI
          this.isFavorite = !this.isFavorite;
        } else {
          alert(res.message);
        }
      },
      error: () => {
        alert('Gagal mengubah favorit');
      }
    });
}


  // === Komentar ===

  tambahKomentar() {
  if (!this.loggedInUser) {
    alert('Silakan login terlebih dahulu');
    return;
  }

  if (!this.tempKomentar || this.tempKomentar.trim() === '') {
    alert('Komentar tidak boleh kosong');
    return;
  }

  if (!this.currentBerita) {
    alert('Berita tidak ditemukan');
    return;
  }

  const uid = this.loggedInUser.id;
  const bid = this.currentBerita.id;
  const komentar = this.tempKomentar.trim();

  this.beritaService.addKomentar(uid, bid, komentar)
    .subscribe({
      next: (res) => {
        if (res.result === 'success') {

          this.currentBerita!.komentar.unshift({
            user: {
              username: this.loggedInUser!.username,
              id: this.loggedInUser!.id,
              nama: this.loggedInUser!.username,
              email: '',
              password: '',
              favorit: []
            } as User,
            komentar: komentar,
            timestamp: new Date(),
            replies: [],
            showReplyBox: false,
            tempReply: ''
          });

          this.tempKomentar = '';
        } else {
          alert(res.message);
        }
      },
      error: () => {
        alert('Terjadi kesalahan saat mengirim komentar');
      }
    });
}



  // === Balasan Komentar ===
  toggleReplyBox(komentar: Komentar) {
    komentar.showReplyBox = !komentar.showReplyBox;
  }

  tambahBalasan(komentar: Komentar) {
    if (!this.loggedInUser) {
      alert('Anda harus login untuk membalas!');
      return;
    }

    const replyText = komentar.tempReply?.trim();
    if (!replyText) return;

    const newReply: Komentar = {
      user: this.loggedInUser,
      komentar: replyText,
      timestamp: new Date(),
      replies: [],
    };

    if (!komentar.replies) {
    komentar.replies = [];
  }

    komentar.replies.push(newReply);

    komentar.tempReply = '';
    komentar.showReplyBox = false;
  }
}
