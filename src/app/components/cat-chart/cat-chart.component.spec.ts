import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatChartComponent } from './cat-chart.component';

describe('CatChartComponent', () => {
  let component: CatChartComponent;
  let fixture: ComponentFixture<CatChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CatChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
