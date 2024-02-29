import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MeowVille';

  constructor(private readonly router: Router, private readonly _location: Location){}

  //handles visibility for back button so it doesn't show on home route
  public displayBackButton () {
    return !this.router.url.includes('home');
  }

  //handles back button clicked
  public backClicked () {
    this._location.back();
  }
}