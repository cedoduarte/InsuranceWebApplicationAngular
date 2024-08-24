import { Component, computed, inject, OnInit, output, signal } from '@angular/core';
import { IGetEntityListQuery, IUserViewModel } from '../../../../../shared/interfaces';
import { AppToasterService } from '../../../../../services/app-toaster.service';
import { Subject, takeUntil } from 'rxjs';
import { UserService } from '../../../../../services/user-service';
import { formatDate as dateFormatter } from '../../../../../shared/utils';
import { PaginationComponent } from '../../../../../components/pagination/pagination.component';

@Component({
  selector: 'app-user-selector',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './user-selector.component.html',
  styleUrl: './user-selector.component.css'
})
export class UserSelectorComponent implements OnInit {
  userSelect = output<number>();
  userService = inject(UserService);
  destroy$ = new Subject<void>();
  toaster = inject(AppToasterService);
  items = signal<IUserViewModel[]>([]);
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
    this.userService.getUserList(this.query()!).pipe(takeUntil(this.destroy$))
      .subscribe(
        responseData => {
          this.totalCount.set(responseData.totalCount);
          this.items.set(responseData.userList);
        }, errorData => {
          this.toaster.critical(errorData.error);
        });
  }

  handleUserSelect($event: any) {
    this.userSelect.emit($event);
  }
}
