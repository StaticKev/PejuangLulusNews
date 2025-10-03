import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';

import { BeritaDetail, getBeritaWithKategori } from '../data/berita';
import { Kategori, getAllKategori } from '../data/kategori';
import { AuthService } from '../data/auth';
import { RouterModule } from '@angular/router';

import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-detailBerita',
    templateUrl: 'detailBerita.page.html',
    styleUrls: ['detailBerita.page.scss'],
    standalone: false,
})
export class DetailBerita {

    public index: number = 0;

    public semuaBerita: BeritaDetail[] = []
    public beritaTerbaru: BeritaDetail[] = [] 
    public semuaKategori: Kategori[] = []
    public kategoriAktif: number | null = null
    public namaUser: string = 'Pejuang Lulus'
    backTo: string = ""

    constructor(private route: ActivatedRoute) {}

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.index = params['index']
                this.backTo = params['backTo']
            }
        )
        
        this.semuaBerita = getBeritaWithKategori().sort(
          (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
        )
        this.beritaTerbaru = [...this.semuaBerita]
        this.semuaKategori = getAllKategori()
    }
}