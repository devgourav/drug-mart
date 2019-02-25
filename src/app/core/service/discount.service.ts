import { Injectable } from '@angular/core';
import { Discount } from '../model/discount.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const discountURL = "http://localhost:3000/discounts/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  response: any;

  constructor(private http: HttpClient) {
  }

  getDiscounts(): Observable<Discount[]> {
    return this.http.get<Discount[]>(discountURL, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  setDiscount(discount: Discount): Observable<any> {
    return this.http.post<Discount>(discountURL, discount, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getDiscountById(id:string): Observable<Discount[]> {
    return this.http.get<Discount[]>(discountURL + id, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  deleteDiscount(id: string): Observable<{}> {
    return this.http.delete(discountURL + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateDiscount(discount: Discount): Observable<any> {
    return this.http.put(discountURL + discount.id, discount, httpOptions)
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
