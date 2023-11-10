import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentsModule } from 'src/app/shared/components/components.module';
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
	menuSidebar = SidebarMenu;
}
