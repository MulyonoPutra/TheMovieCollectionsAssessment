import { Component } from '@angular/core';
import { STATIC_IMAGES } from '../../static/static-images';

@Component({
	selector: 'app-logo',
	templateUrl: './logo.component.html',
	styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
	logo: string = STATIC_IMAGES.logo;
}
