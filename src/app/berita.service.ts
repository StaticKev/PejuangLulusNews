import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BeritaService {

  private baseUrl = 'https://ubaya.cloud/hybrid/160423020/uas/';

  constructor(private http: HttpClient) { }

  private headers = new HttpHeaders({
    'Content-Type': 'application/x-www-form-urlencoded'
  });

  private encode(body: URLSearchParams): string {
    return body.toString();
  }

  getKategori(): Observable<any> {
    return this.http.get(this.baseUrl + 'get_kategori.php');
  }



  getBeritaByKategori(namaKategori: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('kategori', namaKategori);

    return this.http.post(
      this.baseUrl + 'get_berita_by_kategori.php',
      this.encode(body),
      { headers: this.headers }
    );
  }


  deleteBerita(beritaId: number): Observable<any> {
    const body = new URLSearchParams();
    body.set('id', beritaId.toString());

    return this.http.post(
      this.baseUrl + 'del_berita.php',
      body.toString(),
      { headers: this.headers }
    );
  }


  getAllBerita(): Observable<any> {
    const body = new URLSearchParams();
    body.set('kategori', '');

    return this.http.post(
      this.baseUrl + 'get_berita_by_kategori.php',
      body.toString(),
      { headers: this.headers }
    );
  }

  getBeritaDetail(bid: number, uid: number) {

    const body = new HttpParams()
      .set('bid', bid.toString())
      .set('uid', uid.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(
      this.baseUrl + 'get_detail_berita.php',
      body.toString(),
      { headers }
    );
  }

  addRating(uid: number, bid: number, rating: number) {
    const body = new HttpParams()
      .set('uid', uid.toString())
      .set('bid', bid.toString())
      .set('rating', rating.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(
      this.baseUrl + 'add_rating.php',
      body.toString(),
      { headers }
    );
  }



  getAverageRating(beritaId: number): Observable<any> {
    return this.http.get(
      this.baseUrl + 'rating_avg.php?berita_id=' + beritaId
    );
  }

  getKomentar(beritaId: number): Observable<any> {
    return this.http.get(
      this.baseUrl + 'komentar.php?berita_id=' + beritaId
    );
  }

  addKomentar(uid: number, bid: number, komentar: string): Observable<any> {
    const body = new FormData();
    body.append('uid', uid.toString());
    body.append('bid', bid.toString());
    body.append('komentar', komentar);

    return this.http.post(this.baseUrl + 'add_komentar.php', body);
  }

  addKategori(nama: string, icon: string) {
    const body = new FormData();
    body.append('nama', nama);
    body.append('icon', icon);

    return this.http.post<any>(
      this.baseUrl + 'add_kategori.php',
      body
    );
  }

  changeFavorite(uid: number, bid: number, isFavorite: boolean) {

    const body = new HttpParams()
      .set('uid', uid.toString())
      .set('bid', bid.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    const url = isFavorite
      ? this.baseUrl + 'del_favorit.php'
      : this.baseUrl + 'add_favorit.php';

    return this.http.post<any>(
      url,
      body.toString(),
      { headers }
    );
  }

  getBeritaByKeyword(keyword: string) {

    const body = new HttpParams()
      .set('keyword', keyword);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(
      this.baseUrl + 'get_berita_by_keyword.php',
      body.toString(),
      { headers }
    );
  }

  getFavoritByUser(uid: number) {
    const body = new HttpParams()
      .set('uid', uid.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(
      this.baseUrl + 'get_favorit.php',
      body.toString(),
      { headers }
    );
  }

  deleteRating(uid: number, bid: number) {
    const body = new HttpParams()
      .set('uid', uid.toString())
      .set('bid', bid.toString());

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post<any>(
      this.baseUrl + 'del_rating.php',
      body.toString(),
      { headers }
    );
  }
  addReply(uid: number, bid: number, kid: number, komentar: string) {
  const body = new URLSearchParams();
  body.set('uid', uid.toString());
  body.set('bid', bid.toString());
  body.set('kid', kid.toString());
  body.set('komentar', komentar);

  return this.http.post<any>(
    this.baseUrl + 'add_reply.php',
    body.toString(),
    { headers: this.headers }
  );
}


}


