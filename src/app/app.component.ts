import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { take, timer } from 'rxjs';

import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	title = 'the-movie-collections';
	loadingIndicator!: boolean;

	constructor(private router: Router) {
		this.showLoadingIndicator();
	}

	showLoadingIndicator(): void {
		this.router.events.subscribe((routeEvent: any) => {
			if (routeEvent instanceof NavigationStart) {
				this.loadingIndicator = true;
			}

			if (routeEvent instanceof NavigationEnd) {
				this.delay();
			}

			if (
				routeEvent instanceof NavigationEnd ||
				routeEvent instanceof NavigationError ||
				routeEvent instanceof NavigationCancel
			) {
				this.delay();
			}
		});
	}

	delay(): void {
		timer(1000)
			.pipe(take(1))
			.subscribe(() => {
				this.loadingIndicator = false;
			});
	}
}
