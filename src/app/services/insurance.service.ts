import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { HEADERS } from '../shared/constants';
import { share } from 'rxjs';
import { IGetEntityListQuery, IInsuranceListResult, IInsuranceViewModel, IUpdateInsuranceCommand } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  http = inject(HttpClient);

  deleteInsurance(id: number) {
    return this.http.delete<IInsuranceViewModel>(`https://localhost:7145/Insurance/${id}`, { headers: HEADERS }).pipe(share());
  }
  
  updateInsurance(command: IUpdateInsuranceCommand) {
    return this.http.put<IInsuranceViewModel>("https://localhost:7145/Insurance", command, { headers: HEADERS }).pipe(share());
  }

  getInsuranceById(id: number) {
    return this.http.get<IInsuranceViewModel>(`https://localhost:7145/Insurance/${id}`, { headers: HEADERS }).pipe(share());
  }
  
  getUserList(query: IGetEntityListQuery) {
    const propertyNames = Object.keys(query);
    let queryString = "";
    for (let propertyName of propertyNames) {
      const queryValue: string = `${propertyName}=${query[propertyName]}`;
      queryString += queryValue + "&";
    }
    queryString = queryString.slice(0, -1);
    const url: string = `https://localhost:7145/Insurance/list?${queryString}`;
    return this.http.get<IInsuranceListResult>(url, { headers: HEADERS }).pipe(share());
  }

  getUserExcelFile(query: IGetEntityListQuery) {
    const propertyNames = Object.keys(query);
    let queryString = "";
    for (let propertyName of propertyNames) {
      const queryValue: string = `${propertyName}=${query[propertyName]}`;
      queryString += queryValue + "&";
    }
    queryString = queryString.slice(0, -1);
    const url: string = `https://localhost:7145/Insurance/excel?${queryString}`;
    return this.http.get(url, {
      observe: "response",
      responseType: "blob",
      headers: HEADERS
    }).pipe(share());
  }
}
