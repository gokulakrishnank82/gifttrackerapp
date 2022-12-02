import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { BusinessType } from '../models/businesstype';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseresponse';

@Injectable({
  providedIn: 'root'
})
export class BusinesstypeService {
  constructor(private httpClient: HttpClient) { }

  // getAll(): Observable<Tutorial[]> {
  //   return this.http.get<Tutorial[]>(baseUrl);
  // }

  getBusinessType(): Observable<BusinessType[]> {
    return this.httpClient.get<BusinessType[]>(`${environment.apiUrl}businesstype/`).pipe(
      catchError(this.errorHandler))
  }
  getBusinessTypeById(id: number): Observable<BusinessType> {
    return this.httpClient.get<BusinessType>(`${environment.apiUrl}businesstype/` + id).pipe(
      catchError(this.errorHandler))
  }
  createBusinessType(businessType: BusinessType): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${environment.apiUrl}businesstype/`, businessType).pipe(
      catchError(this.errorHandler))
  }
  updateBusinessType(businessType: BusinessType): Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(`${environment.apiUrl}businesstype/`, businessType).pipe(
      catchError(this.errorHandler))
  }
  deleteBusinessType(id: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(`${environment.apiUrl}businesstype/` + id).pipe(
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
