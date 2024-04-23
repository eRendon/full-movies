import { Component, OnInit } from '@angular/core'
import { EventService } from '../../services/event/event.service'
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchInput: string = ''
  currentRoute: string = '/'
  constructor (
    private eventService: EventService,
    private router: Router,
  ) {}

  ngOnInit () {
    this.currentRoute = this.router.url

    this.router.events
    .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
    .subscribe((event: NavigationEnd) => {
      console.log('URL actual:', event.url);
      this.currentRoute = event.url
    });
  }

  async searchMovie (): Promise<void> {
    if (this.searchInput) {
      this.eventService.emitHeaderEvent(this.searchInput)
    }
  }

  async onInput (event: Event): Promise<void> {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement.value;

    if (!value && !(event instanceof InputEvent) ) {
      this.eventService.emitHeaderEvent(null)
    }
  }

}
