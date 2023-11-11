import { Component, Input, inject } from '@angular/core';

import { LoadingService } from '../../services/loading.service';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
})
export class SpinnerComponent {
	@Input() loadingIndicator!: boolean;
	loading = inject(LoadingService);
}
