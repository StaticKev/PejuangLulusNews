import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeritaDetail } from '../data/berita';
import { BeritaService } from '../berita.service';
import { Kategori, getAllKategori } from '../data/kategori';
import { User, getAllUsers, updateUser } from '../data/user';
import { Rating, getAllRating, updateRatingArray } from '../data/rating';
import { AlertController, ToastController } from '@ionic/angular';
import { take } from 'rxjs/operators';

interface Komentar {
  id?: number;
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

  tempKomentar: string = '';
  username: string | null = null;
  uid: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController,
    private beritaService: BeritaService
  ) { }




  ngOnInit() {
    this.username = localStorage.getItem('loggedInUsername');
    this.uid = Number(localStorage.getItem('uid') || '0');


    this.route.paramMap.subscribe(params => {
      this.idBerita = Number(params.get('id'));
      this.backTo = params.get('backTo') || '';

      if (!this.idBerita) {
        console.error('ID berita tidak valid');
        return;
      }

      // console.log(this.idBerita, uid);
      this.beritaService
        .getBeritaDetail(this.idBerita, this.uid)
        .subscribe((res: any) => {

          if (res.result === 'success') {
            const data = res.data;

            this.currentBerita = {
              ...data,
              timestamp: new Date(data.timestamp),
              fotoUtama: data.foto_utama,
              gambar_konten: data.gambar || [],

              komentar: (data.komentar || []).map((k: any) => ({
  id: k.id,
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

  replies: (k.reply || []).map((r: any) => ({
    user: {
      username: r.username,
      id: 0,
      nama: r.username,
      email: '',
      password: '',
      favorit: []
    } as User,
    komentar: r.komentar,
    timestamp: new Date(r.timestamp),
    replies: []
  })),

  showReplyBox: false,
  tempReply: ''
})),
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

  private buildKomentarTree(flat: any[]): Komentar[] {
  const map = new Map<number, Komentar>();
  const roots: Komentar[] = [];

  flat.forEach(k => {
    map.set(k.id, {
      id: k.id,
      user: {
        username: k.username,
        id: k.user_id,
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
    });
  });

  flat.forEach(k => {
    if (k.reply_to) {
      map.get(k.reply_to)?.replies?.push(map.get(k.id)!);
    } else {
      roots.push(map.get(k.id)!);
    }
  });

  return roots;
}

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

  loadUserRating() {
    if (!this.username || !this.currentBerita) {
      this.userRating = 0;
      return;
    }

    const existingRating = getAllRating().find(
      (r) =>
        r.berita.id === this.currentBerita!.id &&
        r.user.id === this.uid
    );

    this.userRating = existingRating ? existingRating.nilai : 0;
  }

  rateNews(star: number) {
    if (!this.username) {
      alert('Anda harus login untuk memberikan rating!');
      return;
    }

    if (!this.currentBerita) {
      alert('Berita tidak ditemukan');
      return;
    }

    const uid = this.uid;
    const bid = this.currentBerita.id;
    const rating = star;

    this.userRating = rating;

    this.beritaService.deleteRating(uid, bid).subscribe({
      next: () => {
        this.beritaService.addRating(uid, bid, rating).subscribe({
          next: (res: any) => {
            if (res.result !== 'success') {
              this.presentToast(res.message, 'danger');
            } else {
              this.presentToast('Rating berhasil diperbarui!', 'success');
            }
          },
          error: () => {
            this.presentToast('Gagal menambahkan rating', 'danger');
          }
        });
      },
      error: () => {
        this.beritaService.addRating(uid, bid, rating).subscribe({
          next: (res: any) => {
            if (res.result !== 'success') {
              this.presentToast(res.message, 'danger');
            } else {
              this.presentToast('Rating berhasil ditambahkan!', 'success');
            }
          },
          error: () => {
            this.presentToast('Gagal menambahkan rating', 'danger');
          }
        });
      }
    });
  }



  updateFavorite() {
    if (!this.username || !this.currentBerita) {
      alert('Anda harus login untuk mengubah favorit');
      return;
    }

    const uid = this.uid;
    const bid = this.currentBerita.id;

    this.beritaService
      .changeFavorite(uid, bid, this.isFavorite)
      .subscribe({
        next: (res: any) => {
          if (res.result === 'success') {
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
  tambahKomentar() {
    if (!this.username) {
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

    const uid = this.uid;
    const bid = this.currentBerita.id;
    const komentar = this.tempKomentar.trim();

    this.beritaService.addKomentar(uid, bid, komentar)
      .subscribe({
        next: (res) => {
          if (res.result === 'success') {

            this.currentBerita!.komentar.unshift({
              user: {
                username: this.username,
                id: this.uid,
                nama: "",
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

  toggleReplyBox(komentar: Komentar) {
    komentar.showReplyBox = !komentar.showReplyBox;
  }

  tambahBalasan(komentar: Komentar) {
  if (!this.username) {
    alert('Anda harus login untuk membalas!');
    return;
  }

  const replyText = komentar.tempReply?.trim();
  if (!replyText || !this.currentBerita || !komentar.id) return;

  const uid = this.uid;
  const bid = this.currentBerita.id;
  const kid = komentar.id;

  this.beritaService.addReply(uid, bid, kid, replyText).subscribe({
    next: (res: any) => {
      if (res.result === 'success') {
        komentar.replies = komentar.replies || [];
        komentar.replies.push({
          user: {
            username: this.username!,
            id: uid,
            nama: '',
            email: '',
            password: '',
            favorit: []
          } as User,
          komentar: replyText,
          timestamp: new Date(),
          replies: []
        });

        komentar.tempReply = '';
        komentar.showReplyBox = false;
      } else {
        alert(res.message);
      }
    },
    error: () => {
      alert('Gagal mengirim balasan');
    }
  });
}


}
