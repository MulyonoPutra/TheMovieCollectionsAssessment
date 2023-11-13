import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteComponent } from './favorite.component';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { MovieDetail } from 'src/app/core/models/movie-detail';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

describe('FavoriteComponent', () => {
	let component: FavoriteComponent;
	let fixture: ComponentFixture<FavoriteComponent>;
	let router: Router;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [FavoriteComponent, TranslateModule.forRoot()],
			providers: [
				{
					provide: Router,
					useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') },
				},
				{
					provide: LocalStoreService,
					useValue: {
						getItem: jasmine.createSpy('getItem').and.returnValue([]),
					},
				},
			],
		});
		fixture = TestBed.createComponent(FavoriteComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		router = TestBed.inject(Router);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should navigate to movie-detail route when onNavigate is called', () => {
		const movieId = 1;
		component.onNavigate(movieId);

		expect(router.navigateByUrl).toHaveBeenCalledWith('/movie-detail/' + movieId);
	});

	it('should track movies by id in trackById method', () => {
		const mockMovie: MovieDetail = {
			id: 1,
			title: 'Movie 1',
			adult: false,
			backdrop_path: '',
			budget: 0,
			genres: [],
			homepage: '',
			imdb_id: '',
			original_language: '',
			original_title: '',
			overview: '',
			popularity: 0,
			poster_path: '',
			production_companies: [],
			production_countries: [],
			release_date: '',
			revenue: 0,
			runtime: 0,
			spoken_languages: [],
			status: '',
			tagline: '',
			video: false,
			vote_average: 0,
			vote_count: 0,
			isFavorited: false,
		};
		const result = component.trackById(0, mockMovie);

		expect(result).toBe(mockMovie.id);
	});

	it('should navigate to movie-detail route with the correct ID', () => {
		const movieId = 1;
		component.onNavigate(movieId);
		expect(router.navigateByUrl).toHaveBeenCalledWith('/movie-detail/' + movieId);
	});
});
