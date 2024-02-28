import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailsPageComponent } from './details-page.component';
import { Location } from '@angular/common';
import { CatAPIService } from '../../../services/cat-api.service';
import { CatNameService } from '../../../services/cat-name-service.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('DetailsPageComponent', () => {
  let component: DetailsPageComponent;
  let fixture: ComponentFixture<DetailsPageComponent>;
  let catAPIServiceStub: Partial<CatAPIService>;
  let catNameServiceStub: Partial<CatNameService>;
  let location: Location;
  let routeStub: Partial<ActivatedRoute>;

  beforeEach(async () => {
    catAPIServiceStub = {
      getCatByName: jasmine.createSpy().and.returnValue(of([{ 
        name: 'Test Cat',
        description: 'Test Description',
        weight: { metric: '5kg' },
        origin: 'Test Origin',
        wikipedia_url: 'http://test.com',
        image: { url: 'http://test.com/cat.jpg' },
        temperament: 'Test Temperament',
        life_span: 'Test Lifespan'
      }]))
    };

    catNameServiceStub = {};

    routeStub = {
      queryParams: of({ catName: 'Test Cat' })
    };

    location = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [DetailsPageComponent],    
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: CatAPIService, useValue: catAPIServiceStub },
        { provide: CatNameService, useValue: catNameServiceStub },
        { provide: Location, useValue: location },
        { provide: ActivatedRoute, useValue: routeStub }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch cat details on initialization', () => {
    expect(catAPIServiceStub.getCatByName).toHaveBeenCalledWith('Test Cat');
    expect(component.details).toEqual({
      name: 'Test Cat',
      description: 'Test Description',
      weight: '5kg',
      origin: 'Test Origin',
      wiki: 'http://test.com',
      image: 'http://test.com/cat.jpg',
      temperament: 'Test Temperament',
      life_span: 'Test Lifespan'
    });
  });

  it('should go back when goBack function is called', () => {
    component.goBack();
    expect(location.back).toHaveBeenCalled();
  });
});
