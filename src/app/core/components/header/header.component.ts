import { Router, RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SidebarMenu } from 'src/app/shared/static/static-sidebar-menu';
import { StaticIcons } from 'src/app/shared/static/static-icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ComponentsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  menuIcons = StaticIcons.menu;
  favIcon = StaticIcons.favLg;
  menuSidebar = SidebarMenu;
  query: string = '';

  constructor(
    private readonly sharedService: SharedService,
    private readonly router: Router,
  ) { }

  favoritePage(): void {
    this.router.navigateByUrl('favorites');
  }

  search(query: string): void {
    if (query?.trim()) {
      this.router.navigate(['/search'], { queryParams: { query: query } });
    }
  }

  onClickMenu(id: number): void {
    this.sharedService.sendMenuItemId(id);
  }
}
