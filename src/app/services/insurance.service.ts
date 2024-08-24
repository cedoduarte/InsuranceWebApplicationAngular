import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_API_URL, HEADERS } from '../shared/constants';
import { share } from 'rxjs';
import { ICreateInsuranceCommand, IGetEntityListQuery, IInsuranceListResult, IInsuranceViewModel, IUpdateInsuranceCommand } from '../shared/interfaces';

@Injectable({
  providedIn: 'root'
})
export class InsuranceService {
  http = inject(HttpClient);

  deleteInsurance(id: number) {
    return this.http.delete<IInsuranceViewModel>(`${BASE_API_URL}/Insurance/${id}`, { headers: HEADERS }).pipe(share());
  }
  
  updateInsurance(command: IUpdateInsuranceCommand) {
    return this.http.put<IInsuranceViewModel>(`${BASE_API_URL}/Insurance`, command, { headers: HEADERS }).pipe(share());
  }

  getInsuranceById(id: number) {
    return this.http.get<IInsuranceViewModel>(`${BASE_API_URL}/Insurance/${id}`, { headers: HEADERS }).pipe(share());
  }
  
  getInsuranceList(query: IGetEntityListQuery) {
    const propertyNames = Object.keys(query);
    let queryString = "";
    for (let propertyName of propertyNames) {
      const queryValue: string = `${propertyName}=${query[propertyName]}`;
      queryString += queryValue + "&";
    }
    queryString = queryString.slice(0, -1);
    const url: string = `${BASE_API_URL}/Insurance/list?${queryString}`;
    return this.http.get<IInsuranceListResult>(url, { headers: HEADERS }).pipe(share());
  }

  getInsuranceExcelFile(query: IGetEntityListQuery) {
    const propertyNames = Object.keys(query);
    let queryString = "";
    for (let propertyName of propertyNames) {
      const queryValue: string = `${propertyName}=${query[propertyName]}`;
      queryString += queryValue + "&";
    }
    queryString = queryString.slice(0, -1);
    const url: string = `${BASE_API_URL}/Insurance/excel?${queryString}`;
    return this.http.get(url, {
      observe: "response",
      responseType: "blob",
      headers: HEADERS
    }).pipe(share());
  }

  createInsurance(command: ICreateInsuranceCommand) {
    return this.http.post<IInsuranceViewModel>(`${BASE_API_URL}/Insurance/create`, command, { headers: HEADERS }).pipe(share());
  }
}
