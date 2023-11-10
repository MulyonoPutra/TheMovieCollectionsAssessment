import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Tabs } from 'src/app/core/models/tabs';

@Component({
	selector: 'app-tabs',
	templateUrl: './tabs.component.html',
	styleUrls: ['./tabs.component.scss'],
})
export class TabsComponent {
	@Input() tabs: Tabs[] = [];
	@Input() activeTabIndex: number = 0;
	@Output() clicked = new EventEmitter<number>();

	setActiveTab(index: number): void {
		this.activeTabIndex = index;
		this.clicked.emit(index);
	}
}
