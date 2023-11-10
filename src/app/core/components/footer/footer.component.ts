import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ComponentsModule } from 'src/app/shared/components/components.module';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ComponentsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {

}
