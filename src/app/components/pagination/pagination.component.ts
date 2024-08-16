import { CommonModule } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent {
  pageCount = input<number>(0);
  numberList = computed<number[]>(() => [...Array(this.pageCount() + 1).keys()].slice(1));
  pageClicked = output<number>();
  currentPage = signal<number>(1);

  handlePageClick($event: any) {
    this.currentPage.set($event);
    this.pageClicked.emit(this.currentPage());
  }

  handlePreviousClick() {
    if (this.currentPage() !== 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.pageClicked.emit(this.currentPage());
    }
  }

  handleNextClick() {
    if (this.currentPage() !== this.pageCount()) {
      this.currentPage.set(this.currentPage() + 1);
      this.pageClicked.emit(this.currentPage());
    }
  }
}
