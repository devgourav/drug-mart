import { Injectable } from '@angular/core';
import { Invoice } from '../model/invoice.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

const invoiceURL = "http://localhost:3000/invoices/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  invoiceList: Invoice[];
  response: any;

  constructor(private http: HttpClient) {
    this.invoiceList = [];
  }

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(invoiceURL, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getInvoiceById(id: string): Observable<Invoice> {
    return this.http.get<Invoice>(invoiceURL + id, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  setInvoice(invoice: Invoice): Observable<any> {
    return this.http.post<Invoice>(invoiceURL, invoice, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteInvoice(id: string): Observable<any> {
    return this.http.delete(invoiceURL + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateInvoice(invoice: Invoice): Observable<any> {
    return this.http.put<Invoice>(invoiceURL + invoice.id, invoice, httpOptions)
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
