import { CUSTOM_ELEMENTS_SCHEMA, Component, Input } from '@angular/core';

import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { Tabs } from 'src/app/core/models/tabs';

@Component({
  selector: 'app-movie-trending',
  standalone: true,
  imports: [CommonModule, ComponentsModule],
  templateUrl: './movie-trending.component.html',
  styleUrls: ['./movie-trending.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MovieTrendingComponent {
  @Input() tabs: Tabs[] = [];
  @Input() activeTabsIndex!: number;
}
