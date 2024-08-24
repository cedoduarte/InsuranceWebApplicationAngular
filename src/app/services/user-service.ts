import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IGetEntityListQuery, IUpdateUserCommand, IUserListResult, IUserViewModel } from '../shared/interfaces';
import { BASE_API_URL, HEADERS } from '../shared/constants';
import { share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);

  deleteUser(id: number) {
    return this.http.delete<IUserViewModel>(`${BASE_API_URL}/User/${id}`, { headers: HEADERS }).pipe(share());
  }

  updateUser(command: IUpdateUserCommand) {
    return this.http.put<IUserViewModel>(`${BASE_API_URL}/User`, command, { headers: HEADERS }).pipe(share());
  }

  getUserById(id: number) {
    return this.http.get<IUserViewModel>(`${BASE_API_URL}/User/${id}`, { headers: HEADERS }).pipe(share());
  }

  getUserList(query: IGetEntityListQuery) {
    const propertyNames = Object.keys(query);
    let queryString = "";
    for (let propertyName of propertyNames) {
      const queryValue: string = `${propertyName}=${query[propertyName]}`;
      queryString += queryValue + "&";
    }
    queryString = queryString.slice(0, -1);
    const url: string = `${BASE_API_URL}/User/list?${queryString}`;
    return this.http.get<IUserListResult>(url, { headers: HEADERS }).pipe(share());
  }

  getUserExcelFile(query: IGetEntityListQuery) {
    const propertyNames = Object.keys(query);
    let queryString = "";
    for (let propertyName of propertyNames) {
      const queryValue: string = `${propertyName}=${query[propertyName]}`;
      queryString += queryValue + "&";
    }
    queryString = queryString.slice(0, -1);
    const url: string = `${BASE_API_URL}/User/excel?${queryString}`;
    return this.http.get(url, {
      observe: "response",
      responseType: "blob",
      headers: HEADERS
    }).pipe(share());
  }
}