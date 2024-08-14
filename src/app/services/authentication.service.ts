import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IAuthenticateUserCommand, ICreateUserCommand, IUserAuthenticationResult, IUserViewModel } from '../shared/interfaces';
import { share } from 'rxjs';
import { HEADERS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  http = inject(HttpClient);

  authenticate(command: IAuthenticateUserCommand) {
    return this.http.post<IUserAuthenticationResult>("https://localhost:7145/User/authenticate", command, { headers: HEADERS }).pipe(share());
  }

  registerUser(command: ICreateUserCommand) {
    return this.http.post<IUserViewModel>("https://localhost:7145/User/create", command, { headers: HEADERS }).pipe(share());
  }
}