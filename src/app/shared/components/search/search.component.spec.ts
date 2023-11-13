import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
	let component: SearchComponent;
	let fixture: ComponentFixture<SearchComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [SearchComponent],
			imports: [RouterModule, FormsModule],
			providers: [{ provide: Router, useValue: {} }],
		});
		fixture = TestBed.createComponent(SearchComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize query as undefined', () => {
		expect(component.query).toBeUndefined();
	});

	it('should emit clicked event with the query when search is called', () => {
		const query = 'test';
		const spy = spyOn(component.clicked, 'emit');

		component.query = query;
		component.search();

		expect(spy).toHaveBeenCalledWith(query);
	});
});
