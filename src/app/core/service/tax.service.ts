import { Injectable } from '@angular/core';
import { Tax } from '../model/tax.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root'
})
export class TaxService {
	response: any;
	taxCollection: AngularFirestoreCollection<Tax>;
	taxes: Observable<Tax[]>;
	tax: Observable<Tax>;
	taxDocument: AngularFirestoreDocument<Tax>;
	constructor(private afs: AngularFirestore) {
		this.taxCollection = this.afs.collection('taxes');
	}

	getTaxes(): Observable<Tax[]> {
		return (this.taxes = this.taxCollection.snapshotChanges().pipe(
			map((actions) =>
				actions.map((a) => {
					const data = a.payload.doc.data() as Tax;
					data.id = a.payload.doc.id;
					return data;
				})
			)
		));
	}

	getTaxById(id: string): Observable<Tax> {
		this.taxDocument = this.afs.doc(`taxes/${id}`);
		return this.taxDocument.valueChanges();
	}

	setTax(tax: Tax) {
		const id = this.afs.createId();
		tax.id = id;
		tax.creationDate = new Date();
		tax.modificationDate = new Date();
		this.taxCollection.doc(id).set(tax);
	}

	deleteTax(tax: Tax) {
		this.taxDocument = this.afs.doc(`taxes/${tax.id}`);
		this.taxDocument.delete();
	}

	updateTax(tax: Tax) {
		tax.modificationDate = new Date();
		this.taxDocument = this.afs.doc(`taxes/${tax.id}`);
		this.taxDocument.update(tax);
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
