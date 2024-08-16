import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IGetUserListQuery, IUpdateUserCommand, IUserListResult, IUserViewModel } from '../shared/interfaces';
import { HEADERS } from '../shared/constants';
import { share } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);
  
  deleteUser(id: number) {
    return this.http.delete<IUserViewModel>(`https://localhost:7145/User/${id}`, { headers: HEADERS }).pipe(share());
  }

  updateUser(command: IUpdateUserCommand) {
    return this.http.put<IUserViewModel>("https://localhost:7145/User", command, { headers: HEADERS }).pipe(share());
  }

  getUserById(id: number) {
    return this.http.get<IUserViewModel>(`https://localhost:7145/User/${id}`, { headers: HEADERS }).pipe(share());
  }

  getUserList(query: IGetUserListQuery) {
    const queryString: string = `keyword=${query.keyword}&getAll=${query.getAll}&pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`;
    return this.http.get<IUserListResult>(`https://localhost:7145/User/list?${queryString}`, { headers: HEADERS }).pipe(share());
  }
}