import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { Vendor } from '../../model/vendor.model';
import { VendorService } from '../../service/vendor.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';



const savePromptMsg = "Vendor has been saved.";
const updatePromptMsg = "Vendor has been Updated.";



@Component({
  selector: 'app-new-vendor',
  templateUrl: './new-vendor.component.html',
  styleUrls: ['./new-vendor.component.scss']
})
export class NewVendorComponent implements OnInit {
  vendor: Vendor;
  vendorId: string;

  constructor(private location: Location,private _vendorService: VendorService,
    private route: ActivatedRoute) {
    this.vendor = new Vendor();
    this.vendorId = "";
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.vendorId = params.get('id');
      if(this.vendorId){
        this.getVendor(params.get('id'));
      }
    });
  }

  vendorInputForm = new FormGroup({
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
    this.vendorInputForm.reset();
  }

  getVendor(vendorId: string){
    this._vendorService.getVendorById(vendorId)
    .subscribe((response) => {
      this.vendor = response;
      this.populateVendorData();
    })
  }

  setVendor(){
    this.vendor = Object.assign({}, this.vendorInputForm.value);
    this._vendorService.setVendor(this.vendor)
    .subscribe((response)=> {
      this.location.back()
    });

  }

  populateVendorData(){
    this.vendorInputForm.setValue({
      name: this.vendor.name,
      phoneNumber: this.vendor.phoneNumber,
      emailId: this.vendor.emailId,
      website: this.vendor.website,
      GSTIN: this.vendor.GSTIN,
      contactPersonName: this.vendor.contactPersonName,
      contactPersonPhoneNumber: this.vendor.contactPersonPhoneNumber,
      contactPersonEmailId: this.vendor.contactPersonEmailId,
      address: this.vendor.address,
      pincode: this.vendor.pincode,
      notes: this.vendor.notes
    })
  }

  updateVendor(){
    this.vendor = Object.assign({}, this.vendorInputForm.value);
    this._vendorService.updateVendor(this.vendor)
    .subscribe((response)=>{
      this.location.back()
    });
  }



}
