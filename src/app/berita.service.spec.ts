import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'; 

import { BeritaService } from './berita.service';

describe('BeritaService', () => {
  let service: BeritaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [BeritaService]
    });
    service = TestBed.inject(BeritaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});