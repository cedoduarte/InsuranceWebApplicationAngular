import { Component, inject, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { AppToasterService } from '../../services/app-toaster.service';
import { ICreateUserCommand } from '../../shared/interfaces';
import { Subject, takeUntil } from 'rxjs';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [NgbModule, FormsModule, CommonModule],
  providers: [DatePipe],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnDestroy {
  formData: ICreateUserCommand = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    birthdate: ""
  };
  birthdate!: NgbDateStruct;
  datePipe = inject(DatePipe);
  router = inject(Router);
  authenticateService = inject(AuthenticationService);
  destroy$ = new Subject<void>();
  toaster = inject(AppToasterService);

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  handleSubmit() {
    if (!this.birthdate) {
      return;
    }
    this.formData.birthdate = `${this.birthdate.year}-${this.birthdate.month}-${this.birthdate.day}`;
    this.formData.birthdate = this.datePipe.transform(this.formData.birthdate, 'yyyy-MM-dd')!;
    this.authenticateService.registerUser(this.formData).pipe(takeUntil(this.destroy$))
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
