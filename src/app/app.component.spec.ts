import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SpinnerComponent } from './shared/components/spinner/spinner.component';
import { TestBed } from '@angular/core/testing';

describe('AppComponent', () => {
	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [RouterTestingModule],
			declarations: [AppComponent, SpinnerComponent],
		}),
	);

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'the-movie-collections'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.componentInstance;
		expect(app.title).toEqual('the-movie-collections');
	});
});
