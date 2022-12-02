import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { PaymentType } from '../models/paymenttype';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseresponse';

@Injectable({
  providedIn: 'root'
})
export class PaymenttypeService {

  constructor(private httpClient: HttpClient) { }

  // getAll(): Observable<Tutorial[]> {
  //   return this.http.get<Tutorial[]>(baseUrl);
  // }

  getPaymentType(): Observable<PaymentType[]> {
    return this.httpClient.get<PaymentType[]>(`${environment.apiUrl}paymenttype/`).pipe(
      catchError(this.errorHandler))
  }
  getPaymentTypeById(id: number): Observable<PaymentType> {
    return this.httpClient.get<PaymentType>(`${environment.apiUrl}paymenttype/` + id).pipe(
      catchError(this.errorHandler))
  }
  createPaymentType(paymenttype: PaymentType): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${environment.apiUrl}paymenttype/`, paymenttype).pipe(
      catchError(this.errorHandler))
  }
  updatePaymentType(paymenttype: PaymentType): Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(`${environment.apiUrl}paymenttype/`, paymenttype).pipe(
      catchError(this.errorHandler))
  }
  deletePaymentType(id: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(`${environment.apiUrl}paymenttype/` + id).pipe(
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