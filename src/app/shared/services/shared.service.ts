import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private sidebarVisibilitySubject = new BehaviorSubject<boolean>(false);
  sidebarVisibility$ = this.sidebarVisibilitySubject.asObservable();

  toggleSidebarVisibility() {
    this.sidebarVisibilitySubject.next(
      !this.sidebarVisibilitySubject.getValue()
    );
  }
  
}
