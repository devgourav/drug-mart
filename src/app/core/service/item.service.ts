import { Injectable } from '@angular/core';
import { Item } from '../model/item.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const itemURL = "http://localhost:3000/items/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ItemService {
  response: any;

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(itemURL, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getItemById(id: string): Observable<Item> {
    return this.http.get<Item>(itemURL + id, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  setItem(item: Item): Observable<any> {
    return this.http.post<Item>(itemURL, item, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteItem(id: string): Observable<{}> {
    return this.http.delete(itemURL + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateItem(item: Item): Observable<any> {
    return this.http.put(itemURL + item.id, item, httpOptions)
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
