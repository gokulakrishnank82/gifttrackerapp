import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { CompanyContact } from '../models/companycontact';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseresponse';

@Injectable({
  providedIn: 'root'
})
export class CompanycontactService {


  constructor(private httpClient: HttpClient) { }

  getAllContact(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}companycontact/all`).pipe(
      catchError(this.errorHandler))
  }

  getCompanyContact(): Observable<CompanyContact[]> {
    return this.httpClient.get<CompanyContact[]>(`${environment.apiUrl}companycontact/`).pipe(
      catchError(this.errorHandler))
  }
  getCompanyContactById(id: number): Observable<CompanyContact> {
    return this.httpClient.get<CompanyContact>(`${environment.apiUrl}companycontact/` + id).pipe(
      catchError(this.errorHandler))
  }
  createCompanyContact(companyContact: CompanyContact): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${environment.apiUrl}companycontact/`, companyContact).pipe(
      catchError(this.errorHandler))
  }
  updateCompanyContact(companyContact: CompanyContact): Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(`${environment.apiUrl}companycontact/`, companyContact).pipe(
      catchError(this.errorHandler))
  }
  deleteCompanyContact(id: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(`${environment.apiUrl}companycontact/` + id).pipe(
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