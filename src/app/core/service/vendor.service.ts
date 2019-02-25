import { Injectable } from '@angular/core';
import { Vendor } from '../model/vendor.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class VendorService {
  response: any;
  vendorCollection: AngularFirestoreCollection<Vendor>;
  vendors: Observable<Vendor[]>;
  vendor: Observable<Vendor>;
  vendorDocument: AngularFirestoreDocument<Vendor>;
  constructor(private afs: AngularFirestore) {
    this.vendorCollection = this.afs.collection('vendors');
  }

  getVendors(): Observable<Vendor[]> {
    return this.vendors = this.vendorCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Vendor;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getVendorById(id: string): Observable<Vendor> {
    this.vendorDocument = this.afs.doc(`vendors/${id}`);
    return this.vendorDocument.valueChanges();
  }

  setVendor(vendor: Vendor) {
    const id = this.afs.createId();
    vendor.id = id;
    this.vendorCollection.doc(id).set(vendor);
  }

  deleteVendor(vendor: Vendor) {
    this.vendorDocument = this.afs.doc(`vendors/${vendor.id}`);
    this.vendorDocument.delete();
  }

  updateVendor(vendor: Vendor) {
    this.vendorDocument = this.afs.doc(`vendors/${vendor.id}`);
    this.vendorDocument.update(vendor);
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
