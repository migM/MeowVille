import { Component } from '@angular/core';
import { CatAPIService } from '../../../services/cat-api.service';

@Component({
  selector: 'app-cat-carousel',
  templateUrl: './cat-carousel.component.html',
  styleUrl: './cat-carousel.component.scss',
})
export class CatCarouselComponent {

  public details: { name: string, description: string, image: string }[] = [];

  constructor(private catAPIService: CatAPIService) {}

  ngOnInit(): void {
    this.getCatsForSpinner(4)
  }

  getCatsForSpinner(limit: number): void {
    this.catAPIService.getCats(limit).subscribe((data: any[]) => {
      this.details = data.map((breedData: any) => ({
        name: breedData.name,
        description: breedData.description,
        image: breedData.image.url
      }));
    });
  }

}
