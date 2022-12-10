import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Catalog } from '../models/catalog';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseresponse';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private httpClient: HttpClient) { }

  getCatalog(): Observable<Catalog[]> {
    return this.httpClient.get<Catalog[]>(`${environment.apiUrl}catalog/`).pipe(
      catchError(this.errorHandler))
  }
  getCatalogById(id: number): Observable<Catalog> {
    return this.httpClient.get<Catalog>(`${environment.apiUrl}catalog/` + id).pipe(
      catchError(this.errorHandler))
  }
  createCatalog(catalog: any): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${environment.apiUrl}catalog/`, catalog).pipe(
      catchError(this.errorHandler))
  }
  updateCatalog(catalog: any): Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(`${environment.apiUrl}catalog/`, catalog).pipe(
      catchError(this.errorHandler))
  }
  deleteCatalog(id: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(`${environment.apiUrl}catalog/` + id).pipe(
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