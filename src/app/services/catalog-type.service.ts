import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { CatalogType } from '../models/catalog-type';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseresponse';

@Injectable({
  providedIn: 'root'
})
export class CatalogTypeService {

  constructor(private httpClient: HttpClient) { }

  getCatalogType(): Observable<CatalogType[]> {
    return this.httpClient.get<CatalogType[]>(`${environment.apiUrl}catalogtype/`).pipe(
      catchError(this.errorHandler))
  }
  getCatalogTypeById(id: number): Observable<CatalogType> {
    return this.httpClient.get<CatalogType>(`${environment.apiUrl}catalogtype/` + id).pipe(
      catchError(this.errorHandler))
  }
  createCatalogType(catalogType: CatalogType): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${environment.apiUrl}catalogtype/`, catalogType).pipe(
      catchError(this.errorHandler))
  }
  updateCatalogType(catalogType: CatalogType): Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(`${environment.apiUrl}catalogtype/`, catalogType).pipe(
      catchError(this.errorHandler))
  }
  deleteCatalogType(id: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(`${environment.apiUrl}catalogtype/` + id).pipe(
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