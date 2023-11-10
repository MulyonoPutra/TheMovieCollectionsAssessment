import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { STATIC_ICONS } from 'src/app/shared/static/static-icons';
import { STATIC_SIDEBAR_MENU } from 'src/app/shared/static/static-sidebar-menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ComponentsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuIcons = STATIC_ICONS.menu;
  menuSidebar = STATIC_SIDEBAR_MENU;
}
