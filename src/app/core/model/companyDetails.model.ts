export class CompanyDetails {
  id: string;
  name: string;
  phoneNumber: string;
  altPhoneNumber: string;
  emailId: string;
  website:string;
  GSTIN: string;
  serviceTaxNo: string;
  billingAddress: Map<string, string> = new Map();
  shippingAddress: Map<string, string> = new Map();

  // constructor(){
  //   this.name = "";
  //   this.phoneNumber = "";
  //   this.altPhoneNumber = "";
  //   this.emailId = "";
  //   this.website = "";
  //   this.GSTIN = "";
  //   this.serviceTaxNo = "";
  //   this.billingAddress = new Address();
  //   this.shippingAddress = new Address();
  //
  // }
}
