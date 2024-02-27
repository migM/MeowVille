import { TestBed } from '@angular/core/testing';

import { CatNameServiceService } from './cat-name-service.service';

describe('CatNameServiceService', () => {
  let service: CatNameServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatNameServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
