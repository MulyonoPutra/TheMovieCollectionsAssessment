import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { Movie } from 'src/app/core/models/movie';
import { MovieService } from 'src/app/core/services/movie.service';
import { SearchResultsComponent } from './search-results.component';
import { of } from 'rxjs';

describe('SearchResultsComponent', () => {
  let component: SearchResultsComponent;
  let fixture: ComponentFixture<SearchResultsComponent>;
  let router: Router;
  let route: ActivatedRoute;
  let movieService: MovieService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [SearchResultsComponent, LazyLoadImageModule, TranslateModule.forRoot()],
      providers: [
        TranslateService,
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ query: 'test' }),
          },
        },
        {
          provide: Router,
          useValue: { navigateByUrl: jasmine.createSpy('navigateByUrl') },
        },
        {
          provide: MovieService,
          useValue: {
            search: () => of({ results: [{ id: 1, title: 'Movie 1' }] } as any),
          },
        },
      ],
    });

    fixture = TestBed.createComponent(SearchResultsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
    movieService = TestBed.inject(MovieService);
  });

	it('should create', () => {
		expect(component).toBeTruthy();
	});

  it('should initialize the component with movie results in movieResults method', () => {
    spyOn(movieService, 'search').and.returnValue(of({ results: [{ id: 1, title: 'Movie 1' }] } as any));

    component.movieResults();

    expect(component.query).toBe('test');
    expect(component.movies.length).toBe(1);
  });

  it('should navigate to movie-detail route when onNavigate is called', () => {
    const movieId = 1;
    component.onNavigate(movieId);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/movie-detail/' + movieId);
  });

  it('should track movies by id in trackById method', () => {
    const mockMovie: Movie = {
      id: 1, title: 'Movie 1',
      adult: false,
      backdrop_path: '',
      genre_ids: [],
      original_language: '',
      original_title: '',
      overview: '',
      popularity: 0,
      poster_path: '',
      release_date: '',
      video: false,
      vote_average: 0,
      vote_count: 0
    };
    const result = component.trackById(0, mockMovie);
    expect(result).toBe(mockMovie.id);
  });

});
