import { Injectable } from '@angular/core';
import { User, Roles } from '../model/user.model';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	response: any;
	user: Observable<User>;
	roles: Roles;

	credential: auth.AuthCredential;
	confirmationResult: auth.ConfirmationResult;
	modifiedDate: Date = new Date();
	createdDate: Date = new Date();

	constructor(private afAuth: AngularFireAuth, private _userService: UserService, private router: Router) {
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

	async googleLogin() {
		console.log('Google login');
		const provider = new auth.GoogleAuthProvider();
		await this.afAuth.auth
			.signInWithPopup(provider)
			.then((firebaseUser) => {
				this.updateUserData(firebaseUser.user);
			})
			.catch((error) => console.error('googleLogin', error));
	}

	async logout() {
		await this.afAuth.auth.signOut();
		return this.router.navigate([ '/' ]);
	}

	public getUserData(uid: string): Observable<User> {
		return this._userService.getUserById(uid);
	}

	public updateUserData(user: any) {
		this._userService.getUserById(user.uid).subscribe((existingUser) => {
			if (existingUser) {
				this.roles = existingUser.roles;
				this.createdDate = existingUser.creationDate;
			} else {
				this.roles = { subscriber: true, editor: false, admin: false };
			}
			const data = {
				id: user.uid,
				email: user.email,
				username: user.email,
				displayName: user.displayName,
				roles: this.roles,
				creationDate: this.createdDate,
				modificationDate: this.modifiedDate
			};
			console.log(data);
			this._userService.setUser(data);
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

	//Abilities
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
