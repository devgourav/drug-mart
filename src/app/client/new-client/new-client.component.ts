import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Client } from '../../model/client.model';
import { ClientService } from '../../service/client.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  client: Client;
  clientId: string;

  constructor(private location: Location,private _clientService: ClientService,
    private route: ActivatedRoute) {
    this.client = new Client();
    this.clientId = "";
  }

  showBillingAddress = true;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.clientId = params.get('id');
      if(this.clientId){
        this.getClient(params.get('id'));
      }
    });
  }

  getClient(clientId: string){
    this._clientService.getClientById(clientId)
    .subscribe((response) => {
      this.client = response;
      this.populateClientData();
    })
  }

  setClient(){
    this.client = Object.assign({}, this.clientInputForm.value);
    this._clientService.setClient(this.client)
    .subscribe((response)=> {
      this.location.back()
    });
  }

  clientInputForm = new FormGroup({
    name: new FormControl(''),
    phoneNumber: new FormControl(''),
    emailId: new FormControl(''),
    website: new FormControl(''),
    GSTIN: new FormControl(''),
    contactPersonName: new FormControl(''),
    contactPersonPhoneNumber: new FormControl(''),
    contactPersonEmailId: new FormControl(''),
    address: new FormControl(''),
    pincode: new FormControl(''),
    notes: new FormControl('')

  });

  populateClientData(){
    this.clientInputForm.setValue({
      name: this.client.name,
      phoneNumber: this.client.phoneNumber,
      emailId: this.client.emailId,
      website: this.client.website,
      GSTIN: this.client.GSTIN,
      contactPersonName: this.client.contactPersonName,
      contactPersonPhoneNumber: this.client.contactPersonPhoneNumber,
      contactPersonEmailId: this.client.contactPersonEmailId,
      address: this.client.address.streetAddress,
      pincode: this.client.address.pincode,
      notes: this.client.notes
    })
  }

  updateClient(){
    this.client = Object.assign({}, this.clientInputForm.value);
    this.client.id = this.clientId;
    this._clientService.updateClient(this.client)
    .subscribe((response)=>{
      this.location.back()
    });
  }

  closeClicked(){
    this.location.back();
    this.clientInputForm.reset();
  }


}
