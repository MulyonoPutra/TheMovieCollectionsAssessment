import { CommonModule } from '@angular/common';
import { DropdownI18nComponent } from './dropdown-i18n/dropdown-i18n.component';
import { DropdownProfileComponent } from './dropdown-profile/dropdown-profile.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { LogoComponent } from './logo/logo.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { ShortenerTextPipe } from '../pipes/shortener-text.pipe';
import { SpinnerComponent } from './spinner/spinner.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
	declarations: [
		SearchComponent,
		DropdownI18nComponent,
		DropdownProfileComponent,
		TabsComponent,
		MovieCardComponent,
		LogoComponent,
		SpinnerComponent,
	],
	imports: [CommonModule, LazyLoadImageModule, ShortenerTextPipe, RouterModule],
	exports: [
		SearchComponent,
		DropdownI18nComponent,
		DropdownProfileComponent,
		TabsComponent,
		MovieCardComponent,
		LogoComponent,
		SpinnerComponent,
	],
})
export class ComponentsModule {}
