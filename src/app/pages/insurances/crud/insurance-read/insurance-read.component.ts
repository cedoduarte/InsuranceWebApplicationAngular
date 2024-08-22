import { AfterViewInit, Component, computed, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { PaginationComponent } from '../../../../components/pagination/pagination.component';
import { QuestionModalContentComponent } from '../../../../components/question-modal-content/question-modal-content.component';
import { IGetEntityListQuery, IInsuranceViewModel } from '../../../../shared/interfaces';
import { InsuranceService } from '../../../../services/insurance.service';
import { Subject, takeUntil } from 'rxjs';
import { AppToasterService } from '../../../../services/app-toaster.service';

@Component({
  selector: 'app-insurance-read',
  standalone: true,
  imports: [PaginationComponent, QuestionModalContentComponent],
  templateUrl: './insurance-read.component.html',
  styleUrl: './insurance-read.component.css'
})
export class InsuranceReadComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild("deleteModal") deleteModal!: ElementRef;
  deleteModalInstance: any;
  selectedInsuranceId: number = -1;
  selectedInsurance!: IInsuranceViewModel;
  actionName: string = "";

  insuranceService = inject(InsuranceService);
  query = computed<IGetEntityListQuery | null>(() => {
    return {
      keyword: "",
      getAll: true,
      pageNumber: this.pageNumber(),
      pageSize: this.pageSize(),
      resetCache: this.resetCache()
    };
  });
  destroy$ = new Subject<void>();
  toaster = inject(AppToasterService);
  pageSize = signal<number>(10);
  pageNumber = signal<number>(1);
  totalCount = signal<number>(0);
  resetCache = signal<boolean>(false);
  pageCount = computed(() => Math.ceil(this.totalCount() / this.pageSize()));
  items = signal<IInsuranceViewModel[]>([]);

  ngOnInit() {
    this.requestInsuranceList(false);
  }

  ngAfterViewInit() {
    this.initializeDeleteModal();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  initializeDeleteModal() {
    let modalElement = this.deleteModal.nativeElement;
    let bootstrapModal = new (window as any).bootstrap.Modal(modalElement);
    this.deleteModalInstance = bootstrapModal;
  }

  requestInsuranceList(resetCache: boolean) {
    this.resetCache.set(resetCache);
    this.insuranceService.getInsuranceList(this.query()!).pipe(takeUntil(this.destroy$))
      .subscribe(
        responseData => {
          this.totalCount.set(responseData.totalCount);
          this.items.set(responseData.insuranceList);
        }, errorData => {
          this.toaster.critical(errorData.error);
        });
  }

  handlePageClick($event: any) {
    this.pageNumber.set($event);
    this.requestInsuranceList(false);
  }

  handleEditClick($event: any) {
    // todo...
  }

  handleDeleteClick($event: any) {
    this.selectedInsuranceId = $event;
    this.actionName = `Delete insurance with ID ${this.selectedInsuranceId}`;
    this.deleteModalInstance.show();
  }

  handleDownloadFile() {
    this.insuranceService.getInsuranceExcelFile(this.query()!)
      .subscribe(responseData => {
        const fileName = "insurances.xlsx";
        const blob: Blob = responseData.body as Blob;
        let a = document.createElement("a");
        a.download = fileName!;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      }, errorData => {
        this.toaster.critical(errorData.error);
      });
  }

  handleDeleteConfirmClick() {
    this.deleteModalInstance.hide();
    this.requestDeleteInsurance();
  }
  handleDeleteCancelClick() {
    this.deleteModalInstance.hide();
  }

  requestDeleteInsurance() {
    this.insuranceService.deleteInsurance(this.selectedInsuranceId).pipe(takeUntil(this.destroy$))
      .subscribe(responseData => {
        this.requestInsuranceList(true);
        this.toaster.success("Insurance deleted successfully");
      }, errorData => {
        this.toaster.critical(errorData.error);
      });
  }
}
