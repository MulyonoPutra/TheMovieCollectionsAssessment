import { Observable, map } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { HttpResponseEntity } from '../models/http-response-entity';
import { Injectable } from '@angular/core';
import { Trending } from '../models/trending';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly apiKey = '34bd9be2989668b394220b928e4c21e2';
  private readonly apiUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

  findTrendingMovies(time: string): Observable<Trending[]> {
    const url = `${this.apiUrl}/trending/all/${time}`;
    const params = { api_key: this.apiKey };
    return this.http
      .get<HttpResponseEntity<Trending[]>>(url, { params })
      .pipe(map((response) => response.results));
  }

  findPopularMovies(): Observable<Trending[]> {
    const url = `${this.apiUrl}/movie/popular`;
    const params = { api_key: this.apiKey };
    return this.http
      .get<HttpResponseEntity<Trending[]>>(url, { params })
      .pipe(map((response) => response.results));
  }
}
