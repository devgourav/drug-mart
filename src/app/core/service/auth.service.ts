import { Injectable } from '@angular/core';
import { Auth } from '../model/auth.model';

import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

const userURL = "http://localhost:3000/users/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  response:any;

  constructor(private http: HttpClient) { }

  getUserDetails(){
    // TODO: post to api server and return data if correct
  }

  getUserById(auth: Auth): Observable<Auth> {
    return this.http.get<Auth>(userURL, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
