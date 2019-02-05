import { Injectable } from '@angular/core';
import { Vendor } from '../model/vendor.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const vendorURL = "http://localhost:3000/vendors/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class VendorService {
  response: any;

  constructor(private http: HttpClient) {
  }

  getVendors(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>(vendorURL,httpOptions)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  getVendorById(id: string): Observable<Vendor> {
    return this.http.get<Vendor>(vendorURL + id,httpOptions)
    .pipe(
      retry(3),
      catchError(this.handleError)
    );
  }

  setVendor(vendor: Vendor): Observable<any> {
    return this.http.post<Vendor>(vendorURL, vendor, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteVendor(id: string): Observable<{}> {
    return this.http.delete(vendorURL + id, httpOptions)
    .pipe(
      catchError(this.handleError)
    );
  }

  updateVendor(vendor: Vendor): Observable<any> {
    return this.http.put(vendorURL, vendor, httpOptions)
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
