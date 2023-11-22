import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpUrl } from 'src/app/shared/utils/http-url';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
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
	private destroy$ = new Subject<void>();
	movie!: MovieDetail;
	imageUrls!: string;
	poster!: string;
	isFavorite = false;
	favIcon = StaticIcons.fav;
	favRedIcon = StaticIcons.favRed;
	movieStore: MovieDetail[] = [];

	constructor(
		private readonly route: ActivatedRoute,
		private readonly movieService: MovieService,
		private readonly localStorageService: LocalStoreService,
	) {}

	ngOnInit(): void {
		this.findById();

		this.movieStore = this.localStorageService.getItem('MOVIES');
    if(this.movieStore){
      this.isFavorite = this.movieStore.some((movie) => movie.id === this.movie.id);
    }
	}

	findById(): void {
		const id = this.route.snapshot.paramMap.get('id');
		if (id) {
			this.movieService
				.findMovieById(id)
				.pipe(takeUntil(this.destroy$))
				.subscribe({
					next: (response: MovieDetail) => {
						this.movie = response;

            if(this.movieStore){
              this.isFavorite = this.movieStore.some((movie) => movie.id === this.movie.id);
            }
						this.movie.isFavorited = this.isFavorite;
						this.setImageUrl(response);
					},
				});
		}
	}

	toggleFavorite(): void {
		this.isFavorite = !this.isFavorite;

		const index = this.movieStore.findIndex((movie) => movie.id === this.movie?.id);

		if (this.isFavorite && index === -1) {
			this.movieStore.push(this.movie);
		} else if (!this.isFavorite && index !== -1) {
			this.movieStore.splice(index, 1);
		}

		this.localStorageService.setItem('MOVIES', this.movieStore);
	}

	setImageUrl(response: MovieDetail) {
		const filter = 'w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)';
		this.imageUrls = `${HttpUrl.baseImageUrl}/${HttpUrl.imageResource}/${filter}/${response?.backdrop_path}`;
		this.poster = `${HttpUrl.baseImageUrl}/${HttpUrl.imageResource}/w500/${response.poster_path}`;
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
