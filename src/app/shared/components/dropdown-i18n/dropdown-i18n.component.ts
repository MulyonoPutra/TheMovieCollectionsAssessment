import { Component, OnInit } from '@angular/core';

import { LanguageOptions } from 'src/app/core/models/language-options';
import { TranslateService } from '@ngx-translate/core';
import { langOptions } from '../../utils/lang-options';

@Component({
	selector: 'app-dropdown-i18n',
	templateUrl: './dropdown-i18n.component.html',
	styleUrls: ['./dropdown-i18n.component.scss'],
})
export class DropdownI18nComponent implements OnInit {
	public language!: LanguageOptions;
	public languageOptions: LanguageOptions[] = langOptions;
	public isShowDropdown: boolean = false;

	constructor(public translate: TranslateService) {}

	ngOnInit(): void {
		this.setDefaultLanguage();
	}

	public changeLanguage(lang: string): void {
		this.translate.use(lang);
	}

	protected setDefaultLanguage(): void {
		this.translate.addLangs(['en', 'in']);
		this.translate.setDefaultLang('in');
		const browserLang = this.translate.getBrowserLang()!;
		this.translate.use(browserLang.match(/en|in/) ? browserLang : 'in');

		if (this.languageOptions.length > 0) {
			const [defaultLang] = this.languageOptions;
			this.language = {
				name: defaultLang.name,
				code: defaultLang.code,
				flagUrl: defaultLang.flagUrl,
			};
		}
	}

	public onLanguageChange(language: LanguageOptions): void {
		this.language = {
			name: language.name,
			code: language.code,
			flagUrl: language.flagUrl,
		};

		this.isShowDropdown = false;
		this.translate.use(language.code);
	}

	public openDropdown(): void {
		this.isShowDropdown = !this.isShowDropdown;
	}
}
