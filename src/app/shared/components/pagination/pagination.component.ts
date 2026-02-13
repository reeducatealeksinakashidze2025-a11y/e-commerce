import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: false,
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
   @Input() page: number = 1;
  @Input() pageSize: number = 5;
  @Input() totalCount: number = 0;

  @Output() pageChange = new EventEmitter<number>();

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.pageSize);
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  goTo(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.page = page;
    this.pageChange.emit(this.page);
  }
}
