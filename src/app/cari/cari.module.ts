import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CariPage } from './cari.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { CariPageRoutingModule } from './cari-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    CariPageRoutingModule
  ],
  declarations: [CariPage]
})
export class CariPageModule {}
