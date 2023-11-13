import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MovieListComponent } from './movie-list.component';
import { MovieService } from 'src/app/core/services/movie.service';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedService } from 'src/app/shared/services/shared.service';
import { TranslateModule } from '@ngx-translate/core';
import { Trending } from 'src/app/core/models/trending';
import { of } from 'rxjs';

describe('MovieListComponent', () => {

  let component: MovieListComponent;
  let fixture: ComponentFixture<MovieListComponent>;
  let movieServiceSpy: jasmine.SpyObj<MovieService>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;

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

    movieServiceSpy = TestBed.inject(MovieService) as jasmine.SpyObj<MovieService>;
    sharedServiceSpy = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;

    fixture = TestBed.createComponent(MovieListComponent);
    component = fixture.componentInstance;
  });

	it('should create', () => {
		expect(component).toBeTruthy();
	});

  it('should unsubscribe onDestroy', () => {
    spyOn(component.destroySubject, 'next');
    spyOn(component.destroySubject, 'complete');

    component.ngOnDestroy();

    expect(component.destroySubject.next).toHaveBeenCalled();
    expect(component.destroySubject.complete).toHaveBeenCalled();
  });
});
