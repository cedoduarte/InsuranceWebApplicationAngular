import { Component, computed, inject, signal, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../../services/user-service';
import { IGetEntityListQuery, IUserViewModel } from '../../../../shared/interfaces';
import { AppToasterService } from '../../../../services/app-toaster.service';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { RecordAction } from '../../../../shared/enums';
import { Subject, takeUntil } from 'rxjs';
import { QuestionModalContentComponent } from '../../../../components/question-modal-content/question-modal-content.component';
import { UserUpdateModalContentComponent } from '../user-update-modal-content/user-update-modal-content.component';
import { formatDate as dateFormatter } from '../../../../shared/utils';

@Component({
  selector: 'app-user-read',
  standalone: true,
  imports: [PaginationComponent, QuestionModalContentComponent, UserUpdateModalContentComponent],
  templateUrl: './user-read.component.html',
  styleUrl: './user-read.component.css'
})
export class UserReadComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("updateOrDeleteModal") updateOrDeleteModal!: ElementRef;
  @ViewChild("updateModal") updateModal!: ElementRef;
  @ViewChild("updateModalContent") updateModalContent!: UserUpdateModalContentComponent;
  updateOrDeleteModalInstance: any;
  updateModalInstance: any;
  userAction!: RecordAction;
  actionName: string = "";
  selectedUserId: number = -1;
  selectedUser!: IUserViewModel;

  userService = inject(UserService);
  query = computed<IGetEntityListQuery | null>(() => {
    return {
      keyword: "",
      getAll: true,
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
      resetCache: this.resetCache()
    }
  });
  destroy$ = new Subject<void>();
  toaster = inject(AppToasterService);
  pageSize = signal<number>(10);
  pageNumber = signal<number>(1);
  totalCount = signal<number>(0);
  resetCache = signal<boolean>(false);
  pageCount = computed(() => Math.ceil(this.totalCount() / this.pageSize()));
  items = signal<IUserViewModel[]>([]);

  ngOnInit() {
    this.requestUserList(false);
  }

  ngAfterViewInit() {
    this.initializeUpdateOrDeleteModal();
    this.initializeUpdateModal();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeUpdateOrDeleteModal() {
    let modalElement = this.updateOrDeleteModal.nativeElement;
    let bootstrapModal = new (window as any).bootstrap.Modal(modalElement);
    this.updateOrDeleteModalInstance = bootstrapModal;
  }

  initializeUpdateModal() {
    let modalElement = this.updateModal.nativeElement;
    let bootstrapModal = new (window as any).bootstrap.Modal(modalElement);
    this.updateModalInstance = bootstrapModal;
  }

  requestUserList(resetCache: boolean) {
    this.resetCache.set(resetCache);
    this.userService.getUserList(this.query()!).pipe(takeUntil(this.destroy$))
      .subscribe(
        responseData => {
          this.totalCount.set(responseData.totalCount);
          this.items.set(responseData.userList);
        }, errorData => {
          this.toaster.critical(errorData.error);
        });
  }

  handlePageClick($event: any) {
    this.pageNumber.set($event);
    this.requestUserList(false);
  }

  handleEditClick($event: any) {
    this.selectedUser = $event;
    this.selectedUserId = this.selectedUser.id;
    this.actionName = `Update user with ID ${this.selectedUserId}`;
    this.userAction = RecordAction.UpdateClick;
    this.updateOrDeleteModalInstance.show();
  }

  handleDeleteClick($event: any) {
    this.selectedUserId = $event;
    this.actionName = `Delete user with ID ${this.selectedUserId}`;
    this.userAction = RecordAction.DeleteClick;
    this.updateOrDeleteModalInstance.show();
  }

  handleUpdateOrDeleteCancelClick() {
    this.updateOrDeleteModalInstance.hide();
  }

  handleUpdateOrDeleteConfirmClick() {
    this.updateOrDeleteModalInstance.hide();
    switch (this.userAction) {
      case RecordAction.DeleteClick:
        this.requestDeleteUser();
        break;
      case RecordAction.UpdateClick:
        this.updateModalInstance.show();
        this.updateModalContent.load();
        break;
    }
  }

  requestDeleteUser() {
    this.userService.deleteUser(this.selectedUserId).pipe(takeUntil(this.destroy$))
      .subscribe(responseData => {
        this.requestUserList(true);
        this.toaster.success("User deleted successfully");
      }, errorData => {
        this.toaster.critical(errorData.error);
      });
  }

  handleUpdateConfirmClick($event: any) {
    this.userService.updateUser($event).pipe(takeUntil(this.destroy$))
      .subscribe(responseData => {
        this.updateModalContent.reset();
        this.requestUserList(true);
        this.toaster.success("User updated successfully");
      }, errorData => {
        this.toaster.critical(errorData.error);
      });
    this.updateModalInstance.hide();
  }

  handleUpdateCancelClick() {
    this.updateModalInstance.hide();
  }

  handleDownloadFile() {
    this.resetCache.set(true);
    this.userService.getUserExcelFile(this.query()!)
      .subscribe(responseData => {
        const fileName = "users.xlsx";
        const blob: Blob = responseData.body as Blob;
        let a = document.createElement("a");
        a.download = fileName!;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      }, errorData => {
        this.toaster.critical(errorData.error);
      });
  }

  formatDate(dateString: string) {    
    return dateFormatter(dateString);
  }
}
