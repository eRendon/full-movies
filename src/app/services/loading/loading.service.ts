import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private loadingSubject = new Subject<boolean>()

  getLoading(): Observable<boolean> {
    return this.loadingSubject.asObservable()
  }
  present(): void {
    this.loadingSubject.next(true)
  }

  close(): void {
    this.loadingSubject.next(false)
  }
}
