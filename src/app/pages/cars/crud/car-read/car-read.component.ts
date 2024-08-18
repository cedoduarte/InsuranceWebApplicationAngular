import { AfterViewInit, Component, computed, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { QuestionModalContentComponent } from '../../../../components/question-modal-content/question-modal-content.component';
import { Subject, takeUntil } from 'rxjs';
import { AppToasterService } from '../../../../services/app-toaster.service';
import { ICarViewModel, IGetEntityListQuery } from '../../../../shared/interfaces';
import { CarService } from '../../../../services/car.service';
import { RecordAction } from '../../../../shared/enums';
import { CarUpdateModalContentComponent } from '../car-update-modal-content/car-update-modal-content.component';
import { UserUpdateModalContentComponent } from '../../../users/crud/user-update-modal-content/user-update-modal-content.component';

@Component({
  selector: 'app-car-read',
  standalone: true,
  imports: [PaginationComponent, QuestionModalContentComponent, CarUpdateModalContentComponent],
  templateUrl: './car-read.component.html',
  styleUrl: './car-read.component.css'
})
export class CarReadComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("updateOrDeleteModal") updateOrDeleteModal!: ElementRef;
  @ViewChild("updateModal") updateModal!: ElementRef;
  @ViewChild("updateModalContent") updateModalContent!: UserUpdateModalContentComponent;
  updateOrDeleteModalInstance: any;
  updateModalInstance: any;
  userAction!: RecordAction;
  actionName: string = "";
  selectedCarId: number = -1;
  selectedCar!: ICarViewModel;

  carService = inject(CarService);
  query = computed<IGetEntityListQuery | null>(() => {
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
  items = signal<ICarViewModel[]>([]);

  ngOnInit() {
    this.requestCarList();
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

  requestCarList() {
    this.carService.getCarList(this.query()!).pipe(takeUntil(this.destroy$))
      .subscribe(
        responseData => {
          this.totalCount.set(responseData.totalCount);
          this.items.set(responseData.carList);
        }, errorData => {
          this.toaster.critical(errorData.error);
        });
  }

  handlePageClick($event: any) {
    this.pageNumber.set($event);
    this.requestCarList();
  }

  handleEditClick($event: any) {
    this.selectedCar = $event;
    this.selectedCarId = this.selectedCar.id;
    this.actionName = `Update car with ID ${this.selectedCarId}`;
    this.userAction = RecordAction.UpdateClick;
    this.updateOrDeleteModalInstance.show();
  }

  handleDeleteClick($event: any) {
    this.selectedCarId = $event;
    this.actionName = `Delete car with ID ${this.selectedCarId}`;
    this.userAction = RecordAction.DeleteClick;
    this.updateOrDeleteModalInstance.show();
  }

  handleDownloadFile() {
    this.carService.getCarExcelFile(this.query()!)
      .subscribe(responseData => {
        const fileName = "cars.xlsx";
        const blob: Blob = responseData.body as Blob;
        let a = document.createElement("a");
        a.download = fileName!;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      }, errorData => {
        this.toaster.critical(errorData.error);
      });
  }

  handleUpdateOrDeleteConfirmClick() {
    this.updateOrDeleteModalInstance.hide();
    switch (this.userAction) {
      case RecordAction.DeleteClick:
        this.requestDeleteCar();
        break;
      case RecordAction.UpdateClick:
        this.updateModalInstance.show();
        this.updateModalContent.load();
        break;
    }
  }

  handleUpdateOrDeleteCancelClick() {
    this.updateOrDeleteModalInstance.hide();
  }

  requestDeleteCar() {
    this.carService.deleteCar(this.selectedCarId).pipe(takeUntil(this.destroy$))
      .subscribe(responseData => {
        this.requestCarList();
        this.toaster.success("Car deleted successfully");
      }, errorData => {
        this.toaster.critical(errorData.error);
      });
  }

  handleUpdateConfirmClick($event: any) {
    this.carService.updateCar($event).pipe(takeUntil(this.destroy$))
      .subscribe(responseData => {
        this.requestCarList();
        this.toaster.success("Car updated successfully");
      }, errorData => {
        this.toaster.critical(errorData.error);
      });
    this.updateModalInstance.hide();
  }

  handleUpdateCancelClick() {
    this.updateModalInstance.hide();
  }
}
