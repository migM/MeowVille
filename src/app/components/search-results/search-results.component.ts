import { Component } from '@angular/core';
import { SearchService } from '../../../services/search-service.service';
import { Router } from '@angular/router';
import { CatNameService } from '../../../services/cat-name-service.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent {
  searchResults: any[] = [];

  constructor(
    private searchService: SearchService,
    private router: Router,
    private catNameService: CatNameService
  ) {}

  ngOnInit() {
    this.searchResults = this.searchService.getSearchResults();
    if(!this.searchResults) {
      this.router.navigate(['']);
    }
  }

  seeDetails(name: string) {
    if (name.trim() !== '') {
      this.catNameService.setCatName(name);
      this.router.navigate(['/details'], {queryParams: {catName: name}});
    }
  }
}