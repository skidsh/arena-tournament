import { Injectable } from '@angular/core';
import { AzerothAPI } from "../shared/api.client.gen";
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { empty, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUser: AzerothAPI.AuthResponse = <AzerothAPI.AuthResponse>({});

  constructor(public api: AzerothAPI.Client, public router: Router) { }
  signIn(username: string, password: string, callBack: (success: boolean) => void) {
    this.api.auth(environment.API_KEY, <AzerothAPI.SignInRequest>({username: username, encodedPassword: btoa(password)}))
      .subscribe(
        result => {
          if (result.token) {
            localStorage.setItem('access_token', result.token);
            localStorage.setItem('isAdmin', result.isAdmin ? "1" : "0")
            localStorage.setItem('username', username);
            localStorage.setItem('email', result.email ? result.email : "");
            this.currentUser = result;
          }
          else {
            this.logout();
          }
        },
        error => {
          this.logout();
          callBack(false);
          return empty();
        },
        () => {
          callBack(this.isLoggedIn);
        })
  }
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    this.router.navigateByUrl(this.router.url);
  }
  get isLoggedIn(): boolean {
    let authToken = this.getToken();
    return authToken !== null ? true : false;
  }
  getToken() {
    return localStorage.getItem('access_token');
  }
  getUser(): string {
    return localStorage.getItem('username') ?? "";
  }
  getEmail(): string {
    return localStorage.getItem('email') ?? "";
  }
  getIsAdmin(): string {
    return localStorage.getItem('isAdmin') ?? "";
  }
}
