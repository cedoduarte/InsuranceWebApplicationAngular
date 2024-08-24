import { Component, output } from '@angular/core';
import { InsuranceStatus } from '../../../../../shared/enums';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-insurance-status-select',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './insurance-status-select.component.html',
  styleUrl: './insurance-status-select.component.css'
})
export class InsuranceStatusSelectComponent {
  statusChange = output<InsuranceStatus>();
  status = InsuranceStatus.Active;
  options = [
    {
      label: InsuranceStatus[InsuranceStatus.Active],
      value: InsuranceStatus.Active
    },
    {
      label: InsuranceStatus[InsuranceStatus.Expired],
      value: InsuranceStatus.Expired
    },
    {
      label: InsuranceStatus[InsuranceStatus.Pending],
      value: InsuranceStatus.Pending
    },
    {
      label: InsuranceStatus[InsuranceStatus.Cancelled],
      value: InsuranceStatus.Cancelled
    },
    {
      label: InsuranceStatus[InsuranceStatus.Suspended],
      value: InsuranceStatus.Suspended
    },
    {
      label: InsuranceStatus[InsuranceStatus.Lapsed],
      value: InsuranceStatus.Lapsed
    },
    {
      label: InsuranceStatus[InsuranceStatus.UnderReview],
      value: InsuranceStatus.UnderReview
    },
    {
      label: InsuranceStatus[InsuranceStatus.InForce],
      value: InsuranceStatus.InForce
    }
  ];

  handleChange($event: any) {
    this.statusChange.emit(this.status);
  }
}
