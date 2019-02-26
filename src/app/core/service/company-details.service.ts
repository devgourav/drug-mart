import { Injectable } from '@angular/core';
import { CompanyDetails } from '../model/companyDetails.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class CompanyDetailsService {
  response: any;
  companyDetailsCollection: AngularFirestoreCollection<CompanyDetails>;
  companyDetails: Observable<CompanyDetails[]>;
  companyDetailsDocument: AngularFirestoreDocument<CompanyDetails>;
  constructor(private afs: AngularFirestore) {
    this.companyDetailsCollection = this.afs.collection('companyDetails');
  }

  getCompanyDetails(): Observable<CompanyDetails[]> {
    return this.companyDetails = this.companyDetailsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as CompanyDetails;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getCompanyDetailsById(id: string): Observable<CompanyDetails> {
    this.companyDetailsDocument = this.afs.doc(`companyDetails/${id}`);
    return this.companyDetailsDocument.valueChanges();
  }

  setCompanyDetails(companyDetails: CompanyDetails) {
    const id = this.afs.createId();
    companyDetails.id = id;
    this.companyDetailsCollection.doc(id).set(companyDetails);
  }

  deleteCompanyDetails(companyDetails: CompanyDetails) {
    this.companyDetailsDocument = this.afs.doc(`companyDetails/${companyDetails.id}`);
    this.companyDetailsDocument.delete();
  }

  updateCompanyDetails(companyDetails: CompanyDetails) {
    this.companyDetailsDocument = this.afs.doc(`companyDetails/${companyDetails.id}`);
    this.companyDetailsDocument.update(companyDetails);
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
