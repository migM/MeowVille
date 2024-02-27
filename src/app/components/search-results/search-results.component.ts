import { Component } from '@angular/core';
import { SearchService } from '../../../services/search-service.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  searchResults: any[] = [];

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchResults = this.searchService.getSearchResults();
  }
}
