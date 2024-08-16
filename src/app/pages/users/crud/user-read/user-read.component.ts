import { Component, computed, inject, signal, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from '../../../../services/user-service';
import { IGetUserListQuery, IUserViewModel } from '../../../../shared/interfaces';
import { AppToasterService } from '../../../../services/app-toaster.service';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { UserRecordAction } from '../../../../shared/enums';

@Component({
  selector: 'app-user-read',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './user-read.component.html',
  styleUrl: './user-read.component.css'
})
export class UserReadComponent implements OnInit, AfterViewInit {
  @ViewChild("modal") modal!: ElementRef;
  modalInstance: any;
  userService = inject(UserService);
  toaster = inject(AppToasterService);
  pageSize = signal<number>(10);
  pageNumber = signal<number>(1);
  totalCount = signal<number>(0);
  pageCount = computed(() => Math.ceil(this.totalCount() / this.pageSize()));
  items = signal<IUserViewModel[]>([]);
  userAction!: UserRecordAction;
  actionName: string = "";
  selectedUserId: number = -1;

  ngOnInit() {
    this.requestUserList();
  }

  ngAfterViewInit() {
    this.initializeModal();
  }

  initializeModal() {
    const modalElement = this.modal.nativeElement;
    const bootstrapModal = new (window as any).bootstrap.Modal(modalElement);
    this.modalInstance = bootstrapModal;
  }

  requestUserList() {
    const query: IGetUserListQuery = {
      keyword: "",
      getAll: true,
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize()
    };
    this.userService.getUserList(query).subscribe(
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
    this.selectedUserId = $event;
    this.actionName = `Update user with ID ${this.selectedUserId}`;
    this.userAction = UserRecordAction.UpdateClick;
    this.modalInstance.show();
  }

  handleDeleteClick($event: any) {
    this.selectedUserId = $event;
    this.actionName = `Delete user with ID ${this.selectedUserId}`;
    this.userAction = UserRecordAction.DeleteClick;
    this.modalInstance.show();
  }

  handleCancelClick() {
    this.modalInstance.hide();
  }

  handleConfirmClick() {
    this.modalInstance.hide();
    switch (this.userAction) {
      case UserRecordAction.DeleteClick:
        alert(`delete user with id ${this.selectedUserId}`);
        break;
      case UserRecordAction.UpdateClick:
        alert(`update user with id ${this.selectedUserId}`);
        break;
    }
  }
}
