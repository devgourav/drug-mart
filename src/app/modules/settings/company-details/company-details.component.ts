import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { CompanyDetails } from 'src/app/core/model/companyDetails.model';
import { CompanyDetailsService } from 'src/app/core/service/company-details.service';


@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {
  companyDetailsId: string = "";
  companyDetails: CompanyDetails = new CompanyDetails();
  showBillingAddress: boolean = true;

  constructor(private location: Location, private _companyDetailsService: CompanyDetailsService) {
  }
  ngOnInit() {
    this.getCompanyDetails();
  }

  onBillingAddressClick() {
    this.showBillingAddress = true;
  }
  onShippingAddressClick() {
    this.showBillingAddress = false;
  }


  companyDetailsInputForm = new FormGroup({
    name: new FormControl(''),
    phoneNumber: new FormControl(''),
    altPhoneNumber: new FormControl(''),
    emailId: new FormControl(''),
    website: new FormControl(''),
    GSTIN: new FormControl(''),
    serviceTaxNo: new FormControl(''),
    billingAddress: new FormGroup({
      streetAddress: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      pincode: new FormControl('')
    }),
    shippingAddress: new FormGroup({
      streetAddress: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      pincode: new FormControl('')
    })
  });


  getCompanyDetails() {
    this._companyDetailsService.getCompanyDetails()
      .subscribe((response) => {
        console.log("response:");
        if (response && response[0]) {
          this.companyDetails = response[0];
          this.populateCompanyDetailsData();
        }
      });
  }

  populateCompanyDetailsData() {
    console.log(this.companyDetails.id);
    console.log(this.companyDetails.billingAddress);
    this.companyDetailsInputForm.setValue({
      name: this.companyDetails.name,
      phoneNumber: this.companyDetails.phoneNumber,
      altPhoneNumber: this.companyDetails.altPhoneNumber,
      emailId: this.companyDetails.emailId,
      website: this.companyDetails.website,
      GSTIN: this.companyDetails.GSTIN,
      serviceTaxNo: this.companyDetails.serviceTaxNo,
      billingAddress: {
        streetAddress: this.companyDetails.billingAddress.streetAddress,
        country: this.companyDetails.billingAddress.country,
        state: this.companyDetails.billingAddress.state,
        city: this.companyDetails.billingAddress.city,
        pincode: this.companyDetails.billingAddress.pincode
      },
      shippingAddress: {
        streetAddress: this.companyDetails.shippingAddress.streetAddress,
        country: this.companyDetails.shippingAddress.country,
        state: this.companyDetails.shippingAddress.state,
        city: this.companyDetails.shippingAddress.city,
        pincode: this.companyDetails.shippingAddress.pincode
      }
    });
  }

  saveCompanyDetails() {
    this.companyDetailsId = this.companyDetails.id;

    if (this.companyDetails.id == null || this.companyDetails.id == "") {
      this.companyDetails = Object.assign({}, this.companyDetailsInputForm.value);
      this._companyDetailsService.setCompanyDetails(this.companyDetails)
        .subscribe((response) => {
          this.getCompanyDetails();
          console.log(response);
        });
    } else {
      this.companyDetails = Object.assign({}, this.companyDetailsInputForm.value);
      this.companyDetails.id = this.companyDetailsId;
      this._companyDetailsService.updateCompanyDetails(this.companyDetails)
        .subscribe((response) => {
          console.log(response);
          this.location.back()
        });
    }

  }


}
