import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CatChartComponent } from './cat-chart.component';
import { CatAPIService } from '../../../services/cat-api.service';
import { CatNameService } from '../../../services/cat-name-service.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

fdescribe('CatChartComponent', () => {
  let component: CatChartComponent;
  let fixture: ComponentFixture<CatChartComponent>;
  let catAPIServiceStub: Partial<CatAPIService>;
  let catNameServiceStub: Partial<CatNameService>;
  let routeStub: Partial<ActivatedRoute>;

  beforeEach(async () => {
    catAPIServiceStub = {
      getCatByName: jasmine.createSpy().and.returnValue(of([{ 
        name: 'Test Cat',
        affection_level: 5,
        dog_friendly: 4,
        child_friendly: 3,
        stranger_friendly: 2,
        vocalisation: 1,
        intelligence: 6
      }]))
    };

    catNameServiceStub = {
      setCatName: jasmine.createSpy()
    };

    routeStub = {
      queryParams: of({ catName: 'Test Cat' })
    };

    await TestBed.configureTestingModule({
      declarations: [CatChartComponent],
      providers: [
        { provide: CatAPIService, useValue: catAPIServiceStub },
        { provide: CatNameService, useValue: catNameServiceStub },
        { provide: ActivatedRoute, useValue: routeStub }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CatChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getCatByName on initialization', () => {
    expect(catAPIServiceStub.getCatByName).toHaveBeenCalledWith('Test Cat');
  });

  it('should set the breed property', () => {
    expect(component.breed).toBe('Test Cat');
  });

  it('should create chart with correct data', () => {
    const expectedData = [5, 4, 3, 2, 1, 6];
    expect(component.chart.data.datasets[0].data).toEqual(expectedData);
  });
});
