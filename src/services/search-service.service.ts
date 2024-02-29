import { Injectable } from '@angular/core';
import { CatAPIService } from './cat-api.service';
import { Router } from '@angular/router';
import { Observable, catchError, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchResults: any[] = [];

  constructor(private catAPIService: CatAPIService, private router: Router) { }

  search(searchQuery: string): Observable<any[]> {
    // Check if searchQuery is not empty
    if (searchQuery.trim() !== '') {
      return this.catAPIService.getCatByName(searchQuery).pipe(
        switchMap((data: any[]) => {
          this.searchResults = data.filter(cat =>
            cat.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          // Set search results
          this.setSearchResults(this.searchResults);
          // Navigate to results page
          this.router.navigate(['/results']);
          // Return the search results
          return of(this.searchResults);
        }),
        catchError(error => {
          // Handle HTTP errors here
          console.error('An error occurred while searching:', error);
          // Clear search results
          this.setSearchResults([]);
          return of([]);
        })
      );
    } else {
      // Clear search results
      this.setSearchResults([]);
      // Navigate to home page if searchQuery is empty
      this.router.navigate(['']);
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
