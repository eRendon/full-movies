import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'
import { IAlert } from '../../interfaces/IAlert'

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<IAlert>()
  private currentMessage: string | null = null
  private timeoutId: number | null = null

  getAlerts(): Observable<IAlert> {
    return this.alertSubject.asObservable()
  }

  success(message: string): void {
    if (!this.currentMessage) {
      this.alertSubject.next({ type: 'success', message })
      this.currentMessage = message
      this.setClearTimeout()
    } else {
      this.currentMessage = message
    }
  }

  private setClearTimeout(): void {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
    }
    this.timeoutId = setTimeout(() => {
      this.clear()
    }, 3000)
  }

  error(message: string): void {
    this.alertSubject.next({ type: 'error', message })
  }

  clear(): void {
    this.alertSubject.next({
      message: '',
      type: ''
    });
    this.currentMessage = null
    clearTimeout(this.timeoutId!)
  }
}
