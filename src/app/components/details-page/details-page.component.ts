import { Component } from '@angular/core';
import { CatAPIService } from '../../../services/cat-api.service';
import { CatNameServiceService } from '../../../services/cat-name-service.service';

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
    temperament: '',
    life_span: '',
  };

  constructor(
    private catAPIService: CatAPIService,
    private catNameService: CatNameServiceService
  ) {}

  ngOnInit(): void {
    const catName = this.catNameService.getCatName(); // Get the selected cat's name from the shared service
    if (catName) {
      this.catAPIService.getCatByName(catName).subscribe((data: any[]) => {
        const catData = data[0];
        this.details = {
          name: catData.name,
          description: catData.description,
          weight: catData.weight.metric,
          origin: catData.origin,
          wiki: catData.wikipedia_url,
          image: catData.image.url,
          temperament: catData.temperament,
          life_span: catData.life_span,
        };
      });
    }
  }
}
