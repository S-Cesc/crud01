import { TestBed } from '@angular/core/testing';

import { ReceptesService } from './receptes.service';

describe('ReceptesService', () => {
  let service: ReceptesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReceptesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
