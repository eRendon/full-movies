import { Component, OnInit } from '@angular/core'
import { MovieService } from '../../services/movie/movie.service'
import { ActivatedRoute } from '@angular/router'
import { LoadingService } from '../../services/loading/loading.service'
import { environment } from '../../environments/environment'
import { IMovieDetail } from '../../interfaces/Movie/IMovieDetail'
import { ICredits } from '../../interfaces/Movie/ICredits'
import { IMedia } from '../../interfaces/Movie/IMedia'
import { IKeyWord } from '../../interfaces/Movie/IKeyWord'

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  idMovie: string | null = null
  movie?: IMovieDetail
  imagePath: string = environment.imagePathDetail
  imagePathFullView: string = environment.imagePathFullView
  imagePathCats: string = environment.imagePathCats
  director: string | undefined = ''
  writer: string | undefined = ''
  cast: ICredits[] = []
  backdrops: IMedia[] = []
  logos: IMedia[] = []
  posters: IMedia[] = []
  keyWords: IKeyWord[] = []
  constructor (private movieService: MovieService,
               private route: ActivatedRoute,
               private loadingService: LoadingService
  ) {}

  ngOnInit () {
    this.idMovie = this.route.snapshot.paramMap.get('id')
    this.getMovie()
    this.getCredits()
    this.getBackdrops()
    this.getKeyWords()
  }

  getMovie(): void {
    this.loadingService.present()
    this.movieService.getById(Number(this.idMovie)).subscribe({
      next: movie => {
        console.log('movie', movie)
        this.movie = movie
      },
      error: err => {
        console.log(err)
      },
      complete: () => {

      }
    })
  }

  getCredits(){
    this.movieService.getCredits(Number(this.idMovie)).subscribe({
      next: credits => {
        console.log('creditos', credits)
        this.cast = credits.cast.filter((people) => people.profile_path)
        this.director = credits.crew.find((crew) => crew.job === 'Director')?.name
        this.writer = credits.crew.find((crew) => crew.job === 'Writer')?.name
      },
      error: err => {},
      complete: () => {

      }
    })
  }

  runTime(minutes: number): string {
    const hours = Math.floor(minutes/60)
    const minutesLeft = minutes % 60
    return `${hours}h : ${minutesLeft}m`;
  }

  getBackdrops(): void {
    this.movieService.getBackdrops(this.idMovie!).subscribe({
      next: images => {
        console.log(images)
        this.backdrops = images.backdrops
        this.logos = images.logos
        this.posters = images.posters
      },
      error: err => {},
      complete: () => {}
    })
  }

  getKeyWords(): void {
    this.movieService.getKeyWords(this.idMovie!).subscribe({
      next: keyWordsResponse => {
        this.keyWords = keyWordsResponse.keywords
      },
      error: err => {

      },
      complete: () => {
        this.loadingService.close()
      }
    })
  }
 }
