import { Injectable } from '@angular/core';
import { Item } from '../model/item.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class ItemService {
  response: any;
  itemCollection: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;
  item: Observable<Item>;
  itemDocument: AngularFirestoreDocument<Item>;
  constructor(private afs: AngularFirestore) {
    this.itemCollection = this.afs.collection('items');
  }

  getItems(): Observable<Item[]> {
    return this.items = this.itemCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getItemById(id: string): Observable<Item> {
    this.itemDocument = this.afs.doc(`items/${id}`);
    return this.itemDocument.valueChanges();
  }

  setItem(item: Item) {
    const id = this.afs.createId();
    item.id = id;
    this.itemCollection.doc(id).set(item);
  }

  deleteItem(item: Item) {
    this.itemDocument = this.afs.doc(`items/${item.id}`);
    this.itemDocument.delete();
  }

  updateItem(item: Item) {
    this.itemDocument = this.afs.doc(`items/${item.id}`);
    this.itemDocument.update(item);
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
