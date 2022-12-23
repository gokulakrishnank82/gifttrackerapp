import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Employee } from '../models/employee';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseresponse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  constructor(private httpClient: HttpClient) { }

  // getAll(): Observable<Tutorial[]> {
  //   return this.http.get<Tutorial[]>(baseUrl);
  // }

  getEmployee(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${environment.apiUrl}employee/`).pipe(
      catchError(this.errorHandler))
  }
  getEmployeeByCompany(companyid: number): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${environment.apiUrl}employee/getemployeebycompany/` + companyid).pipe(
      catchError(this.errorHandler))
  }
  getEmployeeById(id: number): Observable<Employee> {
    return this.httpClient.get<Employee>(`${environment.apiUrl}employee/` + id).pipe(
      catchError(this.errorHandler))
  }
  getEmployeeWallet(employeeid: number): Observable<number> {
    return this.httpClient.get<number>(`${environment.apiUrl}employee/employeewallet/` + employeeid).pipe(
      catchError(this.errorHandler))
  }
  createEmployee(employee: Employee): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${environment.apiUrl}employee/`, employee).pipe(
      catchError(this.errorHandler))
  }
  updateEmployee(employee: Employee): Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(`${environment.apiUrl}employee/`, employee).pipe(
      catchError(this.errorHandler))
  }
  deleteEmployee(id: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(`${environment.apiUrl}employee/` + id).pipe(
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