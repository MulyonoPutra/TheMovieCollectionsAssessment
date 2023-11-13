import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { HttpUrl } from 'src/app/shared/utils/http-url';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from 'src/app/core/services/movie.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('MovieDetailComponent', () => {
	let component: MovieDetailComponent;
	let fixture: ComponentFixture<MovieDetailComponent>;
	let route: ActivatedRoute;
	let movieService: MovieService;
	let localStoreService: LocalStoreService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [],
			imports: [MovieDetailComponent, LazyLoadImageModule],
			providers: [
				{
					provide: ActivatedRoute,
					useValue: {
						snapshot: {
							paramMap: {
								get: () => '1', // Sample movie ID for testing
							},
						},
					},
				},
				{
					provide: MovieService,
					useValue: {
						findMovieById: () => of({ id: 1, title: 'Movie 1', overview: 'Overview 1' } as any),
					},
				},
				{
					provide: LocalStoreService,
					useValue: {
						getItem: () => [],
						setItem: () => [],
					},
				},
			],
		});

		fixture = TestBed.createComponent(MovieDetailComponent);
		component = fixture.componentInstance;
		route = TestBed.inject(ActivatedRoute);
		movieService = TestBed.inject(MovieService);
		localStoreService = TestBed.inject(LocalStoreService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set imageUrls and poster paths in setImageUrl method', () => {
		const response = { backdrop_path: 'backdrop.jpg', poster_path: 'poster.jpg' } as any;
		component.setImageUrl(response);
		expect(component.imageUrls).toBe(
			`${HttpUrl.baseImageUrl}/${HttpUrl.imageResource}/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/${response.backdrop_path}`,
		);
		expect(component.poster).toBe(`${HttpUrl.baseImageUrl}/${HttpUrl.imageResource}/w500/${response.poster_path}`);
	});

	it('should toggle favorite and update local storage in toggleFavorite method', () => {
		component.movie = { id: 1, title: 'Movie 1', overview: 'Overview 1' } as any;
		spyOn(localStoreService, 'getItem').and.returnValue([]);
		spyOn(localStoreService, 'setItem');

		component.toggleFavorite();

		expect(component.isFavorite).toBe(true);
		expect(localStoreService.setItem).toHaveBeenCalledWith('MOVIES', [component.movie]);
	});

	it('should unsubscribe from observables on ngOnDestroy', () => {
		spyOn(component['destroy$'], 'next');
		spyOn(component['destroy$'], 'complete');

		component.ngOnDestroy();

		expect(component['destroy$'].next).toHaveBeenCalled();
		expect(component['destroy$'].complete).toHaveBeenCalled();
	});
});
