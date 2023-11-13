import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BehaviorSubject } from 'rxjs';
import { LoadingService } from '../../services/loading.service';
import { SpinnerComponent } from './spinner.component';

describe('SpinnerComponent', () => {
	let component: SpinnerComponent;
	let fixture: ComponentFixture<SpinnerComponent>;
	let loadingService: LoadingService;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [SpinnerComponent],
			providers: [LoadingService],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SpinnerComponent);
		component = fixture.componentInstance;
		loadingService = TestBed.inject(LoadingService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should hide the spinner when loadingIndicator is false', () => {
		component.loadingIndicator = false;

		fixture.detectChanges();

		const spinnerElement = fixture.nativeElement.querySelector('.loading');
		expect(spinnerElement).toBeFalsy();
	});
});
