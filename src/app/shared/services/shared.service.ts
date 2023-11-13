import { Injectable } from '@angular/core';
import { Movie } from 'src/app/core/models/movie';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class SharedService {
	private menuItemSubject = new Subject<number>();
	public menuItem$ = this.menuItemSubject.asObservable();

	sendMenuItemId(id: number) {
		this.menuItemSubject.next(id);
	}
}
