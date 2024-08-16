import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { AppToasterService } from '../../services/app-toaster.service';
import { IAuthenticateUserCommand } from '../../shared/interfaces';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  formGroup: IAuthenticateUserCommand = {  
    email: "",
    password: ""
  };
  authenticateService = inject(AuthenticationService);
  destroy$ = new Subject<void>();
  router = inject(Router);
  toaster = inject(AppToasterService);

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleSubmit() {
    this.authenticateService.authenticate(this.formGroup).pipe(takeUntil(this.destroy$))
    .subscribe(responseData => {
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
