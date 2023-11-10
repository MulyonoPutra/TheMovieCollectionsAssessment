import { Component, Input, inject } from '@angular/core';

import { LoadingService } from '../../services/loading.service';
import { STATIC_ICONS } from '../../static/static-icons';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
	@Input() loadingIndicator!: boolean;
	loading = inject(LoadingService);
}
