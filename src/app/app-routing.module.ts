import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'kategori',
    loadChildren: () =>
      import('./kategori/kategori.module').then((m) => m.KategoriPageModule),
  },
  {
    path: 'favoritku',
    loadChildren: () =>
      import('./favoritku/favoritku.module').then((m) => m.FavoritkuPageModule),
  },
  {
    path: 'cari',
    loadChildren: () => import('./cari/cari.module').then( m => m.CariPageModule)
  },
  {
    path: 'detailBerita/:index/:backTo',
    loadChildren: () => import('./detailBerita/detailBerita.module').then( m => m.DetailBeritaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
