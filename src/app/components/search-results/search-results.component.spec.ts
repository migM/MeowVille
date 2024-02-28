import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchResultsComponent } from './search-results.component';
import { SearchService } from '../../../services/search-service.service';
import { CatNameService } from '../../../services/cat-name-service.service';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let searchService: SearchService;
  let catNameService: CatNameService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchResultsComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: SearchService,
          useValue: {
            getSearchResults: () => []
          }
        },
        {
          provide: CatNameService,
          useValue: {
            setCatName: () => { }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService);
    catNameService = TestBed.inject(CatNameService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home if search results are empty', () => {
    spyOn(searchService, 'getSearchResults').and.returnValue([]);
    spyOn(router, 'navigate');

    component.ngOnInit();

    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should call setCatName and navigate to details page when seeDetails is called', () => {
    const catName = 'Test Cat';
    spyOn(catNameService, 'setCatName');
    spyOn(router, 'navigate');

    component.seeDetails(catName);

    expect(catNameService.setCatName).toHaveBeenCalledWith(catName);
    expect(router.navigate).toHaveBeenCalledWith(['/details'], { queryParams: { catName } });
  });
});
