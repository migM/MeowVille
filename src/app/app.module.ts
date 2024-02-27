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


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    CatCarouselComponent,
    CatChartComponent,
    DetailsPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
