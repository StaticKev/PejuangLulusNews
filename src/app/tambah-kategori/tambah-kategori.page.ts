import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Kategori, addKategori } from '../data/kategori';
import { Router } from '@angular/router';

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
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      kategori: ['', Validators.required],
      gambar: ['', Validators.required],
    });
  } 

  async submit() {
    if (this.form.invalid) {
      const t = await this.toastCtrl.create({ message: 'Silahkan lengkapi form.', duration: 2000, position: 'top' });
      await t.present();
      return;
    }

    const kategori: Kategori = {
        id: 0, 
        nama: this.form.value.kategori,
        icon: this.form.value.gambar
    }

    addKategori(kategori)

    const toast = await this.toastCtrl.create({ message: 'Kategori berhasil ditambahkan.', duration: 1800, position: 'top' });
    await toast.present();
    this.router.navigateByUrl('/kategori');
  }
}
