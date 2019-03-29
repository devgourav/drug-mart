import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/model/user.model';
import { UserService } from 'src/app/core/service/user.service';
import { Subscription } from 'rxjs';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

const confirmMsg = 'Do you want to delete this user?';

@Component({
	selector: 'app-user-details',
	templateUrl: './user-details.component.html',
	styleUrls: [ './user-details.component.scss' ],
	providers: [ ConfirmationService, MessageService ]
})
export class UserDetailsComponent implements OnInit, OnDestroy {
	users: User[] = [];
	private subscriptions: Array<Subscription> = [];
	tableHeaders: any[];
	msgs: Message[] = [];

	constructor(
		private _userService: UserService,
		private router: Router,
		private confirmationService: ConfirmationService,
		private messageService: MessageService
	) {}

	// userDetailsTableHeaders = [
	// 	'User Name',
	// 	'Email',
	// 	'Phone Number',
	// 	'Roles',
	// 	'Actions'
	// ];

	ngOnInit() {
		this.getUsers();

		this.tableHeaders = [
			{ field: 'username', header: 'User Name' },
			{ field: 'email', header: 'Email' },
			{ field: 'phoneNumber', header: 'Phone Number' },
			{ field: 'admin', header: 'Admin' },
			{ field: 'editor', header: 'Editor' },
			{ field: 'subscriber', header: 'Subscriber' }
		];
	}

	getUsers() {
		this.subscriptions.push(
			this._userService.getUsers().subscribe((response) => {
				this.users = response;
			})
		);
		console.log('UserList:' + this.users);
	}

	deleteUser(user: User) {
		this.confirmationService.confirm({
			message: 'Do you want to delete this record?',
			header: 'Delete Confirmation',
			icon: 'pi pi-info-circle',
			reject: () => {
				this.msgs = [ { severity: 'info', summary: 'Rejected', detail: 'You have rejected' } ];
			},
			accept: () => {
				this.msgs = [ { severity: 'info', summary: 'Confirmed', detail: 'Record deleted' } ];
				this.messageService.add({ severity: 'success', summary: 'Vendor Deleted', detail: 'Vendor Deleted' });

				this._userService.deleteUser(user);
			}
		});
	}

	editUser(userId: string) {
		this.router.navigate([ 'Users/New User', userId ]);
	}

	ngOnDestroy() {
		this.subscriptions.forEach((subscription: Subscription) => {
			subscription.unsubscribe();
		});
	}
}
