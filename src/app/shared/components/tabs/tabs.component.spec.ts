import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { Tabs } from 'src/app/core/models/tabs';
import { TabsComponent } from './tabs.component';

describe('TabsComponent', () => {
	let component: TabsComponent;
	let fixture: ComponentFixture<TabsComponent>;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [TabsComponent],
		});
		fixture = TestBed.createComponent(TabsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have default values for input properties', () => {
		expect(component.tabs).toEqual([]);
		expect(component.activeTabIndex).toEqual(0);
	});

	it('should set activeTabIndex and emit clicked event when setActiveTab is called', () => {
		const indexToSet = 2;
		spyOn(component.clicked, 'emit');

		component.setActiveTab(indexToSet);

		expect(component.activeTabIndex).toEqual(indexToSet);
		expect(component.clicked.emit).toHaveBeenCalledWith(indexToSet);
	});
});
