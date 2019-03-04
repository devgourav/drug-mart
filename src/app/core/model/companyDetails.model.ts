export class CompanyDetails {
  id: string;
  creationDate: Date;
  modificationDate: Date;


  constructor(
    public name: string,
    public phoneNumber: string,
    public altPhoneNumber: string,
    public emailId: string,
    public website: string,
    public GSTNumber: string,
    public serviceTaxNo: string,
    public billingAddress: Map<string, string>,
    public shippingAddress: Map<string, string>) {
  }
}
