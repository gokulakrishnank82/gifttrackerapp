import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BulkuploadHistory } from '../models/bulkupload-history';
import { BulkuploadEmployeeHistory } from '../models/bulkupload-employee-history'
import { Observable, throwError, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeBulkloadService {
  constructor(private httpClient: HttpClient) { }

  getBulkUploadHitoryByCompanyId(companyid: number): Observable<BulkuploadHistory[]> {
    return this.httpClient.get<BulkuploadHistory[]>(`${environment.apiUrl}stagingemployeeheader/` + companyid).pipe(
      catchError(this.errorHandler))
  }

  getEmployeeHitoryByHeaderId(employeeheaderid: number): Observable<BulkuploadEmployeeHistory[]> {
    return this.httpClient.get<BulkuploadEmployeeHistory[]>(`${environment.apiUrl}stagingemployeeheader/employeedetail/` + employeeheaderid).pipe(
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