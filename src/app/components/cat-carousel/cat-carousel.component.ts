import { Component } from '@angular/core';
import { CatAPIService } from '../../../services/cat-api.service';

@Component({
  selector: 'app-cat-carousel',
  templateUrl: './cat-carousel.component.html',
  styleUrl: './cat-carousel.component.scss',
})
export class CatCarouselComponent {
  // slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  public catImages: any[] | undefined;
  public catBreeds: any[] | undefined;

  constructor(private catService: CatAPIService) {}

  ngOnInit(): void {
    this.getCatImages(5);
    this.getCatBreeds(5);
  }

  getCatImages(limit: number): void {
    this.catService.getCats(limit).subscribe((data: any[]) => {
      this.catImages = data.map((cat: any) => cat.image.url);
    });
  }

  getCatBreeds(limit: number): void {
    this.catService.getCats(limit).subscribe((data) => {
      this.catBreeds = data.map((breed: { name: string }) => breed.name);
    });
  }
}
