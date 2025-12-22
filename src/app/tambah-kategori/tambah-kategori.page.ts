import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule
} from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';


/* ===== DUMMY (dikomen, JANGAN DIHAPUS) ===== */
// import { Kategori, addKategori } from '../data/kategori';

import { BeritaService } from '../berita.service';

@Component({
  selector: 'app-tambah-kategori',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tambah-kategori.page.html',
  styleUrls: ['./tambah-kategori.page.scss'],
})
export class TambahKategoriPage implements OnInit {

  form!: FormGroup;

  constructor(
    private navCtrl: NavController,
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router,
    private beritaService: BeritaService // ✅ API
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      kategori: ['', Validators.required],
      gambar: ['', Validators.required],
    });
  }

  async submit() {

    if (this.form.invalid) {
      const t = await this.toastCtrl.create({
        message: 'Silahkan lengkapi form.',
        duration: 2000,
        position: 'top'
      });
      await t.present();
      return;
    }

    const namaKategori = this.form.value.kategori;
    const iconKategori = this.form.value.gambar;

    /* ===== DUMMY VERSION (dikomen) ===== */
    /*
    const kategori: Kategori = {
      id: 0,
      nama: namaKategori,
      icon: iconKategori
    };

    addKategori(kategori);
    */

    /* ===== API VERSION ===== */
    this.beritaService
      .addKategori(namaKategori, iconKategori)
      .subscribe(async (res: any) => {

        if (res.result === 'success') {
          const toast = await this.toastCtrl.create({
            message: 'Kategori berhasil ditambahkan.',
            duration: 1800,
            position: 'top'
          });
          await toast.present();

          // balik ke halaman kategori / home
          this.router.navigateByUrl('/home');
        } else {
          const toast = await this.toastCtrl.create({
            message: 'Gagal menambahkan kategori.',
            duration: 2000,
            position: 'top'
          });
          await toast.present();
        }
      });
  }
  keKategori() {
    this.navCtrl.navigateRoot('/kategori');
  }
}
