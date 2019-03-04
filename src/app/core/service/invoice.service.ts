import { Injectable } from '@angular/core';
import { Invoice } from '../model/invoice.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class InvoiceService {
  response: any;
  invoiceCollection: AngularFirestoreCollection<Invoice>;
  invoices: Observable<Invoice[]>;
  invoice: Observable<Invoice>;
  invoiceDocument: AngularFirestoreDocument<Invoice>;
  constructor(private afs: AngularFirestore) {
    this.invoiceCollection = this.afs.collection('invoices');
  }

  getInvoices(): Observable<Invoice[]> {
    return this.invoices = this.invoiceCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Invoice;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getInvoiceById(id: string): Observable<Invoice> {
    this.invoiceDocument = this.afs.doc(`invoices/${id}`);
    return this.invoiceDocument.valueChanges();
  }

  setInvoice(invoice: Invoice) {
    const id = this.afs.createId();
    invoice.id = id;
    invoice.creationDate = new Date();
    invoice.modificationDate = new Date();
    this.invoiceCollection.doc(id).set(invoice);
  }

  deleteInvoice(invoice: Invoice) {
    this.invoiceDocument = this.afs.doc(`invoices/${invoice.id}`);
    this.invoiceDocument.delete();
  }

  updateInvoice(invoice: Invoice) {
    invoice.modificationDate = new Date();
    this.invoiceDocument = this.afs.doc(`invoices/${invoice.id}`);
    this.invoiceDocument.update(invoice);
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
