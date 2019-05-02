import { Injectable } from '@angular/core';
import { PriceList } from '../model/priceList.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class PriceListService {
  response: any;
	priceListCollection: AngularFirestoreCollection<PriceList>;
	priceLists: Observable<PriceList[]>;
	priceList: Observable<PriceList>;
	priceListDocument: AngularFirestoreDocument<PriceList>;
	constructor(private afs: AngularFirestore) {
		this.priceListCollection = this.afs.collection('priceLists');
	}

	getPriceLists(): Observable<PriceList[]> {
		return (this.priceLists = this.priceListCollection.snapshotChanges().pipe(
			map((actions) =>
				actions.map((a) => {
					const data = a.payload.doc.data() as PriceList;
					data.id = a.payload.doc.id;
					return data;
				})
			)
		));
	}

	getPriceListById(id: string): Observable<PriceList> {
		this.priceListDocument = this.afs.doc(`priceLists/${id}`);
		return this.priceListDocument.valueChanges();
	}

	setPriceList(priceList: PriceList) {
		const id = this.afs.createId();
		priceList.id = id;
		priceList.creationDate = new Date();
		priceList.modificationDate = new Date();
		this.priceListCollection.doc(id).set(priceList);
	}

	deletePriceList(priceList: PriceList) {
		this.priceListDocument = this.afs.doc(`priceLists/${priceList.id}`);
		this.priceListDocument.delete();
	}

	updatePriceList(priceList: PriceList) {
		priceList.modificationDate = new Date();
		this.priceListDocument = this.afs.doc(`priceLists/${priceList.id}`);
		this.priceListDocument.update(priceList);
	}
}
