import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//semua yang ada di sini masih menunggu php dan database 
export class NewsService {

  private baseUrl = 'https://ubaya.cloud/hybrid/160423020/uas';

  constructor(private http: HttpClient) {}

  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  private encode(body: URLSearchParams) {
    return body.toString();
  }

  login(username: string, password: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.http.post(
      this.baseUrl + 'login.php', 
      this.encode(body),
      { headers: this.headers }
    );
  }

  register(
    username: string,
    email: string,
    password: string
  ): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('email', email);
    body.set('password', password);

    return this.http.post(
      this.baseUrl + 'register.php',
      this.encode(body),
      { headers: this.headers }
    );
  }

  getKategori(): Observable<any> {
    return this.http.get(this.baseUrl + 'kategori.php');
  }

  addKategori(nama: string, icon: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('nama', nama);
    body.set('icon', icon);

    return this.http.post(
      this.baseUrl + 'add_kategori.php',
      this.encode(body),
      { headers: this.headers }
    );
  }

  
  getBeritaByKategori(kategoriId: number): Observable<any> {
    return this.http.get(
      this.baseUrl + 'berita_by_kategori.php?kategori_id=' + kategoriId
    );
  }

  getBeritaDetail(beritaId: number): Observable<any> {
    return this.http.get(
      this.baseUrl + 'berita_detail.php?id=' + beritaId
    );
  }

  addBerita(
    judul: string,
    fotoUtama: string,
    isi: string,
    kalimat: string,
    kategoriIds: number[]
  ): Observable<any> {
    const body = new URLSearchParams();
    body.set('judul', judul);
    body.set('foto_utama', fotoUtama);
    body.set('isi', isi);
    body.set('kalimat', kalimat);
    body.set('kategori', JSON.stringify(kategoriIds));

    return this.http.post(
      this.baseUrl + 'add_berita.php',
      this.encode(body),
      { headers: this.headers }
    );
  }

  deleteBerita(beritaId: number): Observable<any> {
    const body = new URLSearchParams();
    body.set('berita_id', beritaId.toString());

    return this.http.post(
      this.baseUrl + 'delete_berita.php',
      this.encode(body),
      { headers: this.headers }
    );
  }

  getGambarKonten(beritaId: number): Observable<any> {
    return this.http.get(
      this.baseUrl + 'gambar_konten.php?berita_id=' + beritaId
    );
  }

  addGambarKonten(beritaId: number, gambar: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('berita_id', beritaId.toString());
    body.set('gambar', gambar);

    return this.http.post(
      this.baseUrl + 'add_gambar_konten.php',
      this.encode(body),
      { headers: this.headers }
    );
  }

  getKomentar(beritaId: number): Observable<any> {
    return this.http.get(
      this.baseUrl + 'komentar.php?berita_id=' + beritaId
    );
  }

  addKomentar(
    beritaId: number,
    komentar: string
  ): Observable<any> {
    const body = new URLSearchParams();
    body.set('berita_id', beritaId.toString());
    body.set('komentar', komentar);

    return this.http.post(
      this.baseUrl + 'add_komentar.php',
      this.encode(body),
      { headers: this.headers }
    );
  }

  addRating(
    beritaId: number,
    rating: number
  ): Observable<any> {
    const body = new URLSearchParams();
    body.set('berita_id', beritaId.toString());
    body.set('rating', rating.toString());

    return this.http.post(
      this.baseUrl + 'add_rating.php',
      this.encode(body),
      { headers: this.headers }
    );
  }

  getAverageRating(beritaId: number): Observable<any> {
    return this.http.get(
      this.baseUrl + 'rating_avg.php?berita_id=' + beritaId
    );
  }

  addFavorite(beritaId: number): Observable<any> {
    const body = new URLSearchParams();
    body.set('berita_id', beritaId.toString());

    return this.http.post(
      this.baseUrl + 'add_favorite.php',
      this.encode(body),
      { headers: this.headers }
    );
  }

  getFavorite(): Observable<any> {
    return this.http.get(this.baseUrl + 'favorite.php');
  }

  searchBerita(judul: string): Observable<any> {
    return this.http.get(
      this.baseUrl + 'search.php?judul=' + judul
    );
  }
}
