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

  //load cats for spinner randomly by getting a number of cats provided in the limit argument, and presents the number of entries with the latter argument
  getCatsForSpinner(limit: number, numberOfEntries: number): void {
    this.catAPIService.getCats(limit).subscribe((data: any[]) => {
      // for the event of getting an entry without the required properties, we count the entries so we can add another one in case of error
      let entriesAdded = 0;
      // Get a random index
      for (let i = 0; i < numberOfEntries; i++) {
        const randomIndex = Math.floor(Math.random() * data.length);
        // Get a random entry from the data array
        const randomEntry = data[randomIndex];

        // Check if the required fields are present in the random entry
        if (randomEntry.name && randomEntry.description && randomEntry.image && randomEntry.image.url) {
          this.details.push({
            name: randomEntry.name,
            description: randomEntry.description,
            image: randomEntry.image.url,
          });
          entriesAdded++;
        }
        this.details.push({
          name: randomEntry.name,
          description: randomEntry.description,
          image: randomEntry.image.url,
        });
      }
    });
  }
}
