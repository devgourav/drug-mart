import { Injectable } from '@angular/core';
import { Bill } from '../model/bill.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const billURL = "http://localhost:3000/bills/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BillService {
  billList: Bill[];
  response: any;

  constructor(private http: HttpClient) {
    this.billList = [];
  }

  getBills(): Observable<Bill[]> {
    return this.http.get<Bill[]>(billURL, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getBillById(id: string): Observable<Bill> {
    return this.http.get<Bill>(billURL + id, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  setBill(bill: Bill): Observable<any> {
    return this.http.post<Bill>(billURL, bill, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteBill(id: string): Observable<any> {
    return this.http.delete(billURL + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateBill(bill: Bill): Observable<any> {
    return this.http.put<Bill>(billURL + bill.id, bill, httpOptions)
      .pipe(
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
