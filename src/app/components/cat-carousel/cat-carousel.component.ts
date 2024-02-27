import { Component } from '@angular/core';
import { CatAPIService } from '../../../services/cat-api.service';

@Component({
  selector: 'app-cat-carousel',
  templateUrl: './cat-carousel.component.html',
  styleUrl: './cat-carousel.component.scss'
})
export class CatCarouselComponent {
  // slides: any[] = new Array(3).fill({id: -1, src: '', title: '', subtitle: ''});

  public catCarouselItems : any[] | undefined;
  private catStatements = [
    { description: 'Purrrfect!',
      author: 'The New Yarn Times' },
      { description: 'PAW-Tastic!',
      author: 'Vanity Fur' },
      { description: 'Furreal!',
      author: 'Cosmopawlitan' },
      { description: 'Pawsitively delightful.',
      author: 'Meow Yorker' },
      { description: 'Meowvelous',
      author: 'Cat Digest' }
  ]

  constructor(private catService: CatAPIService) { }

  ngOnInit(): void {
    this.getCatImages(5);
  }

  getCatImages(limit: number): void {
    this.catService.getCatImages(limit).subscribe(data => {
      this.catCarouselItems = data.map((cat: { url: string }, index: number ) => {
        return {src: cat.url, statement: this.catStatements[index]}});
    });
  }
}