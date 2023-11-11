import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
	selector: 'app-footer',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
	menu: string[] = ['About', 'Blog', 'Team', 'Pricing', 'Contact', 'Terms'];

	social = [
		{
			name: 'Facebook',
			icons: '../../../../assets/icons/svg/icon-facebook.svg',
		},
		{
			name: 'Instagram',
			icons: '../../../../assets/icons/svg/icon-instagram.svg',
		},
		{
			name: 'Twitter X',
			icons: '../../../../assets/icons/svg/icon-twitter.svg',
		},
		{
			name: 'Github',
			icons: '../../../../assets/icons/svg/icon-github.svg',
		},
	];
}
