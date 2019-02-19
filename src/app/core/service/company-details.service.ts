import { Injectable } from '@angular/core';
import { CompanyDetails } from '../model/companyDetails.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const companyDetailsURL = "http://localhost:3000/companyDetails/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsService {
  response: any;

  constructor(private http: HttpClient) {
  }

  getCompanyDetails(): Observable<CompanyDetails> {
    return this.http.get<CompanyDetails>(companyDetailsURL, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  setCompanyDetails(companyDetails: CompanyDetails): Observable<any> {
    return this.http.post<CompanyDetails>(companyDetailsURL, companyDetails, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCompanyDetails(): Observable<{}> {
    return this.http.delete(companyDetailsURL, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCompanyDetails(companyDetails: CompanyDetails): Observable<any> {
    return this.http.put(companyDetailsURL + companyDetails.id, companyDetails, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
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
