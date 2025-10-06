import { Component } from '@angular/core';

import { BeritaDetail, getBeritaWithKategori } from '../data/berita';
import { Kategori, getAllKategori } from '../data/kategori';

import { ActivatedRoute } from '@angular/router';
import { User, getAllUsers } from '../data/user';

@Component({
    selector: 'app-detailBerita',
    templateUrl: 'detailBerita.page.html',
    styleUrls: ['detailBerita.page.scss'],
    standalone: false,
})
export class DetailBerita {

    isFavorite: boolean = false;

    public semuaBerita: BeritaDetail[] = []
    public beritaTerbaru: BeritaDetail[] = [] 
    public semuaKategori: Kategori[] = []
    public kategoriAktif: number | null = null

    index: number = 0
    backTo: string = ""

    loggedInUser: User | null = null;

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

        for (const u of getAllUsers()) {
            if (u.username == localStorage.getItem("loggedInUsername")) {
              this.loggedInUser = u
              break
            }
        }
        
        if (this.loggedInUser && this.loggedInUser.favorit) {
            const currentBerita = this.semuaBerita[this.index]
            for (const f of this.loggedInUser.favorit) {
                if (f.id == currentBerita.id) {
                    this.isFavorite = true
                    break
                }
            }
        }
    }

    updateFavorite() {
        this.isFavorite = !this.isFavorite
        if (this.isFavorite) {
            this.loggedInUser?.favorit.push(this.semuaBerita[this.index])
        } else {
            if (this.loggedInUser != null) {
                const idx = this.loggedInUser?.favorit.indexOf(this.semuaBerita[this.index])
                if (idx > -1) {
                    this.loggedInUser?.favorit.splice(idx, 1)
                }
            }
        }
    }
}