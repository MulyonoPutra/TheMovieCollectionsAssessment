import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { TranslateModule } from '@ngx-translate/core';

describe('MovieListComponent', () => {
	let component: MovieListComponent;
	let fixture: ComponentFixture<MovieListComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
      imports: [MovieListComponent, TranslateModule],
		});
		fixture = TestBed.createComponent(MovieListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
