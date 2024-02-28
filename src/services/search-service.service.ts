import { Injectable } from '@angular/core';
import { CatAPIService } from './cat-api.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchResults: any[] = [];

  constructor(private catAPIService: CatAPIService, private router: Router) {}

  search(searchQuery: string) {
    if (searchQuery.trim() !== '') {
      this.catAPIService.getCatByName(searchQuery).subscribe((data: any[]) => {
        if (data.length === 0) {
          // Handle case where no results are found
          this.router.navigate(['/no-results']);
        } else {
          this.searchResults = data.filter(cat =>
            cat.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          this.setSearchResults(this.searchResults);
          this.router.navigate(['/results']);
        }
      });
    }
  }

  //getters and setters for communication between search component and results component
  setSearchResults(results: any[]) {
    this.searchResults = results;
  }

  getSearchResults() {
    return this.searchResults;
  }
}
