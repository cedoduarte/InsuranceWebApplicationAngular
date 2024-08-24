import { Component, computed, inject, output, signal } from '@angular/core';
import { CarService } from '../../../../../services/car.service';
import { Subject, takeUntil } from 'rxjs';
import { AppToasterService } from '../../../../../services/app-toaster.service';
import { ICarViewModel, IGetEntityListQuery } from '../../../../../shared/interfaces';
import { formatDate as dateFormatter } from '../../../../../shared/utils';
import { PaginationComponent } from '../../../../../components/pagination/pagination.component';

@Component({
  selector: 'app-car-selector',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './car-selector.component.html',
  styleUrl: './car-selector.component.css'
})
export class CarSelectorComponent {
  carSelect = output<number>();
  carService = inject(CarService);
  destroy$ = new Subject<void>();
  toaster = inject(AppToasterService);
  items = signal<ICarViewModel[]>([]);
  pageSize = signal<number>(10);
  pageNumber = signal<number>(1);
  totalCount = signal<number>(0);
  pageCount = computed(() => Math.ceil(this.totalCount() / this.pageSize()));
  query = computed<IGetEntityListQuery | null>(() => {
    return {
      keyword: "",
      getAll: true,
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
      resetCache: false
    }
  });

  ngOnInit() {
    this.requestUserList();
  }

  formatDate(dateString: string) {    
    return dateFormatter(dateString);
  }

  handlePageClick($event: any) {
    this.pageNumber.set($event);
    this.requestUserList();
  }

  requestUserList() {
    this.carService.getCarList(this.query()!).pipe(takeUntil(this.destroy$))
      .subscribe(
        responseData => {
          this.totalCount.set(responseData.totalCount);
          this.items.set(responseData.carList);
        }, errorData => {
          this.toaster.critical(errorData.error);
        });
  }

  handleCarSelect($event: any) {
    this.carSelect.emit($event);
  }
}
