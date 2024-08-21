import { Component, inject, input, output } from '@angular/core';
import { AppToasterService } from '../../../../services/app-toaster.service';
import { ICarViewModel, IUpdateCarCommand } from '../../../../shared/interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-car-update-modal-content',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './car-update-modal-content.component.html',
  styleUrl: './car-update-modal-content.component.css'
})
export class CarUpdateModalContentComponent {
  toaster = inject(AppToasterService);
  car = input<ICarViewModel>();
  cancelClick = output();
  confirmClick = output<IUpdateCarCommand>();
  formData: IUpdateCarCommand = {
    id: -1,
    model: "",
    color: "",
    price: 0.0,
    plateNumber: ""
  };

  load() {
    this.formData.id = this.car()?.id!;
    this.formData.model = this.car()?.model!;
    this.formData.color = this.car()?.color!;
    this.formData.price = this.car()?.price!;
    this.formData.plateNumber = this.car()?.plateNumber!;
  }

  reset() {
    this.formData = {
      id: -1,
      model: "",
      color: "",
      price: 0.0,
      plateNumber: ""
    };
  }

  handleCancelClick() {
    this.cancelClick.emit();
  }

  handleConfirmClick() {
    if (this.formData.model === "") {
      this.toaster.critical("The model is empty");
      return;
    }
    if (this.formData.color === "") {
      this.toaster.critical("The color is empty");
      return;
    }
    if (this.formData.price <= 0.0) {
      this.toaster.critical("The price is invalid");
      return;
    }
    if (this.formData.plateNumber === "") {
      this.toaster.critical("The plate number is empty");
      return;
    }
    this.confirmClick.emit(this.formData);
  }
}
