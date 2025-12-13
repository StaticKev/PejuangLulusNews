import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormBuilder, FormArray, FormGroup, FormControl, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Berita, addBerita, getAllBerita } from '../data/berita';
import { Router } from '@angular/router';
import { getAllKategori, Kategori } from '../data/kategori';

@Component({
  selector: 'app-tambah-berita',
  standalone: true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule, FormsModule],
  templateUrl: './tambah-berita.page.html',
  styleUrls: ['./tambah-berita.page.scss'],
})
export class TambahBeritaPage implements OnInit {
  form!: FormGroup;

  listKategori: Kategori[]

  constructor(
    private fb: FormBuilder,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    this.listKategori = getAllKategori();
  }

  ngOnInit() {
    this.form = this.fb.group({
      judul: ['', Validators.required],
      tanggal: ['', Validators.required],
      foto_utama: ['', Validators.required],
      gambar_konten: this.fb.array([this.fb.control('')]),
      isi: ['', Validators.required],
      idKategori: this.fb.array([])
    });
  }

  get gambarKonten(): FormArray {
    return this.form.get('gambar_konten') as FormArray;
  }

  get gambarKontenControls(): FormControl[] {
    return this.gambarKonten.controls as FormControl[];
  }

  get idKategori(): FormArray {
    return this.form.get('idKategori') as FormArray;
  }

  addGambar() {
    this.gambarKonten.push(this.fb.control(''));
  }

  removeGambar(i: number) {
    if (this.gambarKonten.length > 1) {
      this.gambarKonten.removeAt(i);
    }
  }

  parseTanggal(str: string): Date {
    try {
      const parts = str.split(',');
      let datePart = '';
      let timePart = '';
      if (parts.length >= 2) {
        datePart = parts[0].trim();
        timePart = parts.slice(1).join(',').trim();
      } else {
        const tokens = str.trim().split(' ');
        if (tokens.length >= 3) {
          datePart = tokens.slice(0, 3).join(' ');
          timePart = tokens.slice(3).join(' ');
        } else {
          return new Date(str);
        }
      }

      const dateTokens = datePart.split(' ').filter(Boolean);
      if (dateTokens.length < 3) return new Date(str);
      const dayStr = dateTokens[0];
      const monStr = dateTokens[1];
      const yearStr = dateTokens[2];

      const monthMap: any = {
        jan: 0, january: 0,
        feb: 1, february: 1,
        mar: 2, march: 2,
        apr: 3, april: 3,
        may: 4,
        mei: 4, 
        jun: 5, june: 5,
        jul: 6, july: 6,
        aug: 7, august: 7, agu: 7, agustus: 7,
        sep: 8, september: 8,
        oct: 9, october: 9, okt: 9, oktober: 9,
        nov: 10, november: 10,
        dec: 11, december: 11, des: 11, desember: 11,
      };

      const monKey = monStr.toLowerCase();
      const shortKey = monKey.length >= 3 ? monKey.slice(0, 3) : monKey;
      const month = monthMap[shortKey] ?? monthMap[monKey] ?? 0;

      const timeMatch = timePart.match(/(\d{1,2}:\d{2}:\d{2})\s*(AM|PM)?/i);
      if (!timeMatch) {
        return new Date(str);
      }

      const time = timeMatch[1];
      const ampmRaw = timeMatch[2] ? timeMatch[2].toUpperCase() : '';
      const [hhStr, mmStr, ssStr] = time.split(':');
      let hh = parseInt(hhStr, 10);
      const mm = parseInt(mmStr, 10);
      const ss = parseInt(ssStr, 10);

      if (ampmRaw && hh <= 12) {
        if (ampmRaw === 'PM' && hh < 12) hh += 12;
        if (ampmRaw === 'AM' && hh === 12) hh = 0;
      }

      return new Date(parseInt(yearStr, 10), month, parseInt(dayStr, 10), hh, mm, ss);
    } catch (e) {
      return new Date(str);
    }
  }

  async submit() {
    if (this.form.invalid) {
      const t = await this.toastCtrl.create({ message: 'Silakan lengkapi form.', duration: 2000, position: 'top' });
      await t.present();
      return;
    }

    const semua = getAllBerita();
    const maxId = semua.reduce((m, b) => (b.id > m ? b.id : m), 0);
    const id = maxId + 1;

    const tanggalStr = this.form.value.tanggal;
    const timestamp = this.parseTanggal(tanggalStr);

    const berita: Berita = {
      id,
      judul: this.form.value.judul,
      foto_utama: this.form.value.foto_utama,
      idKategori: this.idKategori.value,
      gambar_konten: this.gambarKonten.controls.map((c) => c.value).filter((v: string) => v && v.trim() !== ''),
      timestamp,
      isi: this.form.value.isi,
      komentar: [],
      kalimat: '',
    };

    addBerita(berita);

    const toast = await this.toastCtrl.create({ message: 'Berita berhasil ditambahkan.', duration: 1800, position: 'top' });
    await toast.present();
    this.router.navigateByUrl('/home');
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
}
