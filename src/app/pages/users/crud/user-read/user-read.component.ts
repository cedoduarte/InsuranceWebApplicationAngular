import { Component, computed, inject, signal, OnInit, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { UserService } from '../../../../services/user-service';
import { IGetUserListQuery, IUserViewModel } from '../../../../shared/interfaces';
import { AppToasterService } from '../../../../services/app-toaster.service';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { UserRecordAction } from '../../../../shared/enums';
import { Subject, takeUntil } from 'rxjs';
import { QuestionModalContentComponent } from '../../../../components/question-modal-content/question-modal-content.component';
import { UserUpdateModalContentComponent } from '../user-update-modal-content/user-update-modal-content.component';

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
  userAction!: UserRecordAction;
  actionName: string = "";
  selectedUserId: number = -1;
  selectedUser!: IUserViewModel;

  userService = inject(UserService);
  query = computed<IGetUserListQuery | null>(() => {
    return {
      keyword: "",
      getAll: true,
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize()
    }
  });
  destroy$ = new Subject<void>();
  toaster = inject(AppToasterService);
  pageSize = signal<number>(10);
  pageNumber = signal<number>(1);
  totalCount = signal<number>(0);
  pageCount = computed(() => Math.ceil(this.totalCount() / this.pageSize()));
  items = signal<IUserViewModel[]>([]);  

  ngOnInit() {
    this.requestUserList();
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

  handlePageClick($event: any) {
    this.pageNumber.set($event);
    this.requestUserList();
  }

  handleEditClick($event: any) {
    this.selectedUser = $event;
    this.selectedUserId = this.selectedUser.id;
    this.actionName = `Update user with ID ${this.selectedUserId}`;
    this.userAction = UserRecordAction.UpdateClick;
    this.updateOrDeleteModalInstance.show();
  }

  handleDeleteClick($event: any) {
    this.selectedUserId = $event;
    this.actionName = `Delete user with ID ${this.selectedUserId}`;
    this.userAction = UserRecordAction.DeleteClick;
    this.updateOrDeleteModalInstance.show();
  }

  handleUpdateOrDeleteCancelClick() {
    this.updateOrDeleteModalInstance.hide();
  }

  handleUpdateOrDeleteConfirmClick() {
    this.updateOrDeleteModalInstance.hide();
    switch (this.userAction) {
      case UserRecordAction.DeleteClick:
        this.requestDeleteUser();
        break;
      case UserRecordAction.UpdateClick:
        this.updateModalInstance.show();
        this.updateModalContent.load();
        break;
    }
  }

  requestDeleteUser() {
    this.userService.deleteUser(this.selectedUserId).pipe(takeUntil(this.destroy$))
    .subscribe(responseData => {
        this.requestUserList();
        this.toaster.critical("User deleted successfully");
      }, errorData => {
        this.toaster.critical(errorData.error);
      });
  }

  handleUpdateConfirmClick($event: any) {
    this.userService.updateUser($event).pipe(takeUntil(this.destroy$))
    .subscribe(responseData => {
        this.requestUserList();
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
    this.userService.getUserExcelFile(this.query()!).subscribe(response => {
      const fileName = "users.xlsx";
      const blob: Blob = response.body as Blob;
      let a = document.createElement("a");
      a.download = fileName!;
      a.href = window.URL.createObjectURL(blob);
      a.click();
    });
  }
}
