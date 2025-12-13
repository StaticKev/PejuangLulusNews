import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TambahKategoriPage } from './tambah-kategori.page';
import { TambahKategoriRoutingModule } from './tambah-kategori-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, TambahKategoriPage, TambahKategoriRoutingModule],
})
export class TambahKategoriPageModule {}
