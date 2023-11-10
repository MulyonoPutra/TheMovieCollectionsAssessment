import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
	selector: 'app-sidebar',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {}
