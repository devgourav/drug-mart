import { Injectable } from '@angular/core';
import { Client } from '../model/client.model';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { throwError, Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


const clientURL = "http://localhost:3000/clients/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  response: any;

  constructor(private http: HttpClient) {
  }

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(clientURL, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  getClientById(id: string): Observable<Client> {
    return this.http.get<Client>(clientURL + id, httpOptions)
      .pipe(
        retry(3),
        catchError(this.handleError)
      );
  }

  setClient(client: Client): Observable<any> {
    return this.http.post<Client>(clientURL, client, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteClient(id: string): Observable<{}> {
    return this.http.delete(clientURL + id, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateClient(client: Client): Observable<any> {
    return this.http.put(clientURL + client.id, client, httpOptions)
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
