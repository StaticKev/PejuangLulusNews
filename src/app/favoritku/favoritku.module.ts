import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FavoritkuPage } from './favoritku.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { FavoritkuPageRoutingModule } from './favoritku-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    FavoritkuPageRoutingModule
  ],
  declarations: [FavoritkuPage]
})
export class FavoritkuPageModule {}
