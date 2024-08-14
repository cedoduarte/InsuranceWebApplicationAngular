import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AppToasterService } from '../../services/app-toaster.service';
import { IAuthenticateUserCommand } from '../../shared/interfaces';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formGroup: IAuthenticateUserCommand = {  
    email: "",
    password: ""
  };
  authenticateService = inject(AuthenticationService);
  router = inject(Router);
  toaster = inject(AppToasterService);

  handleSubmit() {
    this.authenticateService.authenticate(this.formGroup).subscribe(responseData => {
      if (responseData.isAuthenticated) {
        localStorage.setItem("authenticatedUser", JSON.stringify(responseData.authenticatedUser));
        this.router.navigate(["/home"]);
      } else {
        this.toaster.critical("Invalid credentials");
      }
    }, errorData => {
      this.toaster.critical(errorData.error);
    });
  }

  handleGoSignUpClicked() {
    this.router.navigate(["/signup"]);
  }
}
