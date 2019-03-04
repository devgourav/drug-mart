import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/core/model/client.model';
import { ClientService } from 'src/app/core/service/client.service';
import { Subscription } from 'rxjs';


const confirmMsg = "Do you want to delete this client?";


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit, OnDestroy {

  clients: Client[] = [];
  private subscriptions: Array<Subscription> = [];

  constructor(private _clientService: ClientService,
    private router: Router) {
  }

  clientDetailsTableHeaders = ['Client Name', 'Contact Name', 'Address',
    'Email', 'Client Phone', 'Contact Phone', 'Actions']

  ngOnInit() {
    this.getClients();
  }

  getClients() {
    this.subscriptions.push(this._clientService.getClients()
      .subscribe((response) => {
        this.clients = response;
      }));
    console.log("ClientList:" + this.clients);
  }

  deleteClient(client: Client) {
    if (confirm(confirmMsg)) {
      this._clientService.deleteClient(client);
    }
  }

  editClient(clientId: string) {
    this.router.navigate(['Clients/New Client', clientId]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
