import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SearchService } from './search-service.service';
import { CatAPIService } from './cat-api.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('SearchService', () => {
  let service: SearchService;
  let catAPIService: CatAPIService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [SearchService, CatAPIService],
    });
    service = TestBed.inject(SearchService);
    catAPIService = TestBed.inject(CatAPIService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('search', () => {
    it('should return search results and navigate to results page when search query is not empty', () => {
      const searchQuery = 'Persian';
      const mockData = [{ name: 'Persian Cat' }];
      spyOn(catAPIService, 'getCatByName').and.returnValue(of(mockData));
      spyOn(router, 'navigate');

      service.search(searchQuery).subscribe((results: any[]) => {
        expect(results).toEqual(mockData);
        expect(service.getSearchResults()).toEqual(mockData);
        expect(router.navigate).toHaveBeenCalledWith(['/results']);
      });
    });

    it('should handle no results found gracefully', () => {
      const searchQuery = 'UnknownCat';
      spyOn(router, 'navigate');

      service.search(searchQuery).subscribe((results: any[]) => {
        expect(results).toEqual([]);
        expect(router.navigate).not.toHaveBeenCalled();
      });
    });

    it('should navigate to home page when search query is empty', () => {
      const searchQuery = '';
      spyOn(router, 'navigate');

      service.search(searchQuery).subscribe((results: any[]) => {
        expect(results).toEqual([]);
        expect(service.getSearchResults()).toEqual([]);
        expect(router.navigate).toHaveBeenCalledWith(['']);
      });
    });
  });
});
