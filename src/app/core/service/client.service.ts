import { Injectable } from '@angular/core';
import { Client } from '../model/client.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ClientService {
  response: any;
  clientCollection: AngularFirestoreCollection<Client>;
  clients: Observable<Client[]>;
  client: Observable<Client>;
  clientDocument: AngularFirestoreDocument<Client>;

  constructor(private afs: AngularFirestore) {
    this.clientCollection = this.afs.collection('clients');
  }

  getClients(): Observable<Client[]> {
    return this.clients = this.clientCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getClientById(id: string): Observable<Client> {
    this.clientDocument = this.afs.doc(`clients/${id}`);
    return this.clientDocument.valueChanges();
  }

  setClient(client: Client) {
    const id = this.afs.createId();
    client.id = id;
    this.clientCollection.doc(id).set(client);

  }

  deleteClient(client: Client) {
    this.clientDocument = this.afs.doc(`clients/${client.id}`);
    this.clientDocument.delete();
  }

  updateClient(client: Client) {
    this.clientDocument = this.afs.doc(`clients/${client.id}`);
    this.clientDocument.update(client);

  }

  // private handleError(error: HttpErrorResponse) {
  //   if (error.error instanceof ErrorEvent) {
  //     console.error('An error occurred:', error.error.message);
  //   } else {
  //     console.error(
  //       `Backend returned code ${error.status}, ` +
  //       `body was: ${error.error}`);
  //   }
  //   return throwError(
  //     'Something bad happened; please try again later.');
  // };
}