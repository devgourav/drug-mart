import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Vendor } from 'src/app/core/model/vendor.model';
import { VendorService } from 'src/app/core/service/vendor.service';
import { Subscription } from 'rxjs';


const confirmMsg = "Do you want to delete this vendor?";


@Component({
  selector: 'app-vendor-details',
  templateUrl: './vendor-details.component.html',
  styleUrls: ['./vendor-details.component.scss']
})
export class VendorDetailsComponent implements OnInit {
  vendors: Vendor[] = [];
  private subscriptions: Array<Subscription> = [];

  constructor(private _vendorService: VendorService,
    private router: Router) {
  }

  vendorDetailsTableHeaders = ['Vendor Name','Contact Name','Address',
  'Email','Vendor Phone','Contact Phone','Actions']

  ngOnInit() {
    this.getVendors();
  }

  getVendors(){
    this.subscriptions.push(this._vendorService.getVendors()
    .subscribe((response)=>{
      this.vendors = response;
    }))
  }

  deleteVendor(vendor: Vendor){
    if(confirm(confirmMsg)){
      this._vendorService.deleteVendor(vendor);
    }
  }

  editVendor(vendorId: string){
    this.router.navigate(['Vendors/New Vendor',vendorId]);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

}
