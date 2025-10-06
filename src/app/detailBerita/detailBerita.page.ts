import { Component } from '@angular/core';
import { BeritaDetail, getBeritaWithKategori } from '../data/berita';
import { Kategori, getAllKategori } from '../data/kategori';
import { ActivatedRoute, Router } from '@angular/router';
import { User, getAllUsers, updateUser } from '../data/user';
import { Rating, getAllRating, updateRatingArray } from '../data/rating';

@Component({
  selector: 'app-detailBerita',
  templateUrl: 'detailBerita.page.html',
  styleUrls: ['detailBerita.page.scss'],
  standalone: false,
})
export class DetailBerita {
  isFavorite: boolean = false;
  userRating: number = 0;

  public semuaBerita: BeritaDetail[] = [];
  public beritaTerbaru: BeritaDetail[] = [];
  public semuaKategori: Kategori[] = [];
  public kategoriAktif: number | null = null;

  idBerita: number = 0;
  backTo: string = '';
  currentBerita: BeritaDetail | undefined;

  loggedInUser: User | null = null;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.semuaBerita = getBeritaWithKategori().sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
    );
    this.beritaTerbaru = [...this.semuaBerita];
    this.semuaKategori = getAllKategori();

    this.route.params.subscribe((params) => {
      this.idBerita = +params['id'];
      this.backTo = params['backTo'];

      this.loggedInUser = null;
      for (const u of getAllUsers()) {
        if (u.username == localStorage.getItem('loggedInUsername')) {
          this.loggedInUser = u;
          break;
        }
      }

      this.currentBerita = this.semuaBerita.find((b) => b.id === this.idBerita);

      if (
        this.loggedInUser &&
        this.loggedInUser.favorit &&
        this.currentBerita
      ) {
        this.isFavorite = this.loggedInUser.favorit.some(
          (f) => f.id === this.currentBerita!.id
        );
      } else {
        this.isFavorite = false;
      }

      this.loadUserRating();
    });
  }

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
      console.error('User harus login untuk memberikan rating!');
      return;
    }

    const finalRating = this.userRating === nilai ? 0 : nilai;
    this.userRating = finalRating;

    const ratings = getAllRating();
    const userRatingIndex = ratings.findIndex(
      (r) =>
        r.berita.id === this.currentBerita!.id &&
        r.user.id === this.loggedInUser!.id
    );

    if (finalRating === 0) {
      if (userRatingIndex > -1) {
        ratings.splice(userRatingIndex, 1);
      }
    } else {
      const newRating: Rating = {
        id: userRatingIndex > -1 ? ratings[userRatingIndex].id : Date.now(),
        berita: this.currentBerita,
        user: this.loggedInUser,
        nilai: finalRating,
      };

      if (userRatingIndex > -1) {
        ratings[userRatingIndex] = newRating;
      } else {
        ratings.push(newRating);
      }
    }

    updateRatingArray(ratings);
  }

  updateFavorite() {
    this.isFavorite = !this.isFavorite;

    if (!this.currentBerita || !this.loggedInUser) return;

    if (this.isFavorite) {
      this.loggedInUser.favorit.push(this.currentBerita);
    } else {
      const idx = this.loggedInUser.favorit.findIndex(
        (f) => f.id === this.currentBerita!.id
      );

      if (idx > -1) {
        this.loggedInUser.favorit.splice(idx, 1);
      }
    }

    if (this.loggedInUser) {
      updateUser(this.loggedInUser);
    }
  }
}
