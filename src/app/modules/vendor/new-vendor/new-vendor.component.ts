import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Vendor } from 'src/app/core/model/vendor.model';
import { VendorService } from 'src/app/core/service/vendor.service';

// TODO: Add A save/Update prompt


@Component({
  selector: 'app-new-vendor',
  templateUrl: './new-vendor.component.html',
  styleUrls: ['./new-vendor.component.scss']
})
export class NewVendorComponent implements OnInit {
  vendor: Vendor;
  vendorId: string = "";
  addressMap: Map<string,string>;

  constructor(private location: Location,private _vendorService: VendorService,
    private route: ActivatedRoute) {
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
      this.addressMap = new Map();
      this.addressMap.set("streetAddress",response.address["streetAddress"]);
      this.addressMap.set("pincode",response.address["pincode"]);

      this.vendor = new Vendor(
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
      this.populateVendorData();
    })
  }

  setVendor(){
    this._vendorService.setVendor(this.getVendorObj());
    this.closeClicked();
  }

  updateVendor(){
    this._vendorService.updateVendor(this.getVendorObj());
    this.closeClicked();
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
      address: this.vendor.address.get("streetAddress"),
      pincode: this.vendor.address.get("pincode"),
      notes: this.vendor.notes
    })
  }


  getVendorObj():Vendor{
    this.addressMap = new Map();
    this.addressMap.set("streetAddress",this.vendorInputForm.get("address").value);
    this.addressMap.set("pincode",this.vendorInputForm.get("pincode").value);

    const addressMap = this.convertMapToObject(this.addressMap);

    this.vendor = new Vendor(
      this.vendorInputForm.get("name").value,
      this.vendorInputForm.get("phoneNumber").value,
      this.vendorInputForm.get("emailId").value,
      this.vendorInputForm.get("website").value,
      this.vendorInputForm.get("GSTIN").value,
      this.vendorInputForm.get("contactPersonName").value,
      this.vendorInputForm.get("contactPersonPhoneNumber").value,
      this.vendorInputForm.get("contactPersonEmailId").value,
      addressMap,
      this.vendorInputForm.get("notes").value
    );
    this.vendor.id = this.vendorId;
    const vendor = Object.assign({},this.vendor);
    return vendor;

  }


  convertMapToObject(map: Map<any,any>):Map<any,any>{
    let objectMap = Object.create(null);
    for(let[k,v] of map){
      objectMap[k]=v;
    }
    return objectMap;
  }



}
