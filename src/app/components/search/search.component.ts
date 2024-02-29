import { Component } from '@angular/core';
import { SearchService } from '../../../services/search-service.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  public searchQuery: string = '';
  public noResults: boolean = false;
  public showHint: boolean = false;
  public errorMessage: string = ''; 

  constructor(private searchService: SearchService) {}

  //call search service with user input
  search(searchQuery: string) {
    try {
      this.searchService.search(searchQuery).subscribe((results: any[]) => {
        this.noResults = results.length === 0;
      });
    } catch (error) {
      this.errorMessage = 'An error occurred while searching.';
      console.error('Error occurred in search:', error);
    }
  }
}
