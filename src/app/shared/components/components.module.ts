import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search/search.component';
import { DropdownI18nComponent } from './dropdown-i18n/dropdown-i18n.component';
import { DropdownProfileComponent } from './dropdown-profile/dropdown-profile.component';
import { TabsComponent } from './tabs/tabs.component';
import { MovieCardComponent } from './movie-card/movie-card.component';
import { LogoComponent } from './logo/logo.component';



@NgModule({
  declarations: [
    SearchComponent,
    DropdownI18nComponent,
    DropdownProfileComponent,
    TabsComponent,
    MovieCardComponent,
    LogoComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SearchComponent,
    DropdownI18nComponent,
    DropdownProfileComponent,
    TabsComponent,
    MovieCardComponent,
    LogoComponent
  ]
})
export class ComponentsModule { }
