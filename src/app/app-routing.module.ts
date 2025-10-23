import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
    {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuard],
  },

  {
    path: 'kategori',
    loadChildren: () =>
      import('./kategori/kategori.module').then((m) => m.KategoriPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'favoritku',
    loadChildren: () =>
      import('./favoritku/favoritku.module').then((m) => m.FavoritkuPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'cari',
    loadChildren: () =>
      import('./cari/cari.module').then((m) => m.CariPageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'detailBerita/:id/:backTo',
    loadChildren: () =>
      import('./detailBerita/detailBerita.module').then(
        (m) => m.DetailBeritaPageModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
