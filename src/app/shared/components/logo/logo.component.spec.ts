import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { LogoComponent } from './logo.component';

describe('LogoComponent', () => {
	let component: LogoComponent;
	let fixture: ComponentFixture<LogoComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [LogoComponent],
		});
		fixture = TestBed.createComponent(LogoComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set logo correctly', () => {
		expect(component.logo).toEqual('../../../../assets/images/ticket.png');
	});

	it('should render logo image with correct src attribute', () => {
		const imgElement = fixture.debugElement.query(By.css('img')).nativeElement;
		expect(imgElement.getAttribute('src')).toEqual('../../../../assets/images/ticket.png');
	});
});
