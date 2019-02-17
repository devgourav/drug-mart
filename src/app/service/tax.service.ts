import { Injectable } from '@angular/core';
import { Tax } from '../model/tax.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const taxURL = "http://localhost:3000/taxes/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class TaxService {
  response: any;

  constructor(private http: HttpClient) {
  }

  getTaxes(): Observable<Tax[]> {
    return this.http.get<Tax[]>(taxURL, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  setTax(tax: Tax): Observable<any> {
    return this.http.post<Tax>(taxURL, tax, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTaxById(id:string): Observable<Tax[]> {
    return this.http.get<Tax[]>(taxURL + id, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  deleteTax(id: string): Observable<{}> {
    return this.http.delete(taxURL + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateTax(tax: Tax): Observable<any> {
    return this.http.put(taxURL + tax.id, tax, httpOptions)
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
