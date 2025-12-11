import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TambahBeritaPage } from './tambah-berita.page';

const routes: Routes = [
  {
    path: '',
    component: TambahBeritaPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TambahBeritaRoutingModule {}
