import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from 'src/app/core/services/movie.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslateModule } from '@ngx-translate/core';

describe('MovieListComponent', () => {
	let component: MovieListComponent;
	let fixture: ComponentFixture<MovieListComponent>;

	beforeEach(() => {
		const spyMovieService = jasmine.createSpyObj('MovieService', [
			'findTrendingMovies',
			'findPopularMovies',
			'findTopRatedMovies',
		]);

		const spySharedService = jasmine.createSpyObj('SharedService', ['menuItem$']);

		TestBed.configureTestingModule({
			declarations: [],
			imports: [MovieListComponent, RouterTestingModule, TranslateModule.forRoot(), InfiniteScrollModule],
			providers: [
				{ provide: MovieService, useValue: spyMovieService },
				{ provide: SharedService, useValue: spySharedService },
			],
		});

		fixture = TestBed.createComponent(MovieListComponent);
		component = fixture.componentInstance;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should unsubscribe onDestroy', () => {
		spyOn(component.destroy$, 'next');
		spyOn(component.destroy$, 'complete');

		component.ngOnDestroy();

		expect(component.destroy$.next).toHaveBeenCalled();
		expect(component.destroy$.complete).toHaveBeenCalled();
	});
});
