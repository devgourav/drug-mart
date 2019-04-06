import { Injectable } from '@angular/core';
import { Receipt } from '../model/receipt.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root'
})
export class ReceiptService {
	response: any;
	receiptCollection: AngularFirestoreCollection<Receipt>;
	receipts: Observable<Receipt[]>;
	receipt: Observable<Receipt>;
	receiptDocument: AngularFirestoreDocument<Receipt>;
	constructor(private afs: AngularFirestore) {
		this.receiptCollection = this.afs.collection('receipts');
	}

	getReceipts(): Observable<Receipt[]> {
		this.receiptCollection = this.afs.collection('receipts', (ref) => ref.orderBy('creationDate'));
		return (this.receipts = this.receiptCollection.valueChanges());
	}

	getReceiptById(id: string): Observable<Receipt> {
		this.receiptDocument = this.afs.doc(`receipts/${id}`);
		return this.receiptDocument.valueChanges();
	}

	setReceipt(receipt: Receipt): string {
		const id = this.afs.createId();
		receipt.id = id;
		receipt.creationDate = new Date();
		receipt.modificationDate = new Date();
		this.receiptCollection.doc(id).set(receipt);
		return id;
	}

	deleteReceipt(receipt: Receipt) {
		this.receiptDocument = this.afs.doc(`receipts/${receipt.id}`);
		this.receiptDocument.delete();
	}

	updateReceipt(receipt: Receipt) {
		receipt.modificationDate = new Date();
		this.receiptDocument = this.afs.doc(`receipts/${receipt.id}`);
		this.receiptDocument.update(receipt);
	}
}
