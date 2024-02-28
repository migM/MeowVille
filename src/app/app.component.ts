import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'MeowVille';

  constructor(private readonly router: Router){}

  public displayBackButton () {
    return !this.router.url.includes('home');
  }

  public backClicked () {
    if(this.router.url === '/details'){
      this.router.navigate(['/results']);
    } else {
      this.router.navigate([''])
    }
  }
}