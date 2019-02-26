export class CompanyDetails {
  id: string;
  name: string;
  phoneNumber: string;
  altPhoneNumber: string;
  emailId: string;
  website: string;
  GSTNumber: string;
  serviceTaxNo: string;
  billingAddress: Map<string, string> = new Map();
  shippingAddress: Map<string, string> = new Map();

  constructor(name: string, phoneNumber: string, altPhoneNumber: string, emailId: string,
    website: string, GSTNumber: string, serviceTaxNo: string, billingAddress: Map<string, string>,
    shippingAddress: Map<string, string>) {
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.altPhoneNumber = altPhoneNumber;
    this.emailId = emailId;
    this.website = website;
    this.GSTNumber = GSTNumber;
    this.serviceTaxNo = serviceTaxNo;
    this.billingAddress = billingAddress;
    this.shippingAddress = shippingAddress;
  }
}
