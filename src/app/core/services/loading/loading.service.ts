import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private requests = 0;
  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  show() {
    this.requests++;
    if (this.requests === 1) {
      this.loadingSubject.next(true);
    }
  }

  hide() {
    if (this.requests > 0) this.requests--;
    if (this.requests === 0) {
      this.loadingSubject.next(false);
    }
  }
}
