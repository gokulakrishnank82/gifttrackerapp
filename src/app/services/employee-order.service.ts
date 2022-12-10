import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { EmployeeOrder } from '../models/employee-order';
import { EmployeeOrderInfo } from '../models/employee-order-info';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseresponse';


@Injectable({
  providedIn: 'root'
})
export class EmployeeOrderService {
  constructor(private httpClient: HttpClient) { }

  getEmployeeOrder(employeeId: number): Observable<EmployeeOrderInfo[]> {
    return this.httpClient.get<EmployeeOrderInfo[]>(`${environment.apiUrl}employeeorder/` + employeeId).pipe(
      catchError(this.errorHandler))
  }
  getEmployeeOrderById(id: number): Observable<EmployeeOrder> {
    return this.httpClient.get<EmployeeOrder>(`${environment.apiUrl}employeeorder/` + id).pipe(
      catchError(this.errorHandler))
  }
  createEmployeeOrder(employeeOrder: EmployeeOrder): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${environment.apiUrl}employeeorder/`, employeeOrder).pipe(
      catchError(this.errorHandler))
  }
  updateEmployeeOrder(employeeOrder: EmployeeOrder): Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(`${environment.apiUrl}employeeorder/`, employeeOrder).pipe(
      catchError(this.errorHandler))
  }
  deleteEmployeeOrder(id: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(`${environment.apiUrl}employeeorder/` + id).pipe(
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