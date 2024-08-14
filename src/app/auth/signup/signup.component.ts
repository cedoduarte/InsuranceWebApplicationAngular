import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AppToasterService } from '../../services/app-toaster.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  firstName: string = "";
  lastName: string = "";
  email: string = "";
  password: string = "";
  confirmedPassword: string = "";
  router = inject(Router);
  authenticateService = inject(AuthenticationService);
  toaster = inject(AppToasterService);

  handleSubmit() {
    this.authenticateService.registerUser(this.firstName, this.lastName, this.email, this.password, this.confirmedPassword)
    .subscribe(responseData => {
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
