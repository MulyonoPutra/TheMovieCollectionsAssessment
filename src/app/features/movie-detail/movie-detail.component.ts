import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpUrl } from 'src/app/shared/utils/http-url';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MovieDetail } from 'src/app/core/models/movie-detail';
import { MovieService } from 'src/app/core/services/movie.service';
import { StaticIcons } from 'src/app/shared/static/static-icons';

@Component({
	standalone: true,
	imports: [CommonModule, LazyLoadImageModule],
	templateUrl: './movie-detail.component.html',
	styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit, OnDestroy {
	private destroySubject = new Subject<void>();
	movie!: MovieDetail;
	imageUrls!: string;
	poster!: string;
	isFavorite: boolean = false;
	favIcon = StaticIcons.fav;
	favRedIcon = StaticIcons.favRed;
	movieStore: MovieDetail[] = [];

	constructor(
		private readonly route: ActivatedRoute,
		private readonly movieService: MovieService,
	) {}

	ngOnInit(): void {
		this.findById();
		// Load the favorite status from local storage
		const localStore = localStorage.getItem('MOVIES');
		this.movieStore = localStore ? JSON.parse(localStore) : [];

		// Set isFavorite based on whether the movie is in the array
		this.isFavorite = this.movieStore.some((movie) => movie.id === this.movie?.id);
	}

	private findById(): void {
		const id = this.route.snapshot.paramMap.get('id')!;
		this.movieService
			.findMovieById(id)
			.pipe(takeUntil(this.destroySubject))
			.subscribe({
				next: (response: MovieDetail) => {
					this.movie = response;
					// Set isFavorite based on whether the movie is in the array
					this.isFavorite = this.movieStore.some((movie) => movie.id === this.movie?.id);

					// Update the movie's isFavorited property
					this.movie.isFavorited = this.isFavorite;
					this.setImageUrl(response);
				},
			});
	}

	toggleFavorite(): void {
		// Toggle the isFavorite flag
		this.isFavorite = !this.isFavorite;

		const index = this.movieStore.findIndex((movie) => movie.id === this.movie?.id);

		if (this.isFavorite && index === -1) {
			this.movieStore.push(this.movie);
		} else if (!this.isFavorite && index !== -1) {
			this.movieStore.splice(index, 1);
		}

		// Convert the updated array to a JSON string
		const movieStoreUpdated = JSON.stringify(this.movieStore);
		localStorage.setItem('MOVIES', movieStoreUpdated);
	}

	private setImageUrl(response: MovieDetail) {
		const filter = 'w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)';
		this.imageUrls = `${HttpUrl.baseImageUrl}/${HttpUrl.imageResource}/${filter}/${response?.backdrop_path}`;
		this.poster = `${HttpUrl.baseImageUrl}/${HttpUrl.imageResource}/w500/${response!.poster_path}`;
	}

	ngOnDestroy(): void {
		this.destroySubject.next();
		this.destroySubject.complete();
	}
}
