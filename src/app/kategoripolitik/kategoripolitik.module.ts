import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KategoripolitikPageRoutingModule } from './kategoripolitik-routing.module';

import { KategoripolitikPage } from './kategoripolitik.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KategoripolitikPageRoutingModule,
    KategoripolitikPage
  ],
  // declarations: [KategoripolitikPage]
})
export class KategoripolitikPageModule {}
