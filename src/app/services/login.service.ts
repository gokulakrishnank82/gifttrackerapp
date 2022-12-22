import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { LogInIser } from '../models/loginuser';
import { LogInRequest } from '../models/loginrequest';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {

  private currentUserSubject: BehaviorSubject<LogInIser>;
  public currentUser: Observable<LogInIser>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<LogInIser>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  public get currentUserValue(): LogInIser {
    return this.currentUserSubject.value;
  }

  login(login: LogInRequest) {
    return this.http.post<any>(`${environment.apiUrl}login`, login)
      .pipe(
        map(user => {
          // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
          //user.authdata = window.btoa(user.username + ':' + user.password);
          // if (user.errorDescription == null) {
          //localStorage.setItem('currentUser', JSON.stringify(user));
          // console.log(JSON.stringify(user));
          this.currentUserSubject.next(user);
          // }
          return user;
        }));
  }


  logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

}
