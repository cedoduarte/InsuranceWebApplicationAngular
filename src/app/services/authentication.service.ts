import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IAuthenticateUserCommand, ICreateUserCommand, IUserAuthenticationResult, IUserViewModel } from '../shared/interfaces';
import { share } from 'rxjs';
import { BASE_API_URL, HEADERS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  http = inject(HttpClient);

  authenticate(command: IAuthenticateUserCommand) {
    return this.http.post<IUserAuthenticationResult>(`${BASE_API_URL}/User/authenticate`, command, { headers: HEADERS }).pipe(share());
  }

  registerUser(command: ICreateUserCommand) {
    return this.http.post<IUserViewModel>(`${BASE_API_URL}/User/create`, command, { headers: HEADERS }).pipe(share());
  }
}