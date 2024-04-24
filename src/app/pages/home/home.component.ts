import { Component, OnInit } from '@angular/core'
import { MovieService } from '../../services/movie/movie.service'
import { IMovie } from '../../interfaces/IMovie'
import { environment } from '../../environments/environment'
import { AlertService } from '../../services/alert/alert.service'
import { LoadingService } from '../../services/loading/loading.service'
import { EventService } from '../../services/event/event.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // @ViewChildren('canvas') canvases!: QueryList<ElementRef<HTMLCanvasElement>>;
  movies: IMovie[] = []
  imagePath: string = environment.imagePath
  totalPages: number = 0
  currentPage: number = 1
  query: string | null = null
  constructor (private movieService: MovieService,
               private alertService: AlertService,
               private loadingService: LoadingService,
               private eventService: EventService
  ) {}

  ngOnInit (): void {
    this.getMovies()
    this.eventService.headerEvent.subscribe((query) => {
      this.currentPage = 1
      this.movieService.setCurrentPage(1)
      if (query) {
        this.searchMovies(query)
      } else {

        this.getMovies()
      }
      this.query = query
    })
  }

  getMovies(): void {
    this.loadingService.present()
    this.movieService.getMovies().subscribe({
      next: value => {
        this.movies = value.results.filter((movie) => movie.backdrop_path)
        this.totalPages = value.total_pages
        this.currentPage = value.page
      },
      error: err => {
        console.log(err)
        this.loadingService.close()
        this.alertService.error('Hubo un error al intentar obtener los datos.')
      },
      complete: () => {
        this.loadingService.close()
      }
    })
  }

  onChangePage(currentPage: number): void {
    this.currentPage = currentPage
    this.movieService.setCurrentPage(currentPage)
    this.query ? this.searchMovies(this.query) : this.getMovies()
  }

  searchMovies(query: string): void {
    this.movieService.searchMovies(query).subscribe({
      next: movies => {
        this.movies = movies.results.filter((movie) => movie.backdrop_path)
        this.currentPage = movies.page
        this.totalPages = movies.total_pages
      },
      error: err => {
        console.log(err)
        this.loadingService.close()
        this.alertService.error('Ocurrió un problema al intentar obtener resultados para su búsqueda.')
      },
      complete: () => {
        this.loadingService.close()
      }
    })
  }
}
