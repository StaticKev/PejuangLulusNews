import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  // helper untuk encode POST body
  private encode(body: URLSearchParams): string {
    return body.toString();
  }

  /* =========================
     KATEGORI
     ========================= */

  getKategori(): Observable<any> {
    return this.http.get(this.baseUrl + 'get_kategori.php');
  }

  /* =========================
     BERITA
     ========================= */

  // 🔹 SESUAI PHP get_berita_by_kategori.php
  // PHP membaca: $_POST['kategori']
  // isi: NAMA kategori


  getBeritaByKategori(namaKategori: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('kategori', namaKategori);

    return this.http.post(
      this.baseUrl + 'get_berita_by_kategori.php',
      this.encode(body),
      { headers: this.headers }
    );
  }

  // ambil semua berita (kategori kosong)
  getAllBerita(): Observable<any> {
    const body = new URLSearchParams();
    body.set('kategori', '');

    return this.http.post(
      this.baseUrl + 'get_berita_by_kategori.php',
      body.toString(),
      { headers: this.headers }
    );
  }

  // detail berita
  getBeritaDetail(beritaId: number): Observable<any> {
    return this.http.get(
      this.baseUrl + 'berita_detail.php?id=' + beritaId
    );
  }

  /* =========================
     SEARCH / KEYWORD
     ========================= */

  // asumsi PHP: extract($_POST) dan param = keyword
  getBeritaByKeyword(keyword: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('keyword', keyword);

    return this.http.post(
      this.baseUrl + 'get_berita_by_keyword.php',
      this.encode(body),
      { headers: this.headers }
    );
  }

  /* =========================
     RATING
     ========================= */

  addRating(beritaId: number, rating: number): Observable<any> {
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

  /* =========================
     KOMENTAR
     ========================= */

  getKomentar(beritaId: number): Observable<any> {
    return this.http.get(
      this.baseUrl + 'komentar.php?berita_id=' + beritaId
    );
  }

  addKomentar(beritaId: number, komentar: string): Observable<any> {
    const body = new URLSearchParams();
    body.set('berita_id', beritaId.toString());
    body.set('komentar', komentar);

    return this.http.post(
      this.baseUrl + 'add_komentar.php',
      this.encode(body),
      { headers: this.headers }
    );
  }

  //tambah kategori
  addKategori(nama: string, icon: string) {
    const body = new FormData();
    body.append('nama', nama);
    body.append('icon', icon);

    return this.http.post<any>(
      this.baseUrl + 'add_kategori.php',
      body
    );
  }



}
