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
    image: '',
    temperament: ''
  };

  ngOnInit(): void {
    this.catAPIService.getCats(1).subscribe((data: any[]) => {
      const breedData = data[0];
      // debugger;
      this.details = {
        name: breedData.name,
        description: breedData.description,
        weight: breedData.weight.metric,
        origin: breedData.origin,
        wiki: breedData.wikipedia_url,
        image: breedData.image.url,
        temperament: breedData.temperament
      };
    });
  }

  constructor(private catAPIService: CatAPIService) {}
}
