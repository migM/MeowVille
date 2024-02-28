import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './components/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CatCarouselComponent } from './components/cat-carousel/cat-carousel.component';
import { HttpClientModule } from '@angular/common/http';
import { CatChartComponent } from './components/cat-chart/cat-chart.component';
import { DetailsPageComponent } from './components/details-page/details-page.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { CarouselModule } from '@coreui/angular';
import { HomeComponent } from './components/home/home.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { RouteReuseStrategy } from '@angular/router';
import { CustomRouteReuseStrategy } from '../route-reuse-strategy';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CatCarouselComponent,
    CatChartComponent,
    DetailsPageComponent,
    SearchComponent,
    HomeComponent,
    SearchResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
  ],
  providers: [ { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    provideClientHydration()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
