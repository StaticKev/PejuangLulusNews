import { TestBed } from '@angular/core/testing';

import { Beritaservice } from './beritaservice';

describe('Beritaservice', () => {
  let service: Beritaservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Beritaservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
