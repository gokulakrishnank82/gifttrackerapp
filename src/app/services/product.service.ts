import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Product } from '../models/product';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseresponse';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  // getAll(): Observable<Tutorial[]> {
  //   return this.http.get<Tutorial[]>(baseUrl);
  // }

  getProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.apiUrl}product/`).pipe(
      catchError(this.errorHandler))
  }
  getProductById(id: number): Observable<Product> {
    return this.httpClient.get<Product>(`${environment.apiUrl}product/` + id).pipe(
      catchError(this.errorHandler))
  }
  createProduct(product: Product): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${environment.apiUrl}product/`, product).pipe(
      catchError(this.errorHandler))
  }
  updateProduct(product: Product): Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(`${environment.apiUrl}product/`, product).pipe(
      catchError(this.errorHandler))
  }
  deleteProduct(id: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(`${environment.apiUrl}product/` + id).pipe(
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

