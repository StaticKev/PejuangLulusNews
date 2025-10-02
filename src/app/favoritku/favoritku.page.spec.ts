import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { FavoritkuPage } from './favoritku.page';

describe('Tab1Page', () => {
  let component: FavoritkuPage;
  let fixture: ComponentFixture<FavoritkuPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FavoritkuPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritkuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
