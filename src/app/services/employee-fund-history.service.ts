import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { EmployeeFundHistory } from '../models/employee-fund-history';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeFundHistoryService {
  constructor(private httpClient: HttpClient) { }

  getEmployeeFundHistoryById(employeeid: number): Observable<EmployeeFundHistory[]> {
    return this.httpClient.get<EmployeeFundHistory[]>(`${environment.apiUrl}employeefunddistribution/employeefundhistory/` + employeeid).pipe(
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