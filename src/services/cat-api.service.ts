import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CatAPIService {
  private apiKey = 'live_BXZmgofkO97ZGtX7q9QoLb3HKhCpt5mA6E7Uk7uBzenscg6oJ7mnkjLUWTXa9s5g';
  private apiUrl = 'https://api.thecatapi.com/v1';

  constructor(private http: HttpClient) { }
  
  //gets random cats
  getCats(limit: number): Observable<any> {  
    return this.http.get(`${this.apiUrl}/breeds?limit=${limit}&api_key=${this.apiKey}`);

  }

  //gets random images of cats
  // getCatImages(limit: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/images/search?limit=${limit}&api_key=${this.apiKey}`);
  // }

  //gets breeds of cats
  // getCatBreeds(limit: number): Observable<any> {
  //   return this.http.get(`${this.apiUrl}/breeds?limit=${limit}&api_key=${this.apiKey}`);
  // }
}
