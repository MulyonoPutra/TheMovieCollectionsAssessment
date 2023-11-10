import { Component } from '@angular/core';
import { StaticImages } from '../../static/static-images';

@Component({
	selector: 'app-logo',
	templateUrl: './logo.component.html',
	styleUrls: ['./logo.component.scss'],
})
export class LogoComponent {
	logo: string = StaticImages.logo;
}
