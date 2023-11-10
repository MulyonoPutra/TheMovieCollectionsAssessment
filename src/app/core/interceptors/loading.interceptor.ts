import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { Injectable } from '@angular/core';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
	constructor(private readonly _loading: LoadingService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this._loading.show();

		return next.handle(req).pipe(
			tap(
				(event: HttpEvent<any>) => {
					if (event instanceof HttpResponse) {
						this._loading.hide();
					}
				},
				(error) => {
					this._loading.hide();
				},
			),
		);
	}
}
