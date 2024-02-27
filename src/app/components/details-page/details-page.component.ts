import { Component } from '@angular/core';
import { CatAPIService } from '../../../services/cat-api.service';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrl: './details-page.component.scss',
})
export class DetailsPageComponent {
  public details = {
    name: '',
    description: '',
    weight: '',
    origin: '',
    wiki: '',
    image: ''
  };

  ngOnInit(): void {
    this.catAPIService.getCats(1).subscribe((data: any[]) => {
      const breedData = data[0];
      this.details = {
        name: breedData.breed,
        description: breedData.description,
        weight: breedData.weight.metric,
        origin: breedData.origin,
        wiki: breedData.wiki,
        image: breedData.image.url
      };

      console.log(this.details);
    });
  }

  constructor(private catAPIService: CatAPIService) {}
}
