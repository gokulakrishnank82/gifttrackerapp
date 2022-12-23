import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CompanyFundTransaction } from '../models/company-fund-transaction';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseresponse';
import { MerchantOrder } from '../models/merchantorder';
import { PaymentRequest } from '../models/paymentrequest';
import { CompleteOrderRequest } from '../models/completeorderrequest';

@Injectable({
  providedIn: 'root'
})
export class CompanyFundTransactionService {
  constructor(private httpClient: HttpClient) { }

  ProcessPaymentRequest(paymentRequest: PaymentRequest): Observable<MerchantOrder> {
    return this.httpClient.post<MerchantOrder>(`${environment.apiUrl}payment/`, paymentRequest).pipe(
      catchError(this.errorHandler))
  }

  getPaymentStatus(completeOrderRequest: any): Observable<string> {
    return this.httpClient.post<string>(`${environment.apiUrl}payment/getpaymentstatus/`, completeOrderRequest).pipe(
      catchError(this.errorHandler))
  }
  
  getCompanyFundTransaction(): Observable<CompanyFundTransaction[]> {
    return this.httpClient.get<CompanyFundTransaction[]>(`${environment.apiUrl}companyfundtransaction/`).pipe(
      catchError(this.errorHandler))
  }
  getCompanyFundTransactionById(id: number): Observable<CompanyFundTransaction> {
    return this.httpClient.get<CompanyFundTransaction>(`${environment.apiUrl}companyfundtransaction/` + id).pipe(
      catchError(this.errorHandler))
  }
  createCompanyFundTransaction(companyFundTransaction: CompanyFundTransaction): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${environment.apiUrl}companyfundtransaction/`, companyFundTransaction).pipe(
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
