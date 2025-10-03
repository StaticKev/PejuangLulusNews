import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailBerita } from './detailBerita.page';

const routes: Routes = [
  {
    path: '',
    component: DetailBerita,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DetailBeritaRoutingModule {}
