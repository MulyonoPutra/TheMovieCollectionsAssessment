import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { DropdownI18nComponent } from './dropdown-i18n.component';
import { LanguageOptions } from 'src/app/core/models/language-options';

describe('DropdownI18nComponent', () => {
	let component: DropdownI18nComponent;
	let fixture: ComponentFixture<DropdownI18nComponent>;
	let translateService: TranslateService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			declarations: [DropdownI18nComponent],
			imports: [TranslateModule.forRoot()],
		});
		fixture = TestBed.createComponent(DropdownI18nComponent);
		component = fixture.componentInstance;
		translateService = TestBed.inject(TranslateService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should set default language and language options on initialization', () => {
		const defaultLang = 'in';
		spyOn(translateService, 'setDefaultLang');
		spyOn(translateService, 'use');
		spyOn(translateService, 'addLangs');
		spyOn(translateService, 'getBrowserLang').and.returnValue(defaultLang);

		component.ngOnInit();

		expect(translateService.setDefaultLang).toHaveBeenCalledWith(defaultLang);
		expect(translateService.use).toHaveBeenCalledWith(defaultLang);
		expect(translateService.addLangs).toHaveBeenCalledWith(['en', 'in']);
	});

	it('should change language when calling changeLanguage method', () => {
		const lang = 'en';
		spyOn(translateService, 'use');
		component.changeLanguage(lang);
		expect(translateService.use).toHaveBeenCalledWith(lang);
	});

	it('should update language and close dropdown when calling onLanguageChange method', () => {
		const language: LanguageOptions = {
			name: 'English',
			code: 'en',
			flagUrl: 'path/to/flag.png',
		};

		spyOn(translateService, 'use');
		component.onLanguageChange(language);

		expect(component.language).toEqual(language);
		expect(component.isShowDropdown).toBe(false);
		expect(translateService.use).toHaveBeenCalledWith(language.code);
	});

	it('should toggle isShowDropdown when calling openDropdown method', () => {
		component.isShowDropdown = false;
		component.openDropdown();
		expect(component.isShowDropdown).toBe(true);

		component.openDropdown();
		expect(component.isShowDropdown).toBe(false);
	});
});
