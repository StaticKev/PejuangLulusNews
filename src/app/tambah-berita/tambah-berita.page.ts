import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import {
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { BeritaService } from '../berita.service';

@Component({
  selector: 'app-tambah-berita',
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tambah-berita.page.html',
  styleUrls: ['./tambah-berita.page.scss'],
})
export class TambahBeritaPage implements OnInit {

  semuaKategori: any[] = [];
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router,
    private beritaService: BeritaService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      judul: ['', Validators.required],
      foto_utama: ['', Validators.required],
      gambar_konten: this.fb.array([this.fb.control('')]),
      isi: ['', Validators.required],
      id_kategori: this.fb.array([])
    });

    this.loadKategori();
  }

  get gambarKonten(): FormArray {
    return this.form.get('gambar_konten') as FormArray;
  }

  get gambarKontenControls(): FormControl[] {
    return this.gambarKonten.controls as FormControl[];
  }

  get idKategori(): FormArray {
    return this.form.get('id_kategori') as FormArray;
  }

  addGambar() {
    this.gambarKonten.push(this.fb.control(''));
  }

  removeGambar(i: number) {
    if (this.gambarKonten.length > 1) {
      this.gambarKonten.removeAt(i);
    }
  }

  toggleKategori(id: number, checked: boolean) {
    if (checked) {
      this.idKategori.push(new FormControl(id));
    } else {
      const index = this.idKategori.controls.findIndex(c => c.value === id);
      if (index !== -1) {
        this.idKategori.removeAt(index);
      }
    }
  }

  loadKategori() {
    this.beritaService.getKategori().subscribe((res: any) => {
      this.semuaKategori = res.data || [];
    });
  }

  async submit() {
    if (this.form.invalid) {
      const t = await this.toastCtrl.create({
        message: 'Silakan lengkapi form.',
        duration: 2000,
        position: 'top'
      });
      await t.present();
      return;
    }

    const judul = this.form.value.judul.trim();

    this.beritaService.checkJudulExact(judul).subscribe(async (cek: any) => {
      if (cek.result === 'exists') {
        const toast = await this.toastCtrl.create({
          message: 'Judul berita sudah ada (harus unik)',
          duration: 2000,
          position: 'top',
          color: 'danger'
        });
        await toast.present();
        return;
      }

      const foto_utama = this.form.value.foto_utama;
      const isi = this.form.value.isi;
      const id_kategori = this.form.value.id_kategori;
      const gambar_konten = this.form.value.gambar_konten;

      this.beritaService
        .addBerita(judul, foto_utama, id_kategori, gambar_konten, isi)
        .subscribe(async (res: any) => {

          if (res.result === 'success') {
            const toast = await this.toastCtrl.create({
              message: res.message,
              duration: 1800,
              position: 'top'
            });
            await toast.present();

            this.router.navigateByUrl('/home');
          } else {
            const toast = await this.toastCtrl.create({
              message: res.message || 'Gagal menambah berita',
              duration: 2000,
              position: 'top',
              color: 'danger'
            });
            await toast.present();
          }
        });

    });
  }
}
