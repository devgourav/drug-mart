import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/service/auth.service';
import { auth } from 'firebase';
import { UserService } from './core/service/user.service';
import { User, Roles } from './core/model/user.model';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
	title = 'drug-mart';
	password: string = '';
	emailID: string = '';
	roles: Roles;
	user:any;
	confirmationResult: auth.ConfirmationResult;
	recaptchaVerifier: auth.RecaptchaVerifier;
	credential: auth.AuthCredential;
	errorMessage: string ='';

	constructor(public _authService: AuthService, private _userService: UserService, private router: Router) {}
	ngOnInit() {
	}
	// onEmailandPasswordSignIn() {
	// 	this._authService.onEmailandPasswordSignIn(this.emailID, this.password);
	// }

	public onEmailandPasswordSignIn(){
		auth()
			.signInWithEmailAndPassword(this.emailID, this.password)
			.then((firebaseUser) => {
				if (firebaseUser) {
					this.setUserData(firebaseUser.user);
				}
			})
			.catch((error) =>{
				console.log("Login Error Message",error)
				var message: string = error.code
				if(message.includes('invalid-email')){
					this.errorMessage = 'Please Enter Valid EmailId'
				}else if(message.includes('wrong-password')){
					this.errorMessage = 'Password is incorrect.'
				}else if(message.includes('not-found')){
					this.errorMessage = 'Email Id is incorrect.'
				}
			});
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
}
