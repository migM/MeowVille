import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { SearchService } from '../../../services/search-service.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing'; // Import HttpClientTestingModule
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let searchService: SearchService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [SearchService],
      imports: [HttpClientTestingModule, FormsModule] 
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    searchService = TestBed.inject(SearchService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set noResults to true when search results are empty', fakeAsync(() => {
    const searchQuery = 'non-existent-cat';
    spyOn(searchService, 'search').and.returnValue(of([]));

    component.search(searchQuery);
    tick();

    expect(component.noResults).toBe(true);
  }));

  it('should set noResults to false when search results are not empty', fakeAsync(() => {
    const searchQuery = 'existing-cat';
    const mockResults = [{ name: 'existing-cat' }];
    spyOn(searchService, 'search').and.returnValue(of(mockResults));

    component.search(searchQuery);
    tick();

    expect(component.noResults).toBe(false);
  }));
});
