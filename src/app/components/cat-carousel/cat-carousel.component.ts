import { Component } from '@angular/core';
import { CatAPIService } from '../../../services/cat-api.service';

@Component({
  selector: 'app-cat-carousel',
  templateUrl: './cat-carousel.component.html',
  styleUrl: './cat-carousel.component.scss',
})
export class CatCarouselComponent {

  public catImages: any[] | undefined;
  public catBreeds: any[] | undefined;

  constructor(private catService: CatAPIService) {}

  ngOnInit(): void {
    this.getCatImages(1);
    this.getCatBreeds(1);
  }

  getCatImages(limit: number): void {
    this.catService.getCats(limit).subscribe((data: any[]) => {
      this.catImages = data.map((cat: any) => cat.image.url);
      console.log(data)
    });
  }

  getCatBreeds(limit: number): void {
    this.catService.getCats(limit).subscribe((data) => {
      this.catBreeds = data.map((breed: { name: string }) => breed.name);
    });
  }
}
