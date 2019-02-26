import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Client } from 'src/app/core/model/client.model';
import { ClientService } from 'src/app/core/service/client.service';

// TODO: Add A save/Update prompt


@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {
  client: Client;
  clientId: string;
  addressMap: Map<string,string>;

  constructor(private location: Location,private _clientService: ClientService,
    private route: ActivatedRoute) {
    this.clientId = "";
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.clientId = params.get('id');
      if(this.clientId){
        this.getClient(params.get('id'));
      }
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

  closeClicked(){
    this.location.back();
    this.clientInputForm.reset();
  }

  getClient(clientId: string){
    this._clientService.getClientById(clientId)
    .subscribe((response) => {
      this.addressMap = new Map();
      this.addressMap.set("streetAddress",response.address["streetAddress"]);
      this.addressMap.set("pincode",response.address["pincode"]);


      this.client = new Client(
        response.name,
        response.phoneNumber,
        response.emailId,
        response.website,
        response.GSTIN,
        response.contactPersonName,
        response.contactPersonPhoneNumber,
        response.contactPersonEmailId,
        this.addressMap,
        response.notes
      );
      this.populateClientData();
    })
  }

  setClient(){
    this.addressMap = new Map();
    this.addressMap.set("streetAddress",this.clientInputForm.get("address").value);
    this.addressMap.set("pincode",this.clientInputForm.get("pincode").value);

    const addressMap = this.convertMapToObject(this.addressMap);

    this.client = new Client(
      this.clientInputForm.get("name").value,
      this.clientInputForm.get("phoneNumber").value,
      this.clientInputForm.get("emailId").value,
      this.clientInputForm.get("website").value,
      this.clientInputForm.get("GSTIN").value,
      this.clientInputForm.get("contactPersonName").value,
      this.clientInputForm.get("contactPersonPhoneNumber").value,
      this.clientInputForm.get("contactPersonEmailId").value,
      addressMap,
      this.clientInputForm.get("notes").value
    );
    const client = Object.assign({},this.client);
    console.log(client);
    this._clientService.setClient(client);
    this.closeClicked();
  }

  convertMapToObject(map: Map<any,any>):Map<any,any>{
    let objectMap = Object.create(null);
    for(let[k,v] of map){
      objectMap[k]=v;
    }
    return objectMap;
  }

  populateClientData(){
    console.log(this.client);
    this.clientInputForm.setValue({
      name: this.client.name,
      phoneNumber: this.client.phoneNumber,
      emailId: this.client.emailId,
      website: this.client.website,
      GSTIN: this.client.GSTIN,
      contactPersonName: this.client.contactPersonName,
      contactPersonPhoneNumber: this.client.contactPersonPhoneNumber,
      contactPersonEmailId: this.client.contactPersonEmailId,
      address: this.client.address.get("streetAddress"),
      pincode: this.client.address.get("pincode"),
      notes: this.client.notes
    })
  }

  updateClient(){
    this.addressMap = new Map();
    this.addressMap.set("streetAddress",this.clientInputForm.get("address").value);
    this.addressMap.set("pincode",this.clientInputForm.get("pincode").value);

    const addressMap = this.convertMapToObject(this.addressMap);

    this.client = new Client(
      this.clientInputForm.get("name").value,
      this.clientInputForm.get("phoneNumber").value,
      this.clientInputForm.get("emailId").value,
      this.clientInputForm.get("website").value,
      this.clientInputForm.get("GSTIN").value,
      this.clientInputForm.get("contactPersonName").value,
      this.clientInputForm.get("contactPersonPhoneNumber").value,
      this.clientInputForm.get("contactPersonEmailId").value,
      addressMap,
      this.clientInputForm.get("notes").value
    );
    this.client.id = this.clientId;
    const client = Object.assign({},this.client);
    this._clientService.updateClient(client);
    this.closeClicked();
  }



}