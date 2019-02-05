import { Component, OnInit } from '@angular/core';
import { Vendor } from '../../model/vendor.model';
import { VendorService } from '../../service/vendor.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


const confirmMsg = "Do you want to delete this vendor?";


@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {
  vendorList: Vendor[] = [];

  constructor(private location: Location,private _vendorService: VendorService,
    private router: Router) {
  }

  vendorDetailsTableHeaders = ['Vendor Name','Contact Name','Address',
  'Email','Vendor Phone','Contact Phone','Actions']

  ngOnInit() {
    this.getVendors();
  }


  deleteVendor(vendorId: string){
    if(confirm(confirmMsg)){
      this._vendorService.deleteVendor(vendorId)
      .subscribe(()=>{
        this.getVendors();
      });

    }
  }

  getVendors(){
    this._vendorService.getVendors()
    .subscribe((response)=>{
      this.vendorList = response;
    })
    console.log("VendorList:"+this.vendorList);
  }

  editVendor(vendorId: string){
    this.router.navigate(['Vendors/New Vendor',vendorId]);
  }


}
