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

  public displayBackButton () {
    return !this.router.url.includes('home');
  }

  public backClicked () {
    this._location.back();
  }
}