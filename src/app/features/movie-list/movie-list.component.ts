import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { HeroComponent } from 'src/app/core/components/hero/hero.component';
import { HttpErrorResponse } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Movie } from 'src/app/core/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Tabs } from 'src/app/core/models/tabs';
import { TopRated } from 'src/app/core/models/top-rated';
import { TranslateModule } from '@ngx-translate/core';
import { Trending } from 'src/app/core/models/trending';

type TrackByItemType = Trending | Movie | TopRated;

@Component({
	selector: 'app-movie-list',
	standalone: true,
	imports: [
		CommonModule,
		ComponentsModule,
		LazyLoadImageModule,
		HeroComponent,
		TranslateModule,
		InfiniteScrollModule,
	],
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
	destroy$ = new Subject<void>();
	movies!: Movie[];
	trending!: Trending[];
	topRated!: TopRated[];

	poster!: string;

	menuId!: number;
	page = 1;
	throttle = 0;
	distance = 2;
	activeTabIndex = 0;

	isLoading = false;
	isMediumSize = false;

	defaultTime = 'day';

	tabs: Tabs[] = [
		{ label: 'Day', classes: 'inline-block p-4 rounded-t-lg' },
		{ label: 'This Week', classes: 'inline-block p-4 rounded-t-lg' },
	];

	constructor(
		private readonly moviesService: MovieService,
		private readonly sharedService: SharedService,
		private readonly router: Router,
	) {}

	ngOnInit(): void {
		this.findAllTrendings(this.defaultTime);
		this.findPopular();
		this.findTopRated();
		this.onReceiveFromHeader();
		this.mediumScreenSize();
	}

	findAllTrendings(time: string): void {
		this.moviesService
			.findTrendingMovies(time)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (response: Trending[]) => {
					this.trending = response;
				},
				error: (error: HttpErrorResponse) => {
					console.error(error);
				},
			});
	}

	findPopular(): void {
		this.moviesService
			.findPopularMovies(++this.page)
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (response: Movie[]) => {
					this.movies = response;
				},
				error: (error: HttpErrorResponse) => {
					console.error(error);
				},
				complete: () => this.toggleLoading(),
			});
	}

	findTopRated(): void {
		this.moviesService
			.findTopRatedMovies()
			.pipe(takeUntil(this.destroy$))
			.subscribe({
				next: (response: TopRated[]) => {
					this.topRated = response;
					this.generateBackdropPath(response);
				},
				error: (error: HttpErrorResponse) => {
					console.error(error);
				},
			});
	}

	setActiveTab(index: number): void {
		this.activeTabIndex = index;
		const time = index === 0 ? 'day' : 'week';
		this.findAllTrendings(time);
	}

	trackByFn(index: number, item: TrackByItemType): number {
		return item.id;
	}

	onNavigate(id: number): void {
		this.router.navigateByUrl('/movie-detail/' + id);
	}

	generateBackdropPath(data: TopRated[]): string {
		const url = 'https://www.themoviedb.org/t/p';
		const filter = 'w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)';
		const randomIndex = Math.floor(Math.random() * data.length);
		const backdrop = data[randomIndex].backdrop_path;
		this.poster = `${url}/${filter}/${backdrop}`;
		return this.poster;
	}

	onReceiveFromHeader(): void {
		this.sharedService.menuItem$.subscribe({
			next: (id) => {
				this.menuId = id;
			},
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize(): void {
		this.mediumScreenSize();
	}

	mediumScreenSize(): void {
		const width = window.innerWidth;
		this.isMediumSize = width >= 600 && width <= 1024;
	}

	toggleLoading(): void {
		this.isLoading = !this.isLoading;
	}

	ngOnDestroy(): void {
		this.destroy$.next();
		this.destroy$.complete();
	}
}
