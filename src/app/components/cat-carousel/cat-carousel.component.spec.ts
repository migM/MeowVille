import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CatAPIService } from '../../../services/cat-api.service';
import { CatNameService } from '../../../services/cat-name-service.service';
import { CatCarouselComponent } from './cat-carousel.component';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CatCarouselComponent', () => {
  let component: CatCarouselComponent;
  let fixture: ComponentFixture<CatCarouselComponent>;
  let catAPIServiceStub: Partial<CatAPIService>;
  let catNameServiceStub: Partial<CatNameService> & { setCatName: (catName: string) => void };


  beforeEach(async () => {
    catAPIServiceStub = {
      getCats: () => of([
        { name: 'Cat 1', description: 'Description 1', image: { url: 'image1.jpg' } },
        { name: 'Cat 2', description: 'Description 2', image: { url: 'image2.jpg' } }
      ])
    };

    catNameServiceStub = {
      setCatName: () => { }
    };

    await TestBed.configureTestingModule({
      declarations: [CatCarouselComponent],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: CatAPIService, useValue: catAPIServiceStub },
        { provide: CatNameService, useValue: catNameServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CatCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load cats for spinner', () => {
    component.details = [];
    component.ngOnInit();
    expect(component.details.length).toEqual(5);
  });

  it('should set cat name and navigate to details page', () => {
    const setCatNameSpy = spyOn(catNameServiceStub, 'setCatName');
    const routerSpy = spyOn(component['router'], 'navigate');
  
    component.seeCatDetails('Cat 1');
  
    expect(setCatNameSpy).toHaveBeenCalledWith('Cat 1');
    expect(routerSpy).toHaveBeenCalledWith(['/details'], { queryParams: { catName: 'Cat 1' } });
  });
  
});
