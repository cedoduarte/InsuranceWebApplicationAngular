import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = "";
  password: string = "";
  authenticateService = inject(AuthenticationService);
  router = inject(Router);
  toaster = inject(ToastrService);

  handleSubmit() {
    this.authenticateService.authenticate(this.email, this.password)
    .subscribe(responseData => {
      if (responseData.isAuthenticated) {
        localStorage.setItem("authenticatedUser", JSON.stringify(responseData.authenticatedUser));
        this.router.navigate(["/home"]);
      } else {
        this.toaster.error("Invalid credentials");
      }
    }, errorData => {
      this.toaster.error(errorData.error);
    });
  }
}
