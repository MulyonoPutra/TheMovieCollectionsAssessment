import { Component, EventEmitter, Output, inject } from '@angular/core';

import { Router } from '@angular/router';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
	query!: string;
	router = inject(Router);

	@Output() clicked = new EventEmitter<string>();

	search(): void {
		this.clicked.emit(this.query);
	}
}
