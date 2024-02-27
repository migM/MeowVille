import { Component } from '@angular/core';
import { CatAPIService } from '../../../services/cat-api.service';
import { SearchService } from '../../../services/search-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private catAPIService: CatAPIService,
    private router: Router,
    private searchService: SearchService) {}

  //fetches cats based on user input
  search(searchQuery: string) {
    this.searchQuery = searchQuery;
    if (this.searchQuery.trim() !== '') {
      this.catAPIService.getCatByName(searchQuery).subscribe((data: any[]) => {
        this.searchResults = data.filter((cat) =>
          cat.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        this.searchService.setSearchResults(this.searchResults);
        this.router.navigate(['/results'], { state: { searchResults: this.searchResults } });
      });
    }
  }
}
