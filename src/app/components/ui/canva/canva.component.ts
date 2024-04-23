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
