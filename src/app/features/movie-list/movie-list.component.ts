import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { Movie } from 'src/app/core/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Tabs } from 'src/app/core/models/tabs';
import { Trending } from 'src/app/core/models/trending';

type TrackByItemType = Trending | Movie;

@Component({
	selector: 'app-movie-list',
	standalone: true,
	imports: [CommonModule, ComponentsModule],
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
	private destroySubject = new Subject<void>();
	trending!: Trending[];
	movies!: Movie[];
	activeTabIndex = 0;

	tabs: Tabs[] = [
		{ label: 'Day', classes: 'inline-block p-4 rounded-t-lg' },
		{ label: 'This Week', classes: 'inline-block p-4 rounded-t-lg' },
	];

	constructor(
		private readonly moviesService: MovieService,
		private readonly sharedService: SharedService,
	) {}

	ngOnInit(): void {
		this.findAllTrendings();
		this.findPopular();
	}

	findAllTrendings() {
		this.moviesService
			.findTrendingMovies('day')
			.pipe(takeUntil(this.destroySubject))
			.subscribe({
				next: (response: Trending[]) => {
					this.trending = response;
					this.sharedService.sendPosterData(response);
				},
			});
	}

	findPopular() {
		this.moviesService
			.findPopularMovies()
			.pipe(takeUntil(this.destroySubject))
			.subscribe({
				next: (response: Movie[]) => {
					this.movies = response;
				},
			});
	}

	setActiveTab(index: number): void {
		this.activeTabIndex = index;
	}

	trackByFn(index: number, item: TrackByItemType): number {
		return item.id;
	}

	ngOnDestroy(): void {
		this.destroySubject.next();
		this.destroySubject.complete();
	}
}
