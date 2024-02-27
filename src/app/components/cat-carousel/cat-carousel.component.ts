import { Component } from '@angular/core';
import { CatAPIService } from '../../../services/cat-api.service';

@Component({
  selector: 'app-cat-carousel',
  templateUrl: './cat-carousel.component.html',
  styleUrl: './cat-carousel.component.scss',
})
export class CatCarouselComponent {
  public details: { name: string; description: string; image: string }[] = [];

  constructor(private catAPIService: CatAPIService) {}

  ngOnInit(): void {
    this.getCatsForSpinner(50, 5);
  }

  //load cats for spinner randomly
  getCatsForSpinner(limit: number, numberOfEntries: number): void {
    this.catAPIService.getCats(limit).subscribe((data: any[]) => {
      // Get a random index
      for (let i = 0; i < numberOfEntries; i++) {
        const randomIndex = Math.floor(Math.random() * data.length);
        // Get a random entry from the data array
        const randomEntry = data[randomIndex];
        this.details.push({
          name: randomEntry.name,
          description: randomEntry.description,
          image: randomEntry.image.url,
        });
      }
    });
  }
}
