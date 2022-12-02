import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Role } from '../models/role';
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/baseresponse';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private httpClient: HttpClient) { }

  // getAll(): Observable<Tutorial[]> {
  //   return this.http.get<Tutorial[]>(baseUrl);
  // }

  getRole(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(`${environment.apiUrl}role/`).pipe(
      catchError(this.errorHandler))
  }
  getRoleById(id: number): Observable<Role> {
    return this.httpClient.get<Role>(`${environment.apiUrl}role/` + id).pipe(
      catchError(this.errorHandler))
  }
  createRole(role: Role): Observable<BaseResponse> {
    return this.httpClient.post<BaseResponse>(`${environment.apiUrl}role/`, role).pipe(
      catchError(this.errorHandler))
  }
  updateRole(role: Role): Observable<BaseResponse> {
    return this.httpClient.put<BaseResponse>(`${environment.apiUrl}role/`, role).pipe(
      catchError(this.errorHandler))
  }
  deleteRole(id: number): Observable<BaseResponse> {
    return this.httpClient.delete<BaseResponse>(`${environment.apiUrl}role/` + id).pipe(
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

