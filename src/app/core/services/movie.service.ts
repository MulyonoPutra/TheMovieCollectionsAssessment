import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';

import { HttpResponseEntity } from '../models/http-response-entity';
import { HttpUrl } from 'src/app/shared/utils/http-url';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { MovieDetail } from '../models/movie-detail';
import { TopRated } from '../models/top-rated';
import { Trending } from '../models/trending';

@Injectable({
	providedIn: 'root',
})
export class MovieService {
	private readonly apiKey = HttpUrl.apiKey;

	private readonly endpoint = `${HttpUrl.baseApiUrl}/${HttpUrl.resource}`;

	constructor(private http: HttpClient) {}

	findTrendingMovies(time: string): Observable<Trending[]> {
		const url = `${this.endpoint}/trending/all/${time}`;
		const params = { api_key: this.apiKey };
		return this.http.get<HttpResponseEntity<Trending[]>>(url, { params }).pipe(
			map((response) => response.results),
			catchError(this.handleError),
		);
	}

	findPopularMovies(): Observable<Movie[]> {
		const url = `${this.endpoint}/movie/popular`;
		const params = { api_key: this.apiKey };
		return this.http.get<HttpResponseEntity<Movie[]>>(url, { params }).pipe(
			map((response) => response.results),
			catchError(this.handleError),
		);
	}

	findTopRatedMovies(): Observable<TopRated[]> {
		const url = `${this.endpoint}/movie/top_rated`;
		const params = { api_key: this.apiKey };
		return this.http.get<HttpResponseEntity<TopRated[]>>(url, { params }).pipe(
			map((response) => response.results),
			catchError(this.handleError),
		);
	}

	findMovieById(id: string): Observable<MovieDetail> {
		const url = `${this.endpoint}/movie/${id}`;
		const params = { api_key: this.apiKey };
		return this.http.get<MovieDetail>(url, { params }).pipe(
			map((data) => data),
			catchError(this.handleError),
		);
	}

	search(query: string): Observable<any> {
		const url = `${this.endpoint}/search/movie?query=${query}`;
		const params = { api_key: this.apiKey };
		return this.http.get<any>(url, { params }).pipe(
			map((data) => data),
			catchError(this.handleError),
		);
	}

	public handleError(res: HttpErrorResponse) {
		return throwError(() => new Error(res.error.message));
	}
}
