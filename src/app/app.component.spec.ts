import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],      
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should return true for displayBackButton if current route is not home', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('/other');
    expect(component.displayBackButton()).toBeTrue();
  });

  it('should return false for displayBackButton if current route is home', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue('/home');
    expect(component.displayBackButton()).toBeFalse();
  });

  it('should navigate back when backClicked is called', () => {
    const locationSpy = spyOn(location, 'back').and.stub();

    component.backClicked();
    expect(locationSpy).toHaveBeenCalled();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it(`should have as title 'MeowVille'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.title).toEqual('MeowVille');
  });
});
