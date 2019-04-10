import { Injectable } from '@angular/core';
import { User, Roles } from '../model/user.model';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { UserService } from './user.service';
import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	response: any;
	user: Observable<User>;
	newUser: User;
	roles: Roles;
	phoneNumber: string = '';
	displayName: string = '';
	currentUser: any;

	credential: auth.AuthCredential;
	confirmationResult: auth.ConfirmationResult;

	constructor(
		private afAuth: AngularFireAuth,
		private _userService: UserService,
		private router: Router,
		private angularFirestore: AngularFirestore
	) {
		this.user = this.afAuth.authState.pipe(
			switchMap((user) => {
				if (user) {
					return this._userService.getUserById(user.uid);
				} else {
					return of(null);
				}
			})
		);
	}

	// async googleLogin() {
	// 	console.log('Google login');
	// 	const provider = new auth.GoogleAuthProvider();
	// 	await this.afAuth.auth
	// 		.signInWithPopup(provider)
	// 		.then((firebaseUser) => {
	// 			this.updateUserData(firebaseUser.user);
	// 		})
	// 		.catch((error) => console.error('googleLogin', error));
	// }

	async logout() {
		await this.afAuth.auth.signOut();
		return this.router.navigate([ '/' ]);
	}

	// public onEmailandPasswordRegister(emailID, newPassword) {
	// 	auth()
	// 		.createUserWithEmailAndPassword(emailID, newPassword)
	// 		.then((user) => {
	// 			return this.updateUserData(user);
	// 		})
	// 		.catch((error) => console.error('onRegisterSubmit', error));
	// }

	public onEmailandPasswordSignIn(emailID, password) {
		auth()
			.signInWithEmailAndPassword(emailID, password)
			.then((firebaseUser) => {
				if (firebaseUser) {
					this.setUserData(firebaseUser.user);
				}
			})
			.catch((error) => console.error('onEmailSignInSubmit', error));
	}

	public setUserData(user: any) {
		this._userService.getUserById(user.uid).subscribe((response) => {
			console.log('Response:', response);
			if (response.roles != '') {
				this.roles = response.roles;
			} else {
				this.roles = { subscriber: true, editor: false, admin: false };
			}
			var data: User = {
				id: user.uid,
				email: user.email,
				phoneNumber: ' ',
				displayName: user.displayName,
				roles: this.roles,
				creationDate: response.creationDate,
				modificationDate: response.modificationDate
			};
			return this.router.navigateByUrl('/Dashboard');
		});
	}

	private checkAuthorization(user: User, allowedRoles: string[]): boolean {
		if (!user) {
			return false;
		}
		for (const role of allowedRoles) {
			if (user.roles[role]) {
				return true;
			}
		}
		return false;
	}

	Abilities;
	canRead(user: User): boolean {
		const allowed = [ 'admin', 'editor', 'subscriber' ];
		return this.checkAuthorization(user, allowed);
	}

	canWrite(user: User): boolean {
		const allowed = [ 'admin', 'editor' ];
		return this.checkAuthorization(user, allowed);
	}

	canUpdate(user: User): boolean {
		const allowed = [ 'admin', 'editor' ];
		return this.checkAuthorization(user, allowed);
	}

	canDelete(user: User): boolean {
		const allowed = [ 'admin' ];
		return this.checkAuthorization(user, allowed);
	}
}
