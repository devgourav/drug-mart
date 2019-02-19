import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/core/model/vendor.model';
import { VendorService } from 'src/app/core/service/vendor.service';


const confirmMsg = "Do you want to delete this vendor?";


@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {
  vendors: Vendor[] = [];

  constructor(private location: Location,private _vendorService: VendorService,
    private router: Router) {
  }

  vendorDetailsTableHeaders = ['Vendor Name','Contact Name','Address',
  'Email','Vendor Phone','Contact Phone','Actions']

  ngOnInit() {
    this.getVendors();
  }

  getVendors(){
    this._vendorService.getVendors()
    .subscribe((response)=>{
      this.vendors = response;
    })
    console.log("VendorList:"+this.vendors);
  }

  deleteVendor(vendorId: string){
    if(confirm(confirmMsg)){
      this._vendorService.deleteVendor(vendorId)
      .subscribe(()=>{
        this.getVendors();
      });

    }
  }


  editVendor(vendorId: string){
    this.router.navigate(['Vendors/New Vendor',vendorId]);
  }


}
