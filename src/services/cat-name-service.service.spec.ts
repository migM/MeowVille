import { TestBed } from '@angular/core/testing';

import { CatNameService } from './cat-name-service.service';

describe('CatNameService', () => {
  let service: CatNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get cat name', () => {
    const catName = 'Fluffy';
    service.setCatName(catName);
    expect(service.getCatName()).toEqual(catName);
  });

  it('should return empty string if cat name is not set', () => {
    expect(service.getCatName()).toEqual('');
  });
});
