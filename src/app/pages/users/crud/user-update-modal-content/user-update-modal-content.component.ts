import { Component, inject, input, output } from '@angular/core';
import { IUpdateUserCommand, IUserViewModel } from '../../../../shared/interfaces';
import { FormsModule } from '@angular/forms';
import { AppToasterService } from '../../../../services/app-toaster.service';
import { CommonModule, DatePipe } from '@angular/common';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { getYMD } from '../../../../shared/utils';

@Component({
  selector: 'app-user-update-modal-content',
  standalone: true,
  imports: [FormsModule, NgbModule, CommonModule],
  providers: [DatePipe],
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
    confirmedPassword: "",
    birthdate: ""
  };
  birthdate!: NgbDateStruct;
  datePipe = inject(DatePipe);

  load() {
    this.formData.id = this.user()?.id!;
    this.formData.firstName = this.user()?.firstName!;
    this.formData.lastName = this.user()?.lastName!;
    this.formData.email = this.user()?.email!;
    this.formData.birthdate = this.user()?.birthdate!;
    const ymd = getYMD(this.formData.birthdate);
    this.birthdate = { year: ymd?.year!, month: ymd?.month!, day: ymd?.day! };
  }

  reset() {
    this.formData = {
      id: -1,
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmedPassword: "",
      birthdate: ""
    };
  }

  handleCancelClick() {
    this.cancelClick.emit();
  }

  handleConfirmClick() {
    if (!this.birthdate) {
      return;
    }
    this.formData.birthdate = `${this.birthdate.year}-${this.birthdate.month}-${this.birthdate.day}`;
    this.formData.birthdate = this.datePipe.transform(this.formData.birthdate, 'yyyy-MM-dd')!;
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
