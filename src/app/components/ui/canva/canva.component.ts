import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core'

@Component({
  selector: 'app-canva',
  templateUrl: './canva.component.html',
  styleUrls: ['./canva.component.scss']
})
export class CanvaComponent implements OnChanges, AfterViewInit {
  @Input() percentage: number = 0
  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;
  @Input() classPosition: string = 'bottom-[-20px] left-0 '
  @Input() width: string = '70px'
  @Input() height: string = '70px'

  ngAfterViewInit () {
    this.renderCanva()
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('percentage' in changes && this.percentage && this.canvas) {
      this.renderCanva()
    }
  }

  renderCanva(): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    const ctx = canvasEl.getContext('2d');
    this.drawCircle(ctx!, Number((Math.floor(this.percentage * 100) / 10).toFixed(0)))
  }

  drawCircle(ctx: CanvasRenderingContext2D, percentage: number): void {
    const canvasEl: HTMLCanvasElement = this.canvas.nativeElement;
    // const ctx = canvasEl.getContext('2d');

    // Calcular el tamaño del canvas basado en el tamaño de la ventana
    const canvasSize = Math.min(window.innerWidth, window.innerHeight) * 0.2;
    canvasEl.width = canvasSize;
    canvasEl.height = canvasSize;

    // Calcular el radio del círculo en función del tamaño del canvas
    const circleRadius = canvasSize / 3;

    // Calcular el centro del canvas
    const centerX = canvasEl.width / 2;
    const centerY = canvasEl.height / 2;

    // Limpiar el canvas
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    // Dibujar el círculo negro de fondo
    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'black';
    ctx.fill();

    // Dibujar el borde del círculo
    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, 0, 2 * Math.PI);
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Dibujar el arco parcial
    ctx.beginPath();
    ctx.arc(centerX, centerY, circleRadius, -0.5 * Math.PI, (percentage / 100) * 2 * Math.PI - 0.5 * Math.PI);
    let borderColor = '';

    if (percentage < 50) {
      borderColor = 'red';
    } else if (percentage < 75) {
      borderColor = 'yellow';
    } else {
      borderColor = 'green';
    }
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Dibujar el porcentaje
    ctx.font = `${canvasSize * 0.20}px Arial`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(percentage.toString() + '%', centerX, centerY);
  }
}
