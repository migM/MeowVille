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

  constructor(private searchService: SearchService) {}

  search(searchQuery: string) {
    this.searchService.search(searchQuery);
  }
}
