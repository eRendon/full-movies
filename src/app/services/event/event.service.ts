import { EventEmitter, Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root'
})
export class EventService {
  headerEvent: EventEmitter<string | null> = new EventEmitter<string | null>()

  emitHeaderEvent(query: string | null): void {
    this.headerEvent.emit(query);
  }

}
