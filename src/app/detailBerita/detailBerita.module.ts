import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetailBerita } from './detailBerita.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DetailBeritaRoutingModule } from './detailBerita-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    DetailBeritaRoutingModule
  ],
  declarations: [DetailBerita]
})
export class DetailBeritaPageModule {}
