import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/model/client.model';
import { ClientService } from 'src/app/core/service/client.service';
import { Subscription } from 'rxjs';
import { ConfirmationService, Message, MessageService } from 'primeng/api';

const confirmMsg = 'Do you want to delete this client?';

@Component({
	selector: 'app-client-details',
	templateUrl: './client-details.component.html',
	styleUrls: [ './client-details.component.scss' ],
	providers: [ ConfirmationService, MessageService ]
})
export class ClientDetailsComponent implements OnInit, OnDestroy {
	clients: Client[] = [];
	private subscriptions: Array<Subscription> = [];
	tableHeaders: any[];
	msgs: Message[] = [];

	constructor(
		private _clientService: ClientService,
		private router: Router,
		private confirmationService: ConfirmationService,
		private messageService: MessageService
	) {}

	ngOnInit() {
		this.getClients();

		this.tableHeaders = [
			{ field: 'name', header: 'Client Name' },
			{ field: 'contactPersonName', header: 'Client Name' },
			{ field: '', header: 'Contact Phone' },
			{ field: '', header: 'Client Phone' },
			{ field: 'amountBalance', header: 'Amount Balance' }
		];
	}

	getClients() {
		this.subscriptions.push(
			this._clientService.getClients().subscribe((response) => {
				this.clients = response;
			})
		);
	}

	deleteClient(client: Client) {
		this.confirmationService.confirm({
			message: 'Do you want to delete this record?',
			header: 'Delete Confirmation',
			icon: 'pi pi-info-circle',
			reject: () => {
				this.msgs = [ { severity: 'info', summary: 'Rejected', detail: 'You have rejected' } ];
			},
			accept: () => {
				this.msgs = [ { severity: 'info', summary: 'Confirmed', detail: 'Record deleted' } ];
				this.messageService.add({ severity: 'success', summary: '', detail: 'Vendor Deleted' });

				this._clientService.deleteClient(client);
			}
		});
	}

	editClient(clientId: string) {
		this.router.navigate([ 'Clients/New Client', clientId ]);
	}

	ngOnDestroy() {
		this.subscriptions.forEach((subscription: Subscription) => {
			subscription.unsubscribe();
		});
	}
}
