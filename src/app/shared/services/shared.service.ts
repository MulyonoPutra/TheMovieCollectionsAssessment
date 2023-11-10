import { Injectable } from '@angular/core';
import { Movie } from 'src/app/core/models/movie';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SharedService {
	/**
	 * Send movie list data from MovieListComponent to BodyComponent
	 */
	private backdropSubject = new Subject<Movie[]>();

	public backdrop$ = this.backdropSubject.asObservable();

	sendPosterData(data: Movie[]) {
		this.backdropSubject.next(data);
	}

}
