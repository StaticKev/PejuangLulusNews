import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KategoripolitikPage } from './kategoripolitik.page';

describe('KategoripolitikPage', () => {
  let component: KategoripolitikPage;
  let fixture: ComponentFixture<KategoripolitikPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KategoripolitikPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
