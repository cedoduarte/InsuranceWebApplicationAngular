import { Component, inject, input, output } from '@angular/core';
import { IUpdateUserCommand, IUserViewModel } from '../../../../shared/interfaces';
import { FormsModule } from '@angular/forms';
import { AppToasterService } from '../../../../services/app-toaster.service';

@Component({
  selector: 'app-user-update-modal-content',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-update-modal-content.component.html',
  styleUrl: './user-update-modal-content.component.css'
})
export class UserUpdateModalContentComponent {
  toaster = inject(AppToasterService);
  user = input<IUserViewModel>();
  cancelClick = output();
  confirmClick = output<IUpdateUserCommand>();
  formData: IUpdateUserCommand = {
    id: -1,
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: ""
  };
  
  load() {
    this.formData.id = this.user()?.id!;
    this.formData.firstName = this.user()?.firstName!;
    this.formData.lastName = this.user()?.lastName!;
    this.formData.email = this.user()?.email!;
  }

  handleCancelClick() {
    this.cancelClick.emit();
  }

  handleConfirmClick() {
    if (this.formData.password === "") {
      this.toaster.critical("The password is empty");
      return;
    }
    if (this.formData.confirmedPassword === "") {
      this.toaster.critical("The confirmed password is empty");
      return;
    }
    if (this.formData.password !== this.formData.confirmedPassword) {
      this.toaster.critical("The password needs to be confirmed correctly");
      return;
    }
    this.confirmClick.emit(this.formData);
  }
}
