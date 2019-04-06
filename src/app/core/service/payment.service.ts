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
		this.paymentCollection = this.afs.collection('payments', (ref) => ref.orderBy('creationDate'));
		return (this.payments = this.paymentCollection.valueChanges());
	}

	getPaymentById(id: string): Observable<Payment> {
		this.paymentDocument = this.afs.doc(`payments/${id}`);
		return this.paymentDocument.valueChanges();
	}

	setPayment(payment: Payment): string {
		const id = this.afs.createId();
		payment.id = id;
		payment.creationDate = new Date();
		payment.modificationDate = new Date();
		this.paymentCollection.doc(id).set(payment);
		return id;
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
}
