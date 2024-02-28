import { TestBed } from '@angular/core/testing';

import { CatNameService } from './cat-name-service.service';

describe('CatNameServiceService', () => {
  let service: CatNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
