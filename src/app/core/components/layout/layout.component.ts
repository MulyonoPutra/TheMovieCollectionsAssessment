import { BodyComponent } from '../body/body.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { STATIC_ICONS } from 'src/app/shared/static/static-icons';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
	selector: 'app-layout',
	standalone: true,
	imports: [CommonModule, HeaderComponent, BodyComponent, SidebarComponent],
	templateUrl: './layout.component.html',
	styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
}
