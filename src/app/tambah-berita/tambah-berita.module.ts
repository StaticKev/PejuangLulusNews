import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TambahBeritaPage } from './tambah-berita.page';
import { TambahBeritaRoutingModule } from './tambah-berita-routing.module';

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, IonicModule, TambahBeritaRoutingModule, TambahBeritaPage],
})
export class TambahBeritaModule {}
