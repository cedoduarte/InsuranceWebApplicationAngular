import { Component, inject } from '@angular/core';
import { ICreateInsuranceCommand } from '../../../../shared/interfaces';
import { InsuranceStatus } from '../../../../shared/enums';
import { FormsModule } from '@angular/forms';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';
import { InsuranceStatusSelectComponent } from '../../../../components/insurance-status-select/insurance-status-select.component';
import { UserSelectorComponent } from '../../../../components/user-selector/user-selector.component';
import { CarSelectorComponent } from '../../../../components/car-selector/car-selector.component';

@Component({
  selector: 'app-insurance-new',
  standalone: true,
  imports: [NgbModule, FormsModule, CommonModule, InsuranceStatusSelectComponent, UserSelectorComponent, CarSelectorComponent],
  providers: [DatePipe],
  templateUrl: './insurance-new.component.html',
  styleUrl: './insurance-new.component.css'
})
export class InsuranceNewComponent {
  formData: ICreateInsuranceCommand = {
    userId: -1,
    carId: -1,
    startDate: "",
    endDate: "",
    typeOfInsurance: "",
    premium: 0.0,
    status: InsuranceStatus.Cancelled
  };
  datePipe = inject(DatePipe);
  startDate!: NgbDateStruct;
  endDate!: NgbDateStruct;
  selectUserModalOpen: boolean = false;
  selectCarModalOpen: boolean = false;

  handleOpenSelectUserModal() {
    this.selectUserModalOpen = true;
  }

  handleOpenSelectCarModal() {
    this.selectCarModalOpen = true;
  }

  handleCloseSelectUserModal() {
    this.selectUserModalOpen = false;
  }

  handleCloseSelectCarModal() {
    this.selectCarModalOpen = false;
  }

  handleStatusChange($event: any) {
    this.formData.status = $event;
  }

  setDates() {
    if (!this.startDate) {
      return false;
    }
    this.formData.startDate = `${this.startDate.year}-${this.startDate.month}-${this.startDate.day}`;
    this.formData.startDate = this.datePipe.transform(this.formData.startDate, 'yyyy-MM-dd')!;
    if (!this.endDate) {
      return false;
    }
    this.formData.endDate = `${this.endDate.year}-${this.endDate.month}-${this.endDate.day}`;
    this.formData.endDate = this.datePipe.transform(this.formData.endDate, 'yyyy-MM-dd')!;
    return true;
  }

  handleSubmit() {
    if (!this.setDates()) {
      return;
    }
    console.log(this.formData);
  }
}
