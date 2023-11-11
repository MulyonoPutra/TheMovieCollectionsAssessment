import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroComponent } from './hero.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';

describe('HeroComponent', () => {
	let component: HeroComponent;
	let fixture: ComponentFixture<HeroComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HeroComponent, LazyLoadImageModule],
		});
		fixture = TestBed.createComponent(HeroComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have an input property "poster"', () => {
		expect(component.poster).toBeUndefined();
		component.poster = 'path/to/poster.jpg';
		expect(component.poster).toEqual('path/to/poster.jpg');
	});

	it('should render the component with the provided poster', () => {
		component.poster = 'path/to/poster.jpg';
		fixture.detectChanges();
		expect(component.poster).toEqual('path/to/poster.jpg');
	});
});
