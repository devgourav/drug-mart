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
		return (this.items = this.itemCollection.snapshotChanges().pipe(
			map((actions) =>
				actions.map((a) => {
					const data = a.payload.doc.data() as Item;
					data.id = a.payload.doc.id;
					return data;
				})
			)
		));
	}

	getItemById(id: string): Observable<Item> {
		this.itemDocument = this.afs.doc(`items/${id}`);
		return this.itemDocument.valueChanges();
	}

	setItem(item: Item) {
		const id = this.afs.createId();
		item.id = id;
		item.creationDate = new Date();
		item.modificationDate = new Date();
		this.itemCollection.doc(id).set(item);
	}

	deleteItem(item: Item) {
		this.itemDocument = this.afs.doc(`items/${item.id}`);
		this.itemDocument.delete();
	}

	updateItem(item: Item) {
		item.modificationDate = new Date();
		this.itemDocument = this.afs.doc(`items/${item.id}`);
		this.itemDocument.update(item);
	}

	batchItemQuantityUpdate(itemMaps: Map<string, number>) {
		var batch = this.afs.firestore.batch();

		for (let [ key, value ] of itemMaps) {
			const sfDocRef = this.afs.firestore.collection('items').doc(key);
			batch.update(sfDocRef, { quantity: value });
		}

		batch.commit().then((response) => {
			console.log('response', response);
		});
	}
}
