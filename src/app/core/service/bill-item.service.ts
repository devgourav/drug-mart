import { Injectable } from '@angular/core';
import { BillItem } from '../model/billItem.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class BillItemService {
  response: any;
  billItemCollection: AngularFirestoreCollection<BillItem>;
  billItems: Observable<BillItem[]>;
  billItem: Observable<BillItem>;
  billItemDocument: AngularFirestoreDocument<BillItem>;
  constructor(private afs: AngularFirestore) {
    this.billItemCollection = this.afs.collection('billItems');
  }

  getBillItems(): Observable<BillItem[]> {
    return this.billItems = this.billItemCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as BillItem;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getBillItemById(id: string): Observable<BillItem> {
    this.billItemDocument = this.afs.doc(`billItems/${id}`);
    return this.billItemDocument.valueChanges();
  }

  setBillItem(billItem: BillItem) {
    const id = this.afs.createId();
    billItem.id = id;
    this.billItemCollection.doc(id).set(billItem);
  }

  deleteBillItem(billItem: BillItem) {
    this.billItemDocument = this.afs.doc(`billItems/${billItem.id}`);
    this.billItemDocument.delete();
  }

  updateBillItem(billItem: BillItem) {
    this.billItemDocument = this.afs.doc(`billItems/${billItem.id}`);
    this.billItemDocument.update(billItem);
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
