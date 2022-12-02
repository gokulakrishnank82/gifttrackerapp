import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { ForgetPassword } from '../models/forgetpassword';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {

  constructor(private httpClient: HttpClient) { }

  forgetPassword(forgetPassword: ForgetPassword) {
    return this.httpClient.post<any>(`${environment.apiUrl}login/forgetpassword`, forgetPassword)
      .pipe();
  }

}