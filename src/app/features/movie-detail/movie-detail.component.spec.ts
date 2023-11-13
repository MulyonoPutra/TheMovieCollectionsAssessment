import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedRoute } from '@angular/router';
import { HttpUrl } from 'src/app/shared/utils/http-url';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LocalStoreService } from 'src/app/shared/services/local-store.service';
import { MovieDetail } from 'src/app/core/models/movie-detail';
import { MovieDetailComponent } from './movie-detail.component';
import { MovieService } from 'src/app/core/services/movie.service';
import { of } from 'rxjs';

describe('MovieDetailComponent', () => {
	let component: MovieDetailComponent;
	let fixture: ComponentFixture<MovieDetailComponent>;
	let localStoreService: LocalStoreService;

	const mockMovieDetail: MovieDetail = {
		adult: false,
		backdrop_path: '/example_backdrop.jpg',
		belongs_to_collection: {
			id: 123,
			name: 'Example Collection',
			poster_path: '/example_collection_poster.jpg',
			backdrop_path: '/example_collection_backdrop.jpg',
		},
		budget: 50000000,
		genres: [
			{ id: 28, name: 'Action' },
			{ id: 12, name: 'Adventure' },
			{ id: 878, name: 'Science Fiction' },
		],
		homepage: 'https://www.example-movie.com',
		id: 9876,
		imdb_id: 'tt1234567',
		original_language: 'en',
		original_title: 'The Example Movie',
		overview: 'This is a fake movie overview for testing purposes.',
		popularity: 150.75,
		poster_path: '/example_poster.jpg',
		production_companies: [],
		production_countries: [
			{ iso_3166_1: 'US', name: 'United States of America' },
			{ iso_3166_1: 'CA', name: 'Canada' },
		],
		release_date: '2023-11-14',
		revenue: 200000000,
		runtime: 150,
		spoken_languages: [],
		status: 'Released',
		tagline: 'Experience the thrill like never before!',
		title: 'The Example Movie',
		video: false,
		vote_average: 8.5,
		vote_count: 1200,
		isFavorited: false,
	};

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
								get: () => '1',
							},
						},
					},
				},
				{
					provide: MovieService,
					useValue: {
						findMovieById: () => of({ id: 1, title: 'Movie 1', overview: 'Overview 1' } as unknown),
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
		localStoreService = TestBed.inject(LocalStoreService);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set imageUrls and poster paths in setImageUrl method', () => {
		const response = mockMovieDetail;
		component.setImageUrl(response);
		expect(component.imageUrls).toBe(
			`${HttpUrl.baseImageUrl}/${HttpUrl.imageResource}/w1920_and_h600_multi_faces_filter(duotone,00192f,00baff)/${response.backdrop_path}`,
		);
		expect(component.poster).toBe(`${HttpUrl.baseImageUrl}/${HttpUrl.imageResource}/w500/${response.poster_path}`);
	});

	it('should toggle favorite and update local storage in toggleFavorite method', () => {
		component.movie = mockMovieDetail;

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
