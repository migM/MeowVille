import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],      
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [RouterTestingModule],
      providers: [
        {provide: Location,
        useValue: {
          back: () => null,
        }
      }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
    expect(component.title).toEqual('MeowVille');

  });

  it('should return true for displayBackButton if current route is not home', () => {
    spyOnProperty(component['router'], 'url', 'get').and.returnValue('/other');
    
    expect(component.displayBackButton()).toBeTrue();
  });

  it('should return false for displayBackButton if current route is home', () => {
    spyOnProperty(component['router'], 'url', 'get').and.returnValue('/home');
    expect(component.displayBackButton()).toBeFalse();
  });

  it('should navigate back when backClicked is called', () => {
    const locationSpy = spyOn(component['_location'], 'back').and.stub();

    component.backClicked();
    expect(locationSpy).toHaveBeenCalled();
  });
});