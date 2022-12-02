import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Company } from '../models/company';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseresponse';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  constructor(private httpClient: HttpClient) { }

  // getAll(): Observable<Tutorial[]> {
  //   return this.http.get<Tutorial[]>(baseUrl);
  // }

  getCompany(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${environment.apiUrl}company/`).pipe(
      catchError(this.errorHandler))
  }
  getCompanyById(id: number): Observable<Company> {
    return this.httpClient.get<Company>(`${environment.apiUrl}company/` + id).pipe(
      catchError(this.errorHandler))
  }
  createCompany(company: Company): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${environment.apiUrl}company/`, company).pipe(
      catchError(this.errorHandler))
  }
  updateCompany(company: Company): Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(`${environment.apiUrl}company/`, company).pipe(
      catchError(this.errorHandler))
  }
  deleteCompany(id: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(`${environment.apiUrl}company/` + id).pipe(
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
