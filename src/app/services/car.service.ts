import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICarListResult, ICarViewModel, ICreateCarCommand, IGetEntityListQuery, IUpdateCarCommand, IUserViewModel } from '../shared/interfaces';
import { share } from 'rxjs';
import { BASE_API_URL, HEADERS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  http = inject(HttpClient);

  deleteCar(id: number) {
    return this.http.delete<IUserViewModel>(`${BASE_API_URL}/Car/${id}`, { headers: HEADERS }).pipe(share());
  }

  updateCar(command: IUpdateCarCommand) {
    return this.http.put<ICarViewModel>(`${BASE_API_URL}/Car`, command, { headers: HEADERS }).pipe(share());
  }

  getCarById(id: number) {
    return this.http.get<ICarViewModel>(`${BASE_API_URL}/Car/${id}`, { headers: HEADERS }).pipe(share());
  }

  getCarList(query: IGetEntityListQuery) {
    const propertyNames = Object.keys(query);
    let queryString = "";
    for (let propertyName of propertyNames) {
      const queryValue: string = `${propertyName}=${query[propertyName]}`;
      queryString += queryValue + "&";
    }
    queryString = queryString.slice(0, -1);
    const url: string = `${BASE_API_URL}/Car/list?${queryString}`;
    return this.http.get<ICarListResult>(url, { headers: HEADERS }).pipe(share());
  }

  getCarExcelFile(query: IGetEntityListQuery) {
    const propertyNames = Object.keys(query);
    let queryString = "";
    for (let propertyName of propertyNames) {
      const queryValue: string = `${propertyName}=${query[propertyName]}`;
      queryString += queryValue + "&";
    }
    queryString = queryString.slice(0, -1);
    const url: string = `${BASE_API_URL}/Car/excel?${queryString}`;
    return this.http.get(url, {
      observe: "response",
      responseType: "blob",
      headers: HEADERS
    }).pipe(share());
  }

  createCar(command: ICreateCarCommand) {
    return this.http.post<ICarViewModel>(`${BASE_API_URL}/Car/create`, command, { headers: HEADERS }).pipe(share());
  }
}
