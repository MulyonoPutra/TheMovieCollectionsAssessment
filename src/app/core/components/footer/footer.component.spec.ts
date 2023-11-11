import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
	let component: FooterComponent;
	let fixture: ComponentFixture<FooterComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [FooterComponent],
		});
		fixture = TestBed.createComponent(FooterComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display menu items', () => {
		fixture.detectChanges();
		const menuItems = fixture.nativeElement.querySelectorAll('nav a');

		expect(menuItems.length).toBe(component.menu.length);

		menuItems.forEach((menuItem: any, index: number) => {
			expect(menuItem?.textContent.trim()).toBe(component.menu[index]);
		});
	});

	it('should display the copyright text', () => {
		fixture.detectChanges();
		const copyrightText = fixture.nativeElement.querySelector('.wrapper p');

		expect(copyrightText?.textContent.trim()).toBe('© 2021 Admit One, Inc. All rights reserved.');
	});
});
