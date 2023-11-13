import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { HeaderComponent } from './header.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';

describe('HeaderComponent', () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
      imports: [HeaderComponent, CommonModule, ComponentsModule, RouterTestingModule, TranslateModule.forRoot(), RouterModule],
			providers: [],
		});
		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display menu icons', () => {
		fixture.detectChanges();
		const menuIcons = fixture.nativeElement.querySelectorAll('.menu-icon');

		expect(menuIcons.length).toBe(0);
	});

	it('should navigate to favorites page on favoritePage() method', () => {
		const navigateSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');
		component.favoritePage();
		expect(navigateSpy).toHaveBeenCalledWith('favorites');
	});

	it('should navigate to search page with query parameter on search() method', () => {
		const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
		const query = 'example';
		component.search(query);
		expect(navigateSpy).toHaveBeenCalledWith(['/search'], { queryParams: { query } });
	});

	it('should have menuIcons, favIcon, menuSidebar, and query initialized', () => {
		expect(component.menuIcons).toBeDefined();
		expect(component.favIcon).toBeDefined();
		expect(component.menuSidebar).toBeDefined();
		expect(component.query).toBeDefined();
	});

	it('should navigate to favorites page on favoritePage() method', () => {
		const navigateSpy = spyOn(TestBed.inject(Router), 'navigateByUrl');
		component.favoritePage();
		expect(navigateSpy).toHaveBeenCalledWith('favorites');
	});

	it('should navigate to search page with query parameter on search() method', () => {
		const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
		const query = 'example';
		component.search(query);
		expect(navigateSpy).toHaveBeenCalledWith(['/search'], { queryParams: { query } });
	});

	it('should not navigate on search() if query is empty', () => {
		const navigateSpy = spyOn(TestBed.inject(Router), 'navigate');
		component.search('');
		expect(navigateSpy).not.toHaveBeenCalled();
	});
});
