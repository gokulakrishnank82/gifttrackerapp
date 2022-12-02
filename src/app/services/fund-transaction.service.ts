import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { FundTransaction } from '../models/fundtransaction';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseresponse';

@Injectable({
  providedIn: 'root'
})
export class FundTransactionService {
  constructor(private httpClient: HttpClient) { }

  getFundTransactionHistory(): Observable<FundTransaction[]> {
    return this.httpClient.get<FundTransaction[]>(`${environment.apiUrl}fundtransactionhistory/`).pipe(
      catchError(this.errorHandler))
  }
  getFundTransactionHistoryById(id: number): Observable<FundTransaction> {
    return this.httpClient.get<FundTransaction>(`${environment.apiUrl}fundtransactionhistory/` + id).pipe(
      catchError(this.errorHandler))
  }
  createFundTransactionHistory(fundTransaction: FundTransaction): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${environment.apiUrl}fundtransactionhistory/`, fundTransaction).pipe(
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
