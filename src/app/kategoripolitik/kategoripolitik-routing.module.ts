import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { KategoripolitikPage } from './kategoripolitik.page';

const routes: Routes = [
  {
    path: '',
    component: KategoripolitikPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KategoripolitikPageRoutingModule {}
