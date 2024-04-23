import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core'
import { MovieService } from '../../services/movie/movie.service'
import { IMovie } from '../../interfaces/IMovie'
import { environment } from '../../environments/environment'
import { AlertService } from '../../services/alert/alert.service'
import { LoadingService } from '../../services/loading/loading.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChildren('canvas') canvases!: QueryList<ElementRef<HTMLCanvasElement>>;
  movies: IMovie[] = []
  imagePath: string = environment.imagePath
  constructor (private movieService: MovieService,
               private alertService: AlertService,
               private loadingService: LoadingService
  ) {}

  ngOnInit (): void {
    this.getMovies()
  }

  getMovies(): void {
    this.loadingService.present()
    this.movieService.getMovies().subscribe({
      next: value => {
        this.movies = value.results
      },
      error: err => {
        console.log(err)
        this.alertService.error('Hubo un error al intentar obtener los datos.')
      },
      complete: () => {
        this.loadingService.close()
      }
    })
  }

  ngAfterViewInit(): void {
    this.canvases.changes.subscribe(() => {
      this.canvases.map((canvasRef, index) => {

        const canvas = canvasRef.nativeElement;
        const ctx = canvas.getContext('2d');

        const circleData = this.movies.find(circle => circle.id === Number(canvasRef.nativeElement.id));
        const percentage = circleData ? circleData.vote_average : 0;

        this.drawCircle(ctx!, Number((Math.floor(percentage * 100) / 10).toFixed(0)));
      });
    })
  }

  drawCircle(ctx: CanvasRenderingContext2D, percentage: number): void {
    const circleRadius = 20

    const canvasWidth = ctx.canvas.offsetWidth * window.devicePixelRatio;
    const canvasHeight = ctx.canvas.offsetHeight * window.devicePixelRatio;

    ctx.canvas.width = canvasWidth;
    ctx.canvas.height = canvasHeight;

    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 3;
    ctx.stroke();

    let borderColor = '';

    if (percentage < 50) {
      borderColor = 'red';
    } else if (percentage < 75) {
      borderColor = 'yellow';
    } else {
      borderColor = 'green';
    }

    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, -0.5 * Math.PI, (percentage / 100) * 2 * Math.PI - 0.5 * Math.PI);

    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.font = '12px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    ctx.fillText(percentage.toString() + '%', centerX, centerY);
  }
}
