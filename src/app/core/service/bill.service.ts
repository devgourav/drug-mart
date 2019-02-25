import { Injectable } from '@angular/core';
import { Bill } from '../model/bill.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BillItem } from '../model/billItem.model';



@Injectable({
  providedIn: 'root'
})
export class BillService {
  response: any;
  billCollection: AngularFirestoreCollection<Bill>;
  billItemCollection: AngularFirestoreCollection<BillItem>;
  bills: Observable<Bill[]>;
  bill: Observable<Bill>;
  billItem: Observable<BillItem>;
  billDocument: AngularFirestoreDocument<Bill>;
  constructor(private afs: AngularFirestore) {
    this.billCollection = this.afs.collection('bills');
    this.billItemCollection = this.afs.collection('bills');
  }

  getBills(): Observable<Bill[]> {
    return this.bills = this.billCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Bill;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getBillById(id: string): Observable<Bill> {
    this.billDocument = this.afs.doc(`bills/${id}`);
    return this.billDocument.valueChanges();
  }

  setBill(bill: Bill) {
    const id = this.afs.createId();
    bill.id = id;
    this.billCollection.doc(id).set(bill);
  }

  deleteBill(bill: Bill) {
    this.billDocument = this.afs.doc(`bills/${bill.id}`);
    this.billDocument.delete();
  }

  updateBill(bill: Bill) {
    this.billDocument = this.afs.doc(`bills/${bill.id}`);
    this.billDocument.update(bill);
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
