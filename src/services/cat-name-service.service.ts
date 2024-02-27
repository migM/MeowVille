import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CatNameServiceService {
  constructor() {}

  private catName: string = '';

  setCatName(name: string) {
    this.catName = name;
  }

  getCatName(): string {
    return this.catName;
  }
}
