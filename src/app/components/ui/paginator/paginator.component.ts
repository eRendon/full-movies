import { Component, EventEmitter, Input, Output } from '@angular/core'

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() currentPage: number = 1
  @Input() totalPages: number = 0
  @Output() onChangePage: EventEmitter<number> = new EventEmitter<number>()
  pageRange = 9
  getPageRange(): number[] {
    const startPage = Math.max(1, this.currentPage - Math.floor(this.pageRange / 2));
    const endPage = Math.min(this.totalPages, startPage + this.pageRange - 1);
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.onClickChange(pageNumber)
  }

  onClickChange(numberPage: number): void {
    this.onChangePage.emit(numberPage)
  }
}
