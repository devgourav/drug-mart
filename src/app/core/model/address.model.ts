export class Address{
  streetAddress: string;
  landmark: string;
  country: string;
  state: string;
  city: string;
  pincode: number;

  constructor(){
    this.streetAddress = "";
    this.landmark = "";
    this.country = "";
    this.state = "";
    this.city = "";
    this.pincode = null;
  }
}
