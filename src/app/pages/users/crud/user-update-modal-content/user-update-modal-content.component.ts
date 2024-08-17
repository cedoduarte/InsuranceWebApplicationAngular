import { AfterViewInit, Component, computed, Input, input, OnInit, output, signal } from '@angular/core';
import { IUpdateUserCommand, IUserViewModel } from '../../../../shared/interfaces';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-update-modal-content',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-update-modal-content.component.html',
  styleUrl: './user-update-modal-content.component.css'
})
export class UserUpdateModalContentComponent {
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
    this.confirmClick.emit(this.formData);
  }
}
