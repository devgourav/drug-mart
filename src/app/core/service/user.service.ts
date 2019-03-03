import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  response: any;
  userCollection: AngularFirestoreCollection<User>;
  users: Observable<User[]>;
  user: Observable<User>;
  userDocument: AngularFirestoreDocument<User>;
  constructor(private afs: AngularFirestore) {
    this.userCollection = this.afs.collection('users');
  }

  getUsers(): Observable<User[]> {
    return this.users = this.userCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      }))
    );
  }

  getUserById(id: string): Observable<User> {
    this.userDocument = this.afs.doc(`users/${id}`);
    return this.userDocument.valueChanges();
  }

  setUser(user: User) {
    const id = user.id;
    this.userCollection.doc(id).set(user,{ merge: true });
  }

  deleteUser(user: User) {
    this.userDocument = this.afs.doc(`users/${user.id}`);
    this.userDocument.delete();
  }

  updateUser(user: User) {
    this.userDocument = this.afs.doc(`users/${user.id}`);
    this.userDocument.update(user);
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
