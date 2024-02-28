import { Component, OnInit } from '@angular/core';
import { CatAPIService } from '../../../services/cat-api.service';
import { Router } from '@angular/router';
import { CatNameService } from '../../../services/cat-name-service.service';

@Component({
  selector: 'app-cat-carousel',
  templateUrl: './cat-carousel.component.html',
  styleUrl: './cat-carousel.component.scss',
})
export class CatCarouselComponent implements OnInit {
  public details: { name: string; description: string; image: string }[] = [];
  public selectedCat: any;

  constructor(
    private catAPIService: CatAPIService,
    private router: Router,
    private catNameService: CatNameService
  ) { }

  ngOnInit(): void {
    this.getCatsForSpinner(50, 5);
  }

  //load cats for spinner randomly by getting a number of cats provided in the limit argument, and presents the number of entries with the latter argument
  getCatsForSpinner(limit: number, numberOfEntries: number): void {
    this.catAPIService.getCats(limit).subscribe((data: any[]) => {
      const catsWithInformation = data.filter(cat => this.catHasAllInformation(cat));
      for (let i = 0; i < numberOfEntries; i++) {

        // from the number of entries, we get an index of cats we will use to populate the carousel
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomEntry = catsWithInformation[randomIndex];

        // builds the object to be sent to the carousel
        if (randomEntry) {
          this.details.push({
            name: randomEntry.name,
            description: randomEntry.description,
            image: randomEntry.image.url,
          })
        }
      }
    });
  }

  // returns all info the cat provides relevant to the carousel 
  private catHasAllInformation(cat: any) {
    return !!cat && !!cat.name && !!cat.description && !!cat.image && !!cat.image.url;
  }

  //opens details page with relevant cat selected
  seeCatDetails(catName: string): void {
    if (catName.trim() !== '') {
      this.catNameService.setCatName(catName);
      this.router.navigate(['/details'], { queryParams: { catName: catName } });
    }
  }
}