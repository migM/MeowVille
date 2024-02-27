import { Component } from '@angular/core';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss'
})
export class DetailsPageComponent {

  public description : string = '';
  public weight : any;
  public origin: string = '';
  public breed: string = '';

}
