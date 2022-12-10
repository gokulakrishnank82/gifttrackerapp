import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { EmployeeAddFunds } from '../models/employee-addfunds';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseresponse';

@Injectable({
  providedIn: 'root'
})
export class EmployerFundDistributionService {

  constructor(private httpClient: HttpClient) { }

  addEmployeeFunds(employeeFunds: EmployeeAddFunds): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${environment.apiUrl}employeefunddistribution/`, employeeFunds).pipe(
      catchError(this.errorHandler))
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}