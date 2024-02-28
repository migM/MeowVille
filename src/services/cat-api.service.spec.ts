import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatAPIService } from './cat-api.service';

describe('CatAPIService', () => {
  let injector: TestBed;
  let service: CatAPIService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CatAPIService]
    });
    injector = getTestBed();
    service = injector.inject(CatAPIService);
    httpMock = injector.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make a GET request to retrieve random cats', () => {
    const limit = 5;
    const dummyResponse = [{ name: 'Cat1' }, { name: 'Cat2' }];

    service.getCats(limit).subscribe((cats: any[]) => {
      expect(cats.length).toBe(2);
      expect(cats).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${(service as any).apiUrl}/breeds?limit=${limit}&api_key=${(service as any).apiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });

  it('should make a GET request to retrieve cat data by name', () => {
    const name = 'CatName';
    const dummyResponse = [{ name: 'CatName' }];

    service.getCatByName(name).subscribe((cat: any[]) => {
      expect(cat.length).toBe(1);
      expect(cat).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${(service as any).apiUrl}/breeds/search?q=${name}&api_key=${(service as any).apiKey}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });
});
