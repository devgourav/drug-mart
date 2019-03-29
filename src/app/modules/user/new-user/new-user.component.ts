import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { User, Roles } from 'src/app/core/model/user.model';
import { UserService } from 'src/app/core/service/user.service';
import { Subscription } from 'rxjs';
import * as admin from 'firebase-admin';

// TODO: Add A save/Update prompt

@Component({
	selector: 'app-new-user',
	templateUrl: './new-user.component.html',
	styleUrls: [ './new-user.component.scss' ]
})
export class NewUserComponent implements OnInit {
	user: User;
	userId: string = '';
	private subscriptions: Array<Subscription> = [];
	modifiedDate: Date = new Date();
	createdDate: Date = new Date();
	admin: any;

	userInputForm = this.fb.group({
		password: [ '' ],
		phoneNumber: [ '', Validators.maxLength(10) ],
		email: [ '', Validators.email ],
		displayName: [ '' ],
		isEditor: [ false ],
		isAdmin: [ false ],
		isSubscriber: [ false ]
	});

	constructor(
		private location: Location,
		private _userService: UserService,
		private route: ActivatedRoute,
		private fb: FormBuilder
	) {}
	ngOnInit() {
		this.subscriptions.push(
			this.route.paramMap.subscribe((params) => {
				this.userId = params.get('id');
				if (this.userId) {
					this.getUser(params.get('id'));
				}
			})
		);

		// this.admin = require('firebase-admin');
		// var serviceAccount = require('../../../../../drugmart-firestore-firebase-adminsdk-8q6gz-136e6b83e1.json');
		// this.admin.initializeApp({
		// 	credential: admin.credential.cert(serviceAccount),
		// 	databaseURL: 'https://drugmart-firestore.firebaseio.com'
		// });
	}

	get password() {
		return this.userInputForm.get('password');
	}
	get email() {
		return this.userInputForm.get('email');
	}
	get phoneNumber() {
		return this.userInputForm.get('phoneNumber');
	}
	get displayName() {
		return this.userInputForm.get('displayName');
	}
	get isSubscriber(): boolean {
		console.log('Subscriber', this.userInputForm.get('isSubscriber').value);
		return this.userInputForm.get('isSubscriber').value;
	}
	get isEditor() {
		console.log('Editor', this.userInputForm.get('isEditor').value);
		return this.userInputForm.get('isEditor').value;
	}
	get isAdmin() {
		console.log('Admin', this.userInputForm.get('isAdmin').value);
		return this.userInputForm.get('isAdmin').value;
	}

	closeClicked() {
		this.location.back();
		this.userInputForm.reset();
	}

	getUser(userId: string) {
		this.subscriptions.push(
			this._userService.getUserById(userId).subscribe((response) => {
				this.user = {
					id: response.id,
					email: response.email,
					phoneNumber: response.phoneNumber,
					displayName: response.displayName,
					creationDate: response.creationDate,
					modificationDate: response.modificationDate,
					roles: {
						subscriber: response.roles.subscriber,
						editor: response.roles.editor,
						admin: response.roles.admin
					}
				};
				this.userId = userId;
				this.createdDate = response.creationDate;
				this.populateUserData();
			})
		);

		admin
			.auth()
			.getUser(userId)
			.then((userRecord) => {
				console.log('Successfully fetched user data:', userRecord.toJSON());
			})
			.catch((error) => {
				console.log('Error fetching user data:', error);
			});
	}

	// setUser() {

	// 	this.user = {
	// 		id: firebase,
	// 		email: response.email,
	// 		phoneNumber: response.phoneNumber,
	// 		displayName: response.displayName,
	// 		creationDate: response.creationDate,
	// 		modificationDate: response.modificationDate,
	// 		roles: {
	// 			subscriber: this.isSubscriber,
	// 			editor: this.isEditor,
	// 			admin: this.isAdmin }
	// 	};

	// 	const user = Object.assign({}, this.user);
	// 	console.log(user);
	// 	this._userService.setUser(user);
	// 	this.closeClicked();
	// }

	convertMapToObject(map: Map<any, any>): Map<any, any> {
		let objectMap = Object.create(null);
		for (let [ k, v ] of map) {
			objectMap[k] = v;
		}
		return objectMap;
	}

	populateUserData() {
		console.log(this.user);
		this.userInputForm.setValue({
			email: this.user.email,
			password: '',
			phoneNumber: this.user.phoneNumber,
			displayName: this.user.displayName,
			isEditor: this.user.roles.editor,
			isAdmin: this.user.roles.admin,
			isSubscriber: this.user.roles.subscriber
		});
	}

	updateUser() {
		console.log('updateUser');
		this.user = {
			id: this.userId,
			email: this.email.value,
			phoneNumber: this.phoneNumber.value,
			displayName: this.displayName.value,
			creationDate: this.createdDate,
			modificationDate: this.modifiedDate,
			roles: {
				subscriber: this.isSubscriber,
				editor: this.isEditor,
				admin: this.isAdmin
			}
		};

		const user = Object.assign({}, this.user);
		this._userService.updateUser(user);
		this.closeClicked();
	}

	ngOnDestroy() {
		this.subscriptions.forEach((subscription: Subscription) => {
			subscription.unsubscribe();
		});
	}
}
