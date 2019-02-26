import { Injectable } from '@angular/core';
import { Discount } from '../model/discount.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  response: any;
  discountCollection: AngularFirestoreCollection<Discount>;
  discounts: Observable<Discount[]>;
  discount: Observable<Discount>;
  discountDocument: AngularFirestoreDocument<Discount>;
  constructor(private afs: AngularFirestore) {
    this.discountCollection = this.afs.collection('discounts')
  }

  getDiscounts(): Observable<Discount[]> {
    return this.discounts = this.discountCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Discount
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getDiscountById(id: string): Observable<Discount> {
    this.discountDocument = this.afs.doc(`discounts/${id}`);
    return this.discountDocument.valueChanges();
  }

  setDiscount(discount: Discount) {
    const id = this.afs.createId();
    discount.id = id;
    this.discountCollection.doc(id).set(discount);
  }

  deleteDiscount(discount: Discount) {
    this.discountDocument = this.afs.doc(`discounts/${discount.id}`);
    this.discountDocument.delete();
  }

  updateDiscount(discount: Discount) {
    this.discountDocument = this.afs.doc(`discounts/${discount.id}`);
    this.discountDocument.update(discount);
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
