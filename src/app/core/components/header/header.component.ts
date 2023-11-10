import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { Router } from '@angular/router';
import { SidebarMenu } from 'src/app/shared/static/static-sidebar-menu';
import { StaticIcons } from 'src/app/shared/static/static-icons';

@Component({
	selector: 'app-header',
	standalone: true,
	imports: [CommonModule, ComponentsModule],
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
	menuIcons = StaticIcons.menu;
	favIcon = StaticIcons.favLg;
	menuSidebar = SidebarMenu;
	query: string = '';
	router = inject(Router);

	favoritePage(): void {
		this.router.navigateByUrl('favorites');
	}

	search(query: string): void {
		if (query?.trim()) {
			this.router.navigate(['/search'], { queryParams: { query: query } });
		}
	}
}
