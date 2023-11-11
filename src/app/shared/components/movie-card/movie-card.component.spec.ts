import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MovieCardComponent } from './movie-card.component';
import { ShortenerTextPipe } from '../../pipes/shortener-text.pipe';

describe('MovieCardComponent', () => {
	let component: MovieCardComponent;
	let fixture: ComponentFixture<MovieCardComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [MovieCardComponent],
			imports: [ShortenerTextPipe, LazyLoadImageModule],
		});
		fixture = TestBed.createComponent(MovieCardComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should toggleFavorite correctly', () => {
		expect(component.isFavorite).toBeFalse();

		component.toggleFavorite();
		expect(component.isFavorite).toBeTrue();

		component.toggleFavorite();
		expect(component.isFavorite).toBeFalse();
	});

	it('should emit clicked event on onNavigate', () => {
		spyOn(component.clicked, 'emit');
		component.onNavigate();
		expect(component.clicked.emit).toHaveBeenCalled();
	});
});
