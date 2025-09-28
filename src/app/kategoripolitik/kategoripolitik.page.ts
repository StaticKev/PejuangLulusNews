import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // <-- Import IonicModule
import { KategoripolitikPageRoutingModule } from './kategoripolitik-routing.module';


@Component({
  selector: 'app-kategoripolitik',
  templateUrl: './kategoripolitik.page.html',
  styleUrls: ['./kategoripolitik.page.scss'],standalone: true, // <-- Ini menandakan komponen Standalone
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // <-- Tambahkan IonicModule di sini agar elemen Ionic dikenali
    KategoripolitikPageRoutingModule
  ]
})
export class KategoripolitikPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
