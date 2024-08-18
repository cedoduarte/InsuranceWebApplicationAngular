import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ICarListResult, ICarViewModel, IGetEntityListQuery, IUpdateCarCommand, IUserViewModel } from '../shared/interfaces';
import { share } from 'rxjs';
import { HEADERS } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CarService {
  http = inject(HttpClient);

  deleteCar(id: number) {
    return this.http.delete<IUserViewModel>(`https://localhost:7145/Car/${id}`, { headers: HEADERS }).pipe(share());
  }

  updateCar(command: IUpdateCarCommand) {
    return this.http.put<ICarViewModel>(`https://localhost:7145/Car`, command, { headers: HEADERS }).pipe(share());
  }

  getCarById(id: number) {
    return this.http.get<ICarViewModel>(`https://localhost:7145/Car/${id}`, { headers: HEADERS }).pipe(share());
  }

  getCarList(query: IGetEntityListQuery) {
    const queryString: string = `keyword=${query.keyword}&getAll=${query.getAll}&pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`;
    return this.http.get<ICarListResult>(`https://localhost:7145/Car/list?${queryString}`, { headers: HEADERS }).pipe(share());
  }

  getCarExcelFile(query: IGetEntityListQuery) {
    const queryString: string = `keyword=${query.keyword}&getAll=${query.getAll}&pageNumber=${query.pageNumber}&pageSize=${query.pageSize}`;
    const url: string = `https://localhost:7145/Car/excel?${queryString}`;
    return this.http.get(url, {
      observe: "response",
      responseType: "blob",
      headers: HEADERS
    }).pipe(share());
  }
}
