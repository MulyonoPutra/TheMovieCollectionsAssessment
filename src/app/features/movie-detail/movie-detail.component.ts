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
	filter: string = 'w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)';

	constructor(
		private route: ActivatedRoute,
		private readonly movieService: MovieService,
	) {}
	imageUrls!: string;
	poster!: string;
	isFavorite: boolean = false;
	favIcon = StaticIcons.fav;
	favRedIcon = StaticIcons.favRed;

	movies: any[] = [];
	movieStore: any[] = [];

	ngOnInit(): void {
		this.findById();
		// Load the favorite status from local storage
		const localStore = localStorage.getItem('MOVIES');
		this.movieStore = localStore ? JSON.parse(localStore) : [];

		// Set isFavorite based on whether the movie is in the array
		this.isFavorite = this.movieStore.some((movie) => movie.id === this.movie?.id);
	}

	findById(): void {
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

	private setImageUrl(response: MovieDetail) {
		this.imageUrls = `${HttpUrl.baseImageUrl}/${HttpUrl.imageResource}/${this.filter}/${response?.backdrop_path}`;
		this.poster = `${HttpUrl.baseImageUrl}/${HttpUrl.imageResource}/w500/${response!.poster_path}`;
	}

	toggleFavorite(): void {
		// Toggle the isFavorite flag
		this.isFavorite = !this.isFavorite;

		const index = this.movieStore.findIndex((movie) => movie.id === this.movie?.id);

		if (this.isFavorite) {
			// Add the movie to the array only if it's not already in the array
			if (index === -1) {
				this.movieStore.push(this.movie);
			}
		} else {
			// Remove the movie from the array if it's in the array and is no longer a favorite
			if (index !== -1) {
				this.movieStore.splice(index, 1);
			}
		}

		// Convert the updated array to a JSON string
		const updatedArrayString = JSON.stringify(this.movieStore);
		localStorage.setItem('MOVIES', updatedArrayString);
	}

	loadStatusFavorite() {
		this.isFavorite = this.movie.isFavorited;
	}

	ngOnDestroy(): void {
		this.destroySubject.next();
		this.destroySubject.complete();
	}
}
