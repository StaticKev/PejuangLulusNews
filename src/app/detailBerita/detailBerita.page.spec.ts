import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { DetailBerita } from './detailBerita.page';

describe('DetailBeritaPage', () => {
  let component: DetailBerita;
  let fixture: ComponentFixture<DetailBerita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailBerita],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailBerita);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
