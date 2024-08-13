import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { IUserAuthenticationResult } from '../shared/interfaces';
import { share } from 'rxjs';
import { HEADERS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  http = inject(HttpClient);

  authenticate(email: string, password: string) {
    const body = {
      email,
      password
    };
    return this.http.post<IUserAuthenticationResult>("https://localhost:7145/User/authenticate", body, { headers: HEADERS }).pipe(share());
  }
}