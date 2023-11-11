import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

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
});
