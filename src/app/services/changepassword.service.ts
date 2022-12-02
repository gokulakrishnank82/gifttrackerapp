import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ChangePassword } from '../models/changepassword';

@Injectable({
  providedIn: 'root'
})
export class ChangepasswordService {

  constructor(private httpClient: HttpClient) { }

  changePassword(changePassword: ChangePassword) {
    return this.httpClient.post<any>(`${environment.apiUrl}login/changepassword`, changePassword)
      .pipe();
  }

}