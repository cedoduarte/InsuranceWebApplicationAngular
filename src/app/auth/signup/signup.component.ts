import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AppToasterService } from '../../services/app-toaster.service';
import { ICreateUserCommand } from '../../shared/interfaces';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  formGroup: ICreateUserCommand = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: ""
  };
  router = inject(Router);
  authenticateService = inject(AuthenticationService);
  toaster = inject(AppToasterService);

  handleSubmit() {
    this.authenticateService.registerUser(this.formGroup).subscribe(responseData => {
      this.toaster.success("User created successfully");
      this.router.navigate(["/"]);
    }, errorData => {
      this.toaster.critical(errorData.error);
    });
  }

  handleGoLoginClicked() {
    this.router.navigate(["/"]);
  }
}
