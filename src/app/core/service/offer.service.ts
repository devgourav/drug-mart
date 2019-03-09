import { Injectable } from '@angular/core';
import { Offer } from '../model/offer.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class OfferService {
  response: any;
  offerCollection: AngularFirestoreCollection<Offer>;
  offers: Observable<Offer[]>;
  offer: Observable<Offer>;
  offerDocument: AngularFirestoreDocument<Offer>;
  constructor(private afs: AngularFirestore) {
    this.offerCollection = this.afs.collection('offers')
  }

  getOffers(): Observable<Offer[]> {
    return this.offers = this.offerCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Offer
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getOfferById(id: string): Observable<Offer> {
    this.offerDocument = this.afs.doc(`offers/${id}`);
    return this.offerDocument.valueChanges();
  }

  setOffer(offer: Offer) {
    const id = this.afs.createId();
    offer.id = id;
    offer.creationDate = new Date();
    offer.modificationDate = new Date();
    this.offerCollection.doc(id).set(offer);
  }

  deleteOffer(offer: Offer) {
    this.offerDocument = this.afs.doc(`offers/${offer.id}`);
    this.offerDocument.delete();
  }

  updateOffer(offer: Offer) {
    offer.modificationDate = new Date();
    this.offerDocument = this.afs.doc(`offers/${offer.id}`);
    this.offerDocument.update(offer);
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
