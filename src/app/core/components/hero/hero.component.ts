import { Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { RouterModule } from '@angular/router';

@Component({
	selector: 'app-hero',
	standalone: true,
	imports: [CommonModule, RouterModule, LazyLoadImageModule],
	templateUrl: './hero.component.html',
	styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {
	@Input() poster!: string;
}
