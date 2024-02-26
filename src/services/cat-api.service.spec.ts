import { TestBed } from '@angular/core/testing';

import { CatAPIService } from './cat-api.service';

describe('CatAPIService', () => {
  let service: CatAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
