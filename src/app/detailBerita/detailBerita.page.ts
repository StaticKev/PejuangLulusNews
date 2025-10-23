import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BeritaDetail, getBeritaWithKategori } from '../data/berita';
import { Kategori, getAllKategori } from '../data/kategori';
import { User, getAllUsers, updateUser } from '../data/user';
import { Rating, getAllRating, updateRatingArray } from '../data/rating';


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

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.semuaBerita = getBeritaWithKategori().sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
    this.semuaKategori = getAllKategori();

    this.route.params.subscribe((params) => {
      this.idBerita = +params['id'];
      this.backTo = params['backTo'];

      // Cari user login
      const username = localStorage.getItem('loggedInUsername');
      this.loggedInUser = getAllUsers().find((u) => u.username === username) || null;

      // Cari berita
      this.currentBerita = this.semuaBerita.find((b) => b.id === this.idBerita);

      // Siapkan struktur komentar agar aman
      if (this.currentBerita) {
        this.currentBerita.komentar = this.currentBerita.komentar.map((k: any) => ({
          ...k,
          replies: k.replies || [],
          showReplyBox: false,
          tempReply: '',
        }));
      }

      this.isFavorite = !!(
        this.loggedInUser &&
        this.loggedInUser.favorit.some((f) => f.id === this.currentBerita?.id)
      );

      this.loadUserRating();
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

  rateNews(nilai: number) {
    if (!this.loggedInUser || !this.currentBerita) {
      alert('Anda harus login untuk memberikan rating!');
      return;
    }

    const finalRating = this.userRating === nilai ? 0 : nilai;
    this.userRating = finalRating;

    const ratings = getAllRating();
    const idx = ratings.findIndex(
      (r) =>
        r.berita.id === this.currentBerita!.id &&
        r.user.id === this.loggedInUser!.id
    );

    if (finalRating === 0) {
      if (idx > -1) ratings.splice(idx, 1);
    } else {
      const newRating: Rating = {
        id: idx > -1 ? ratings[idx].id : Date.now(),
        berita: this.currentBerita!,
        user: this.loggedInUser!,
        nilai: finalRating,
      };
      if (idx > -1) ratings[idx] = newRating;
      else ratings.push(newRating);
    }

    updateRatingArray(ratings);
  }

  // === Favorit ===
  updateFavorite() {
    if (!this.loggedInUser || !this.currentBerita) {
      alert('Anda harus login untuk menambah favorit!');
      return;
    }

    this.isFavorite = !this.isFavorite;

    if (this.isFavorite) {
      this.loggedInUser.favorit.push(this.currentBerita);
    } else {
      const idx = this.loggedInUser.favorit.findIndex(
        (f) => f.id === this.currentBerita!.id
      );
      if (idx > -1) this.loggedInUser.favorit.splice(idx, 1);
    }

    updateUser(this.loggedInUser);
  }

  // === Komentar ===
  tambahKomentar() {
    if (!this.loggedInUser) {
      alert('Anda harus login untuk berkomentar!');
      return;
    }

    const text = this.tempKomentar.trim();
    if (!text) return;

    const newKomentar: Komentar = {
      user: this.loggedInUser,
      komentar: text,
      timestamp: new Date(),
      replies: [],
    };

    this.currentBerita?.komentar.push(newKomentar);
    this.tempKomentar = '';
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
