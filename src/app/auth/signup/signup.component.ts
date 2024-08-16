import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AppToasterService } from '../../services/app-toaster.service';
import { ICreateUserCommand } from '../../shared/interfaces';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnDestroy {
  formGroup: ICreateUserCommand = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: ""
  };
  router = inject(Router);
  authenticateService = inject(AuthenticationService);
  destroy$ = new Subject<void>();
  toaster = inject(AppToasterService);

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleSubmit() {
    this.authenticateService.registerUser(this.formGroup).pipe(takeUntil(this.destroy$))
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
