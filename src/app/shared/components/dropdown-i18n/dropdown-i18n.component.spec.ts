import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownI18nComponent } from './dropdown-i18n.component';

describe('DropdownI18nComponent', () => {
	let component: DropdownI18nComponent;
	let fixture: ComponentFixture<DropdownI18nComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [DropdownI18nComponent],
		});
		fixture = TestBed.createComponent(DropdownI18nComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
