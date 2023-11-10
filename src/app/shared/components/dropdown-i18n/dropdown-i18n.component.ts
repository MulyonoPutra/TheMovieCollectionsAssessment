import { Component } from '@angular/core';
import { LanguageOptions } from 'src/app/core/models/language-options';
import { langOptions } from '../../utils/lang-options';

@Component({
  selector: 'app-dropdown-i18n',
  templateUrl: './dropdown-i18n.component.html',
  styleUrls: ['./dropdown-i18n.component.scss'],
})
export class DropdownI18nComponent {
  protected language!: LanguageOptions;
  protected languageOptions: LanguageOptions[] = langOptions;

  protected onLanguageChange(language: LanguageOptions): void {
    this.language = {
      name: language.name,
      code: language.code,
      flagUrl: language.flagUrl,
    };
  }
}
