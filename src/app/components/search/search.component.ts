import { Component } from '@angular/core';
import { CatAPIService } from '../../../services/cat-api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchQuery: string = '';
  searchResults: any[] = [];

  constructor(private catAPIService: CatAPIService) { }

  search() {
    if (this.searchQuery.trim() !== '') {
      this.catAPIService.getCats(10)
        .subscribe((data: any[]) => {
          this.searchResults = data.filter(cat => cat.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        });
    }
  }
}
