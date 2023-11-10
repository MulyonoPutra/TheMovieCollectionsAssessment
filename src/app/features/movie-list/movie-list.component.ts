import { Component, OnDestroy, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { Movie } from 'src/app/core/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Trending } from 'src/app/core/models/trending';

@Component({
	selector: 'app-movie-list',
	standalone: true,
	imports: [CommonModule, ComponentsModule],
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
	trending!: Trending[];
	movies!: Movie[];
	activeTabIndex = 0;

	constructor(
		private readonly moviesService: MovieService,
		private readonly sharedService: SharedService,
	) {}

	ngOnInit(): void {
		this.findAllTrendings();
		this.findPopular();
	}

	findAllTrendings() {
		this.moviesService.findTrendingMovies('day').subscribe({
			next: (response: Trending[]) => {
				this.trending = response;
				this.sharedService.sendPosterData(response);
			},
		});
	}

	findPopular() {
		this.moviesService.findPopularMovies().subscribe({
			next: (response: Movie[]) => {
				this.movies = response;
			},
		});
	}

	tabs = [
		{ label: 'Day', classes: 'inline-block p-4 rounded-t-lg' },
		{ label: 'This Week', classes: 'inline-block p-4 rounded-t-lg' },
	];

	setActiveTab(index: number): void {
		this.activeTabIndex = index;
	}

	trackByFn(index: number, item: Trending | Movie): number {
		return item.id;
	}

	ngOnDestroy(): void {}
}
