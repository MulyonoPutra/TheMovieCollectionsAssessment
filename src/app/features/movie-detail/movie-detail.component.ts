import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpUrl } from 'src/app/shared/utils/http-url';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MovieDetail } from 'src/app/core/models/movie-detail';
import { MovieService } from 'src/app/core/services/movie.service';

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

	ngOnInit(): void {
		this.findById();
	}

	findById(): void {
		const id = this.route.snapshot.paramMap.get('id')!;
		this.movieService
			.findMovieById(id)
			.pipe(takeUntil(this.destroySubject))
			.subscribe({
				next: (response: MovieDetail) => {
					this.movie = response;
					this.imageUrls = `${HttpUrl.baseImageUrl}/${HttpUrl.imageResource}/${this.filter}/${this.movie?.backdrop_path}`;
					this.poster = `${HttpUrl.baseImageUrl}/${HttpUrl.imageResource}/w500/${this.movie!.poster_path}`;
				},
			});
	}

	ngOnDestroy(): void {
		this.destroySubject.next();
		this.destroySubject.complete();
	}
}
