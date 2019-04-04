import { Injectable } from '@angular/core';
import { Payment } from '../model/payment.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root'
})
export class PaymentService {
	response: any;
	paymentCollection: AngularFirestoreCollection<Payment>;
	payments: Observable<Payment[]>;
	payment: Observable<Payment>;
	paymentDocument: AngularFirestoreDocument<Payment>;
	constructor(private afs: AngularFirestore) {
		this.paymentCollection = this.afs.collection('payments');
	}

	getPayments(): Observable<Payment[]> {
		return (this.payments = this.paymentCollection.snapshotChanges().pipe(
			map((actions) =>
				actions.map((a) => {
					const data = a.payload.doc.data() as Payment;
					data.id = a.payload.doc.id;
					return data;
				})
			)
		));
	}

	getPaymentById(id: string): Observable<Payment> {
		this.paymentDocument = this.afs.doc(`payments/${id}`);
		return this.paymentDocument.valueChanges();
	}

	setPayment(payment: Payment) {
		const id = this.afs.createId();
		payment.id = id;
		payment.creationDate = new Date();
		payment.modificationDate = new Date();
		this.paymentCollection.doc(id).set(payment);
	}

	deletePayment(payment: Payment) {
		this.paymentDocument = this.afs.doc(`payments/${payment.id}`);
		this.paymentDocument.delete();
	}

	updatePayment(payment: Payment) {
		payment.modificationDate = new Date();
		this.paymentDocument = this.afs.doc(`payments/${payment.id}`);
		this.paymentDocument.update(payment);
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
