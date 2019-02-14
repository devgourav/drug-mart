import { Component, OnInit } from '@angular/core';
import { Client } from '../../model/client.model';
import { ClientService } from '../../service/client.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

const confirmMsg = "Do you want to delete this client?";


@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.scss']
})
export class ClientDetailsComponent implements OnInit {
  clients: Client[] = [];

  constructor(private location: Location,private _clientService: ClientService,
    private router: Router) {
  }

  clientDetailsTableHeaders = ['Vendor Name','Contact Name','Address',
  'Email','Vendor Phone','Contact Phone','Actions']


  ngOnInit() {
    this.getClients();
  }

  getClients(){
    this._clientService.getClients()
    .subscribe((response)=>{
      this.clients = response;
    })
    console.log("VendorList:"+this.clients);
  }

  deleteClient(clientId: string){
    if(confirm(confirmMsg)){
      this._clientService.deleteClient(clientId)
      .subscribe(()=>{
        this.getClients();
      });

    }
  }

  editVendor(clientId: string){
    this.router.navigate(['Clients/New Client',clientId]);
  }



}
