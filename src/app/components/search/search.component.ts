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

  constructor(private searchService: SearchService) {}

  search(searchQuery: string) {
    this.searchService.search(searchQuery).subscribe((results: any[]) => {
      this.noResults = results.length === 0;
    });
  }
}
