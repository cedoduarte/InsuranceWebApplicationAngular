import { Component, inject } from '@angular/core';
import { ICreateCarCommand } from '../../../../shared/interfaces';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { CarService } from '../../../../services/car.service';
import { AppToasterService } from '../../../../services/app-toaster.service';

@Component({
  selector: 'app-car-new',
  standalone: true,
  imports: [FormsModule, ColorPickerModule],
  templateUrl: './car-new.component.html',
  styleUrl: './car-new.component.css'
})
export class CarNewComponent {
  formData: ICreateCarCommand = {
    model: "",
    color: "#000000",
    price: 0.0,
    plateNumber: ""
  };
  carService = inject(CarService);
  toaster = inject(AppToasterService);

  handleSubmit() {
    this.carService.createCar(this.formData)
    .subscribe(responseData => {
      this.toaster.success("Car created successfully");
    }, errorData => {
      this.toaster.critical(errorData.error);
    });
  }
}
