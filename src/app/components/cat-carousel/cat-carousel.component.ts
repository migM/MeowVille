import { Component } from '@angular/core';
import { CatAPIService } from '../../../services/cat-api.service';
import { Router } from '@angular/router';
import { CatNameService } from '../../../services/cat-name-service.service';

@Component({
  selector: 'app-cat-carousel',
  templateUrl: './cat-carousel.component.html',
  styleUrl: './cat-carousel.component.scss',
})
export class CatCarouselComponent {
  public details: { name: string; description: string; image: string }[] = [];
  public selectedCat: any;

  constructor(
    private catAPIService: CatAPIService,
    private router: Router,
    private catNameService: CatNameService
  ) {}

  ngOnInit(): void {
    this.getCatsForSpinner(50, 5);
  }

  //load cats for spinner randomly by getting a number of cats provided in the limit argument, and presents the number of entries with the latter argument
  getCatsForSpinner(limit: number, numberOfEntries: number): void {
    this.catAPIService.getCats(limit).subscribe((data: any[]) => {
      let entriesAdded = 0;
      while (entriesAdded < numberOfEntries) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomEntry = data[randomIndex];

        // Check if the required fields are present in the random entry
        if (
          randomEntry.name &&
          randomEntry.description &&
          randomEntry.image &&
          randomEntry.image.url
        ) {
          this.details.push({
            name: randomEntry.name,
            description: randomEntry.description,
            image: randomEntry.image.url,
          });
          entriesAdded++;
        }
      }
    });
  }
  
  //opens details page with relevant cat selected
  seeCatDetails(catName: string): void {
    if (catName.trim() !== '') {
      this.catNameService.setCatName(catName);
      this.router.navigate(['/details'], {queryParams: {catName: catName}});
    }
  }
}
