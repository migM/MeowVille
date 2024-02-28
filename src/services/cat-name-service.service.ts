import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CatNameService {
  constructor() {}

  private catName: string = '';

  //getters and setters for communication between carousel, details components
  setCatName(name: string) {
    this.catName = name;
  }

  getCatName(): string {
    return this.catName;
  }
}
