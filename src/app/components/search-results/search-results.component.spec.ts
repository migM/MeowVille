import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SearchResultsComponent } from './search-results.component';
import { SearchService } from '../../../services/search-service.service';
import { CatNameService } from '../../../services/cat-name-service.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home if search results are empty', () => {
    spyOn(component['searchService'], 'getSearchResults').and.returnValue([]);
    spyOn( component['router'], 'navigate');

    component.ngOnInit();

    expect(component['router'].navigate).toHaveBeenCalledWith(['']);
  });

  it('should call setCatName and navigate to details page when seeDetails is called', () => {
    const catName = 'Test Cat';
    spyOn(component['catNameService'], 'setCatName');
    spyOn(component['router'], 'navigate');

    component.seeDetails(catName);

    expect(component['catNameService'].setCatName).toHaveBeenCalledWith(catName);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/details'], { queryParams: { catName } });
  });
});