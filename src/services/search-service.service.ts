import { Injectable } from '@angular/core';
import { CatAPIService } from './cat-api.service';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchResults: any[] = [];

  constructor(private catAPIService: CatAPIService, private router: Router) {}

  search(searchQuery: string): Observable<any[]> {
    // Check if searchQuery is not empty
    if (searchQuery.trim() !== '') {
      // Use switchMap to chain the HTTP request and the subsequent logic
      return this.catAPIService.getCatByName(searchQuery).pipe(
        switchMap((data: any[]) => {
          if (data.length === 0) {
            // Handle case where no results are found
            this.router.navigate(['/no-results']);
            // Return an empty array if no results are found
            return of([]);
          } else {
            this.searchResults = data.filter(cat =>
              cat.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            if (this.searchResults.length === 0) {
              this.router.navigate(['']);
            } else {
              // Set search results and navigate to the results page
              this.setSearchResults(this.searchResults);
              this.router.navigate(['/results']);
            }
            // Return the search results
            return of(this.searchResults);
          }
        })
      );
    } else {
      // Navigate to home page if searchQuery is empty
      this.router.navigate(['']);
      // Return an empty array
      return of([]);
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
