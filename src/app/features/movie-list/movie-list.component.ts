import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { HeroComponent } from 'src/app/core/components/hero/hero.component';
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
	imports: [CommonModule, ComponentsModule, LazyLoadImageModule, HeroComponent, TranslateModule],
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.scss'],
})
export class MovieListComponent implements OnInit, OnDestroy {
	private destroySubject = new Subject<void>();
	movies!: Movie[];
	trending!: Trending[];
	topRated!: TopRated[];

	poster!: string;
	menuId!: number;
	activeTabIndex = 0;

	isMediumSize: boolean = false;

	tabs: Tabs[] = [
		{ label: 'Day', classes: 'inline-block p-4 rounded-t-lg' },
		{ label: 'This Week', classes: 'inline-block p-4 rounded-t-lg' },
	];

	private defaultTime: string = 'day';

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

	private findAllTrendings(time: string): void {
		this.moviesService
			.findTrendingMovies(time)
			.pipe(takeUntil(this.destroySubject))
			.subscribe({
				next: (response: Trending[]) => {
					this.trending = response;
				},
				error: () => {},
				complete: () => {},
			});
	}

	private findPopular(): void {
		this.moviesService
			.findPopularMovies()
			.pipe(takeUntil(this.destroySubject))
			.subscribe({
				next: (response: Movie[]) => {
					this.movies = response;
					this.generateBackdropPath(response);
				},
				error: () => {},
				complete: () => {},
			});
	}

	private findTopRated(): void {
		this.moviesService
			.findTopRatedMovies()
			.pipe(takeUntil(this.destroySubject))
			.subscribe({
				next: (response: TopRated[]) => {
					this.topRated = response;
				},
				error: () => {},
				complete: () => {},
			});
	}

	protected setActiveTab(index: number): void {
		this.activeTabIndex = index;
		const time = index === 0 ? 'day' : 'week';
		this.findAllTrendings(time);
	}

	protected trackByFn(index: number, item: TrackByItemType): number {
		return item.id;
	}

	protected onNavigate(id: number): void {
		this.router.navigateByUrl('/movie-detail/' + id);
	}

	generateBackdropPath(data: any): string {
		const url: string = 'https://www.themoviedb.org/t/p';
		const filter: string = 'w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)';
		let randomIndex = Math.floor(Math.random() * data.length);
		let backdrop = data[randomIndex].backdrop_path;
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

	mediumScreenSize() {
		const width = window.innerWidth;
		this.isMediumSize = width >= 600 && width <= 1024;
	}

	ngOnDestroy(): void {
		this.destroySubject.next();
		this.destroySubject.complete();
	}
}
